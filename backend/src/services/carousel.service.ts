import { CarouselResponseType, PaginatedCarouselResponse } from "../dtos/carousel.dto";
import { ProjectService } from "./project.service";
import { PerspectiveService } from "./perspective.service";

/**
 * Service responsável por consolidar e organizar itens de diferentes coleções 
 * (Projetos e Perspectivas) para exibição em carrosséis.
 */
export class CarouselService {
    /**
     * Retorna itens ativos no carrossel com paginação manual.
     * Como os dados vêm de coleções diferentes, a paginação é feita em memória após a união.
     */
    static async getAllCarouselOrder(page: number, limit: number): Promise<PaginatedCarouselResponse> {

        // 1. Busca paralela para otimizar o tempo de resposta do servidor
        const [allProjects, allPerspectives] = await Promise.all([
            ProjectService.findAll(),
            PerspectiveService.findAll(),
        ]);

        let response: CarouselResponseType[] = [];

        // 2. Mapeamento e Normalização de Projetos
        const projectItems = allProjects
            .filter((p) => p.isCarousel === true) // Apenas itens marcados para exibição
            .map((p) => ({ // Mapeia para o tipo CarouselResponseType
                _id: p._id,
                title: p.title,
                slug: p.slug,
                collection_type: "project" as const,
                banner: p.banner,
                isCarousel: p.isCarousel,
                orderCarousel: p.orderCarousel,
                extraURL: p.extraURL,
            }));

        // 3. Mapeamento de Perspectivas
        const perspectiveItems = allPerspectives
            .filter((p) => p.isCarousel === true)
            .map((p) => ({ // Mapeia para o tipo CarouselResponseType
                _id: p._id,
                title: p.title,
                slug: p.slug,
                collection_type: "perspective" as const,
                banner: p.banner,
                isCarousel: p.isCarousel,
                orderCarousel: p.orderCarousel,
                extraURL: p.extraURL,
            }));

        // 4. União e Ordenação Global por 'orderCarousel'
        const orderedItems = [...projectItems, ...perspectiveItems].sort(
            (a, b) => (a.orderCarousel ?? 0) - (b.orderCarousel ?? 0)
        );

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
    static async getAllCarouselFlat(): Promise<CarouselResponseType[]> {
        const result = await this.getAllCarouselOrder(1, 999);
        return result.items;
    }

    /**
     * Retorna itens que NÃO estão no carrossel.
     * Útil para o painel administrativo listar o que pode ser ativado.
     */
    static async getAllInactiveCarouselItems(): Promise<CarouselResponseType[]> {

        const [allProjects, allPerspectives] = await Promise.all([
            ProjectService.findAll(),
            PerspectiveService.findAll(),
        ]);

        let response: CarouselResponseType[] = [];

        // Filtra itens onde isCarousel é false, null ou undefined
        const projectItems = allProjects
            // FILTRO INVERTIDO: isCarousel não é estritamente TRUE. 
            // Inclui false, null ou undefined.
            .filter((p) => p.isCarousel !== true)
            .map((p) => ({
                _id: p._id,
                title: p.title,
                slug: p.slug,
                collection_type: "project" as const,
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
                collection_type: "perspective" as const,
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
    static async getAllCarouselCandidates(): Promise<CarouselResponseType[]> {

        // 1. Buscando todos os dados
        const [allProjects, allPerspectives] = await Promise.all([
            // Assumindo que findAll() retorna todos os documentos (sem filtro de isCarousel)
            ProjectService.findAll(),
            PerspectiveService.findAll(),
        ]);

        let response: CarouselResponseType[] = [];

        // 2. Mapeamento de Projetos (Sem Filtro)
        const projectItems = allProjects
            .map((p) => ({
                _id: p._id,
                title: p.title,
                slug: p.slug,
                collection_type: "project" as const,
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
                collection_type: "perspective" as const,
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

    /**
     * Retorna todos os itens públicos elegíveis ao carrossel.
     * Apenas projetos publicados e perspectivas vinculadas a esses projetos.
     * Usado para exibição pública do carrossel.
     */
    static async getAllCarouselCandidatesPublic(): Promise<CarouselResponseType[]> {

        // 1. Busca todos os projetos e perspectivas
        const [allProjects, allPerspectives] = await Promise.all([
            ProjectService.findAll(),
            PerspectiveService.findAll(),
        ]);

        // 2. Filtra apenas projetos publicados e marcados para o carrossel
        const publicProjectsCarousel = allProjects.filter(
            p => p.isCarousel === true && p.status === 'published'
        );

        // 3. Filtra perspectivas marcadas para o carrossel
        const perspectivesCarousel = allPerspectives.filter(
            p => p.isCarousel === true
        );

        // 4. Mantém apenas perspectivas que pertencem a projetos publicados
        const perspectiveCarouselPublic: any[] = [];

        perspectivesCarousel.forEach(pers => {
            publicProjectsCarousel.forEach(proj => {
                if (proj._id === pers.project._id) {
                    perspectiveCarouselPublic.push(pers);
                }
            });
        });

        let response: CarouselResponseType[] = [];

        // 5. Mapeia os projetos para o formato de resposta do carrossel
        const projectItems = publicProjectsCarousel.map((p) => ({
            _id: p._id,
            title: p.title,
            slug: p.slug,
            collection_type: "project" as const,
            banner: p.banner,
            isCarousel: p.isCarousel,
            orderCarousel: p.orderCarousel,
            extraURL: p.extraURL,
        }));

        // 6. Mapeia as perspectivas para o formato de resposta do carrossel
        const perspectiveItems = perspectiveCarouselPublic.map((p) => ({
            _id: p._id,
            title: p.title,
            slug: p.slug,
            collection_type: "perspective" as const,
            banner: p.banner,
            isCarousel: p.isCarousel,
            orderCarousel: p.orderCarousel,
            extraURL: p.extraURL,
        }));

        // 7. Combina projetos e perspectivas em um único array
        response = [...projectItems, ...perspectiveItems];

        // 8. Ordena alfabeticamente pelo título para melhor experiência no frontend
        response.sort((a, b) => {
            const orderA = a.orderCarousel ?? Number.MAX_SAFE_INTEGER;
            const orderB = b.orderCarousel ?? Number.MAX_SAFE_INTEGER;
            return orderA - orderB;
        });
        
        return response;
    }
}