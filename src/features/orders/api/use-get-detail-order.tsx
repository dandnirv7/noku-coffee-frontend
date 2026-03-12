import { api } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { OrderDetailResponseSchema } from "../lib/order-schema";

export const getDetailOrder = async (id: string) => {
  const { data } = await api.get(`/orders/${id}`);

  const validated = OrderDetailResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data order dari server tidak valid");
  }

  return validated.data.data;
};

export const getDetailOrderOptions = (id: string) =>
  queryOptions({
    queryKey: ["order", id],
    queryFn: () => getDetailOrder(id),
  });

export const useGetDetailOrder = (id: string) => {
  return useQuery({
    ...getDetailOrderOptions(id),
  });
};
