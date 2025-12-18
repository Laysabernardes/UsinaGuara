import { Request } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Extensão da interface Request padrão do Express.
 * Permite anexar os dados do usuário autenticado ao objeto da requisição,
 * tornando-os acessíveis dentro dos Controllers.
 */
export interface IRequestWithUser extends Request {
  user?: {
    id: string;
    role: 'admin' | 'editor';
  };
}

/**
 * Handler de autenticação utilizado pelo TSOA.
 * Esta função intercepta rotas marcadas com @Security("jwt").
 */
export function expressAuthentication(
  request: IRequestWithUser,
  securityName: string,
  scopes?: string[]
): Promise<any> {
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
      jwt.verify(token, secret, (err: any, decoded: any) => {
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