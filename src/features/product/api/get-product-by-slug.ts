import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import { ProductSchema } from "../lib/products-schema";

const SingleProductResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ProductSchema,
});

export const getProductBySlug = async (slug: string) => {
  const { data } = await api.get(`/products/${slug}`);

  const validated = SingleProductResponseSchema.safeParse(data);
  if (!validated.success) {
    console.error(validated.error);
    throw new Error("Data produk tidak valid");
  }

  return validated.data.data;
};

export const useGetProductBySlug = (slug?: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug,
  });
};
