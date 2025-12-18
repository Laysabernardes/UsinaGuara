"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePerspectiveSchema = exports.createPerspectiveSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema reutilizável para validar strings que representam um ObjectId do MongoDB.
 */
const objectIdSchema = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido");
// --- DEFINIÇÃO DOS SCHEMAS PARA BLOCOS DE CONTEÚDO ---
const textBlockSchema = zod_1.z.object({
    type: zod_1.z.literal("text"),
    content: zod_1.z.string().min(1, { message: "O conteúdo do texto é obrigatório." }),
});
const titleBlockSchema = zod_1.z.object({
    type: zod_1.z.literal("title"),
    content: zod_1.z.string().min(1, { message: "O conteúdo do título é obrigatório." }),
});
const imageBlockSchema = zod_1.z.object({
    type: zod_1.z.literal("image"),
    imageUrl: zod_1.z.string().url({ message: "URL da imagem inválida." }),
    caption: zod_1.z.string().optional().default(""),
});
const highlightBlockSchema = zod_1.z.object({
    type: zod_1.z.literal("highlight"),
    content: zod_1.z.string().min(1, { message: "O conteúdo de destaque é obrigatório." }),
});
/**
 * Schema principal para os blocos de conteúdo.
 * Usa z.union para validar que o objeto corresponde a um dos schemas de bloco definidos.
 */
const contentBlockSchema = zod_1.z.union([
    textBlockSchema,
    titleBlockSchema,
    imageBlockSchema,
    highlightBlockSchema,
]);
/**
 * Schema para a CRIAÇÃO de uma nova Perspectiva.
 */
exports.createPerspectiveSchema = zod_1.z.object({
    body: zod_1.z.object({
        // Campos obrigatórios na criação
        projectId: objectIdSchema,
        title: zod_1.z.string().min(1, { message: "O título é obrigatório" }),
        slug: zod_1.z.string().min(1, { message: "O slug é obrigatório" }),
        order: zod_1.z.number().min(1, { message: "A ordem é obrigatório" }),
        // Campos opcionais
        contentBlocks: zod_1.z.array(contentBlockSchema).optional(),
        references: zod_1.z.array(zod_1.z.object({ text: zod_1.z.string() })).optional(),
        authors: zod_1.z.array(objectIdSchema).optional(),
        banner: zod_1.z.string().url({ message: "URL do banner inválida" }).optional(),
        // --- CAMPOS DO CARROSSEL 
        isCarousel: zod_1.z.boolean().optional(),
        orderCarousel: zod_1.z.number().optional(),
        extraURL: zod_1.z.string().url({ message: "URL extra inválida" }).optional(),
    }),
});
/**
 * Schema para a ATUALIZAÇÃO de uma Perspectiva existente.
 */
exports.updatePerspectiveSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).optional(),
        slug: zod_1.z.string().min(1).optional(),
        contentBlocks: zod_1.z.array(contentBlockSchema).optional(), // Estrutura nova e correta
        order: zod_1.z.number().min(1).optional(),
        references: zod_1.z.array(zod_1.z.object({ text: zod_1.z.string() })).optional(),
        authors: zod_1.z.array(objectIdSchema).optional(),
        banner: zod_1.z.string().url({ message: "URL do banner inválida" }).optional(),
        // --- CAMPOS DO CARROSSEL (COMO ESTÁ HOJE) ---
        isCarousel: zod_1.z.boolean().optional(),
        orderCarousel: zod_1.z.number().optional(),
        extraURL: zod_1.z.string().url({ message: "URL extra inválida" }).optional(),
    }),
});
//# sourceMappingURL=perspective.schema.js.map