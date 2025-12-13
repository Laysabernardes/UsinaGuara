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

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedCarouselResponse {
  items: CarouselResponseType[];
  meta: PaginationMeta;
}
