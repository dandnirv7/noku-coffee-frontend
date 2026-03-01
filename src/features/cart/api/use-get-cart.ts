import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { CartItem, CartResponseSchema } from "../lib/cart-schema";

export const getCart = async () => {
  const { data } = await api.get<CartItem[]>("/cart");

  const validated = CartResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data cart dari server tidak valid");
  }

  return validated.data;
};

export const getCartQueryKey = () => ["cart"];

export const getCartQueryOptions = () =>
  queryOptions({
    queryKey: getCartQueryKey(),
    queryFn: getCart,
  });

type UseGetCartParams = {
  queryConfig?: QueryConfig<typeof getCartQueryOptions>;
};

export const useGetCart = ({ queryConfig }: UseGetCartParams = {}) => {
  return useQuery({
    ...getCartQueryOptions(),
    ...queryConfig,
  });
};
