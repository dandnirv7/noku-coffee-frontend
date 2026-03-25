import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export const validatePromo = async ({
  promoCode,
  amount,
}: {
  promoCode: string;
  amount: number;
}) => {
  const { data } = await api.post("/promos/validate", {
    promoCode,
    amount,
  });

  return data;
};

type UseValidatePromoParams = {
  mutationConfig?: MutationConfig<typeof validatePromo>;
};

export const useValidatePromo = ({
  mutationConfig,
}: UseValidatePromoParams = {}) => {
  return useMutation({
    mutationFn: validatePromo,
    ...mutationConfig,
  });
};
