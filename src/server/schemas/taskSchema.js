import { z } from "zod";

export const taskSchema = z.object({
    id: z.number().int().positive(),
    content: z.string().max(30, "O conteudo não pode passar de 30 caracters"),
    checked: z.boolean()
})

export const updateTaskSchema = z.object({
    content: z.string().max(30, "O conteudo não pode passar de 30 caracters"),
    checked: z.boolean()
})