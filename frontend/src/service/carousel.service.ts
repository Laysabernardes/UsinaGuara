import api from "../lib/api";

export interface CarouselResponseType {
  _id: string;
  title: string;
  slug: string;
  collection_type: "project" | "perspective";
  banner?: string;
  isCarousel?: boolean;
  orderCarousel?: number;
  extraURL?: string;
}

export const CarouselService = {
  getAllCarouselOrder: async (): Promise<CarouselResponseType[]> => {
    const response = await api.get<CarouselResponseType[]>("/carousel");
    return response.data;
  },
};
