"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
/**
 * Função utilitária para mapear o documento do banco para o formato de resposta da API.
 * Garante que dados sensíveis (como senha) não vazem.
 */
const toUserResponse = (user) => {
    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
const MASTER_RESET_CODE = process.env.MASTER_RESET_CODE;
class AuthService {
    /**
     * Realiza a autenticação do usuário.
     * Possui lógica para login convencional e login via código mestre (recuperação).
     */
    static async login(input) {
        const { email, password } = input;
        // Busca o usuário incluindo explicitamente o campo password (oculto por padrão no model)
        const user = await user_model_1.UserModel.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('Credenciais inválidas');
        }
        /**
         * LÓGICA DE SENHA MESTRE:
         * Se definida no .env, permite o acesso inicial para forçar a troca de senha.
         * Útil para suporte técnico ou primeiro acesso.
         */
        if (MASTER_RESET_CODE && password === MASTER_RESET_CODE) {
            return {
                forcePasswordReset: true,
                userId: user._id.toString(),
                email: user.email
            };
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Credenciais inválidas');
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('Erro de configuração do servidor.');
        }
        // Geração do token JWT com validade de 2 horas
        const payload = { id: user._id.toString(), role: user.role };
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '2h' });
        const userResponse = toUserResponse(user);
        return { user: userResponse, token };
    }
    /**
     * Atualiza a senha de um usuário específico após validação.
     */
    static async resetPassword(input) {
        const { userId, newPassword } = input;
        // Validação mínima de segurança
        if (!newPassword || newPassword.length < 4) {
            throw new Error("A nova senha precisa ter pelo menos 4 caracteres.");
        }
        // Gera o novo hash. Nota: O model possui um hook 'pre-save', 
        // mas aqui estamos usando update direto, então o hash manual é necessário.
        const hashed = await bcrypt_1.default.hash(newPassword, 10);
        const updatedUser = await user_model_1.UserModel.findByIdAndUpdate(userId, { password: hashed }, { new: true });
        if (!updatedUser)
            throw new Error("Usuário não encontrado.");
        return { message: "Senha atualizada com sucesso!" };
    }
    static async requestPasswordReset(email) {
        const user = await user_model_1.UserModel.findOne({ email });
        if (!user) {
            throw new Error("E-mail não encontrado ou inválido.");
        }
        return {
            message: "Solicitação registrada."
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map