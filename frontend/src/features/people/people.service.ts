/**
 * @file people.service.ts
 * @description Contém todos os métodos para interagir com a API de Pessoas.
 */

import api from "../../lib/api"; 
import type { PeopleRequestType, PeopleResponseType } from "./people.types";

/**
 * @class PeopleService
 * @description Classe estática que agrupa as chamadas de API para a entidade 'People'.
 */
export class PeopleService {

  /**
   * Busca todas as pessoas (para selects, formulários, listagens administrativas).
   * @returns {Promise<PeopleResponseType[]>}
   */
  static async getAllPeople(token?: string): Promise<PeopleResponseType[]> {
    try {
      const response = await api.get("/people", {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
      throw new Error("Failed to load people from API.");
    }
  }

  /**
   * Busca uma pessoa pelo seu ID.
   * @param {string} id - O ID da pessoa.
   * @returns {Promise<PeopleResponseType>}
   */
  static async getById(id: string): Promise<PeopleResponseType> {
    const response = await api.get(`/people/${id}`);
    return response.data;
  }

  /**
   * Cria uma nova pessoa.
   * @param {PeopleRequestType} data - Os dados da pessoa a ser criada.
   * @returns {Promise<PeopleResponseType>}
   */
  static async create(data: PeopleRequestType): Promise<PeopleResponseType> {
    const response = await api.post("/people", data);
    return response.data;
  }

  /**
   * Atualiza uma pessoa existente.
   * @param {string} id - O ID da pessoa a ser atualizada.
   * @param {Partial<PeopleRequestType>} data - Os dados atualizados.
   * @returns {Promise<PeopleResponseType>}
   */
  static async update(id: string, data: Partial<PeopleRequestType>): Promise<PeopleResponseType> {
    const response = await api.put(`/people/${id}`, data);
    return response.data;
  }

  /**
   * Deleta uma pessoa.
   * @param {string} id - O ID da pessoa a ser deletada.
   * @returns {Promise<void>}
   */
  static async delete(id: string): Promise<void> {
    await api.delete(`/people/${id}`);
  }
}
