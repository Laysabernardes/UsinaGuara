import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import cors from 'cors'; 
import { ZodError } from "zod";

import { connectDB } from './config/database';
// @ts-ignore
import { RegisterRoutes } from '../dist/routes'; 

/**
 * Função principal que inicializa a infraestrutura, middlewares e rotas.
 */
const startServer = async () => {
  // Conexão com o Banco de Dados (deve ocorrer antes de subir o servidor)
  await connectDB();

  const app = express();
  const PORT = process.env.PORT || 3000;

  // --- MIDDLEWARES GLOBAIS ---
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // Permite o processamento de JSON no corpo das requisições
  app.use(cors());         // Habilita CORS para permitir requisições de diferentes origens

  /**
   * Configuração dinâmica da Documentação Swagger.
   * Consome o swagger.json gerado pelo TSOA.
   */
  app.use('/api-docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    try {
      const swaggerDocument = await import('../dist/swagger.json');
      res.send(swaggerUi.generateHTML(swaggerDocument));
    } catch (error) {
      res.status(404).send("Documentação não encontrada. Execute 'npm run dev' para gerar.");
    }
  });
  
  // Registra as rotas geradas automaticamente pelo TSOA
  RegisterRoutes(app);

  /**
   * --- MIDDLEWARE DE TRATAMENTO DE ERROS ---
   * Captura exceções lançadas nos Services e Controllers.
   * Centraliza o formato de erro enviado ao cliente.
   */
  app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
  ): ExResponse | void {
    // Erros de validação do Zod (camada de Request Body)
    if (err instanceof ZodError) {
      return res.status(422).json({
        message: "Validation Failed",
        errors: err.flatten(),
      });
    }
    // Erros de validação nativos do TSOA (parâmetros de rota, query, etc)
    if (err instanceof ValidateError) {
      return res.status(422).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    // Tratamento de erros genéricos e regras de negócio
    if (err instanceof Error) {
      console.error("ERRO CAPTURADO PELO SERVIDOR:", err);

      // Tratamento específico para conflitos de banco (ex: slugs duplicados)
      if (err.message === 'Este slug já está em uso.') {
          return res.status(409).json({ message: err.message });
      }
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    next();
  } as ErrorRequestHandler);

  // --- INICIALIZAÇÃO DO SERVIDOR ---
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação do Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
};

startServer();