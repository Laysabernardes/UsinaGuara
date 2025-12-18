import { Schema, model, Document, Types} from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Interface que representa o documento de Usuário.
 * Inclui o controle de acesso por 'role' (RBAC - Role-Based Access Control).
 */
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  // O email é único e sempre convertido para minúsculo para evitar duplicidade 
  // por erro de digitação (ex: Teste@io e teste@io).
  email: { type: String, required: true, unique: true, lowercase: true },
  /**
   * Configurações de segurança da senha:
   * 'select: false' impede que a senha seja retornada em consultas comuns (find/findAll),
   * protegendo o hash de vazamentos acidentais na API.
   */
  password: { type: String, required: true, select: false , minlength: 6 },
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
}, { timestamps: true });

/**
 * Middleware 'pre-save': Executado automaticamente antes de salvar no banco.
 * Responsável por realizar o Hash da senha de forma transparente para o desenvolvedor.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); 
  }
  try {
    // Aplica o "Salt" (camada extra de segurança) antes de gerar o Hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err as Error);
  }
});

export const UserModel = model<IUser>('User', userSchema);