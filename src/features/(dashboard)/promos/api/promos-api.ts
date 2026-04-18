import { api } from "@/lib/axios";
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";

const promoSchema = z.object({
  id: z.string(),
  code: z.string(),
  description: z.string().nullable().optional(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]).default("PERCENTAGE"),
  discountValue: z.union([z.number(), z.string()]).transform(Number),
  minOrderAmount: z
    .union([z.number(), z.string()])
    .transform(Number)
    .optional()
    .default(0),
  maxUsage: z.number().nullable().optional(),
  usedCount: z.number().optional().default(0),
  expiresAt: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.string().optional(),
});

const promosResponseSchema = z.object({
  data: z.union([
    z.object({ items: z.array(promoSchema), total: z.number() }),
    z.array(promoSchema),
  ]),
});

export type AdminPromo = z.infer<typeof promoSchema>;

export interface GetPromosParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export const getAdminPromos = async (
  params: GetPromosParams = {},
): Promise<{ items: AdminPromo[]; total: number }> => {
  const queryParams: Record<string, string | number | boolean | undefined> = {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  };
  if (params.search) queryParams.search = params.search;
  if (params.isActive !== undefined) queryParams.isActive = params.isActive;

  const { data } = await api.get("/promos/admin", { params: queryParams });

  const validated = promosResponseSchema.safeParse(data);
  if (!validated.success) {
    const raw = data?.data;
    if (Array.isArray(raw)) return { items: raw, total: raw.length };
    return { items: [], total: 0 };
  }
  const d = validated.data.data;
  if (Array.isArray(d)) return { items: d, total: d.length };
  return { items: d.items, total: d.total };
};

export const useAdminPromos = (params: GetPromosParams = {}) => {
  return useQuery({
    queryKey: ["admin-promos", params],
    queryFn: () => getAdminPromos(params),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
};

export type CreatePromoDto = {
  code: string;
  description?: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minOrderAmount?: number;
  maxUsage?: number;
  expiresAt?: string;
};

export const useCreatePromo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePromoDto) => api.post("/promos/admin", dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-promos"] });
      toast.success("Promo berhasil dibuat");
    },
    onError: () => toast.error("Gagal membuat promo"),
  });
};

export const useUpdatePromo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string;
      dto: Partial<CreatePromoDto> & { isActive?: boolean };
    }) => api.patch(`/promos/admin/${id}`, dto),
    onMutate: async ({ id, dto }) => {
      await queryClient.cancelQueries({ queryKey: ["admin-promos"] });
      const previousQueries = queryClient.getQueriesData({
        queryKey: ["admin-promos"],
      });

      queryClient.setQueriesData({ queryKey: ["admin-promos"] }, (old: any) => {
        if (!old || !old.items) return old;
        return {
          ...old,
          items: old.items.map((item: any) =>
            item.id === id ? { ...item, ...dto } : item,
          ),
        };
      });

      return { previousQueries };
    },
    onSuccess: () => {
      toast.success("Promo berhasil diperbarui");
    },
    onError: (_err, _newPromo, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
      toast.error("Gagal memperbarui promo");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-promos"] });
    },
  });
};

export const useDeletePromo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/promos/admin/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["admin-promos"] });
      const previousQueries = queryClient.getQueriesData({
        queryKey: ["admin-promos"],
      });

      queryClient.setQueriesData({ queryKey: ["admin-promos"] }, (old: any) => {
        if (!old || !old.items) return old;
        return {
          ...old,
          items: old.items.filter((item: AdminPromo) => item.id !== id),
        };
      });

      return { previousQueries };
    },
    onSuccess: () => {
      toast.success("Promo berhasil dihapus");
    },
    onError: (_err, _id, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
      toast.error("Gagal menghapus promo");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-promos"] });
    },
  });
};
