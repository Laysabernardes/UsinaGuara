"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = expressAuthentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Handler de autenticação utilizado pelo TSOA.
 * Esta função intercepta rotas marcadas com @Security("jwt").
 */
function expressAuthentication(request, securityName, scopes) {
    if (securityName === 'jwt') {
        return new Promise((resolve, reject) => {
            // 1. Extração do Header Authorization
            const authHeader = request.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return reject(new Error('Nenhum token fornecido ou formato inválido.'));
            }
            const token = authHeader.split(' ')[1];
            // 2. Validação da Variável de Ambiente
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                return reject(new Error('Erro de configuração do servidor: chave JWT não definida.'));
            }
            // 3. Verificação do Token
            jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
                if (err) {
                    return reject(new Error('Token inválido ou expirado.'));
                }
                // 4. Injeção de Contexto
                // Preenche o request.user para que o Controller saiba QUEM está fazendo a chamada
                request.user = {
                    id: decoded.id,
                    role: decoded.role,
                };
                resolve(decoded);
            });
        });
    }
    return Promise.reject(new Error(`Tipo de segurança não suportado: ${securityName}`));
}
//# sourceMappingURL=auth.middleware.js.map