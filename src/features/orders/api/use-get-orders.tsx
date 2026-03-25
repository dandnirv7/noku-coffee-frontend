import { api } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { OrdersResponseSchema } from "../lib/order-schema";

interface GetOrdersParams {
  pageParam?: number;
  status?: string;
  search?: string;
}

export const getOrderInfinite = async ({
  pageParam = 1,
  status,
  search,
}: GetOrdersParams) => {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: "10",
  });

  if (status && status !== "all") params.append("status", status);
  if (search) params.append("search", search);

  const { data } = await api.get(`/orders?${params.toString()}`);

  const validated = OrdersResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data order dari server tidak valid");
  }

  return validated.data;
};

export const useGetOrdersInfinite = (status?: string, search?: string) => {
  return useInfiniteQuery({
    queryKey: ["orders", "infinite", { status, search }],
    queryFn: ({ pageParam }) => getOrderInfinite({ pageParam, status, search }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
  });
};
