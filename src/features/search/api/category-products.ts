import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
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

export const getProductCategories = async () => {
  const { data } = await api.get("/categories");

  const validated = CategoryResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("API Validation Error:", validated.error);
    throw new Error("Failed to fetch categories");
  }

  return validated.data;
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getProductCategories(),
  });
};
