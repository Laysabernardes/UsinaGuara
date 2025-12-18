import { Body, Controller, Delete, Get, Path, Patch, Post, Put, Route, SuccessResponse, Tags, Response, Security, Query } from 'tsoa';
import { z } from 'zod';
import { ProjectService } from '../services/project.service';
import { ProjectResponseType } from '../dtos/project.dto';
import { createProjectSchema, updateProjectSchema } from '../zod/schemas/project.schema';

type CreateProjectInput = z.infer<typeof createProjectSchema>['body'];
type UpdateProjectInput = z.infer<typeof updateProjectSchema>['body'];

interface PaginatedProjectsResponse {
  data: ProjectResponseType[];
  totalPages: number;
}

@Route("projects")
@Tags("Projects")
export class ProjectController extends Controller {

  /**
   * Cria um novo projeto.
   * @summary Cria um novo projeto.
   * @param body Dados para a criação do novo projeto.
   */
  @Post("/")
  @SuccessResponse("201", "Created")
  @Response("409", "Conflict")
  @Security("jwt")
  public async createProject(@Body() body: CreateProjectInput): Promise<ProjectResponseType> {
    try {
      const project = await ProjectService.create(body);
      this.setStatus(201);
      return project;
    } catch (error: any) {
      this.setStatus(409);
      return { message: error.message } as any;
    }
  }

  /**
   * Retorna uma lista de todos os projetos, com paginação.
   * @summary Retorna todos os projetos (paginado).
   * @param page O número da página desejada (padrão 1).
   * @param limit O número de itens por página (padrão 9).
   */
  @Get("/")
  public async getAllProjects(
    @Query() page: number = 1,
    @Query() limit: number = 6
  ): Promise<PaginatedProjectsResponse> { 
    return await ProjectService.findPaginated(page, limit);
  }

  /**
   * Filtra projetos por um status específico.
   * @summary Filtra projetos por status.
   * @param status O status para filtrar. Valores aceitos: 'draft' ou 'published'.
   */
  @Get("status/{status}")
  public async getProjectsByStatus(@Path() status: 'draft' | 'published'): Promise<ProjectResponseType[]> {
    return await ProjectService.findByStatus(status);
  }

  /**
   * Retorna todos os projetos que fazem parte do carrossel.
   * @summary Retorna itens do carrossel (sem ordem).
   */
  @Get("carousel")
  public async getCarouselItems(): Promise<ProjectResponseType[]> {
    return await ProjectService.findCarouselItems();
  }

  /**
   * Retorna todos os projetos do carrossel, em ordem crescente.
   * @summary Retorna itens do carrossel (ordenados).
   */
  @Get("carousel/sorted")
  public async getCarouselItemsSorted(): Promise<ProjectResponseType[]> {
    return await ProjectService.findCarouselItemsSorted();
  }

  /**
   * Busca projetos que possuem um banner definido.
   * @summary Busca projetos com banner.
   */
  @Get("with-banner")
  public async getProjectsWithBanner(): Promise<ProjectResponseType[]> {
    return await ProjectService.findWithBanner();
  }

  /**
   * Busca projetos que possuem uma URL extra definida no carrossel.
   * @summary Busca projetos com URL extra.
   */
  @Get("with-extra-url")
  public async getProjectsWithExtraUrl(): Promise<ProjectResponseType[]> {
    return await ProjectService.findWithExtraUrl();
  }

  /**
   * Busca um projeto único pelo seu slug.
   * @summary Busca um projeto por slug.
   * @param slug O slug único do projeto a ser recuperado.
   */
  @Get("{slug}")
  @Response("404", "Not Found")
  public async getProjectBySlug(@Path() slug: string): Promise<ProjectResponseType> {
    const project = await ProjectService.findBySlug(slug);
    if (!project) {
      this.setStatus(404);
      return { message: "Project not found" } as any;
    }
    return project;
  }

  /**
   * Filtra projetos por uma categoria específica e retorna uma lista paginada.
   * @summary Filtra projetos por categoria (paginado).
   * @param category A categoria para filtrar.
   * @param page O número da página desejada (padrão 1).
   * @param limit O número de itens por página (padrão 9).
   */
  @Get("category/{category}")
  public async getProjectsByCategory(
    @Path() category: string,
    // Captura os parâmetros page e limit da query string (ex: ?page=2&limit=6)
    @Query() page: number = 1,
    @Query() limit: number = 6
  ): Promise<PaginatedProjectsResponse> {
    const result = await ProjectService.findByCategory(category, page, limit);
    return result;
  }


  /**
   * Atualiza os dados de um projeto existente.
   * @summary Atualiza um projeto.
   * @param id O ID do projeto a ser atualizado.
   * @param body Dados parciais do projeto para atualização.
   */
  @Patch("{id}")
  @Response("404", "Not Found")
  public async updateProject(@Path() id: string, @Body() body: UpdateProjectInput): Promise<ProjectResponseType> {
    const updatedProject = await ProjectService.update(id, body);
    if (!updatedProject) {
      this.setStatus(404);
      return { message: "Project not found to update" } as any;
    }
    return updatedProject;
  }

  /**
   * Deleta um projeto permanentemente.
   * @summary Deleta um projeto.
   * @param id O ID do projeto a ser deletado.
   */
  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  @Response("404", "Not Found")
  @Security("jwt")
  public async deleteProject(@Path() id: string): Promise<void> {
    try {
      await ProjectService.delete(id);
      this.setStatus(204);
    } catch (error: any) {
      this.setStatus(404);
      console.error(error);
    }
  }
}