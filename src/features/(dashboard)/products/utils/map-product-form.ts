import { ProductFormData } from "../lib/product-form-schema";

type ProductApi = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string | number;
  sku: string;
  type: string[];
  categoryId: string;
  images: string[];
  origin: string | null;
  roastLevel: string | null;
  process: string | null;
  weight: number | null;
  stock: number;
  category: {
    name: string;
  };
};

export function mapProductToForm(product: ProductApi): ProductFormData {
  return {
    name: product.name,
    categoryId: product.categoryId,
    type: product.type?.[0] || "",
    sku: product.sku,
    price: Number(product.price),
    stock: product.stock,
    weight: product.weight ?? 0,
    origin: product.origin || "",
    roastLevel: product.roastLevel || "",
    process: product.process || "",
    description: product.description || "",
    images: product.images || [],
  };
}
