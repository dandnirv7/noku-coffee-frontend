import { Product } from "@/features/product/lib/products-schema";

export type ProductBadge = {
  key: string;
  value: string;
  variant?: "default" | "secondary" | "outline";
};

export function getProductBadges(product: Product): ProductBadge[] {
  return [
    product.category?.name && {
      key: "category",
      value: product.category.name,
      variant: "secondary",
    },

    ...(product.type?.map((type) => ({
      key: "type",
      value: type,
      variant: "secondary" as const,
    })) ?? []),

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
