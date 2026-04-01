import { z } from "zod";

export const InvoiceItemSchema = z.object({
  productName: z.string(),
  productSku: z.string(),
  price: z.union([z.number(), z.string()]),
  quantity: z.number().int(),
  subtotal: z.union([z.number(), z.string()]),
});

export const InvoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  orderId: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhone: z.string(),
  shippingAddress: z.string(),
  shippingReceiver: z.string(),
  shippingPhone: z.string(),
  subtotal: z.union([z.number(), z.string()]),
  discountAmount: z.union([z.number(), z.string()]),
  taxAmount: z.union([z.number(), z.string()]),
  shippingCost: z.union([z.number(), z.string()]),
  totalAmount: z.union([z.number(), z.string()]),
  paymentMethod: z.string(),
  paymentChannel: z.string(),
  status: z.string(),
  issuedAt: z.string(),
  paidAt: z.string().optional().nullable(),
  xenditInvoiceId: z.string(),
  xenditInvoiceUrl: z.string(),
  items: z.array(InvoiceItemSchema),
  order: z.object({
    orderNumber: z.string(),
  }),
});

export const InvoiceResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: InvoiceSchema,
});

export type InvoiceData = z.infer<typeof InvoiceSchema>;
