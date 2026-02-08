import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.string().transform((val) => Number(val)),
  sku: z.string(),
  type: z.array(z.string()),
  images: z.array(z.string()),
  origin: z.string().nullable(),
  roastLevel: z.string().nullable(),
  process: z.string().nullable(),
  weight: z.number().nullable(),
  stock: z.number(),
  category: z.object({
    name: z.string(),
  }),
});

export const ProductResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    data: z.array(ProductSchema),
    meta: z.object({
      total: z.number(),
      lastPage: z.number(),
      currentPage: z.number(),
      perPage: z.number(),
    }),
  }),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
