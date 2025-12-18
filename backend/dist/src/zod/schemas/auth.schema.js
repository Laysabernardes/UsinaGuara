"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = exports.RequestPasswordResetSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
// Schema de login
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('O formato do email é inválido'),
        password: zod_1.z.string().min(1, 'A senha é obrigatória'),
    }),
});
// Schema para o envio do email para recuperação de senha
exports.RequestPasswordResetSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("E-mail inválido"),
    }),
});
// Schema para validar a nova senha durante o reset
exports.ResetPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, "ID obrigatório"),
        newPassword: zod_1.z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    }),
});
//# sourceMappingURL=auth.schema.js.map