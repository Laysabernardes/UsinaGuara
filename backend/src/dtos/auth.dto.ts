import { UserResponseType } from "./user.dto";

/**
 * Representa a estrutura de resposta enviada ao cliente após uma autenticação bem-sucedida.
 */
export interface LoginResponseType {
  /** * Dados do perfil do usuário autenticado (geralmente omitindo a senha por segurança).
   */
  user: UserResponseType; 
  /** * Token de acesso (geralmente JWT) que deve ser enviado nas próximas requisições 
   * dentro do header 'Authorization: Bearer <token>'.
   */
  token: string;
}