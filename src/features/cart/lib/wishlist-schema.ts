import { z } from "zod";

const WishlistProductSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable().optional(),
    price: z.string().transform((val) => Number(val)),
    sku: z.string().optional(),
    type: z.array(z.string()).optional(),
    images: z.array(z.string()),
    origin: z.string().nullable().optional(),
    roastLevel: z.string().nullable().optional(),
    process: z.string().nullable().optional(),
    weight: z.number().nullable().optional(),
    stock: z.number(),
    category: z
      .object({
        name: z.string(),
      })
      .optional(),
  })
  .transform((data) => ({
    ...data,
    description: data.description ?? null,
    sku: data.sku ?? "",
    type: data.type ?? [],
    origin: data.origin ?? null,
    roastLevel: data.roastLevel ?? null,
    process: data.process ?? null,
    weight: data.weight ?? null,
    category: data.category ?? { name: "Uncategorized" },
  }));

export const WishlistItemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  productId: z.string(),
  createdAt: z.string(),
  product: WishlistProductSchema,
});

export const WishlistResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(WishlistItemSchema),
});

export const ToggleWishlistResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    isAdded: z.boolean(),
  }),
});

export type WishlistProduct = z.infer<typeof WishlistProductSchema>;
export type WishlistItem = z.infer<typeof WishlistItemSchema>;
export type WishlistResponse = z.infer<typeof WishlistResponseSchema>;
export type ToggleWishlistResponse = z.infer<
  typeof ToggleWishlistResponseSchema
>;
