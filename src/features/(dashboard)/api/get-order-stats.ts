import { api } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import z from "zod";

const OrderStatsSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    selesai: z.number(),
    menunggu: z.number(),
    gagal: z.number(),
  }),
});

type OrderStats = z.infer<typeof OrderStatsSchema>;

export const OrderStatsParamsSchema = z.object({
  orderPeriod: z.enum(["monthly", "weekly", "daily"]),
});

export type OrderStatsParams = z.infer<typeof OrderStatsParamsSchema>;

export async function getOrderStats(
  params: OrderStatsParams,
): Promise<OrderStats> {
  const { data } = await api.get("/dashboard/order-stats", {
    params,
  });

  const validated = OrderStatsSchema.safeParse(data);

  if (!validated.success) {
    throw new Error("Invalid response from server");
  }

  return validated.data;
}

export const useOrderStats = (
  params: OrderStatsParams = { orderPeriod: "monthly" },
) => {
  return useQuery({
    queryKey: ["order-stats", params],
    queryFn: () => getOrderStats(params),
    placeholderData: keepPreviousData,
    enabled: !!params.orderPeriod,
  });
};
