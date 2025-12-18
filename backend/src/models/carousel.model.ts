import { Schema } from "mongoose";

// Interface que define a estrutura do sub-objeto Carousel
export interface ICarousel {
  orderCarousel: number; // Posição numérica para ordenação (Menor para maior)
  extraURL?: string; // Link extra destinado para uma foto de banner personalizada
}

// Interface que define a estrutura do documento Carousel completo
export const carouselSchema = new Schema<ICarousel>(
  {
    orderCarousel: { type: Number, required: true, default: 0 },
    extraURL: { type: String, required: false },
  },
  {
    _id: false, // para não criar um _id para o sub-objeto
  }
);
