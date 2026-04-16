import {
  Product,
  ProductResponseSchema,
} from "@/features/product/lib/products-schema";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface GetAdminProductsParams {
  search?: string;
  category?: string[];
  type?: string[];
  origin?: string[];
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  perPage?: number;
}

export const getAdminProducts = async (
  params: GetAdminProductsParams = {},
): Promise<{ items: Product[]; total: number }> => {
  const queryParams: Record<string, string | number | string[]> = {
    page: params.page ?? 1,
    perPage: params.perPage ?? 10,
  };

  if (params.search) queryParams.search = params.search;
  if (params.sort) queryParams.sort = params.sort;
  if (params.minPrice !== undefined) queryParams.minPrice = params.minPrice;
  if (params.maxPrice !== undefined) queryParams.maxPrice = params.maxPrice;

  if (params.category?.length && !params.category.includes("all")) {
    queryParams.category = params.category;
  }
  if (params.type?.length && !params.type.includes("all")) {
    queryParams.type = params.type;
  }
  if (params.origin?.length && !params.origin.includes("all")) {
    queryParams.origin = params.origin;
  }

  const { data } = await api.get("/products", {
    params: queryParams,
    paramsSerializer: { indexes: null },
  });

  const validated = ProductResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error(
      "API Contract Violation (Admin Products):",
      validated.error.format(),
    );

    throw new Error(
      "Invalid data format received from API. Please check the console.",
    );
  }

  return {
    items: validated.data.data.data,
    total: validated.data.data.meta.total,
  };
};

export const useAdminProducts = (params?: GetAdminProductsParams) => {
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: () => getAdminProducts(params),
  });
};
