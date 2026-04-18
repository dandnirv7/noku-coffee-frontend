import { api } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import {
  ReviewRatingFilter,
  ReviewSortBy,
} from "@/features/(dashboard)/hooks/use-customers-table";

const reviewSchema = z
  .object({
    id: z.string(),
    rating: z.number(),
    comment: z.string().nullable().optional(),
    createdAt: z.string().optional(),
    user: z
      .object({
        name: z.string().nullable().optional(),
        email: z.string().optional(),
      })
      .optional(),
    product: z
      .object({ name: z.string().optional(), id: z.string().optional() })
      .optional(),
  })
  .transform((d) => ({
    ...d,
    customerName: d.user?.name || "Unknown",
    customerEmail: d.user?.email || "",
    productName: d.product?.name || "",
  }));

const reviewsResponseSchema = z.object({
  data: z.union([
    z.object({ items: z.array(reviewSchema), total: z.number() }),
    z.array(reviewSchema),
  ]),
});

export type AdminReview = z.infer<typeof reviewSchema>;

export interface GetReviewsParams {
  page?: number;
  limit?: number;
  rating?: ReviewRatingFilter;
  sortBy?: ReviewSortBy;
  search?: string;
}

export const getAdminReviews = async (
  params: GetReviewsParams = {},
): Promise<{ items: AdminReview[]; total: number }> => {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  };
  if (params.rating && params.rating !== "all")
    queryParams.rating = params.rating;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.search) queryParams.search = params.search;

  const { data } = await api.get("/reviews/admin", { params: queryParams });

  const validated = reviewsResponseSchema.safeParse(data);
  if (!validated.success) {
    const raw = data?.data;
    if (Array.isArray(raw)) return { items: raw, total: raw.length };
    return { items: [], total: 0 };
  }
  const d = validated.data.data;
  if (Array.isArray(d)) return { items: d, total: d.length };
  return { items: d.items, total: d.total };
};

export const useAdminReviews = (params: GetReviewsParams = {}) => {
  return useQuery({
    queryKey: ["admin-reviews", params],
    queryFn: () => getAdminReviews(params),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
};
