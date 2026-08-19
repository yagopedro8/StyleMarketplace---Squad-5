import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  price: z.number(),
  salePrice: z.number().optional(),
  photoUrl: z.string().optional(),
});

export const updateProductSchema = createProductSchema.partial();