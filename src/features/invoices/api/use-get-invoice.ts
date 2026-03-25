import { api } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { InvoiceResponseSchema, InvoiceData } from "../lib/invoice-schema";
import { QueryConfig } from "@/lib/react-query";

export const getInvoiceById = async (
  invoiceId: string,
): Promise<InvoiceData> => {
  const { data } = await api.get(`/invoices/${invoiceId}`);

  const validated = InvoiceResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data invoice dari server tidak valid");
  }

  return validated.data.data;
};

export const getInvoiceOptions = (invoiceId: string) =>
  queryOptions({
    queryKey: ["invoice", invoiceId],
    queryFn: () => getInvoiceById(invoiceId),
  });

export const useGetInvoice = (
  invoiceId: string,
  queryConfig?: QueryConfig<typeof getInvoiceById>,
) => {
  return useQuery({
    ...getInvoiceOptions(invoiceId),
    ...queryConfig,
  });
};
