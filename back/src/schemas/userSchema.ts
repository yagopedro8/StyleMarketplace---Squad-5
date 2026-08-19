import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(1, "O nome é obrigatório."),
  lastName: z.string().min(1, "O sobrenome é obrigatório."),
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  gender: z.string().optional(),
  phoneNumber: z.string().optional(),
  dateBirth: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();