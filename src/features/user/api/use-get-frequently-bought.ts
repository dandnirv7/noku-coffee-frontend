import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const FrequentlyBoughtItem = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  timesOrdered: z.number().int().nonnegative(),
  image: z.string().nullable(),
});

const FrequentlyBoughtResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(FrequentlyBoughtItem),
});

export type FrequentlyBoughtItem = z.infer<typeof FrequentlyBoughtItem>;
export type FrequentlyBoughtResponse = z.infer<
  typeof FrequentlyBoughtResponseSchema
>;

export const getFrequentlyBought = async () => {
  const { data } = await api.get("/users/dashboard/frequently-bought");

  const validated = FrequentlyBoughtResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema validation error:", validated.error.format());
    throw new Error("Format data frequently bought dari server tidak valid");
  }

  return validated.data.data;
};

export const getFrequentlyBoughtQueryKey = () => ["frequently-bought"];

export const getFrequentlyBoughtQueryOptions = () => ({
  queryKey: getFrequentlyBoughtQueryKey(),
  queryFn: getFrequentlyBought,
});

type UseGetFrequentlyBoughtParams = {
  queryConfig?: QueryConfig<typeof getFrequentlyBought>;
};

export const useGetFrequentlyBought = ({
  queryConfig,
}: UseGetFrequentlyBoughtParams = {}) => {
  return useQuery({
    ...getFrequentlyBoughtQueryOptions(),
    ...queryConfig,
  });
};
