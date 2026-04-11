"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

import { ProductCard } from "@/components/shared/product-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useGetTopSelling } from "../../api/use-get-top-selling";
import { useProductActions } from "@/features/product/hooks/use-product-actions";

export function TopSellingProductsSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <Skeleton className="h-7 w-32 md:w-40" />
        <Skeleton className="h-8 w-20 md:w-24" />
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-hidden pb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[160px] md:min-w-[200px] md:max-w-[280px] shrink-0 border border-border rounded-xl p-4 space-y-4 w-full"
            >
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="pt-4">
                  <Skeleton className="h-9 w-full rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function TopSellingProducts() {
  const { data: topProducts, isLoading, isError } = useGetTopSelling();
  const {
    getCartQuantity,
    isInWishlist,
    updatingQuantityItemId,
    creatingCartItemId,
    togglingWishlistItemId,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleToggleWishlist,
  } = useProductActions();

  if (isLoading) {
    return <TopSellingProductsSkeleton />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Terjadi kesalahan</AlertTitle>
        <AlertDescription>Gagal memuat produk terlaris.</AlertDescription>
      </Alert>
    );
  }

  if (!topProducts || topProducts.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-bold">Produk Terlaris</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
            <div className="p-4 rounded-full bg-primary/10">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                Belum ada produk terlaris
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Jelajahi berbagai pilihan produk kopi terbaik kami!
              </p>
            </div>
            <Button size="sm" asChild className="mt-2">
              <Link href="/search">Lihat Produk</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-bold">Produk Terlaris</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary hover:bg-primary/5"
          asChild
        >
          <Link href="/search">Lihat Semua</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {topProducts?.map((product) => {
            return (
              <div
                key={product.id}
                className="min-w-[160px] md:min-w-[200px]  md:max-w-[280px] snap-start shrink-0"
              >
                <ProductCard
                  product={product}
                  viewMode="grid"
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveFromCart={handleRemoveFromCart}
                  cartQuantity={getCartQuantity(product.id)}
                  isInWishlist={isInWishlist(product.id)}
                  isAddingToCart={creatingCartItemId === product.id}
                  isUpdatingQuantity={updatingQuantityItemId === product.id}
                  isTogglingWishlist={togglingWishlistItemId === product.id}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
