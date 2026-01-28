import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
  ProductResponse,
  ProductResponseSchema,
} from "../../product/lib/products-schema";

export const getSearchProducts = async (
  params?: Record<string, any>,
): Promise<ProductResponse> => {
  const { data } = await api.get("/products", { params });

  const validated = ProductResponseSchema.safeParse(data);
  if (!validated.success) {
    console.error("API Validation Error:", validated.error);
    throw new Error("Data format dari server tidak valid");
  }

  return validated.data;
};

export const useSearchProducts = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["search-products", params],
    queryFn: () => getSearchProducts(params),
  });
};
