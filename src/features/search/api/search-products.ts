import { api } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ProductResponse,
  ProductResponseSchema,
} from "../../product/lib/products-schema";

interface SearchProductParams {
  search?: string;
  category?: string[];
  origin?: string[];
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  viewMode?: string;
  page?: number;
  perPage?: number;
}

export const getSearchProducts = async (
  params?: SearchProductParams,
): Promise<ProductResponse> => {
  const { data } = await api.get("/products", {
    params,
    paramsSerializer: { indexes: null },
  });

  const validated = ProductResponseSchema.safeParse(data);
  if (!validated.success) {
    console.error("API Validation Error:", validated.error);
    throw new Error("Failed to fetch products");
  }

  return validated.data;
};

export const useSearchProducts = (params?: SearchProductParams) => {
  return useQuery({
    queryKey: ["search-products", params],
    queryFn: () => getSearchProducts(params),
    placeholderData: keepPreviousData,
  });
};
