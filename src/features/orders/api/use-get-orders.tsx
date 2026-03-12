import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { OrdersResponseSchema } from "../lib/order-schema";

export const getOrder = async () => {
  const { data } = await api.get("/orders");

  const validated = OrdersResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data order dari server tidak valid");
  }

  return validated.data.data;
};

export const getOrderOptions = () =>
  queryOptions({
    queryKey: ["orders"],
    queryFn: getOrder,
  });

export const useGetOrders = (queryConfig?: QueryConfig<typeof getOrder>) => {
  return useQuery({
    ...getOrderOptions(),
    ...queryConfig,
  });
};
