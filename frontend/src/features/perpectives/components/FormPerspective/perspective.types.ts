import type { PeopleResponseType } from "../../../people/people.types";
import type { ProjectResponseType } from "../../../projects/project.types";


// --- TIPOS DOS BLOCOS DE CONTEÚDO ---
export interface ITextBlock { type: 'text'; content: string; }
export interface ITitleBlock { type: 'title'; content: string }
export interface IImageBlock { type: 'image'; imageUrl: string; caption?: string; }
export interface IHighlightBlock { type: 'highlight'; content: string; }
export type IContentBlock = ITextBlock | ITitleBlock | IImageBlock | IHighlightBlock;


/**
 * @interface PerspectiveRequest
 * @description Dados enviados para a API ao criar/atualizar uma Perspectiva.
 * OS NOMES DOS CAMPOS AGORA BATEM COM O BACKEND E COM O ZOD SCHEMA.
 */
export interface PerspectiveRequest {
  _id?: string;
  project: { _id: string; slug: string };
  title: string;
  slug: string;
  order: number;
  contentBlocks?: IContentBlock[];
  references?: { text: string }[];
  authors?: string[];
  banner?: string;
  isCarousel?: boolean;
  orderCarousel?: number;
  extraURL?: string;
}


/**
 * @interface PerspectiveResponseType
 * @description Dados recebidos da API ao buscar uma Perspectiva.
 * OS NOMES DOS CAMPOS AGORA BATEM COM O BACKEND E COM O ZOD SCHEMA.
 */
export interface PerspectiveResponseType {
  _id: string;
  project: { _id: string; slug: string };
  title: string;
  slug: string;
  order: number;
  contentBlocks: IContentBlock[];
  references: { text: string }[];
  authors: PeopleResponseType[];
  banner?: string;
  isCarousel?: boolean;
  orderCarousel?: number;
  extraURL?: string;
  createdAt: Date;
  updatedAt: Date;
}