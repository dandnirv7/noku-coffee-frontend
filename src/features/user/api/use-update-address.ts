import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateAddressInput } from "./use-create-address";

type UpdateAddressInput = {
  id: string;
  data: Partial<CreateAddressInput>;
};

export const updateAddress = async ({ id, data }: UpdateAddressInput) => {
  const result = await api.patch(`/addresses/${id}`, data);
  return result.data;
};

type UseUpdateAddressOptions = {
  mutationConfig?: MutationConfig<typeof updateAddress>;
};

export const useUpdateAddress = ({
  mutationConfig,
}: UseUpdateAddressOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    mutationFn: updateAddress,
    ...mutationConfig,
  });
};

export const setDefaultAddress = async (id: string) => {
  const result = await api.patch(`/addresses/${id}/default`);
  return result.data;
};

export const useSetDefaultAddress = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof setDefaultAddress>;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    mutationFn: setDefaultAddress,
    ...mutationConfig,
  });
};
