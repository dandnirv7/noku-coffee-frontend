import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const topProductsSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(), z.string()]).transform(Number),
  category: z
    .any()
    .transform((val) => (typeof val === "string" ? val : (val?.name ?? ""))),
  image: z.string().nullable().optional(),
  sold: z.number(),
  revenueProduct: z.number(),
});

const topProductsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(topProductsSchema),
});

export type TopProductsResponse = z.infer<typeof topProductsResponseSchema>;
export type TopProducts = z.infer<typeof topProductsSchema>;

export const getTopProducts = async () => {
  const { data } = await api.get("/dashboard/top-products");

  const validated = topProductsResponseSchema.parse(data);

  if (!validated.success) {
    throw new Error("Failed to fetch top products");
  }

  return validated.data;
};

export const useTopProducts = () => {
  return useQuery({
    queryKey: ["top-products"],
    queryFn: getTopProducts,
  });
};
