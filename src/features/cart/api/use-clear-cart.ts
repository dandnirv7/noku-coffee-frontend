import { api } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { getCartQueryKey } from "./use-get-cart";
import z from "zod";

const ClearCartResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

type ClearCartResponse = z.infer<typeof ClearCartResponseSchema>;

export const clearCart = async () => {
  const { data } = await api.delete("/cart");

  const validated = ClearCartResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format response clear cart tidak valid");
  }

  return validated.data;
};

type UseClearCartParams = {
  mutationConfig?: UseMutationOptions<ClearCartResponse, unknown, void>;
};

export const useClearCart = ({ mutationConfig }: UseClearCartParams = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: clearCart,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: getCartQueryKey() });
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
