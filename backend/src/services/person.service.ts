import { z } from 'zod';
import { PersonModel } from '../models/person.model';
import { PersonResponseType } from '../dtos/person.dto';
import { createPersonSchema, updatePersonSchema } from '../zod/schemas/person.schema';

type CreatePersonInput = z.infer<typeof createPersonSchema>['body'];
type UpdatePersonInput = z.infer<typeof updatePersonSchema>['body'];

/**
 * Service responsável pela lógica de manipulação de dados da entidade Person.
 * Faz a ponte entre o Controller e o Modelo do Banco de Dados.
 */
export class PersonService {
  /**
   * Cria um novo registro de pessoa.
   * @param input Dados validados provenientes do schema Zod.
   */
  static async create(input: CreatePersonInput): Promise<PersonResponseType> {
    const person = await PersonModel.create(input);
    // toObject() converte o documento Mongoose em um objeto JS puro
    return person.toObject() as PersonResponseType;
  }

  /**
   * Retorna uma lista de pessoas, com filtro opcional por categoria (kind).
   * @param kind Categoria para filtragem (opcional).
   */
  static async findAll(kind?: string): Promise<PersonResponseType[]> {
    const filter = kind ? { kind: kind } : {};
    // .lean() aumenta a performance ao retornar objetos JS puros em vez de documentos Mongoose complexos
    const people = await PersonModel.find(filter).lean();
    // Normaliza o _id para string para garantir compatibilidade com o DTO
    return people.map(p => ({ ...p, _id: p._id.toString() })) as PersonResponseType[];
  }

  /**
   * Busca uma pessoa específica pelo ID.
   * @param id Identificador único.
   */
  static async findById(id: string): Promise<PersonResponseType | null> {
    const person = await PersonModel.findById(id).lean();
    if (!person) return null;
    return { ...person, _id: person._id.toString() } as PersonResponseType;
  }

  /**
   * Atualiza os dados de uma pessoa.
   * @param id ID do registro alvo.
   * @param input Dados de atualização.
   */
  static async update(id: string, input: UpdatePersonInput): Promise<PersonResponseType | null> {
    // { new: true } retorna o documento já atualizado após a operação
    const person = await PersonModel.findByIdAndUpdate(id, input, { new: true }).lean();
    if (!person) return null;
    return { ...person, _id: person._id.toString() } as PersonResponseType;
  }

  /**
   * Remove um registro do banco de dados.
   * Lança erro caso o ID não exista.
   */
  static async delete(id: string): Promise<void> {
    const result = await PersonModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error("Pessoa não encontrada para deletar.");
    }
  }
}