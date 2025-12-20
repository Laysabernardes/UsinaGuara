// src/features/projects/project.schema.ts (CÓDIGO FINAL CORRIGIDO)

import { z } from "zod";

// --- SCHEMA PRINCIPAL DO FORMULÁRIO DE PROJETOS ---
export const FormProjectData = z.object({
    // Campos de Identificação/Controle
    _id: z.string().optional(),

    // Campos Principais
    title: z.string().min(1, "O título é obrigatório"),
    subtitle: z.string().optional(),
    slug: z
        .string()
        .min(1, "O slug é obrigatório")
        .regex(/^[a-z0-9-]+$/, "O slug deve conter apenas letras minúsculas, números e hifens."),
    category: z.string().min(1, "A categoria é obrigatória"),

    // =========================================================================
    // CORREÇÃO 1: 'year' (Removido pipe, usado refine para obrigatório)
    // =========================================================================
    year: z.preprocess(
        (val) => (val === '' ? undefined : val), // Trata string vazia
        z.coerce.number()
            .int("O ano deve ser um número inteiro.")
            .min(1900, "Ano inválido")
    ).refine(val => val !== undefined, { // <--- Garante que não é undefined (é obrigatório)
        message: "O ano é obrigatório.",
    }), // O tipo final é 'number' se passar na validação

    // Campos Opcionais
    about_html: z.string().optional(),
    team: z.array(z.string()).optional(),
    status: z.enum(["draft", "published"]),

    // Campos de Apresentação
    isCarousel: z.boolean(),

    // =========================================================================
    // CORREÇÃO 2: 'orderCarousel' (Tratamento para opcional)
    // =========================================================================
    orderCarousel: z.preprocess(
        (val) => (val === '' || val === null ? undefined : val), // Trata null ou string vazia
        z.coerce.number()
            .int("A ordem deve ser um número inteiro.")
    ).optional(), // <--- Garante o tipo number | undefined

   // ... restante do seu código

    banner: z
        .string()
        .trim()
        .optional()
        .or(z.literal(""))
        .nullable(),

    extraURL: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),
});

export type ProjectFormData = z.infer<typeof FormProjectData>;