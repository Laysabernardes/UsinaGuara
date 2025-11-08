/**
 * Este arquivo define o schema do Mongoose e o modelo de dados para a entidade 'Perspective'.
 * Uma 'Perspectiva' representa uma seção de conteúdo detalhado dentro de um 'Projeto', funcionando
 * como um capítulo, um artigo aprofundado ou uma análise específica sobre o tema do projeto.
 */

import { Schema, model, Document } from "mongoose";
import { IPerson } from "./person.model";
import { ICarousel, carouselSchema } from "./carousel.model";

/**
 * Define a estrutura de uma referência bibliográfica ou fonte,
 * que é armazenada como um sub-documento dentro de uma Perspectiva.
 * @exports
 * @interface IReference
 */
export interface IReference {
  text: string;
}

// --- DEFINIÇÃO DOS BLOCOS DE CONTEÚDO ---

/**
 * Define a estrutura para um bloco de texto (parágrafo).
 * @exports
 * @interface ITextBlock
 */
export interface ITextBlock {
  type: 'text';
  content: string;
}

/**
 * Define a estrutura para um bloco de título (subtítulo).
 * @exports
 * @interface ITitleBlock
 */
export interface ITitleBlock {
  type: 'title';
  content: string;
}

/**
 * Define a estrutura para um bloco de imagem com legenda.
 * @exports
 * @interface IImageBlock
 */
export interface IImageBlock {
  type: 'image';
  imageUrl: string;
  caption: string;
}

/**
 * Define a estrutura para um bloco de texto em destaque (citação).
 * @exports
 * @interface IHighlightBlock
 */
export interface IHighlightBlock {
  type: 'highlight';
  content: string;
}

/**
 * Um tipo união que representa qualquer um dos blocos de conteúdo possíveis.
 * @exports
 * @type IContentBlock
 */
export type IContentBlock = ITextBlock | ITitleBlock | IImageBlock | IHighlightBlock;

/**
 * Interface que representa o documento de uma 'Perspectiva' no MongoDB.
 * @exports
 * @interface IPerspective
 * @extends {Document}
 */
export interface IPerspective extends Document {
  /**
   * Chave estrangeira que conecta esta perspectiva ao seu 'Projeto' pai.
   * @type {Schema.Types.ObjectId}
   */
  projectId: Schema.Types.ObjectId;

  /**
   * O título principal da perspectiva.
   * @type {string}
   */
  title: string;

  /**
   * Versão do título otimizada para uso em URLs (ex: 'revitalizacao-da-vila-operaria').
   * Deve ser único para garantir que cada perspectiva tenha uma URL exclusiva.
   * @type {string}
   */
  slug: string;

  /**
   * Número que define a ordem de exibição das perspectivas dentro de um mesmo projeto.
   * @type {number}
   */
  order: number;

  /**
   * Array de blocos de conteúdo que formam o corpo da perspectiva.
   * Esta abordagem permite uma renderização flexível e ordenada de diferentes tipos de conteúdo.
   * @type {IContentBlock[]}
   */
  contentBlocks: IContentBlock[];

  /**
   * Array de sub-documentos contendo as referências ou fontes citadas na perspectiva.
   * @type {IReference[]}
   */
  references: IReference[];

  /**
   * Array de ObjectIds que referenciam a coleção 'Person', estabelecendo a autoria.
   * @type {(IPerson["_id"] | IPerson)[]}
   */
  authors: (IPerson["_id"] | IPerson)[];

  /**
   * Um carrossel de imagens opcional, embarcado como um sub-documento.
   * Pode ser usado para um destaque visual específico.
   * @type {ICarousel}
   * @optional
   */
  perspective_carousel?: ICarousel;

  /**
   * URL da imagem principal (banner) que representa a perspectiva.
   * @type {string}
   */
  banner: string;

  // ======================================================================
  // CAMPOS DO CARROSSEL 
  // ======================================================================
  
  /** Indica se deve ser exibida no carrossel de destaque. */
  isCarousel?: boolean; 
  
  /** Ordem de exibição no carrossel. */
  orderCarousel?: number;
  
  /** URL extra para o carrossel (se necessário). */
  extraURL?: string; 

  /**
   * Data de criação do documento, gerenciada automaticamente pelo Mongoose via `timestamps`.
   * @type {Date}
   */
  createdAt: Date;

  /**
   * Data da última atualização do documento, gerenciada automaticamente pelo Mongoose via `timestamps`.
   * @type {Date}
   */
  updatedAt: Date;
}

/**
 * Schema do Mongoose que define a estrutura, validações e índices para os documentos
 * da coleção 'perspectives'. Esta é a planta baixa de como os dados de uma Perspectiva
 * são armazenados no MongoDB.
 */
const perspectiveSchema = new Schema<IPerspective>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true, // Otimiza buscas que filtram por projeto.
    },

    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, required: true },

    contentBlocks: [
      new Schema({
        type: {
          type: String,
          required: true,
          enum: ['text', 'title', 'image', 'highlight'], // Garante a integridade dos tipos de bloco.
        },
        content: { type: String, required: false },
        imageUrl: { type: String, required: false },
        caption: { type: String, required: false },
      }, { _id: false }) // Evita a criação de IDs para os sub-documentos de bloco.
    ],

    references: [new Schema<IReference>({ text: String }, { _id: false })],
    authors: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    perspective_carousel: {
      type: carouselSchema,
      required: false,
    },
    isCarousel: { type: Boolean, default: false }, 
    orderCarousel: { type: Number, required: false },
    extraURL: { type: String, required: false }, 
    banner: { type: String },
  },
  { timestamps: true } // Adiciona e gerencia 'createdAt' e 'updatedAt' automaticamente.
);

/** Cria um índice composto que garante que a combinação de 'projectId' e 'order'
 * seja única. Isso impede que duas perspectivas dentro do mesmo projeto
 * tenham o mesmo número de ordem.
 */
perspectiveSchema.index({ projectId: 1, order: 1 }, { unique: true });


/**
 * O modelo Mongoose compilado para a entidade 'Perspective'.
 * É através deste objeto que a aplicação realizará todas as operações de CRUD
 * (Create, Read, Update, Delete) na coleção 'perspectives' do MongoDB.
 * @exports PerspectiveModel
 */
export const PerspectiveModel = model<IPerspective>(
  "Perspective",
  perspectiveSchema
);