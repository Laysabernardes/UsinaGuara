import { CarouselResponseType } from "../dtos/carousel.dto";
import { ProjectService } from "./project.service";
import { PerspectiveService } from "./perspective.service";

export class CarouselService {
    static async getAllCarouselOrder(): Promise<CarouselResponseType[]> {

        // 1. Buscando todos os dados
        const [allProjects, allPerspectives] = await Promise.all([
            ProjectService.findAll(),
            PerspectiveService.findAll(),
        ]);

        let response: CarouselResponseType[] = [];

        // 2. Mapeamento de Projetos
        const projectItems = allProjects
            .filter((p) => p.isCarousel === true) // Filtra apenas carrosséis
            .map((p) => ({ // Mapeia para o tipo CarouselResponseType
                _id: p._id,
                title: p.title,
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
                collection_type: "perspective" as const,
                banner: p.banner,
                isCarousel: p.isCarousel,
                orderCarousel: p.orderCarousel,
                extraURL: p.extraURL,
            }));

        // 4. Combina e ordena os resultados
        response = [...projectItems, ...perspectiveItems];

        // 5. Ordena pelo campo orderCarousel (Crescente: 1, 2, 3...)
        response.sort((a, b) => (a.orderCarousel ?? 0) - (b.orderCarousel ?? 0));

        return response;
    }

    static async getAllInactiveCarouselItems(): Promise<CarouselResponseType[]> {

        // 1. Buscando todos os dados
        const [allProjects, allPerspectives] = await Promise.all([
            ProjectService.findAll(),
            PerspectiveService.findAll(),
        ]);

        let response: CarouselResponseType[] = [];

        // 2. Mapeamento de Projetos (Filtra ITENS INATIVOS)
        const projectItems = allProjects
            // FILTRO INVERTIDO: isCarousel não é estritamente TRUE. 
            // Inclui false, null ou undefined.
            .filter((p) => p.isCarousel !== true)
            .map((p) => ({
                _id: p._id,
                title: p.title,
                collection_type: "project" as const,
                banner: p.banner,
                isCarousel: p.isCarousel, // Será false/undefined
                orderCarousel: p.orderCarousel, // Será null/undefined
                extraURL: p.extraURL,
            }));

        // 3. Mapeamento de Perspectivas (Filtra ITENS INATIVOS)
        const perspectiveItems = allPerspectives
            // FILTRO INVERTIDO: isCarousel não é estritamente TRUE.
            .filter((p) => p.isCarousel !== true)
            .map((p) => ({
                _id: p._id,
                title: p.title,
                collection_type: "perspective" as const,
                banner: p.banner,
                isCarousel: p.isCarousel, // Será false/undefined
                orderCarousel: p.orderCarousel, // Será null/undefined
                extraURL: p.extraURL,
            }));

        // 4. Combina os resultados (Não precisa de ordenação complexa, mas podemos ordenar por título)
        response = [...projectItems, ...perspectiveItems];

        // Ordena por título para facilitar a UX do dropdown no front
        response.sort((a, b) => a.title.localeCompare(b.title));

        return response;
    }

    /**
     * NOVO: Busca TODOS os itens que são CANDIDATOS ao carrossel (ativos e inativos),
     * sem filtro de status (isCarousel).
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

    

}