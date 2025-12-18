"use strict";
/**
 * Este arquivo define o schema do Mongoose e o modelo de dados para a entidade 'Perspective'.
 * Uma 'Perspectiva' representa uma seção de conteúdo detalhado dentro de um 'Projeto', funcionando
 * como um capítulo, um artigo aprofundado ou uma análise específica sobre o tema do projeto.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerspectiveModel = void 0;
const mongoose_1 = require("mongoose");
const carousel_model_1 = require("./carousel.model");
/**
 * Schema do Mongoose que define a estrutura, validações e índices para os documentos
 * da coleção 'perspectives'. Esta é a planta baixa de como os dados de uma Perspectiva
 * são armazenados no MongoDB.
 */
const perspectiveSchema = new mongoose_1.Schema({
    projectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
        index: true, // Otimiza buscas que filtram por projeto.
    },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, required: true },
    contentBlocks: [
        new mongoose_1.Schema({
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
    references: [new mongoose_1.Schema({ text: String }, { _id: false })],
    authors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Person" }],
    perspective_carousel: {
        type: carousel_model_1.carouselSchema,
        required: false,
    },
    isCarousel: { type: Boolean, default: false },
    orderCarousel: { type: Number, required: false },
    extraURL: { type: String, required: false },
    banner: { type: String },
}, { timestamps: true } // Adiciona e gerencia 'createdAt' e 'updatedAt' automaticamente.
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
exports.PerspectiveModel = (0, mongoose_1.model)("Perspective", perspectiveSchema);
//# sourceMappingURL=perspective.model.js.map