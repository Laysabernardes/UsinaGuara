/**
 * @file perspective.service.ts
 * @description Contém todos os métodos para interagir com a API de Perspectivas.
 */

import api from "../../../lib/api"; // Importa a instância central do Axios (ajuste o caminho se necessário)
import type { PerspectiveRequest, PerspectiveResponseType } from "../components/FormPerspective/perspective.types";

/**
 * @class PerspectiveService
 * @description Classe estática que agrupa as chamadas de API para a entidade 'Perspective'.
 */
export class PerspectiveService {
    /**
     * Busca todas as perspectivas de todos os projetos.
     * @returns {Promise<PerspectiveResponseType[]>} Uma lista de todas as perspectivas.
     */
    static async getAllPerspectives(_token?: string): Promise<PerspectiveResponseType[]> {
        const response = await api.get('/perspectives/');
        return response.data;
    }

    /**
     * Busca uma única perspectiva pelo seu ID.
     * @param {string} id - O ID da perspectiva a ser buscada.
     * @returns {Promise<PerspectiveResponseType>} A perspectiva encontrada.
     */
    static async getById(id: string): Promise<PerspectiveResponseType> {
        const response = await api.get(`/perspectives/${id}`);
        return response.data;
    }

    /**
     * Busca todas as perspectivas associadas a um projeto específico.
     * @param {string} projectId - O ID do projeto para filtrar as perspectivas.
     * @returns {Promise<PerspectiveResponseType[]>} Uma lista de perspectivas do projeto.
     */
    static async getByProjectId(projectId: string): Promise<PerspectiveResponseType[]> {
        // Verifique se a rota no seu backend é esta ou similar
        const response = await api.get(`/perspectives/projects/${projectId}`);
        return response.data;
    }

    /**
   * Busca todas as perspectivas associadas a um projeto específico.
   * @param {string} slug - O slug da perspectiva para filtrar as perspectivas.
   * @returns {Promise<PerspectiveResponseType[]>} Uma lista de perspectivas do projeto.
   */
    static async getBySlug(slug: string): Promise<PerspectiveResponseType> {
        // Verifique se a rota no seu backend é esta ou similar
        const response = await api.get(`/perspectives/slug/${slug}`);
        return response.data;
    }

    /**
     * Cria uma nova perspectiva.
     * @param {PerspectiveRequestType} data - Os dados da perspectiva a ser criada.
     * @returns {Promise<PerspectiveResponseType>} A perspectiva recém-criada.
     */
    static async create(data: PerspectiveRequest): Promise<PerspectiveResponseType> {
        // A rota para criar uma perspectiva depende do ID do projeto
        const response = await api.post(`/perspectives/projects/${data.projectId}`, data);
        return response.data;
    }

    /**
     * Atualiza uma perspectiva existente.
     * @param {string} id - O ID da perspectiva a ser atualizada.
     * @param {Partial<PerspectiveRequestType>} data - Os dados da perspectiva a serem atualizados.
     * @returns {Promise<PerspectiveResponseType>} A perspectiva atualizada.
     */
    static async update(id: string, data: Partial<PerspectiveRequest>): Promise<PerspectiveResponseType> {
        const response = await api.patch(`/perspectives/${id}`, data);
        return response.data;
    }

    /**
     * Deleta uma perspectiva.
     * @param {string} id - O ID da perspectiva a ser deletada.
     * @returns {Promise<void>}
     */
    static async delete(_selectedPerspectiveId: string): Promise<void> {
        await api.delete(`/perspectives/${_selectedPerspectiveId}`);
    }
}