import { api } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import z from "zod";

const OrderStatsSchema = z.object({
  selesai: z.number(),
  menunggu: z.number(),
  gagal: z.number(),
});

const OrderStatsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: OrderStatsSchema,
});

export type OrderStatsResponse = z.infer<typeof OrderStatsResponseSchema>;
export type OrderStats = z.infer<typeof OrderStatsSchema>;

export const OrderStatsParamsSchema = z.object({
  period: z.enum(["monthly", "weekly", "daily"]),
});

export type OrderStatsParams = z.infer<typeof OrderStatsParamsSchema>;

export async function getOrderStats(
  params: OrderStatsParams,
): Promise<OrderStatsResponse> {
  const { data } = await api.get("/dashboard/order-stats", {
    params,
  });

  const validated = OrderStatsResponseSchema.safeParse(data);

  if (!validated.success) {
    throw new Error("Invalid response from server");
  }

  return validated.data;
}

export const useOrderStats = (
  params: OrderStatsParams = { period: "monthly" },
) => {
  return useQuery({
    queryKey: ["order-stats", params.period],
    queryFn: () => getOrderStats(params),
    placeholderData: keepPreviousData,
    enabled: !!params.period,
  });
};
