import { z } from "zod";

export const userSchema = z.object({
    name: z
        .string()
        .min(2, "O nome deve ter pelo menos 2 caracteres")
        .max(188, "Não pode ter nomes com mais de 188 caracteres"),

    email: z
        .email("Formato de e-mail inválido")
        .max(249, "Não pode ter e-mails com mais de 249 caracteres"),

    password: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .max(60, "A senha é muito longa")
});
