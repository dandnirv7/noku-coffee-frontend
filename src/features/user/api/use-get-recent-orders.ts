import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const OrderItem = z.object({
  name: z.string(),
  quantity: z.number(),
  image: z.string().nullable(),
});

const RecentOrderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  date: z.string(),
  status: z.string(),
  total: z.number(),
  items: z.array(OrderItem),
});

const RecentOrdersResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(RecentOrderSchema),
});

export type RecentOrder = z.infer<typeof RecentOrderSchema>;
export type RecentOrdersResponse = z.infer<typeof RecentOrdersResponseSchema>;

export const getRecentOrders = async () => {
  const { data } = await api.get("/users/dashboard/recent-orders");

  const validated = RecentOrdersResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema validation error:", validated.error);
    throw new Error("Format data recent orders dari server tidak valid");
  }

  return validated.data.data;
};

export const getRecentOrdersQueryKey = () => ["recent-orders"];

export const getRecentOrdersQueryOptions = () => ({
  queryKey: getRecentOrdersQueryKey(),
  queryFn: getRecentOrders,
});

type UseGetRecentOrdersParams = {
  queryConfig?: QueryConfig<typeof getRecentOrders>;
};

export const useGetRecentOrders = ({
  queryConfig,
}: UseGetRecentOrdersParams = {}) => {
  return useQuery({
    ...getRecentOrdersQueryOptions(),
    ...queryConfig,
  });
};
