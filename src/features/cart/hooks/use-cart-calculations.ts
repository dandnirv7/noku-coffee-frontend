import { CartItem, CartSummary, AppliedPromo } from "../lib/cart-schema";

const TAX_RATE = 0.11;
const FREE_SHIPPING_THRESHOLD = 500000;
const SHIPPING_COST = 15000;

export function calculateSubtotal(items: CartItem[]): number {
  return items
    .filter((item) => item.product.stock > 0)
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateTax(
  subtotal: number,
  taxRate: number = TAX_RATE,
): number {
  return subtotal * taxRate;
}

export function calculateShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function applyPromoDiscount(
  subtotal: number,
  promoCode: string | null,
): number {
  if (!promoCode) return 0;

  const promos: Record<string, number> = {
    WELCOME10: 0.1,
    NOKUHEMAT: 0.15,
  };

  const discountPercentage = promos[promoCode.toUpperCase()];
  return discountPercentage ? subtotal * discountPercentage : 0;
}

export function calculateCartSummary(
  items: CartItem[],
  appliedPromo: AppliedPromo | null = null,
): CartSummary {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const discount = appliedPromo?.discountAmount || 0;
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax - discount + shipping;

  return {
    subtotal,
    tax,
    taxRate: TAX_RATE,
    discount,
    shipping,
    total,
    itemCount: items.length,
  };
}

export function useCartCalculations(
  items: CartItem[],
  appliedPromo: AppliedPromo | null = null,
): CartSummary {
  return calculateCartSummary(items, appliedPromo);
}
