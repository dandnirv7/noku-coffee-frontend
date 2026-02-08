import { useState } from "react";
import { toast } from "sonner";
import { validatePromo } from "../api/validate-promo";
import { AppliedPromo } from "../lib/cart-schema";
import { PromoCode } from "../lib/promo-codes";
import { getErrorMessage } from "../../../lib/error-utils";

interface UsePromoLogicProps {
  subtotal: number;
  shipping: number;
}

export function usePromoLogic({ subtotal, shipping }: UsePromoLogicProps) {
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [appliedPromoCode, setAppliedPromoCode] = useState<PromoCode | null>(
    null,
  );
  const [isValidating, setIsValidating] = useState(false);

  const applyPromo = async (code: string): Promise<void> => {
    if (!code.trim()) {
      toast.error("Masukkan kode promo");
      return;
    }

    setIsValidating(true);
    try {
      const result = await validatePromo({
        code,
        subtotal,
        shippingCost: shipping,
      });

      if (
        result.success &&
        result.promo &&
        result.discountAmount !== undefined
      ) {
        setAppliedPromoCode(result.promo);

        const appliedPromoData: AppliedPromo =
          result.promo.type === "PERCENTAGE"
            ? {
                type: "PERCENTAGE",
                code: result.promo.code,
                discountAmount: result.discountAmount,
                discountPercentage: result.promo.value,
              }
            : result.promo.type === "FREE_SHIPPING"
              ? {
                  type: "FREE_SHIPPING",
                  code: result.promo.code,
                  discountAmount: result.discountAmount,
                }
              : {
                  type: "FIXED",
                  code: result.promo.code,
                  discountAmount: result.discountAmount,
                };

        setAppliedPromo(appliedPromoData);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        "Gagal memvalidasi kode promo",
      );
      toast.error(errorMessage);
    } finally {
      setIsValidating(false);
    }
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
