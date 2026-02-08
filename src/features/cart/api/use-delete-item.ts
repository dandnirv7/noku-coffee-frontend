import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getCartQueryKey } from "./use-get-cart";
import z from "zod";

type DeleteItemParams = {
  productId: string;
};

const DeleteItemResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    id: z.string(),
    cartId: z.string(),
    productId: z.string(),
    quantity: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const deleteItem = async ({ productId }: DeleteItemParams) => {
  const { data } = await api.delete(`/cart/${productId}`);

  const validated = DeleteItemResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data cart dari server tidak valid");
  }

  return validated.data;
};

type UseDeleteItemParams = {
  mutationConfig?: MutationConfig<typeof deleteItem>;
};

export const useDeleteItem = ({ mutationConfig }: UseDeleteItemParams = {}) => {
  return useMutation({
    mutationFn: deleteItem,
    ...mutationConfig,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: getCartQueryKey() });

      mutationConfig?.onSuccess?.(...args);
    },
  });
};
