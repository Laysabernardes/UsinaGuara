/**
 * Representa um item individual dentro do carrossel.
 * Esta interface é usada tanto para a exibição simplificada quanto para a paginada.
 */
export interface CarouselResponseType {
  _id: string; // Identificador único do MongoDB
  title: string;
  slug: string; // Identificador amigável para URL (Ex: "projeto-residencial-x")
  /**
   * Define a origem do conteúdo:
   * 'project': Referencia um projeto .
   * 'perspective': Referencia uma perspectiva.
   */
  collection_type: "project" | "perspective";
  banner?: string; // URL da imagem de alta resolução do banner
  isCarousel?: boolean; // Flag que indica se o item deve estar visível no carrossel ativo
  orderCarousel?: number; // Posição numérica para ordenação (Menor para maior)
  extraURL?: string; // Link extra destinado para uma foto de banner personalizada
}

/**
 * Metadados para controle de navegação em listas extensas.
 */
export interface PaginationMeta {
  page: number; // Página atual da consulta
  limit: number; // Quantidade de itens solicitados por página
  total: number; // Total absoluto de itens existentes no banco de dados
  totalPages: number; // Quantidade total de páginas disponíveis (calculado: total/limit)
}

/**
 * Resposta padrão para endpoints de listagem que utilizam paginação.
 */
export interface PaginatedCarouselResponse {
  items: CarouselResponseType[]; // Array de itens do carrossel encontrados na página atual
  meta: PaginationMeta; // Objeto com informações de suporte para componentes de paginação no frontend
}