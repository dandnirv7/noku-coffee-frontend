import { api } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import z from "zod";

export const RecentOrdersSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  date: z.string(),
  status: z.string(),
  totalAmount: z.number(),
  customerName: z.string(),
  customerImage: z.string().nullable(),
  productName: z.string(),
});

export const RecentOrdersResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(RecentOrdersSchema),
});

export type RecentOrdersResponse = z.infer<typeof RecentOrdersResponseSchema>;

export type SortBy = "latest" | "oldest" | "highest";

export const getRecentOrders = async (sortBy: SortBy = "latest") => {
  const { data } = await api.get("/dashboard/recent-orders", {
    params: { sortBy },
  });

  const validated = RecentOrdersResponseSchema.safeParse(data);

  if (!validated.success) {
    throw new Error("Invalid response from server");
  }

  return validated.data.data;
};

export const useRecentOrders = (sortBy: SortBy = "latest") => {
  return useQuery({
    queryKey: ["recent-orders", sortBy],
    queryFn: async () => {
      const data = await getRecentOrders(sortBy);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
