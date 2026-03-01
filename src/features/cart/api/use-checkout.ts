import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

type CheckoutParams = {
  addressId: string;
  promoCode?: string;
};

const CheckoutResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    paymentUrl: z.string().optional(),
  }),
});

export const checkoutProduct = async ({
  addressId,
  promoCode,
}: CheckoutParams) => {
  const { data } = await api.post("/orders/checkout", { addressId, promoCode });

  const validated = CheckoutResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data checkout dari server tidak valid");
  }

  return validated.data;
};

type UseCheckoutProductParams = {
  mutationConfig?: MutationConfig<typeof checkoutProduct>;
};

export const useCheckoutProduct = ({
  mutationConfig,
}: UseCheckoutProductParams = {}) => {
  return useMutation({
    mutationFn: checkoutProduct,
    ...mutationConfig,
  });
};
