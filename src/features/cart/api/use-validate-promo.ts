import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import {
  ValidatePromoInput,
  ValidatePromoResponse,
} from "../lib/promo-code-schema";

export const validatePromo = async (
  data: ValidatePromoInput,
): Promise<ValidatePromoResponse> => {
  const result = await api.post<ValidatePromoResponse>(
    "/promos/validate",
    data,
  );
  return result.data;
};

type UseValidatePromoOptions = {
  mutationConfig?: MutationConfig<typeof validatePromo>;
};

export const useValidatePromo = ({
  mutationConfig,
}: UseValidatePromoOptions = {}) => {
  return useMutation({
    mutationFn: validatePromo,
    ...mutationConfig,
  });
};
