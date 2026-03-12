import { z } from "zod";

export const OrderStatusEnum = z.enum([
  "PENDING",
  "PAID",
  "SHIPPED",
  "COMPLETED",
  "CANCELLED",
]);

export const ProductImageSchema = z.object({
  url: z.string().url().optional(),
  alt: z.string().optional(),
});

export const ProductSchema = z.object({
  images: z.array(ProductImageSchema).default([]),
});

export const OrderItemSchema = z.object({
  productId: z.string().min(1),
  productNameSnapshot: z.string().min(1),
  quantity: z.number().int().positive(),
  priceAtPurchase: z.coerce.number().nonnegative(),
  product: ProductSchema,
});

export const OrderSchema = z.object({
  id: z.string().min(1),
  orderNumber: z.string().min(1),
  totalAmount: z.coerce.number().nonnegative(),
  status: OrderStatusEnum,
  createdAt: z.coerce.date(),
  items: z.array(OrderItemSchema).min(1),
});

export const OrderResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(OrderSchema),
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderResponse = z.infer<typeof OrderResponseSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
