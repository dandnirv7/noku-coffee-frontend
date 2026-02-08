import { Product } from "@/features/product/lib/products-schema";

export type ProductBadge = {
  key: string;
  value: string;
  variant?: "default" | "secondary" | "outline";
};

export function getProductBadges(product: Product): ProductBadge[] {
  return [
    product.origin && {
      key: "origin",
      value: product.origin,
      variant: "secondary",
    },

    product.roastLevel && {
      key: "roast",
      value: product.roastLevel,
      variant: "secondary",
    },

    product.weight && {
      key: "weight",
      value: `${product.weight}g`,
      variant: "secondary",
    },
  ].filter(Boolean) as ProductBadge[];
}
