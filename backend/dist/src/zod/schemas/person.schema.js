"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePersonSchema = exports.createPersonSchema = void 0;
const zod_1 = require("zod");
const objectIdSchema = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido');
// Schema para CRIAR uma pessoa
exports.createPersonSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: 'O nome é obrigatório' }),
        kind: zod_1.z.string().min(1, { message: 'O tipo (kind) é obrigatório' }),
        description: zod_1.z.array(zod_1.z.string()).optional(),
        contact: zod_1.z.string().email("Formato de email inválido").optional(),
        imageUrl: zod_1.z.string().url("Formato de URL inválido").optional(),
    }),
});
exports.updatePersonSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        kind: zod_1.z.string().min(1).optional(),
        description: zod_1.z.array(zod_1.z.string()).optional(),
        contact: zod_1.z.string().email("Formato de email inválido").optional(),
        imageUrl: zod_1.z.string().url("Formato de URL inválido").optional(),
    }),
});
//# sourceMappingURL=person.schema.js.map