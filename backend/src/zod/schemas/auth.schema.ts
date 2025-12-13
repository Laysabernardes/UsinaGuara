import { z } from 'zod'

// Schema de login
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('O formato do email é inválido'),
    password: z.string().min(1, 'A senha é obrigatória'),
  }),
});

// Schema para o envio do email para recuperação de senha
export const RequestPasswordResetSchema = z.object({
  body: z.object({
    email: z.string().email("E-mail inválido"), 
  }),
});

// Schema para validar a nova senha durante o reset
export const ResetPasswordSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "ID obrigatório"),
    newPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"), 
  }),
});