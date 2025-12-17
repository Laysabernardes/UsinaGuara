import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
  Tags,
  Response,
  Security,
} from "tsoa";
import { z } from "zod";
import { PerspectiveService } from "../services/perspective.service";
import { PerspectiveResponseType } from "../dtos/perspective.dto";
import {
  createPerspectiveSchema,
  updatePerspectiveSchema,
} from "../zod/schemas/perspective.schema";

type CreatePerspectiveInput = z.infer<typeof createPerspectiveSchema>["body"];
type UpdatePerspectiveInput = z.infer<typeof updatePerspectiveSchema>["body"];

interface ErrorResponse {
  message: string;
}

@Tags("Perspectives")
@Route("perspectives") 
export class PerspectiveController extends Controller {

  /**
   * Cria uma nova perspectiva associada a um projeto.
   * @param projectId O ID do projeto ao qual a perspectiva pertence.
   * @param body Os dados da nova perspectiva a ser criada.
   */
  @Post("/projects/{projectId}")
  @SuccessResponse("201", "Created")
  @Security("jwt") // Indica que esta rota requer autenticação
  public async createPerspective(
    @Path() projectId: string,
    @Body() body: CreatePerspectiveInput
  ): Promise<PerspectiveResponseType> {
    // Garante que o projectId do corpo da requisição seja o mesmo da URL, mantendo a consistência dos dados.
    const perspectiveData = { ...body, projectId };
    const perspective = await PerspectiveService.create(perspectiveData);
    this.setStatus(201);
    return perspective;
  }

  /**
   * Retorna todas as perspectivas de todos os projetos.
   */
  @Get("/")
  public async getAllPerspectives(): Promise<PerspectiveResponseType[]> {
    return PerspectiveService.findAll();
  }

  /**
   * Retorna todas as perspectivas de um projeto específico.
   * @param projectId O ID do projeto para o qual as perspectivas serão buscadas.
   */
  @Get("/projects/{projectId}")
  public async getPerspectivesForProject(
    @Path() projectId: string
  ): Promise<PerspectiveResponseType[]> {
    return PerspectiveService.findByProjectId(projectId);
  }

  /**
   * Retorna uma perspectiva específica pelo seu ID.
   * @param perspectiveId O ID da perspectiva a ser encontrada.
   */
  @Get("/{perspectiveId}")
  @Response<ErrorResponse>(404, "Not Found")
  public async getPerspectiveById(
    @Path() perspectiveId: string
  ): Promise<PerspectiveResponseType | ErrorResponse> {
    const perspective = await PerspectiveService.findById(perspectiveId);
    if (!perspective) {
      this.setStatus(404);
      return { message: "Perspectiva não encontrada" };
    }
    return perspective;
  }

  /**
   * Busca um projeto único pelo seu slug.
   * @summary Busca um projeto por slug.
   * @param slug O slug único do projeto a ser recuperado.
   */
  @Get("/slug/{slug}")
  @Response("404", "Not Found")
  public async getPerspectiveBySlug(@Path() slug: string): Promise<PerspectiveResponseType> {
    const perspective = await PerspectiveService.findBySlug(slug);
    if (!perspective) {
      this.setStatus(404);
      return { message: "Perspectiva não encontrada" } as any;
    }
    return perspective;
  }
  

  /**
   * Atualiza uma perspectiva existente.
   * @param perspectiveId O ID da perspectiva a ser atualizada.
   * @param body Os dados a serem atualizados na perspectiva.
   */
  @Patch("/{perspectiveId}")
  @Response<ErrorResponse>(404, "Not Found")
  public async updatePerspective(
    @Path() perspectiveId: string,
    @Body() body: UpdatePerspectiveInput
  ): Promise<PerspectiveResponseType | ErrorResponse> {
    const updatedPerspective = await PerspectiveService.update(
      perspectiveId,
      body
    );
    if (!updatedPerspective) {
      this.setStatus(404);
      return { message: "Perspectiva não encontrada para atualizar" };
    }
    return updatedPerspective;
  }

  /**
   * Deleta uma perspectiva.
   * @param perspectiveId O ID da perspectiva a ser deletada.
   */
  @Delete("/{perspectiveId}")
  @SuccessResponse("204", "No Content")
  @Response<ErrorResponse>(404, "Not Found")
  @Security("jwt")
  public async deletePerspective(@Path() perspectiveId: string): Promise<void> {
    // O próprio service já lança um erro se não encontrar,
    // que será capturado por um middleware de erro.
    // Se der certo, apenas setamos o status.
    await PerspectiveService.delete(perspectiveId);
    this.setStatus(204);
    return;
  }
}