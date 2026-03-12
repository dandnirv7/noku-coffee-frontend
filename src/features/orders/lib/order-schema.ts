import { z } from "zod";

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  price: z.string(),
  sku: z.string(),
  type: z.array(z.string()),
  images: z.array(z.union([z.string(), z.unknown()])),
  origin: z.string().nullable(),
  roastLevel: z.string().nullable(),
  process: z.string().nullable(),
  weight: z.number().nullable(),
  categoryId: z.string(),
  stock: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.null(),
});

const OrderListItemSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  productNameSnapshot: z.string(),
  productSkuSnapshot: z.string(),
  priceAtPurchase: z.string(),
  quantity: z.number(),
  product: ProductSchema,
});

const OrderListSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  userId: z.string(),
  totalAmount: z.string(),
  status: z.string(),
  paymentExternalId: z.string(),
  paymentUrl: z.string(),
  paymentStatus: z.string(),
  paidAt: z.string().nullable(),
  shippingAddress: z.string(),
  shippingPhone: z.string(),
  shippingReceiver: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  subtotal: z.string(),
  shippingCost: z.string(),
  taxAmount: z.string(),
  discountAmount: z.string(),
  promoCodeId: z.string().nullable(),
  items: z.array(OrderListItemSchema),
});

export const OrdersResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(OrderListSchema),
});

export const DetailItemSchema = z.object({
  name: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
  image: z.string().nullable(),
});

export const CustomerSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.email(),
});

export const ShippingSchema = z.object({
  address: z.string(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  country: z.string(),
  method: z.string(),
  estimatedDelivery: z.string().nullable(),
});

export const TimelineSchema = z.object({
  status: z.string(),
  date: z.string().nullable(),
  description: z.string(),
});

export const OrderDetailDataSchema = z.object({
  id: z.string(),
  date: z.string(),
  status: z.string(),
  items: z.array(DetailItemSchema),
  subtotal: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  total: z.number().nonnegative(),
  paymentMethod: z.string().nullable(),
  paymentStatus: z.string(),
  customer: CustomerSchema,
  shipping: ShippingSchema,
  trackingNumber: z.string(),
  timeline: z.array(TimelineSchema),
});

export const OrderDetailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: OrderDetailDataSchema,
});

export type OrderList = z.infer<typeof OrderListSchema>;
export type OrderDetail = z.infer<typeof OrderDetailDataSchema>;
