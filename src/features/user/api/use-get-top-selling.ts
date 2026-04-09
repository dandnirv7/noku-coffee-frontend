import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const TopProductItem = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable(),
  price: z.coerce.number().nonnegative(),
  sku: z.string().min(1),
  type: z.array(z.string()),
  images: z.array(z.string()).default([]),
  origin: z.string().nullable(),
  roastLevel: z.string().nullable(),
  process: z.string().nullable(),
  weight: z.number().nullable(),
  stock: z.number().int().nonnegative(),
  category: z.object({
    name: z.string().min(1),
  }),
  sold: z.number().int().nonnegative(),
});

export const TopProductResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(TopProductItem),
});

export type TopProductItem = z.infer<typeof TopProductItem>;
export type TopProductResponse = z.infer<typeof TopProductResponseSchema>;

export const getTopSelling = async () => {
  const { data } = await api.get("/users/dashboard/top-selling");

  const validated = TopProductResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema validation error:", validated.error);
    throw new Error("Format data top selling dari server tidak valid");
  }

  return validated.data.data;
};

export const getTopSellingQueryKey = () => ["top-selling"];

export const getTopSellingQueryOptions = () => ({
  queryKey: getTopSellingQueryKey(),
  queryFn: getTopSelling,
});

type UseGetTopSellingParams = {
  queryConfig?: QueryConfig<typeof getTopSelling>;
};

export const useGetTopSelling = ({
  queryConfig,
}: UseGetTopSellingParams = {}) => {
  return useQuery({
    ...getTopSellingQueryOptions(),
    ...queryConfig,
  });
};
