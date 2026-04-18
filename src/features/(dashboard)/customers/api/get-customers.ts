import { api } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { CustomerSortBy } from "@/features/(dashboard)/hooks/use-customers-table";

const customerSchema = z
  .object({
    id: z.string(),
    name: z.string().nullable().optional().default(""),
    email: z.string().optional().default(""),
    image: z.string().nullable().optional(),
    createdAt: z.string().optional(),
    _count: z.object({ orders: z.number().optional() }).optional(),
    totalOrders: z.number().optional(),
    totalSpend: z.union([z.number(), z.string()]).transform(Number).optional(),
  })
  .transform((d) => ({
    ...d,
    name: d.name || "Unknown",
    totalOrders: d.totalOrders ?? d._count?.orders ?? 0,
    totalSpend: d.totalSpend ?? 0,
  }));

const customersResponseSchema = z.object({
  data: z.union([
    z.object({ items: z.array(customerSchema), total: z.number() }),
    z.array(customerSchema),
  ]),
});

export type AdminCustomer = z.infer<typeof customerSchema>;

export interface GetCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: CustomerSortBy;
}

export const getAdminCustomers = async (
  params: GetCustomersParams = {},
): Promise<{ items: AdminCustomer[]; total: number }> => {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  };
  if (params.search) queryParams.search = params.search;
  if (params.sortBy) queryParams.sortBy = params.sortBy;

  const { data } = await api.get("/users/admin", { params: queryParams });

  const validated = customersResponseSchema.safeParse(data);
  if (!validated.success) {
    const raw = data?.data;
    if (Array.isArray(raw)) return { items: raw, total: raw.length };
    return { items: [], total: 0 };
  }
  const d = validated.data.data;
  if (Array.isArray(d)) return { items: d, total: d.length };
  return { items: d.items, total: d.total };
};

export const useAdminCustomers = (params: GetCustomersParams = {}) => {
  return useQuery({
    queryKey: ["admin-customers", params],
    queryFn: () => getAdminCustomers(params),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
};
