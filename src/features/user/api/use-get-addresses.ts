import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

export type Address = {
  id: string;
  label: string;
  receiverName: string;
  phone: string;
  streetLine1: string;
  streetLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
};

export const getAddresses = async (): Promise<Address[]> => {
  const result = await api.get("/addresses");
  return result.data.data;
};

type UseGetAddressesOptions = {
  queryConfig?: QueryConfig<typeof getAddresses>;
};

export const useGetAddresses = ({
  queryConfig,
}: UseGetAddressesOptions = {}) => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    ...queryConfig,
  });
};
