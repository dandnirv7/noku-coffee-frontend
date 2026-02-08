import {
  calculatePromoDiscount,
  findPromoCode,
  PromoCode,
} from "../lib/promo-codes";

export type ValidatePromoParams = {
  code: string;
  subtotal: number;
  shippingCost?: number;
};

export type ValidatePromoResult = {
  success: boolean;
  message: string;
  promo?: PromoCode;
  discountAmount?: number;
};

export async function validatePromo({
  code,
  subtotal,
  shippingCost = 0,
}: ValidatePromoParams): Promise<ValidatePromoResult> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const promo = findPromoCode(code);

  if (!promo) {
    return {
      success: false,
      message: "Kode promo tidak valid",
    };
  }

  if (promo.minPurchase && subtotal < promo.minPurchase) {
    return {
      success: false,
      message: `Minimum pembelian Rp${promo.minPurchase.toLocaleString("id-ID")} untuk menggunakan kode ini`,
    };
  }

  const discountAmount = calculatePromoDiscount(promo, subtotal, shippingCost);

  return {
    success: true,
    message: `Kode promo "${promo.code}" berhasil diterapkan!`,
    promo,
    discountAmount,
  };
}
