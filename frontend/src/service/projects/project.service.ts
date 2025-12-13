import api from "../../lib/api";
import type { ProjectRequestType, ProjectResponseType, PaginatedProjectsResponse } from "./project.types";

export class ProjectService {

  static async getProjects(page: number, limit: number, category: string): Promise<PaginatedProjectsResponse> {
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

  static async getAllProjects(page?: number, limit?: number): Promise<PaginatedProjectsResponse> {
    const response = await api.get('/projects', {params: { page, limit }});
    return response.data;
  }

  static async getBySlug(slug: string): Promise<ProjectResponseType> {
    const response = await api.get(`/projects/${slug}`);
    return response.data;
  }

  static async getByCategory(category: string): Promise<ProjectResponseType[]> {
    const response = await api.get(`/projects/category/${category}`);
    return response.data;
  }

  static async create(data: ProjectRequestType): Promise<ProjectResponseType> {
    const response = await api.post('/projects', data);
    return response.data;
  }

  static async update(id: string, data: Partial<ProjectRequestType>): Promise<ProjectResponseType> {
    const response = await api.patch(`/projects/${id}`, data);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }
}