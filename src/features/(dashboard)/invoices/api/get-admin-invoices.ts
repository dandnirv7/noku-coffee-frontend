import { api } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import {
  InvoiceStatusFilter,
  InvoiceSortBy,
} from "@/features/(dashboard)/hooks/use-invoices-table";

const adminInvoiceSchema = z
  .object({
    id: z.string(),
    invoiceNumber: z.string().optional().default(""),
    orderId: z.string().optional().default(""),
    orderNumber: z.string().optional().default(""),
    customerName: z.string().optional().default(""),
    customerEmail: z.string().optional().default(""),
    amount: z.union([z.number(), z.string()]).transform(Number),
    status: z.string(),
    dueDate: z.string().nullable().optional(),
    paidAt: z.string().nullable().optional(),
    createdAt: z.string().optional(),
    user: z
      .object({ name: z.string().optional(), email: z.string().optional() })
      .optional(),
    order: z.object({ orderNumber: z.string().optional() }).optional(),
  })
  .transform((d) => ({
    ...d,
    customerName: d.customerName || d.user?.name || "Unknown",
    customerEmail: d.customerEmail || d.user?.email || "",
    orderNumber: d.orderNumber || d.order?.orderNumber || "",
  }));

const adminInvoicesResponseSchema = z.object({
  data: z.union([
    z.object({ items: z.array(adminInvoiceSchema), total: z.number() }),
    z.array(adminInvoiceSchema),
  ]),
});

export type AdminInvoice = z.infer<typeof adminInvoiceSchema>;

export interface GetAdminInvoicesParams {
  page?: number;
  limit?: number;
  status?: InvoiceStatusFilter;
  sortBy?: InvoiceSortBy;
  search?: string;
}

export const getAdminInvoices = async (
  params: GetAdminInvoicesParams = {},
): Promise<{ items: AdminInvoice[]; total: number }> => {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  };
  if (params.status && params.status !== "all")
    queryParams.status = params.status;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.search) queryParams.search = params.search;

  const { data } = await api.get("/invoice/admin", { params: queryParams });

  const validated = adminInvoicesResponseSchema.safeParse(data);
  if (!validated.success) {
    const raw = data?.data;
    if (Array.isArray(raw)) return { items: raw, total: raw.length };
    return { items: [], total: 0 };
  }
  const d = validated.data.data;
  if (Array.isArray(d)) return { items: d, total: d.length };
  return { items: d.items, total: d.total };
};

export const useAdminInvoices = (params: GetAdminInvoicesParams = {}) => {
  return useQuery({
    queryKey: ["admin-invoices", params],
    queryFn: () => getAdminInvoices(params),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
};
