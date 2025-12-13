import { z } from "zod";

// --- SCHEMA PRINCIPAL DO FORMULÁRIO DE PROJETOS ---
export const FormProjectData = z.object({
    _id: z.string().optional(),

    title: z.string().min(1, "O título é obrigatório"),
    subtitle: z.string().optional(),
    slug: z
        .string()
        .min(1, "O slug é obrigatório")
        .regex(/^[a-z0-9-]+$/, "O slug deve conter apenas letras minúsculas, números e hifens."),
    category: z.string().min(1, "A categoria é obrigatória"),

    year: z.preprocess(
        (val) => (val === '' ? undefined : val), 
        z.coerce.number()
            .int("O ano deve ser um número inteiro.")
            .min(1900, "Ano inválido")
    ).refine(val => val !== undefined, { 
        message: "O ano é obrigatório.",
    }),

    // Campos Opcionais
    about_html: z.string().optional(),
    team: z.array(z.string()).optional(),
    status: z.enum(["draft", "published"]),

    isCarousel: z.boolean(),

    orderCarousel: z.preprocess(
        (val) => (val === '' || val === null ? undefined : val), 
        z.coerce.number()
            .int("A ordem deve ser um número inteiro.")
    ).optional(),

    banner: z.string().url("URL do banner inválida").or(z.literal("")).nullable().optional(),
    extraURL: z.string().url("URL extra inválida").or(z.literal("")).optional(),
});

export type ProjectFormData = z.infer<typeof FormProjectData>;