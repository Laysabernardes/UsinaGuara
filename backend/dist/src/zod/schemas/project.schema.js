"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
/**
 * @const objectIdSchema
 * @description Schema reutilizável para validar strings que se parecem com um ObjectId do MongoDB.
 */
const objectIdSchema = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID");
/**
 * @const projectBodyBaseSchema
 * @description Define a estrutura e as validações base para o corpo (body) de uma requisição de Projeto.
 * É usado como base para os schemas de criação e atualização.
 */
const projectBodyBaseSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "O título é obrigatório" }),
    subtitle: zod_1.z.string().optional(),
    slug: zod_1.z
        .string()
        .min(1, { message: "O slug é obrigatório" })
        .regex(/^[a-z0-9-]+$/),
    category: zod_1.z.string().min(1, { message: "A categoria é obrigatória" }),
    year: zod_1.z.number()
        .int({ message: "O ano deve ser um número inteiro." }),
    about_html: zod_1.z.string().optional(),
    team: zod_1.z.array(objectIdSchema).optional(),
    status: zod_1.z.enum(["draft", "published"]).optional(),
    isCarousel: zod_1.z.boolean().optional(),
    orderCarousel: zod_1.z.number().optional(),
    banner: zod_1.z.string().url({ message: "URL do banner inválida" }).optional(),
    extraURL: zod_1.z.string().url({ message: "URL extra inválida" }).optional(),
});
/**
 * @const createProjectSchema
 * @description Schema para validar a CRIAÇÃO de um novo Projeto.
 * Garante que todos os campos necessários sejam fornecidos.
 * @exports
 */
exports.createProjectSchema = zod_1.z.object({
    body: projectBodyBaseSchema.refine(data => data.category !== undefined, {
        message: "A categoria é obrigatória.",
        path: ["category"],
    }),
});
/**
 * @const updateProjectSchema
 * @description Schema para validar a ATUALIZAÇÃO de um Projeto existente.
 * Utiliza `.partial()` para tornar todos os campos do schema base opcionais,
 * permitindo atualizações parciais.
 * @exports
 */
exports.updateProjectSchema = zod_1.z.object({
    body: projectBodyBaseSchema.partial(),
});
//# sourceMappingURL=project.schema.js.map