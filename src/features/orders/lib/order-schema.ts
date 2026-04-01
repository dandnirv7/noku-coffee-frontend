import { z } from "zod";

const numberOrString = z.union([z.number(), z.string()]);
const stringified = numberOrString.transform((val) => String(val));
const coercedNumber = numberOrString.transform((val) => Number(val));

const OrderListItemSchema = z
  .object({
    productName: z.string().optional(),
    name: z.string().optional(),
    productNameSnapshot: z.string().optional(),
    productSku: z.string().optional().nullable(),
    productSkuSnapshot: z.string().optional().nullable(),
    price: stringified.optional().nullable(),
    priceAtPurchase: stringified.optional().nullable(),
    quantity: z.number().int(),
    subtotal: stringified.optional().nullable(),
    product: z
      .object({
        images: z.array(z.string()),
      })
      .nullable()
      .optional(),
    image: z.string().nullable().optional(),
  })
  .transform((val) => ({
    ...val,
    productName:
      val.productName ||
      val.name ||
      val.productNameSnapshot ||
      "Produk Tidak Diketahui",
    productSku: val.productSku || val.productSkuSnapshot || "-",
    price: val.price || val.priceAtPurchase || "0",
  }));

const OrderListSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  createdAt: z.string(),
  status: z.string(),
  paymentExternalId: z.string().nullable().optional(),
  paymentUrl: z.string().nullable().optional(),
  shipping: z
    .object({
      trackingNumber: z.string().optional().nullable(),
    })
    .nullable()
    .optional(),
  totalAmount: stringified,
  items: z.array(OrderListItemSchema),
});

const OrdersMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  hasNextPage: z.boolean(),
});

export const OrdersResponseSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  data: z.array(OrderListSchema),
  meta: OrdersMetaSchema,
});

export const CustomerSchema = z.object({
  name: z.string(),
  phone: z.string().nullable().optional(),
  email: z.string().email(),
});

export const ShippingSchema = z.object({
  address: z.string(),
  city: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  method: z.string().optional().nullable(),
  estimatedDelivery: z.string().optional().nullable(),
  shippingReceiver: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
});

export const OrderDetailDataSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  date: z.string(),
  status: z.string(),
  items: z.array(OrderListItemSchema),
  subtotal: coercedNumber,
  discount: coercedNumber,
  deliveryFee: coercedNumber,
  tax: coercedNumber,
  total: coercedNumber,
  paymentMethod: z.string().nullable().optional(),
  paymentChannel: z.string().nullable().optional(),
  paymentStatus: z.string().optional().nullable(),
  customer: CustomerSchema,
  shipping: ShippingSchema,
  trackingNumber: z.string().optional().nullable(),
  timeline: z.array(
    z.object({
      status: z.string(),
      date: z.string().nullable().optional(),
      description: z.string(),
      isLatest: z.boolean().optional(),
      isSimulated: z.boolean().optional(),
      realDate: z.string().nullable().optional(),
    }),
  ),
  invoiceId: z.string().optional().nullable(),
});

export const OrderDetailResponseSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  data: OrderDetailDataSchema,
});

export const TrackingDataSchema = z.object({
  tracking_number: z.string(),
  order_number: z.string(),
  invoice_id: z.string().optional().nullable(),
  order_id: z.string().optional().nullable(),

  status_summary: z.object({
    headline: z.string(),
    sub_headline: z.string(),
    order_placed: z.string().optional().nullable(),
    estimated_delivery: z.string().optional().nullable(),
    current_location: z.string(),
    last_updated: z.string().nullable().optional(),
  }),

  courier: z.object({
    name: z.string(),
    phone: z.string(),
  }),

  timeline: z.array(
    z.object({
      status: z.string(),
      description: z.string(),
      time: z.string().nullable().optional(),
      is_completed: z.boolean(),
      is_latest: z.boolean().optional(),
    }),
  ),

  delivery_information: z.object({
    address: z.string(),
    recipient: z.string(),
    phone: z.string(),
    shipping_method: z.string(),
    estimated_delivery_text: z.string().optional().nullable(),
  }),

  order_summary: z.object({
    items: z.array(
      z.object({
        name: z.string(),
        qty: z.number(),
        price: coercedNumber,
      }),
    ),
    total: coercedNumber,
  }),
});

export const TrackingApiResponseSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  data: TrackingDataSchema,
});

export type OrderList = z.infer<typeof OrderListSchema>;
export type OrderDetail = z.infer<typeof OrderDetailDataSchema>;
export type TrackingData = z.infer<typeof TrackingDataSchema>;
