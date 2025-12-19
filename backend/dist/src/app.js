"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const tsoa_1 = require("tsoa");
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const database_1 = require("./config/database");
// @ts-ignore
const routes_1 = require("../dist/routes");
/**
 * Função principal que inicializa a infraestrutura, middlewares e rotas.
 */
const startServer = async () => {
    // Conexão com o Banco de Dados (deve ocorrer antes de subir o servidor)
    await (0, database_1.connectDB)();
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 3000;
    // --- MIDDLEWARES GLOBAIS ---
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json()); // Permite o processamento de JSON no corpo das requisições
    app.use((0, cors_1.default)({
        origin: '*', // Permite acesso de qualquer lugar (ideal para o momento de desenvolvimento/voluntariado)
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    /**
     * Configuração dinâmica da Documentação Swagger.
     * Consome o swagger.json gerado pelo TSOA.
     */
    app.use('/api-docs', swagger_ui_express_1.default.serve, async (req, res) => {
        try {
            const swaggerDocument = await Promise.resolve().then(() => __importStar(require('../dist/swagger.json')));
            const swaggerOptions = {
                ...swaggerDocument,
                info: {
                    ...swaggerDocument.info,
                    description: `
API REST robusta para gerenciamento de conteúdo e infraestrutura digital da Usina Guará.

**Desenvolvido por:**
* [Laysa Bernardes](https://github.com/Laysabernardes) (Backend, Database Architecture & Infra)
* [Lucas Lopes](https://github.com/LucasLoopsT) (Frontend & UX)
          `,
                },
                servers: [
                    {
                        url: 'http://localhost:3000',
                        description: 'Servidor Local (Desenvolvimento)'
                    },
                    {
                        url: 'https://site-v5hr.onrender.com',
                        description: 'Servidor de Produção (Render)'
                    }
                ]
            };
            res.send(swagger_ui_express_1.default.generateHTML(swaggerOptions));
        }
        catch (error) {
            res.status(404).send("Documentação não encontrada.");
        }
    });
    // Registra as rotas geradas automaticamente pelo TSOA
    (0, routes_1.RegisterRoutes)(app);
    /**
     * --- MIDDLEWARE DE TRATAMENTO DE ERROS ---
     * Captura exceções lançadas nos Services e Controllers.
     * Centraliza o formato de erro enviado ao cliente.
     */
    app.use(function errorHandler(err, req, res, next) {
        // Erros de validação do Zod (camada de Request Body)
        if (err instanceof zod_1.ZodError) {
            return res.status(422).json({
                message: "Validation Failed",
                errors: err.flatten(),
            });
        }
        // Erros de validação nativos do TSOA (parâmetros de rota, query, etc)
        if (err instanceof tsoa_1.ValidateError) {
            return res.status(422).json({
                message: "Validation Failed",
                details: err?.fields,
            });
        }
        // Tratamento de erros genéricos e regras de negócio
        if (err.status) {
            return res.status(err.status).json({
                message: err.message || "Unauthorized",
            });
        }
        // --- server.ts ---
        // ... dentro do app.use(function errorHandler ...)
        // 4. Tratamento de erros genéricos e Regras de Negócio
        if (err instanceof Error) {
            // Log apenas para o desenvolvedor ver no terminal
            console.error("LOG SERVIDOR:", err.message);
            // LISTA DE PALAVRAS-CHAVE: Se a mensagem tiver algo disso, é erro do usuário (409)
            const businessErrors = [
                "já está em uso",
                "duplicado",
                "já existe",
                "não encontrado",
                "inválido"
            ];
            // Verifica se a mensagem do erro contém alguma das palavras acima
            const isUserError = businessErrors.some(keyword => err.message.toLowerCase().includes(keyword.toLowerCase()));
            if (isUserError) {
                return res.status(409).json({
                    message: err.message
                });
            }
            // Se for um erro técnico real (banco caiu, código errado), aí sim 500
            return res.status(500).json({
                message: "Internal Server Error",
                details: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
        next();
    });
    // --- INICIALIZAÇÃO DO SERVIDOR ---
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Documentação do Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
};
startServer();
//# sourceMappingURL=app.js.map