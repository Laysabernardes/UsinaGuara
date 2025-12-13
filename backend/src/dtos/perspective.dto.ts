import { PersonResponseType } from "./person.dto";

// --- DEFINIÇÃO DOS TIPOS DE BLOCOS DE CONTEÚDO PARA O DTO ---
// Estas interfaces definem a "forma" dos dados que o frontend receberá.

/**
 * Representa um bloco de texto (parágrafo).
 */
export interface ITextBlock {
  type: 'text';
  content: string;
}

/**
 * Representa um bloco de título (subtítulo).
 */
export interface ITitleBlock {
  type: 'title';
  content: string;
}

/**
 * Representa um bloco de imagem com legenda.
 */
export interface IImageBlock {
  type: 'image';
  imageUrl: string;
  caption: string;
}

/**
 * Representa um bloco de texto em destaque.
 */
export interface IHighlightBlock {
  type: 'highlight';
  content: string;
}

/**
 * Tipo união que representa qualquer um dos blocos de conteúdo possíveis.
 */
export type IContentBlock = ITextBlock | ITitleBlock | IImageBlock | IHighlightBlock;


/**
 * DTO para as referências.
 */
interface IReferenceDTO {
  text: string;
}

interface IProjectDTO {
  _id: string;
  slug: string;
}

/**
 * @interface PerspectiveResponseType
 * @description Define a estrutura de dados de uma "Perspectiva" como ela é enviada
 * pela API para o cliente (frontend).
 */
export interface PerspectiveResponseType {
  _id: string;
  project: IProjectDTO; // O ID do projeto pai
  title: string;
  slug: string;
  order: number;

  /**
   * O corpo do conteúdo, estruturado como um array de blocos.
   */
  contentBlocks: IContentBlock[];

  references: IReferenceDTO[];
  authors: PersonResponseType[];
  banner?: string;

  // Campos do carrossel mantidos como na estrutura atual
  isCarousel?: boolean;
  orderCarousel?: number;
  extraURL?: string;
  
  createdAt: Date;
  updatedAt: Date;
}