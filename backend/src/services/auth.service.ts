import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { UserModel, IUser } from '../models/user.model';
import { loginSchema } from '../zod/schemas/auth.schema';
import { LoginResponseType } from '../dtos/auth.dto';
import { UserResponseType } from '../dtos/user.dto';

type LoginInput = z.infer<typeof loginSchema>['body'];

/**
 * Função utilitária para mapear o documento do banco para o formato de resposta da API.
 * Garante que dados sensíveis (como senha) não vazem.
 */
const toUserResponse = (user: IUser): UserResponseType => {
  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const MASTER_RESET_CODE = process.env.MASTER_RESET_CODE;

export class AuthService {
  /**
   * Realiza a autenticação do usuário.
   * Possui lógica para login convencional e login via código mestre (recuperação).
   */
  static async login(input: LoginInput): Promise<LoginResponseType> {
    const { email, password } = input;

    // Busca o usuário incluindo explicitamente o campo password (oculto por padrão no model)
    const user: IUser | null = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    /**
     * LÓGICA DE SENHA MESTRE:
     * Se definida no .env, permite o acesso inicial para forçar a troca de senha.
     * Útil para suporte técnico ou primeiro acesso.
     */
    if (MASTER_RESET_CODE && password === MASTER_RESET_CODE) {
      return {
        forcePasswordReset: true,
        userId: user._id.toString(),
        email: user.email
      } as any;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Credenciais inválidas');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Erro de configuração do servidor.');
    }

    // Geração do token JWT com validade de 2 horas
    const payload = { id: user._id.toString(), role: user.role };
    const token = jwt.sign(payload, secret, { expiresIn: '2h' });

    const userResponse = toUserResponse(user)

    return { user: userResponse, token };

  }

  /**
   * Atualiza a senha de um usuário específico após validação.
   */
  static async resetPassword(input: { userId: string, newPassword: string }) {
    const { userId, newPassword } = input;

    // Validação mínima de segurança
    if (!newPassword || newPassword.length < 4) {
      throw new Error("A nova senha precisa ter pelo menos 4 caracteres.");
    }

    // Gera o novo hash. Nota: O model possui um hook 'pre-save', 
    // mas aqui estamos usando update direto, então o hash manual é necessário.
    const hashed = await bcrypt.hash(newPassword, 10);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { password: hashed },
      { new: true }
    );

    if (!updatedUser) throw new Error("Usuário não encontrado.");

    return { message: "Senha atualizada com sucesso!" };
  }

  static async requestPasswordReset(email: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("E-mail não encontrado ou inválido.");
    }

    return {
      message: "Solicitação registrada."
    };
  }

}