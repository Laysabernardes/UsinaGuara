/**
 * @interface PeopleBase
 * @description Define os campos base para uma pessoa.
 */
export interface PeopleBase {
  name: string;
  kind: string;
  description: string[]; // Idealmente, seria string[]
  contact: string;
  imageUrl?: string;
}

/**
 * @interface PeopleRequestType
 * @description Define os dados que o frontend ENVIA para a API ao criar/atualizar uma pessoa.
 * Herda os campos de PeopleBase.
 */
export interface PeopleRequestType extends PeopleBase {
  _id?: string;
}

/**
 * @interface PeopleResponseType
 * @description Define os dados que o frontend RECEBE da API.
 * Herda de PeopleBase e adiciona campos gerados pelo servidor.
 */
export interface PeopleResponseType extends PeopleBase {
  _id: string;
  createdAt: string;
  updatedAt: string;
}