"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    // O email é único e sempre convertido para minúsculo para evitar duplicidade 
    // por erro de digitação (ex: Teste@io e teste@io).
    email: { type: String, required: true, unique: true, lowercase: true },
    /**
     * Configurações de segurança da senha:
     * 'select: false' impede que a senha seja retornada em consultas comuns (find/findAll),
     * protegendo o hash de vazamentos acidentais na API.
     */
    password: { type: String, required: true, select: false, minlength: 6 },
    role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
}, { timestamps: true });
/**
 * Middleware 'pre-save': Executado automaticamente antes de salvar no banco.
 * Responsável por realizar o Hash da senha de forma transparente para o desenvolvedor.
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        // Aplica o "Salt" (camada extra de segurança) antes de gerar o Hash
        const salt = await bcrypt_1.default.genSalt(10);
        this.password = await bcrypt_1.default.hash(this.password, salt);
        return next();
    }
    catch (err) {
        return next(err);
    }
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.model.js.map