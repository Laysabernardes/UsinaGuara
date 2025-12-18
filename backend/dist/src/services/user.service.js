"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
/**
 * Utilitário de mapeamento para transformar o documento do Mongoose no DTO de resposta.
 * Centraliza a lógica de conversão de tipos (ex: ObjectId para string).
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
class UserService {
    /**
     * Registra um novo usuário e trata erros de duplicidade de banco de dados.
     */
    static async create(input) {
        try {
            const user = await user_model_1.UserModel.create(input);
            return toUserResponse(user);
        }
        catch (error) {
            // Código 11000 indica erro de chave duplicada no MongoDB (campo 'unique')
            if (error.code === 11000 && error.keyPattern?.email) {
                throw new Error('Este email já está em uso.');
            }
            throw error;
        }
    }
    /**
     * Retorna todos os usuários, garantindo que a senha nunca seja incluída.
     */
    static async findAll() {
        const users = await user_model_1.UserModel.find().select('-password').lean();
        return users.map(toUserResponse);
    }
    /**
     * Busca um usuário pelo ID.
     */
    static async findById(id) {
        const user = await user_model_1.UserModel.findById(id).select('-password').lean();
        if (!user)
            return null;
        return toUserResponse(user);
    }
    /**
     * Atualiza dados do usuário e retorna a versão mais recente do documento.
     */
    static async update(id, input) {
        const user = await user_model_1.UserModel.findByIdAndUpdate(id, input, { new: true }).select('-password').lean();
        if (!user)
            return null;
        return toUserResponse(user);
    }
    /**
     * Remove o usuário permanentemente.
     */
    static async delete(id) {
        const result = await user_model_1.UserModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error("Usuário não encontrado para deletar.");
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map