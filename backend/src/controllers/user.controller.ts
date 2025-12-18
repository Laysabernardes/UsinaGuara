import { Body,Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags, Response, Security} from 'tsoa';
import { z } from 'zod';
import { UserService } from '../services/user.service';
import { UserResponseType } from '../dtos/user.dto';
import { createUserSchema } from '../zod/schemas/user.schema';

/**
 * Definições de entrada para criação e atualização.
 * UpdateUserInput é definido localmente para permitir atualizações parciais (opcionais).
 */
type CreateUserInput = z.infer<typeof createUserSchema>['body'];
type UpdateUserInput = {
  name?: string;
  email?: string;
  role?: 'admin' | 'editor';
};

@Route("users")
@Tags("Users")
@Security("jwt")
export class UserController extends Controller {

  /**
   * Cria um novo usuário no sistema.
   * @param body Dados obrigatórios do usuário (email, password, etc)
   * @summary Registrar novo usuário
   */
  @Post("/")
  @SuccessResponse("201", "Created")
  @Response("409", "Conflict - Email já está em uso")
  public async createUser(@Body() body: CreateUserInput): Promise<UserResponseType> {
    try {
      const user = await UserService.create(body);
      this.setStatus(201);
      return user;
    } catch (error: any) {
      this.setStatus(409);
      return { message: error.message } as any;
    }
  }

  /**
   * Lista todos os usuários cadastrados.
   * @summary Listar usuários
   */
  @Get("/")
  public async findUsers(): Promise<UserResponseType[]> {
    return await UserService.findAll();
  }

  /**
   * Lista todos os usuários cadastrados.
   * @summary Listar usuários
   */
  @Get("{id}")
  @Response("404", "Not Found")
  public async getUserById(@Path() id: string): Promise<UserResponseType> {
    const user = await UserService.findById(id);
    if (!user) {
      this.setStatus(404);
      return { message: "Usuário não encontrado" } as any;
    }
    return user;
  }

  /**
   * Atualiza informações de um usuário existente.
   * @param id ID do usuário a ser modificado
   * @param body Campos opcionais para atualização
   */
  @Put("{id}")
  @Response("404", "Not Found")
  public async updateUser(@Path() id: string, @Body() body: UpdateUserInput): Promise<UserResponseType> {
    const updatedUser = await UserService.update(id, body);
    if (!updatedUser) {
      this.setStatus(404);
      return { message: "Usuário não encontrado para atualizar" } as any;
    }
    return updatedUser;
  }

  /**
   * Remove um usuário do sistema.
   * @param id ID do usuário a ser excluído
   */
  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  @Response("404", "Not Found")
  public async deleteUser(@Path() id: string): Promise<void> {
    try {
      await UserService.delete(id);
      this.setStatus(204);
    } catch (error: any) {
      this.setStatus(404);
      throw error;
    }
  }
}