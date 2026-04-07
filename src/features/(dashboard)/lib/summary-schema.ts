import { z } from "zod";

const MetricSchema = z.object({
  value: z.number(),
  periodValue: z.number(),
  trend: z.number(),
});

export const SummarySchema = z.object({
  products: MetricSchema,
  revenue: MetricSchema,
  orders: MetricSchema,
  customers: MetricSchema,
});

export const SummaryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: SummarySchema,
});

export type Summary = z.infer<typeof SummarySchema>;

export type SummaryResponse = z.infer<typeof SummaryResponseSchema>;
