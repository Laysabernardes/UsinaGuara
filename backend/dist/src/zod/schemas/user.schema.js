"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'O nome é obrigatório'),
        email: zod_1.z.string().email('O email é inválido'),
        password: zod_1.z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
        role: zod_1.z.enum(['admin', 'editor']).optional(),
    }),
});
//# sourceMappingURL=user.schema.js.map