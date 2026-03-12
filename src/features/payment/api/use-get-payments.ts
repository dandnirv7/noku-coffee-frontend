import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { PaymentResponseSchema } from "../lib/types";

export const getPayments = async (id: string) => {
  const { data } = await api.get(`/payments/status/${id}`);

  const validated = PaymentResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data pembayaran dari server tidak valid");
  }

  return validated.data.data;
};

export const getPaymentsOptions = (id: string) =>
  queryOptions({
    queryKey: ["payments", id],
    queryFn: () => getPayments(id),
  });

export const useGetPayments = (
  id: string,
  queryConfig?: QueryConfig<typeof getPayments>,
) => {
  return useQuery({
    ...getPaymentsOptions(id),
    ...queryConfig,
  });
};
