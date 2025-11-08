// src/dtos/carousel.types.ts

/**
 * @type CollectionType
 * @description Tipos literais de coleções que podem aparecer no carrossel.
 */
export type CollectionType = "project" | "perspective";

/**
 * @interface CarouselResponseType
 * @description Define a estrutura unificada de um item retornado pelo CarouselService.
 * @exports
 */
export interface CarouselResponseType {
    _id: string;
    title: string;
    collection_type: CollectionType; // Garante o tipo 'project' | 'perspective'
    banner?: string;
    isCarousel?: boolean;
    orderCarousel?: number;
    extraURL?: string;
}