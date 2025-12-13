/**
 * @file project.service.ts
 * @description Contém todos os métodos para interagir com a API de Projetos.
 */

import api from "../../lib/api"; // Importa a instância central do Axios
import type { ProjectRequestType, ProjectResponseType, PaginatedProjectsResponse } from "./project.types";

/**
 * @class ProjectService
 * @description Classe estática que agrupa as chamadas de API para a entidade 'Project'.
 */
export class ProjectService {

  /**
     * Busca projetos paginados, com ou sem filtro de categoria.
     * Esta é a única rota de listagem usada pela página de projetos.
     * @param page O número da página (padrão 1).
     * @param limit O limite de projetos por página (ex: 6).
     * @param category Opcional. A categoria para filtrar. Se for 'Todos', busca a rota geral.
     * @returns {Promise<PaginatedProjectsResponse>} Um objeto com os projetos e o total de páginas.
     */
  static async getProjects(
    page: number,
    limit: number,
    category: string
  ): Promise<PaginatedProjectsResponse> {
    let basePath: string;

    // Determina a base da URL (com ou sem filtro de categoria)
    if (category === 'Todos') {
      basePath = '/projects'; // GET /projects
    } else {
      basePath = `/projects/category/${category}`; // GET /projects/category/Urbanizacao
    }

    // 1. Constrói os Query Parameters de forma segura
    const params = new URLSearchParams({
      page: page.toString(),    // Garante que o número 'page' é uma string na URL
      limit: limit.toString()
    });

    // 2. Monta a URL final: /projects?page=X&limit=Y
    const url = `${basePath}?${params.toString()}`;

    try {
      const response = await api.get<PaginatedProjectsResponse>(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching projects from ${url}:`, error);
      throw new Error("Failed to load projects from API.");
    }
  }
  /**
 * Busca *todos* os projetos, sem paginação, para uso em listagens administrativas.
 * @returns {Promise<ProjectResponseType[]>} Uma lista completa de todos os projetos.
 */
  static async getAllProjects(): Promise<PaginatedProjectsResponse> {
    const response = await api.get('/projects'); 
    return response.data;
  }

  /**
   * Busca um único projeto pelo seu slug.
   * @param {string} slug - O slug do projeto a ser buscado.
   * @returns {Promise<ProjectResponseType>} O projeto encontrado.
   */
  static async getBySlug(slug: string): Promise<ProjectResponseType> {
    const response = await api.get(`/projects/${slug}`);
    return response.data;
  }

  /**
   * Busca todos os projetos que pertencem a uma categoria específica.
   * @param {string} category - A categoria para filtrar.
   * @returns {Promise<ProjectResponseType[]>} Uma lista de projetos da categoria especificada.
   */
  static async getByCategory(category: string): Promise<ProjectResponseType[]> {
    const response = await api.get(`/projects/category/${category}`);
    return response.data;
  }

  /**
   * Cria um novo projeto.
   * @param {ProjectRequestType} data - Os dados do projeto a ser criado.
   * @returns {Promise<ProjectResponseType>} 
   */
  static async create(data: ProjectRequestType): Promise<ProjectResponseType> {
    const response = await api.post('/projects', data);
    return response.data;
  }

  /**
   * Atualiza um projeto existente.
   * @param {string} id - O ID do projeto a ser atualizado.
   * @param {Partial<ProjectRequestType>} data - Os dados do projeto a serem atualizados.
   * @returns {Promise<ProjectResponseType>} O projeto atualizado.
   */
  static async update(id: string, data: Partial<ProjectRequestType>): Promise<ProjectResponseType> {
    const response = await api.patch(`/projects/${id}`, data);
    return response.data;
  }

  /**
   * Deleta um projeto.
   * @param {string} id - O ID do projeto a ser deletado.
   * @returns {Promise<void>}
   */
  static async delete(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }
}