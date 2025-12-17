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