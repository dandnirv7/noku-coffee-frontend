import { useState } from "react";
import { toast } from "sonner";
import { AppliedPromo } from "../lib/cart-schema";
import { PromoCode } from "../lib/promo-codes";
import { useValidatePromo } from "../api/use-validate-promo";
import { isAxiosError } from "axios";

interface UsePromoLogicProps {
  subtotal: number;
}

export function usePromoLogic({ subtotal }: UsePromoLogicProps) {
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [appliedPromoCode, setAppliedPromoCode] = useState<PromoCode | null>(
    null,
  );

  const { mutate: validatePromoMutation, isPending: isValidating } =
    useValidatePromo();

  const applyPromo = (code: string) => {
    if (!code.trim()) {
      toast.error("Masukkan kode promo");
      return;
    }

    validatePromoMutation(
      { code, amount: subtotal },
      {
        onSuccess: (response) => {
          if (response.success && response.data.isValid) {
            const data = response.data;

            const promo: PromoCode = {
              code: data.code,
              type: data.details.type,
              value: data.details.value,
              minPurchase: data.details.minOrderAmount,
              maxDiscount: data.details.maxDiscount,
              description: response.message || `Promo Code ${data.code}`,
              isActive: true,
            };

            setAppliedPromoCode(promo);

            const appliedPromoData: AppliedPromo =
              promo.type === "PERCENTAGE"
                ? {
                    type: "PERCENTAGE",
                    code: promo.code,
                    discountAmount: data.discountAmount,
                    discountPercentage: promo.value,
                  }
                : promo.type === "FREE_SHIPPING"
                  ? {
                      type: "FREE_SHIPPING",
                      code: promo.code,
                      discountAmount: data.discountAmount,
                    }
                  : {
                      type: "FIXED",
                      code: promo.code,
                      discountAmount: data.discountAmount,
                    };

            setAppliedPromo(appliedPromoData);
            toast.success(response.message || "Promo berhasil diterapkan!");
          } else {
            toast.error(response.message || "Kode promo tidak valid");
          }
        },
        onError: (error) => {
          const errorMessage = isAxiosError(error)
            ? error.response?.data?.message
            : "Kode promo tidak valid";
          toast.error(errorMessage || "Gagal memvalidasi kode promo");
        },
      },
    );
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setAppliedPromoCode(null);
    toast.success("Kode promo dihapus");
  };

  return {
    appliedPromo,
    appliedPromoCode,
    isValidating,
    applyPromo,
    removePromo,
  };
}
