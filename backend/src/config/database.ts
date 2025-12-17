import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error('ERRO: String de conexão do MongoDB (MONGO_URI) não definida no arquivo .env');
    process.exit(1); 
  }

  try {
    await mongoose.connect(MONGO_URI)

  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error);
    process.exit(1);
  }
};