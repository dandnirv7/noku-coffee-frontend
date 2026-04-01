import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import z from "zod";

type CheckoutParams = {
  addressId: string;
  promoCode?: string;
  shippingMethod?: string;
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
  shippingMethod,
}: CheckoutParams) => {
  const payload = {
    addressId,
    ...(promoCode && promoCode.trim() !== "" && { promoCode }),
    shippingMethod: shippingMethod || "NOKU_REGULER",
  };

  try {
    const { data } = await api.post("/orders/checkout", payload);

    const validated = CheckoutResponseSchema.safeParse(data);

    if (!validated.success) {
      console.error("Schema Error:", validated.error);
      throw new Error("Format data checkout dari server tidak valid");
    }

    return validated.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "🚨 Error dari Backend NestJS:",
        error.response?.data?.message || error.response?.data,
      );
    }
    throw error;
  }
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
