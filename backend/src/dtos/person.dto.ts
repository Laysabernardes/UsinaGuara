/**
 * Representa a estrutura de dados de uma pessoa (colaborador, escrito etc.) 
 * retornada pela API.
 */
export interface PersonResponseType {
  _id: string; // Identificador único gerado pelo MongoDB
  name: string; // Nome completo da pessoa
  kind: string; // Tipo da pessoa (colaborador, escrito etc.)
  description: string[]; // Descrição da pessoa
  contact?: string; // Contato da pessoa
  imageUrl?: string; // URL da imagem da pessoa
  createdAt: Date; 
  updatedAt: Date;
}