import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getRecentOrders = async () => {
  const { data } = await api.get("/orders/recent");
  return data.data;
};

export const getRecentOrdersQueryKey = () => ["recent-orders"];

export const getRecentOrdersQueryOptions = () =>
  queryOptions({
    queryKey: getRecentOrdersQueryKey(),
    queryFn: getRecentOrders,
  });

type UseGetRecentOrdersParams = {
  queryConfig?: QueryConfig<typeof getRecentOrdersQueryOptions>;
};

export const useGetRecentOrders = ({
  queryConfig,
}: UseGetRecentOrdersParams = {}) => {
  return useQuery({
    ...getRecentOrdersQueryOptions(),
    ...queryConfig,
  });
};
