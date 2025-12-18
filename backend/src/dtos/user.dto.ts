export interface UserResponseType {
  _id: string; // Identificador único do usuário
  name: string; // Nome completo do usuário
  email: string; // Endereço de e-mail do usuário
  role: 'admin' | 'editor'; // Papel do usuário no sistema
  createdAt: Date;
  updatedAt: Date;
}