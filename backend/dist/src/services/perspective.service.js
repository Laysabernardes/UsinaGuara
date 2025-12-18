"use strict";
/**
 * @file perspective.service.ts
 * @description Este arquivo contém a classe PerspectiveService, que encapsula toda a lógica de negócio
 * e interação com o banco de dados para a entidade 'Perspective'.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerspectiveService = void 0;
const perspective_model_1 = require("../models/perspective.model");
/**
 * Transforma um documento Mongoose 'Perspective' em um objeto de resposta DTO.
 * Converte ObjectIds em strings para ser amigável ao cliente (JSON).
 * @param {IPerspective} perspective - O documento Mongoose retornado do banco de dados.
 * @returns {PerspectiveResponseType} - O objeto formatado para a resposta da API.
 */
const toPerspectiveResponse = (perspective) => {
    return {
        _id: perspective._id.toString(),
        title: perspective.title,
        slug: perspective.slug,
        order: perspective.order,
        project: {
            _id: perspective.projectId._id.toString(),
            slug: perspective.projectId.slug,
        },
        contentBlocks: perspective.contentBlocks ?? [],
        references: perspective.references ?? [],
        authors: perspective.authors ?? [],
        banner: perspective.banner,
        isCarousel: perspective.isCarousel,
        orderCarousel: perspective.orderCarousel,
        extraURL: perspective.extraURL,
        createdAt: perspective.createdAt,
        updatedAt: perspective.updatedAt,
    };
};
/**
 * @class PerspectiveService
 * @description Classe estática que agrupa os métodos para manipular as 'Perspectives'.
 */
class PerspectiveService {
    /**
     * Cria uma nova perspectiva no banco de dados.
     * @param {CreatePerspectiveInput} input - Os dados da nova perspectiva, validados pelo Zod schema.
     * @returns {Promise<PerspectiveResponseType>} A perspectiva recém-criada.
     * @throws {Error} Lança um erro
     */
    static async create(input) {
        try {
            const perspective = await perspective_model_1.PerspectiveModel.create(input);
            await perspective.populate([{ path: "authors", model: "Person" }, { path: "projectId", select: "slug" },]);
            return toPerspectiveResponse(perspective.toObject());
        }
        catch (error) {
            if (error.code === 11000 && error.keyPattern?.slug) {
                throw new Error("Este slug de perspectiva já está em uso.");
            }
            if (error.code === 11000 && error.keyPattern?.projectId && error.keyPattern?.order) {
                throw new Error("Este número de ordem já está em uso para este projeto.");
            }
            throw error;
        }
    }
    /**
     * Busca todas as perspectivas do banco de dados.
     * @returns {Promise<PerspectiveResponseType[]>} Um array com todas as perspectivas.
     */
    static async findAll() {
        const perspectives = await perspective_model_1.PerspectiveModel.find()
            .populate({
            path: "projectId",
            select: "slug",
        })
            .populate("authors")
            .lean();
        return perspectives.map(toPerspectiveResponse);
    }
    /**
     * Busca todas as perspectivas associadas a um ID de projeto específico.
     * @param {string} projectId - O ID do projeto pai.
     * @returns {Promise<PerspectiveResponseType[]>} Um array com as perspectivas encontradas.
     */
    static async findByProjectId(projectId) {
        const perspectives = await perspective_model_1.PerspectiveModel.find({ projectId })
            .populate({
            path: "projectId",
            select: "slug",
        })
            .populate("authors")
            .lean();
        return perspectives.map(toPerspectiveResponse);
    }
    /**
     * Busca uma única perspectiva pelo seu ID.
     * @param {string} id - O ID da perspectiva a ser encontrada.
     * @returns {Promise<PerspectiveResponseType | null>} A perspectiva encontrada ou nulo se não existir.
     */
    static async findById(id) {
        const perspective = await perspective_model_1.PerspectiveModel.findById(id)
            .populate({
            path: "projectId",
            select: "slug",
        })
            .populate("authors")
            .lean();
        if (!perspective)
            return null;
        return toPerspectiveResponse(perspective);
    }
    /**
     * Busca uma perspectiva única pelo seu slug.
     * @param {string} slug O slug da perspectiva.
     * @returns {Promise<PerspectiveResponseType | null>} A perspectiva encontrada ou nulo.
     */
    static async findBySlug(slug) {
        const perspective = await perspective_model_1.PerspectiveModel.findOne({ slug })
            .populate({
            path: "projectId",
            select: "slug",
        })
            .populate("authors")
            .lean();
        if (!perspective)
            return null;
        return toPerspectiveResponse(perspective);
    }
    /**
     * Atualiza uma perspectiva existente pelo seu ID.
     * @param {string} id - O ID da perspectiva a ser atualizada.
     * @param {UpdatePerspectiveInput} input - Os novos dados para a perspectiva.
     * @returns {Promise<PerspectiveResponseType | null>} A perspectiva atualizada ou nulo se não for encontrada.
     */
    // perspective.service.ts (No Backend)
    static async checkIfOrderExists(order, currentId) {
        const perspective = await perspective_model_1.PerspectiveModel.findOne({
            orderCarousel: order,
            _id: { $ne: currentId }, // Exclui o documento que estamos atualizando
            isCarousel: true, // Opcional, mas mais preciso: só checa se o item está ativo
        }).lean();
        return !!perspective; // Retorna true se um documento for encontrado, false caso contrário
    }
    static async update(id, 
    // Note que UpdatePerspectiveInput deve ser tipado como parcial (Partial<T>)
    input) {
        // 1. Defina a constante de dados que será enviada ao Mongoose
        const dataForDatabase = { ...input };
        // 2. VALIDAÇÃO DE ORDEM (Prevenção de Ordem Duplicada)
        if (input.isCarousel && input.orderCarousel !== undefined && input.orderCarousel !== null) {
            const orderExists = await PerspectiveService.checkIfOrderExists(input.orderCarousel, id);
            if (orderExists) {
                throw new Error(`A ordem ${input.orderCarousel} já está em uso por outra perspectiva.`);
            }
        }
        // 3. EXECUÇÃO DO UPDATE (O Mongoose faz o PATCH por padrão)
        const perspective = await perspective_model_1.PerspectiveModel.findByIdAndUpdate(id, dataForDatabase, {
            new: true,
            runValidators: true,
        })
            .populate("authors")
            .lean();
        if (!perspective)
            return null;
        return toPerspectiveResponse(perspective);
    }
    /**
     * Deleta uma perspectiva pelo seu ID.
     * @param {string} id - O ID da perspectiva a ser deletada.
     * @returns {Promise<void>}
     * @throws {Error} Lança um erro se nenhuma perspectiva com o ID fornecido for encontrada.
     */
    static async delete(id) {
        const result = await perspective_model_1.PerspectiveModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error("Perspectiva não encontrada para deletar.");
        }
    }
}
exports.PerspectiveService = PerspectiveService;
//# sourceMappingURL=perspective.service.js.map