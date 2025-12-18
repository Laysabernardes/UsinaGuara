import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Inicializa as variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Estabelece a conexão com o banco de dados MongoDB.
 * Caso a conexão falhe ou a URI não esteja definida, a aplicação é encerrada.
 */
const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  // Verifica se a variável de ambiente necessária foi carregada
  if (!MONGO_URI) {

    console.error('ERRO: String de conexão do MongoDB (MONGO_URI) não definida no arquivo .env');
    process.exit(1);
  }

  try {
    // Tenta realizar a conexão usando o Mongoose
    await mongoose.connect(MONGO_URI)
    // Log de sucesso indicando em qual host a conexão foi estabelecida
  } catch (error) {
    // Em caso de erro (ex: senha errada, timeout), exibe o erro e interrompe o processo
    console.error('Erro ao conectar com o MongoDB:', error);
    process.exit(1);
  }
};