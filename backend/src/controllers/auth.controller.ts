import { Body, Controller, Post, Route, Tags, Response } from 'tsoa';
import { z } from 'zod';

import { AuthService } from '../services/auth.service';
import { LoginResponseType } from '../dtos/auth.dto';
import { loginSchema, RequestPasswordResetSchema, ResetPasswordSchema } from '../zod/schemas/auth.schema';

type LoginInput = z.infer<typeof loginSchema>['body'];
type RequestResetInput = z.infer<typeof RequestPasswordResetSchema>['body'];
type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>['body'];

@Route("auth")
@Tags("Authentication")
export class AuthController extends Controller {

  /**
   * Autentica um usuário e retorna um token de acesso.
   * @param body Objeto contendo as credenciais (email e password)
   */
  @Post("/login")
  @Response(401, "Unauthorized - Credenciais inválidas")
  public async login(@Body() body: LoginInput): Promise<LoginResponseType> {
    try {
      const result = await AuthService.login(body);
      this.setStatus(200);
      return result;
    } catch (error: any) {
      this.setStatus(401);
      return { message: error.message } as any;
    }
  }

  /**
   * Inicia o fluxo de recuperação de senha enviando um e-mail com instruções/token.
   * @param body Objeto contendo o e-mail do usuário
   */
  @Post("/request-password-reset")
  @Response(404, "E-mail não encontrado")
  public async requestPasswordReset(@Body() body: RequestResetInput): Promise<{ message: string }> {
    try {
      const result = await AuthService.requestPasswordReset(body.email);
      this.setStatus(200);
      return result;
    } catch (error: any) {
      this.setStatus(400);
      return { message: error.message };
    }
  }

  /**
   * Define uma nova senha para o usuário utilizando o codigo padrao
   * @param body Objeto contendo o token e a nova senha
   */
  @Post("/reset-password")
  public async resetPassword(@Body() body: ResetPasswordInput) {
    try {
      const result = await AuthService.resetPassword(body);
      this.setStatus(200);
      return result;
    } catch (error: any) {
      this.setStatus(400);
      return { message: error.message };
    }
  }
}