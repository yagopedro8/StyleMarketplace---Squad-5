import { z } from "zod";

export const createWishlistSchema = z.object({
  userId: z.number(),
  productId: z.number(),
});

export const updateWishlistSchema =
  createWishlistSchema.partial();