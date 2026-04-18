import { api } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import {
  OrderStatusFilter,
  OrderSortBy,
} from "@/features/(dashboard)/hooks/use-orders-table";

const adminOrderSchema = z
  .object({
    id: z.string(),
    orderNumber: z.string(),
    date: z.string(),
    totalAmount: z.union([z.number(), z.string()]).transform(Number),
    status: z.string(),
    customerName: z.string().optional().default(""),
    customerEmail: z.string().optional().default(""),
    user: z
      .object({
        name: z.string().optional(),
        email: z.string().optional(),
      })
      .optional(),
  })
  .transform((data) => ({
    ...data,
    customerName: data.customerName || data.user?.name || "Unknown",
    customerEmail: data.customerEmail || data.user?.email || "",
  }));

const adminOrdersResponseSchema = z.object({
  data: z.union([
    z.object({
      items: z.array(adminOrderSchema),
      total: z.number(),
    }),
    z.array(adminOrderSchema),
  ]),
});

export type AdminOrder = z.infer<typeof adminOrderSchema>;

export interface GetAdminOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatusFilter;
  sortBy?: OrderSortBy;
  search?: string;
}

export const getAdminOrders = async (
  params: GetAdminOrdersParams = {},
): Promise<{ items: AdminOrder[]; total: number }> => {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  };
  if (params.status && params.status !== "all")
    queryParams.status = params.status;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.search) queryParams.search = params.search;

  const { data } = await api.get("/orders/admin", { params: queryParams });

  const validated = adminOrdersResponseSchema.safeParse(data);
  if (!validated.success) {
    const raw = data?.data;
    if (Array.isArray(raw)) return { items: raw, total: raw.length };
    return { items: [], total: 0 };
  }
  const d = validated.data.data;
  if (Array.isArray(d)) return { items: d, total: d.length };
  return { items: d.items, total: d.total };
};

export const useAdminOrders = (params: GetAdminOrdersParams = {}) => {
  return useQuery({
    queryKey: ["admin-orders", params],
    queryFn: () => getAdminOrders(params),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
};
