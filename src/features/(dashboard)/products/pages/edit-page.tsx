"use client";

import { IconLoader2 } from "@tabler/icons-react";
import { useGetProductBySlug } from "@/features/product/api/get-product-by-slug";
import ProductForm from "../components/product-form";

interface ProductEditPageProps {
  slug: string;
}

export default function ProductEditPage({ slug }: ProductEditPageProps) {
  const { data: product, isLoading, error } = useGetProductBySlug(slug!);

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center gap-4">
        <IconLoader2 className="h-8 w-8 animate-spin text-orange-500" />
        <p className="text-sm text-slate-500 font-medium">
          Memuat data produk...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-bold text-slate-800">
          Ups! Produk tidak ditemukan
        </h2>
        <p className="text-sm text-slate-500">
          Produk yang Anda cari mungkin telah dihapus atau URL tidak valid.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Produk</h1>
        <p className="text-muted-foreground text-sm">
          Perbarui informasi produk {product.name}
        </p>
      </div>
      <ProductForm
        initialData={{
          id: product.id,
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
        }}
      />
    </div>
  );
}
