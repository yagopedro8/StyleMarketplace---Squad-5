import { z } from "zod";

export const createOrderSchema = z.object({
  status: z.string().min(1, "O status é obrigatório."),
  totalValue: z.number(),
  userId: z.number(),
});

export const updateOrderSchema = createOrderSchema
  .omit({ userId: true })
  .partial();