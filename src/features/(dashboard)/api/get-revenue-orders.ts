import { api } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import z from "zod";

const RevenueOrderItemSchema = z.object({
  label: z.string(),
  revenue: z.number(),
  orders: z.number(),
});

const RevenueOrderResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(RevenueOrderItemSchema),
});

export type RevenueOrderItem = z.infer<typeof RevenueOrderItemSchema>;

export const RevenueOrderParamsSchema = z.object({
  timeFrame: z.enum(["monthly", "weekly", "daily"]),
});

export type RevenueOrderParams = z.infer<typeof RevenueOrderParamsSchema>;

export async function getRevenueOrders(
  params: RevenueOrderParams,
): Promise<RevenueOrderItem[]> {
  const { data } = await api.get("/dashboard/chart/revenue-orders", {
    params: {
      period: params.timeFrame,
    },
  });

  const validated = RevenueOrderResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Zod Validation Error:", validated.error);
    throw new Error("Invalid response format from server");
  }

  return validated.data.data;
}

export const useRevenueOrders = (
  params: RevenueOrderParams = { timeFrame: "monthly" },
) => {
  return useQuery({
    queryKey: ["revenue-order", params],
    queryFn: () => getRevenueOrders(params),
    placeholderData: keepPreviousData,
    enabled: !!params.timeFrame,
  });
};
