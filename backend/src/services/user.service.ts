import { z } from 'zod';
import { UserModel, IUser } from '../models/user.model';
import { UserResponseType } from '../dtos/user.dto';
import { createUserSchema } from '../zod/schemas/user.schema';

type CreateUserInput = z.infer<typeof createUserSchema>['body'];
type UpdateUserInput = Partial<CreateUserInput>;

/**
 * Utilitário de mapeamento para transformar o documento do Mongoose no DTO de resposta.
 * Centraliza a lógica de conversão de tipos (ex: ObjectId para string).
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

export class UserService {
  /**
   * Registra um novo usuário e trata erros de duplicidade de banco de dados.
   */
  static async create(input: CreateUserInput): Promise<UserResponseType> {
    try {
      const user = await UserModel.create(input);
      
      return toUserResponse(user);
    } catch (error: any) {
      // Código 11000 indica erro de chave duplicada no MongoDB (campo 'unique')
      if (error.code === 11000 && error.keyPattern?.email) {
        throw new Error('Este email já está em uso.');
      }
      throw error;
    }
  }

  /**
   * Retorna todos os usuários, garantindo que a senha nunca seja incluída.
   */
  static async findAll(): Promise<UserResponseType[]> {
    const users = await UserModel.find().select('-password').lean();
    return users.map(toUserResponse);
  }

  /**
   * Busca um usuário pelo ID.
   */
  static async findById(id: string): Promise<UserResponseType | null> {
    const user = await UserModel.findById(id).select('-password').lean();
    if (!user) return null;
    return toUserResponse(user);
  }

  /**
   * Atualiza dados do usuário e retorna a versão mais recente do documento.
   */
  static async update(id: string, input: UpdateUserInput): Promise<UserResponseType | null> {
    const user = await UserModel.findByIdAndUpdate(id, input, { new: true }).select('-password').lean();
    if (!user) return null;
    return toUserResponse(user);
  }

  /**
   * Remove o usuário permanentemente.
   */
  static async delete(id: string): Promise<void> {
    const result = await UserModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error("Usuário não encontrado para deletar.");
    }
  }
}