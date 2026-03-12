import { z } from "zod";

export const PaymentInvoiceSchema = z.object({
  id: z.string(),
  externalId: z.string(),
  payerEmail: z.string(),
  description: z.string(),
  merchantName: z.string(),
  currency: z.string(),
  paymentMethod: z.string(),
  paymentChannel: z.string(),
  paymentDestination: z.string().optional(),
  paidAmount: z.number(),
  paidAt: z.string(),
});

export const PaymentItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const PaymentSummarySchema = z.object({
  subtotal: z.number(),
  discount: z.number(),
  tax: z.number(),
  shippingCost: z.number(),
  adminFee: z.number(),
});

export const PaymentDataSchema = z.object({
  orderId: z.string(),
  orderNumber: z.string(),
  status: z.string(),
  paymentStatus: z.string(),
  amount: z.number(),
  subtotal: z.number(),
  discount: z.number(),
  tax: z.number(),
  shippingCost: z.number(),
  paidAt: z.string().nullable(),
  invoice: PaymentInvoiceSchema.partial().nullable(),
  items: z.array(PaymentItemSchema),
});

export const PaymentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: PaymentDataSchema,
});

export type PaymentInvoice = z.infer<typeof PaymentInvoiceSchema>;
export type PaymentItem = z.infer<typeof PaymentItemSchema>;
export type PaymentSummary = z.infer<typeof PaymentSummarySchema>;
export type PaymentData = z.infer<typeof PaymentDataSchema>;
export type PaymentResponse = z.infer<typeof PaymentResponseSchema>;

export type PaymentStatus = "success" | "cancelled" | "pending";
