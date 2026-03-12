import { api } from "@/lib/axios";

import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

import { z } from "zod";

export const DailyDiscountSchema = z.object({
  id: z.string(),
  productId: z.string(),
  discountValue: z.string(),
  discountPercent: z.string(),
  maxQuota: z.number(),
  usedQuota: z.number(),
  targetUserIds: z.array(z.string()),
  dayKey: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  product: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    price: z.coerce.number(),
    sku: z.string(),
    type: z.array(z.string()),
    images: z.array(z.unknown()),
    origin: z.null(),
    roastLevel: z.null(),
    process: z.null(),
    weight: z.null(),
    stock: z.number(),
    category: z.object({ name: z.string() }),
  }),
});

export type DailyDiscount = z.infer<typeof DailyDiscountSchema>;

export const DailyDiscountResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: DailyDiscountSchema,
});

export const getDailyDiscount = async () => {
  const { data } = await api.get("/daily-discounts/today");

  const validated = data;

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data cart dari server tidak valid");
  }

  return validated.data;
};

export const getDailyDiscountQueryKey = () => ["daily-discount"];

export const getDailyDiscountQueryOptions = () =>
  queryOptions({
    queryKey: getDailyDiscountQueryKey(),
    queryFn: getDailyDiscount,
  });

type UseGetDailyDiscountParams = {
  queryConfig?: QueryConfig<typeof getDailyDiscountQueryOptions>;
};

export const useGetDailyDiscount = ({
  queryConfig,
}: UseGetDailyDiscountParams = {}) => {
  return useQuery({
    ...getDailyDiscountQueryOptions(),
    ...queryConfig,
  });
};
