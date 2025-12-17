import { Body, Controller, Delete, Get, Path, Post, Put, Query, Route, SuccessResponse, Tags, Response, Security} from 'tsoa';
import { z } from 'zod';
import { PersonService } from '../services/person.service';
import { PersonResponseType } from '../dtos/person.dto';
import { createPersonSchema, updatePersonSchema } from '../zod/schemas/person.schema';

type CreatePersonInput = z.infer<typeof createPersonSchema>['body'];
type UpdatePersonInput = z.infer<typeof updatePersonSchema>['body'];

@Route("people")
@Tags("People")
export class PersonController extends Controller {

  @Post("/")
  @SuccessResponse("201", "Created")
  @Security("jwt")
  public async createPerson(@Body() body: CreatePersonInput): Promise<PersonResponseType> {
    const person = await PersonService.create(body);
    this.setStatus(201);
    return person;
  }

  @Get("/")
  public async findPeople(@Query() kind?: string): Promise<PersonResponseType[]> {
    return await PersonService.findAll(kind);
  }

  @Get("{id}")
  @Response("404", "Not Found")
  public async getPersonById(@Path() id: string): Promise<PersonResponseType> {
    const person = await PersonService.findById(id);
    if (!person) {
      this.setStatus(404);
      return { message: "Pessoa não encontrada" } as any;
    }
    return person;
  }

  @Put("{id}")
  @Response("404", "Not Found")
  @Security("jwt")
  public async updatePerson(@Path() id: string, @Body() body: UpdatePersonInput): Promise<PersonResponseType> {
    const updatedPerson = await PersonService.update(id, body);
    if (!updatedPerson) {
      this.setStatus(404);
      return { message: "Pessoa não encontrada para atualizar" } as any;
    }
    return updatedPerson;
  }

  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  @Response("404", "Not Found")
  @Security("jwt")
  public async deletePerson(@Path() id: string): Promise<void> {
    try {
      await PersonService.delete(id);
      this.setStatus(204);
    } catch (error: any) {
      this.setStatus(404);
      throw error;
    }
  }
}