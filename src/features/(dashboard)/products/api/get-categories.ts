import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string(),
});

export const CategoryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    data: z.array(CategorySchema),
    meta: z.object({
      total: z.number(),
      lastPage: z.number(),
      currentPage: z.number(),
      perPage: z.number(),
    }),
  }),
});

export type Category = z.infer<typeof CategorySchema>;

export interface GetCategoriesParams {
  page?: number;
  perPage?: number;
  search?: string;
  sort?: string;
}

export const getCategories = async (
  params: GetCategoriesParams = {},
): Promise<{ items: Category[]; total: number }> => {
  const queryParams: Record<string, string | number | string[]> = {
    page: params.page ?? 1,
    perPage: params.perPage ?? 10,
  };

  if (params.search) queryParams.search = params.search;
  if (params.sort) queryParams.sort = params.sort;

  const { data } = await api.get("/categories", {
    params: queryParams,
    paramsSerializer: { indexes: null },
  });

  const validated = CategoryResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("API Validation Error:", validated.error);
    throw new Error("Failed to fetch categories");
  }

  return {
    items: validated.data.data.data,
    total: validated.data.data.meta.total,
  };
};

export const useCategories = (params?: GetCategoriesParams) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
  });
};
