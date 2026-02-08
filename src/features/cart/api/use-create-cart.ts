import { api } from "@/lib/axios";
import { MutationConfig, queryClient, QueryConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { getCartQueryKey } from "./use-get-cart";

type CreateCartParams = {
  productId: string;
  quantity: number;
};

const CartResponseSchema = z.object({
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

export const createCart = async ({ productId, quantity }: CreateCartParams) => {
  const { data } = await api.post("/cart", { productId, quantity });

  const validated = CartResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data cart dari server tidak valid");
  }

  return validated.data;
};

type UseCreateCartParams = {
  mutationConfig?: MutationConfig<typeof createCart>;
};

export const useCreateCart = ({ mutationConfig }: UseCreateCartParams = {}) => {
  return useMutation({
    mutationFn: createCart,
    ...mutationConfig,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: getCartQueryKey() });

      mutationConfig?.onSuccess?.(...args);
    },
  });
};
