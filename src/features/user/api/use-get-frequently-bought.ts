import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const FrequentlyBoughtProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  images: z.array(z.string()).optional(),
});

export const FrequentlyBoughtItemSchema = z.object({
  totalBought: z.number().int().nonnegative(),
  product: FrequentlyBoughtProductSchema,
});

export const FrequentlyBoughtResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(FrequentlyBoughtItemSchema),
});

export type FrequentlyBoughtProduct = z.infer<
  typeof FrequentlyBoughtProductSchema
>;

export type FrequentlyBoughtItem = z.infer<typeof FrequentlyBoughtItemSchema>;

export type FrequentlyBoughtResponse = z.infer<
  typeof FrequentlyBoughtResponseSchema
>;

export const getFrequentlyBought = async (): Promise<
  FrequentlyBoughtItem[]
> => {
  const response = await api.get("/orders/frequently-bought");

  const validated = FrequentlyBoughtResponseSchema.safeParse(response.data);

  if (!validated.success) {
    console.error("Schema validation error:", validated.error.format());
    throw new Error("Format data frequently bought dari server tidak valid");
  }

  return validated.data.data;
};

export const getFrequentlyBoughtQueryKey = () => ["frequently-bought"];

export const getFrequentlyBoughtQueryOptions = () =>
  queryOptions({
    queryKey: getFrequentlyBoughtQueryKey(),
    queryFn: getFrequentlyBought,
  });

type UseGetFrequentlyBoughtParams = {
  queryConfig?: QueryConfig<typeof getFrequentlyBoughtQueryOptions>;
};

export const useGetFrequentlyBought = ({
  queryConfig,
}: UseGetFrequentlyBoughtParams = {}) => {
  return useQuery({
    ...getFrequentlyBoughtQueryOptions(),
    ...queryConfig,
  });
};
