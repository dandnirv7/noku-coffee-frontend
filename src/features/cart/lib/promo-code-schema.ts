import { z } from "zod";

const PromoTypeEnum = z.enum(["PERCENTAGE", "FREE_SHIPPING", "FIXED"]);

export const PromoCodeSchema = z.object({
  code: z.string(),
  type: PromoTypeEnum,
  value: z.number().positive(),
  minPurchase: z.number().optional(),
  maxDiscount: z.number().optional(),
  description: z.string(),
  isActive: z.boolean(),
});

export const ValidatePromoInputSchema = z.object({
  code: z.string(),
  amount: z.number().positive(),
});

export const ValidatePromoResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    isValid: z.boolean(),
    code: z.string(),
    discountAmount: z.number().positive(),
    finalAmount: z.number().positive(),
    details: z.object({
      type: PromoTypeEnum,
      value: z.number().positive(),
      maxDiscount: z.number().optional(),
      minOrderAmount: z.number().optional(),
    }),
  }),
});

export type PromoCode = z.infer<typeof PromoCodeSchema>;
export type ValidatePromoInput = z.infer<typeof ValidatePromoInputSchema>;
export type ValidatePromoResponse = z.infer<typeof ValidatePromoResponseSchema>;
