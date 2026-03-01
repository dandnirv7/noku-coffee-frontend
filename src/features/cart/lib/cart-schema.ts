import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),

  price: z.number(),
  sku: z.string(),
  type: z.array(z.enum(["BEAN", "GEAR", "BUNDLE"])),
  images: z.array(z.string()),

  origin: z.string().nullable(),
  roastLevel: z.string().nullable(),
  process: z.string().nullable(),
  weight: z.number().nullable(),

  stock: z.number(),

  categoryId: z.string(),
  category: z
    .object({
      name: z.string(),
    })
    .optional(),

  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const CartItemSchema = z.object({
  id: z.string(),
  cartId: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  product: ProductSchema,
});

export type CartItem = z.infer<typeof CartItemSchema>;

export const CartDataSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  items: z.array(CartItemSchema),
  total: z.number(),
});

export type CartData = z.infer<typeof CartDataSchema>;

export const CartResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: CartDataSchema,
});

export type CartResponse = z.infer<typeof CartResponseSchema>;

export interface CartSummary {
  subtotal: number;
  tax: number;
  taxRate: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
}

export const PromoCodeSchema = z.object({
  code: z.string().min(1),
  discountPercentage: z.number().min(0).max(100),
  minPurchase: z.number().optional(),
});

export type PromoCode = z.infer<typeof PromoCodeSchema>;

export type AppliedPromo =
  | {
      type: "PERCENTAGE";
      code: string;
      discountAmount: number;
      discountPercentage: number;
    }
  | {
      type: "FIXED";
      code: string;
      discountAmount: number;
    }
  | {
      type: "FREE_SHIPPING";
      code: string;
      discountAmount: number;
    };
