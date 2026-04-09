"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { ProductCard } from "@/components/shared/product-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useGetTopSelling } from "../../api/use-get-top-selling";

export function TopSellingProductsSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <Skeleton className="h-7 w-32 md:w-40" />
        <Skeleton className="h-8 w-20 md:w-24" />
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[160px] md:min-w-[200px]  md:max-w-[240px] border border-border rounded-xl p-4 space-y-4"
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

  if (!topProducts || topProducts.length === 0) return null;

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
                className="min-w-[160px] md:min-w-[200px]  md:max-w-[240px] snap-start shrink-0"
              >
                <ProductCard product={product} viewMode="grid" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
