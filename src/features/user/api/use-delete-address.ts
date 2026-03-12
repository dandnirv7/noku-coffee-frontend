import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteAddress = async (id: string) => {
  const result = await api.delete(`/addresses/${id}`);
  return result.data;
};

type UseDeleteAddressOptions = {
  mutationConfig?: MutationConfig<typeof deleteAddress>;
};

export const useDeleteAddress = ({
  mutationConfig,
}: UseDeleteAddressOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    mutationFn: deleteAddress,
    ...mutationConfig,
  });
};
