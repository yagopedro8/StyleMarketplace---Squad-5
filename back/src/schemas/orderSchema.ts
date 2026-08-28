import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.number(),
});

export const updateOrderSchema = z.object({
  status: z.string().min(1, "O status é obrigatório."),
}).partial();