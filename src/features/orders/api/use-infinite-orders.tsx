import { api } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { OrdersResponseSchema } from "../lib/order-schema";

export const getInfiniteOrders = async ({
  pageParam = 1,
}: {
  pageParam: number;
}) => {
  const { data } = await api.get(`/orders?page=${pageParam}&limit=10`);

  const validated = OrdersResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data order dari server tidak valid");
  }

  return validated.data;
};

export const useInfiniteOrders = () => {
  return useInfiniteQuery({
    queryKey: ["orders", "infinite"],
    queryFn: ({ pageParam }) =>
      getInfiniteOrders({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });
};
