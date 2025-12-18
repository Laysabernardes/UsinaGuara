"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonService = void 0;
const person_model_1 = require("../models/person.model");
/**
 * Service responsável pela lógica de manipulação de dados da entidade Person.
 * Faz a ponte entre o Controller e o Modelo do Banco de Dados.
 */
class PersonService {
    /**
     * Cria um novo registro de pessoa.
     * @param input Dados validados provenientes do schema Zod.
     */
    static async create(input) {
        const person = await person_model_1.PersonModel.create(input);
        // toObject() converte o documento Mongoose em um objeto JS puro
        return person.toObject();
    }
    /**
     * Retorna uma lista de pessoas, com filtro opcional por categoria (kind).
     * @param kind Categoria para filtragem (opcional).
     */
    static async findAll(kind) {
        const filter = kind ? { kind: kind } : {};
        // .lean() aumenta a performance ao retornar objetos JS puros em vez de documentos Mongoose complexos
        const people = await person_model_1.PersonModel.find(filter).lean();
        // Normaliza o _id para string para garantir compatibilidade com o DTO
        return people.map(p => ({ ...p, _id: p._id.toString() }));
    }
    /**
     * Busca uma pessoa específica pelo ID.
     * @param id Identificador único.
     */
    static async findById(id) {
        const person = await person_model_1.PersonModel.findById(id).lean();
        if (!person)
            return null;
        return { ...person, _id: person._id.toString() };
    }
    /**
     * Atualiza os dados de uma pessoa.
     * @param id ID do registro alvo.
     * @param input Dados de atualização.
     */
    static async update(id, input) {
        // { new: true } retorna o documento já atualizado após a operação
        const person = await person_model_1.PersonModel.findByIdAndUpdate(id, input, { new: true }).lean();
        if (!person)
            return null;
        return { ...person, _id: person._id.toString() };
    }
    /**
     * Remove um registro do banco de dados.
     * Lança erro caso o ID não exista.
     */
    static async delete(id) {
        const result = await person_model_1.PersonModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error("Pessoa não encontrada para deletar.");
        }
    }
}
exports.PersonService = PersonService;
//# sourceMappingURL=person.service.js.map