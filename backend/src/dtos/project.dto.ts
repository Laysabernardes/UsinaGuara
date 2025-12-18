import { PersonResponseType } from "./person.dto";

/**
 * @interface ProjectResponseType
 * @description Define a estrutura de dados de um "Projeto" como ela é enviada
 * pela API para o cliente (frontend).
 * @exports
 */
export interface ProjectResponseType {
  /**
   * O identificador único do projeto no banco de dados.
   * @type {string}
   */
  _id: string;

  title: string; // Título principal do projeto
  subtitle: string; // Subtítulo do projeto
  slug: string; // Identificador amigável para URL (Ex: "projeto-residencial-x")
  category: string; // Categoria do projeto (Ex: URBANIZAÇÃO | SUSTENTABILIDADE | HABITAÇÃO SOCIAL | ARTE COMUNITÁRIA | ARQUITETURA | GERAL )
  year: number; // Ano de conclusão ou início do projeto
  about_html: string; // Descrição detalhada do projeto em formato HTML
  team: PersonResponseType[];
  status: "draft" | "published";
  /**
   * Flag booleana que indica se o projeto deve aparecer no carrossel principal.
   * @type {boolean}
   * @optional
   */
  isCarousel?: boolean;
  /**
   * O número que define a ordem de exibição do projeto no carrossel.
   * @type {number}
   * @optional
   */
  orderCarousel?: number;
  /**
   * A URL da imagem principal (banner) do projeto.
   * @type {string}
   * @optional
   */
  banner?: string;
  /**
   * Uma URL adicional que pode ser usada para um link específico no carrossel.
   * @type {string}
   * @optional
   */
  extraURL?: string;
  createdAt: Date;
  updatedAt: Date;
}