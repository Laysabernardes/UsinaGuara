"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselService = void 0;
const project_service_1 = require("./project.service");
const perspective_service_1 = require("./perspective.service");
/**
 * Service responsável por consolidar e organizar itens de diferentes coleções
 * (Projetos e Perspectivas) para exibição em carrosséis.
 */
class CarouselService {
    /**
     * Retorna itens ativos no carrossel com paginação manual.
     * Como os dados vêm de coleções diferentes, a paginação é feita em memória após a união.
     */
    static async getAllCarouselOrder(page, limit) {
        // 1. Busca paralela para otimizar o tempo de resposta do servidor
        const [allProjects, allPerspectives] = await Promise.all([
            project_service_1.ProjectService.findAll(),
            perspective_service_1.PerspectiveService.findAll(),
        ]);
        let response = [];
        // 2. Mapeamento e Normalização de Projetos
        const projectItems = allProjects
            .filter((p) => p.isCarousel === true) // Apenas itens marcados para exibição
            .map((p) => ({
            _id: p._id,
            title: p.title,
            slug: p.slug,
            collection_type: "project",
            banner: p.banner,
            isCarousel: p.isCarousel,
            orderCarousel: p.orderCarousel,
            extraURL: p.extraURL,
        }));
        // 3. Mapeamento de Perspectivas
        const perspectiveItems = allPerspectives
            .filter((p) => p.isCarousel === true)
            .map((p) => ({
            _id: p._id,
            title: p.title,
            slug: p.slug,
            collection_type: "perspective",
            banner: p.banner,
            isCarousel: p.isCarousel,
            orderCarousel: p.orderCarousel,
            extraURL: p.extraURL,
        }));
        // 4. União e Ordenação Global por 'orderCarousel'
        const orderedItems = [...projectItems, ...perspectiveItems].sort((a, b) => (a.orderCarousel ?? 0) - (b.orderCarousel ?? 0));
        // 5. Lógica de Paginação em Memória
        const total = orderedItems.length;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const end = start + limit;
        return {
            items: orderedItems.slice(start, end),
            meta: {
                page,
                limit,
                total,
                totalPages,
            },
        };
    }
    /**
     * Versão simplificada que retorna todos os itens ativos sem paginação (limit 999).
     */
    static async getAllCarouselFlat() {
        const result = await this.getAllCarouselOrder(1, 999);
        return result.items;
    }
    /**
     * Retorna itens que NÃO estão no carrossel.
     * Útil para o painel administrativo listar o que pode ser ativado.
     */
    static async getAllInactiveCarouselItems() {
        const [allProjects, allPerspectives] = await Promise.all([
            project_service_1.ProjectService.findAll(),
            perspective_service_1.PerspectiveService.findAll(),
        ]);
        let response = [];
        // Filtra itens onde isCarousel é false, null ou undefined
        const projectItems = allProjects
            // FILTRO INVERTIDO: isCarousel não é estritamente TRUE. 
            // Inclui false, null ou undefined.
            .filter((p) => p.isCarousel !== true)
            .map((p) => ({
            _id: p._id,
            title: p.title,
            slug: p.slug,
            collection_type: "project",
            banner: p.banner,
            isCarousel: p.isCarousel, // Será false/undefined
            orderCarousel: p.orderCarousel, // Será null/undefined
            extraURL: p.extraURL,
        }));
        const perspectiveItems = allPerspectives
            .filter((p) => p.isCarousel !== true)
            .map((p) => ({
            _id: p._id,
            title: p.title,
            slug: p.slug,
            collection_type: "perspective",
            banner: p.banner,
            isCarousel: p.isCarousel, // Será false/undefined
            orderCarousel: p.orderCarousel, // Será null/undefined
            extraURL: p.extraURL,
        }));
        response = [...projectItems, ...perspectiveItems];
        // Ordenação alfabética para facilitar a localização visual no admin
        response.sort((a, b) => a.title.localeCompare(b.title));
        return response;
    }
    /**
     * Retorna todos os itens disponíveis, ativos ou não.
     * Usado para gerenciar a biblioteca completa de candidatos ao carrossel.
     */
    static async getAllCarouselCandidates() {
        // 1. Buscando todos os dados
        const [allProjects, allPerspectives] = await Promise.all([
            // Assumindo que findAll() retorna todos os documentos (sem filtro de isCarousel)
            project_service_1.ProjectService.findAll(),
            perspective_service_1.PerspectiveService.findAll(),
        ]);
        let response = [];
        // 2. Mapeamento de Projetos (Sem Filtro)
        const projectItems = allProjects
            .map((p) => ({
            _id: p._id,
            title: p.title,
            slug: p.slug,
            collection_type: "project",
            banner: p.banner,
            isCarousel: p.isCarousel, // Valor pode ser true/false/undefined
            orderCarousel: p.orderCarousel, // Valor pode ser number/null/undefined
            extraURL: p.extraURL,
        }));
        // 3. Mapeamento de Perspectivas (Sem Filtro)
        const perspectiveItems = allPerspectives
            .map((p) => ({
            _id: p._id,
            title: p.title,
            slug: p.slug,
            collection_type: "perspective",
            banner: p.banner,
            isCarousel: p.isCarousel,
            orderCarousel: p.orderCarousel,
            extraURL: p.extraURL,
        }));
        // 4. Combina os resultados
        response = [...projectItems, ...perspectiveItems];
        // Ordena por título para facilitar a UX de adição
        response.sort((a, b) => a.title.localeCompare(b.title));
        return response;
    }
}
exports.CarouselService = CarouselService;
//# sourceMappingURL=carousel.service.js.map