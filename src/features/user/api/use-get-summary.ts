import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const SummaryItem = z.object({
  totalOrders: z.number(),
  totalSpent: z.number(),
  activeOrders: z.number(),
});

const SummaryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: SummaryItem,
});

export type SummaryItem = z.infer<typeof SummaryItem>;
export type SummaryResponse = z.infer<typeof SummaryResponseSchema>;

export const getSummary = async () => {
  const { data } = await api.get("/users/dashboard/summary");

  const validated = SummaryResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema validation error:", validated.error);
    throw new Error("Format data summary dari server tidak valid");
  }

  return validated.data.data;
};

export const getSummaryQueryKey = () => ["summary"];

export const getSummaryQueryOptions = () => ({
  queryKey: getSummaryQueryKey(),
  queryFn: getSummary,
});

type UseGetSummaryParams = {
  queryConfig?: QueryConfig<typeof getSummary>;
};

export const useGetSummary = ({ queryConfig }: UseGetSummaryParams = {}) => {
  return useQuery({
    ...getSummaryQueryOptions(),
    ...queryConfig,
  });
};
