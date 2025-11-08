// src/services/carousel.service.ts

import api from "../../lib/api"; // Assumindo que seu Axios está em src/lib/api
import type { CarouselResponseType } from "./carousel.types"; // Importa o DTO que acabamos de criar

/**
 * @class CarouselService
 * @description Lida com a busca e gestão da lista centralizada de destaques do carrossel.
 */
export class CarouselService {
    
    /**
     * Busca a lista unificada e ordenada de Projetos e Perspectivas para o carrossel.
     * @returns {Promise<CarouselResponseType[]>} Lista de itens de destaque.
     */
    static async getAllCarouselOrder(): Promise<CarouselResponseType[]> {
        try {
            // Assumindo que sua rota de backend é /carousel/all-order
            const response = await api.get<CarouselResponseType[]>('/carousel'); 
            return response.data;
        } catch (error) {
            console.error("Error fetching carousel data:", error);
            throw new Error("Failed to load carousel items from API.");
        }
    }
    
    static async getAllInactiveCarouselItems(): Promise<CarouselResponseType[]> {
        try {
            // Chamamos a rota de backend para itens inativos
            const response = await api.get<CarouselResponseType[]>('/carousel/inactive'); // Ajuste o endpoint se necessário
            return response.data;
        } catch (error) {
            console.error("Error fetching inactive carousel data:", error);
            throw new Error("Failed to load inactive carousel items from API.");
        }
    }
    // Futuramente, você pode ter um método aqui para atualizar a ordem no backend
}