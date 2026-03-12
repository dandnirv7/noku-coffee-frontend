import { PaymentSummary } from "./types";

export const formatIDR = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const calcTotal = (summary: PaymentSummary): number => {
  return (
    summary.subtotal - summary.discount + summary.shippingCost + summary.tax
  );
};
