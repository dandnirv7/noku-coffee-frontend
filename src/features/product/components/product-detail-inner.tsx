"use client";

import { Activity, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";

import { ProductCard } from "@/components/shared/product-card";
import { useSearchProducts } from "@/features/search/api/search-products";
import { useGetProductBySlug } from "../api/get-product-by-slug";
import { ProductDetailSkeleton } from "./product-detail-skeleton";
import { ProductDetailError } from "./product-detail-error";
import { ProductInfoTabs } from "./product-info-tabs"; // Komponen pecahannya

interface ProductDetailViewProps {
  slug: string;
  onAddToCart?: (item: { productId: string; quantity: number }) => void;
}

export function ProductDetailView({
  slug,
  onAddToCart,
}: ProductDetailViewProps) {
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductBySlug(slug);
  const { data: relatedProducts } = useSearchProducts();

  if (isError) return <ProductDetailError reset={() => refetch()} />;

  return (
    <div className="container px-4 py-8 pb-24 mx-auto scale-105 md:px-6">
      {isLoading && <ProductDetailSkeleton />}

      <Activity mode={!isLoading && product ? "visible" : "hidden"}>
        {product && (
          <div className="duration-700 animate-in fade-in">
            <nav className="flex gap-2 items-center mb-6 text-sm text-muted-foreground">
              <Link href="/search" className="font-medium hover:text-primary">
                Belanja
              </Link>
              <ChevronRight size={14} />
              <span className="font-medium text-foreground">
                {product.category.name}
              </span>
              <ChevronRight size={14} />
              <span className="font-medium text-foreground truncate max-w-[200px]">
                {product.name}
              </span>
            </nav>

            <div className="grid gap-8 md:grid-cols-12 lg:gap-12">
              <div className="space-y-4 md:col-span-7">
                <div className="overflow-hidden relative rounded-3xl border aspect-square bg-muted group">
                  <Image
                    src={product.images[0] ?? "/placeholder-product.png"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button className="absolute top-4 right-4 p-3 rounded-full shadow-sm transition-all bg-white/80 hover:bg-white">
                    <Heart size={20} className="text-slate-600" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {product.images.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      className="overflow-hidden relative rounded-xl border aspect-square bg-muted"
                    >
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5">
                <ProductInfoTabs product={product} onAddToCart={onAddToCart} />
              </div>
            </div>

            <div className="pt-10 mt-20 border-t border-border">
              <h3 className="mb-6 text-2xl font-black tracking-tighter uppercase">
                Mungkin Anda Suka
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {relatedProducts?.data?.data.slice(0, 3).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </Activity>
    </div>
  );
}
