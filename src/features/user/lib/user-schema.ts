import { z } from "zod";

export const UserStatsSchema = z.object({
  totalOrders: z.number(),
  totalSpent: z.number(),
  memberSince: z.string(),
});

export type UserStats = z.infer<typeof UserStatsSchema>;

export const OrderItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  image: z.string(),
});

export const OrderSchema = z.object({
  id: z.string(),
  date: z.string(),
  status: z.enum(["delivered", "shipped", "processing"]),
  total: z.number(),
  items: z.array(OrderItemSchema),
});

export type Order = z.infer<typeof OrderSchema>;

export const ProductDealSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.string(),
  image: z.string().optional(),
  originalPrice: z.string().optional(),
  discount: z.string().optional(),
  isNew: z.boolean().optional(),
  isRecommended: z.boolean().optional(),
  isPreviouslyOrdered: z.boolean().optional(),
});

export type ProductDeal = z.infer<typeof ProductDealSchema>;

export const DeliveryPreferencesSchema = z.object({
  preferredTime: z.string(),
  address: z.string(),
  instructions: z.string(),
});

export type DeliveryPreferences = z.infer<typeof DeliveryPreferencesSchema>;
