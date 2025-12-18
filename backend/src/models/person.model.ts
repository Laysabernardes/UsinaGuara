import { Schema, model, Document } from 'mongoose';

// Interface que define a estrutura do documento Person
export interface IPerson extends Document {
  name: string; // Nome completo da pessoa
  kind: string; // Ex: "Membro da Equipe", "Colaborador", "Autor"
  description: string[]; // Pode conter múltiplas descrições ou parágrafos 
  contact?: string; // Informações de contato opcionais
  imageUrl?: string; // URL da imagem da pessoa
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Definição do Schema do Mongoose.
 * Este objeto determina como os dados serão validados e armazenados no MongoDB.
 */
const personSchema = new Schema<IPerson>({
  name: { 
    type: String, 
    required: true
  },
  kind: { 
    type: String, 
    required: true 
  },
  description: { 
    type: [String],
    default: [] 
  },
  contact: { 
    type: String 
  },
  imageUrl: { 
    type: String 
  }
}, {
  timestamps: true 
});

export const PersonModel = model<IPerson>('Person', personSchema);