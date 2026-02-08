export type PromoType = "PERCENTAGE" | "FIXED" | "FREE_SHIPPING";

export type PromoCode = {
  code: string;
  type: PromoType;
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  description: string;
  isActive: boolean;
};

export const PROMO_CODES: PromoCode[] = [
  {
    code: "NOKUHEMAT",
    type: "PERCENTAGE",
    value: 10,
    maxDiscount: 50000,
    description: "Diskon 10% hingga Rp50.000",
    isActive: true,
  },
  {
    code: "FREESHIP",
    type: "FREE_SHIPPING",
    value: 0,
    minPurchase: 200000,
    description: "Gratis ongkir untuk pembelian di atas Rp200.000",
    isActive: true,
  },
  {
    code: "NEWUSER",
    type: "FIXED",
    value: 30000,
    description: "Diskon Rp30.000 untuk pengguna baru",
    isActive: true,
  },
  {
    code: "BUNDLE50",
    type: "FIXED",
    value: 50000,
    minPurchase: 500000,
    description: "Diskon Rp50.000 untuk pembelian di atas Rp500.000",
    isActive: true,
  },
];

export function findPromoCode(code: string): PromoCode | undefined {
  return PROMO_CODES.find(
    (promo) =>
      promo.code.toUpperCase() === code.toUpperCase() && promo.isActive,
  );
}

export function calculatePromoDiscount(
  promo: PromoCode,
  subtotal: number,
  shippingCost: number = 0,
): number {
  if (promo.minPurchase && subtotal < promo.minPurchase) {
    return 0;
  }

  switch (promo.type) {
    case "PERCENTAGE": {
      const discount = (subtotal * promo.value) / 100;
      return promo.maxDiscount
        ? Math.min(discount, promo.maxDiscount)
        : discount;
    }

    case "FIXED":
      return promo.value;

    case "FREE_SHIPPING":
      return shippingCost;

    default:
      return 0;
  }
}
