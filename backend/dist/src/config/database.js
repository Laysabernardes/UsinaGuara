"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Inicializa as variáveis de ambiente do arquivo .env
dotenv_1.default.config();
/**
 * Estabelece a conexão com o banco de dados MongoDB.
 * Caso a conexão falhe ou a URI não esteja definida, a aplicação é encerrada.
 */
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
    // Verifica se a variável de ambiente necessária foi carregada
    if (!MONGO_URI) {
        console.error('ERRO: String de conexão do MongoDB (MONGO_URI) não definida no arquivo .env');
        process.exit(1);
    }
    try {
        // Tenta realizar a conexão usando o Mongoose
        await mongoose_1.default.connect(MONGO_URI);
        // Log de sucesso indicando em qual host a conexão foi estabelecida
    }
    catch (error) {
        // Em caso de erro (ex: senha errada, timeout), exibe o erro e interrompe o processo
        console.error('Erro ao conectar com o MongoDB:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map