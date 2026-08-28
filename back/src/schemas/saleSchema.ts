import { z } from "zod";

export const createSaleSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),

  discount: z.number(),

  startDate: z.string().min(1, "A data inicial é obrigatória."),

  endDate: z.string().min(1, "A data final é obrigatória."),
});

export const updateSaleSchema = createSaleSchema.partial();