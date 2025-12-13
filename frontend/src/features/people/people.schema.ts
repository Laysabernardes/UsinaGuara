import { z } from "zod";

// =============================================================
// SCHEMA PRINCIPAL DO FORMULÁRIO DE PESSOAS
// =============================================================
export const FormPeopleData = z.object({
    _id: z.string().optional(),

    name: z
        .string()
        .min(1, "O nome é obrigatório"),

    kind: z
        .string()
        .min(1, "O tipo é obrigatório"),

    // description é um array de strings
    description: z
        .array(z.string().min(1, "Descrição inválida"))
        .min(1, "A descrição é obrigatória"),

    contact: z
        .string()
        .min(1, "O contato é obrigatório"),

    imageUrl: z
        .string()
        .url("A URL da imagem é inválida")
        .or(z.literal("")) // permite string vazia
        .optional(),       
});

// Tipagem automática
export type PeopleFormData = z.infer<typeof FormPeopleData>;
