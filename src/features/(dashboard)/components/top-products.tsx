"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toRupiah, cn } from "@/lib/utils";
import { Trophy, Medal } from "lucide-react";
import { useTopProducts } from "../api/get-top-products";

export function TopProducts() {
  // Gunakan loading, error, dan data dari query
  const { data: topProducts, isLoading, isError, error } = useTopProducts();

  // Loading state
  if (isLoading) {
    return (
      <Card className="flex h-full w-full flex-col">
        <CardHeader>
          <CardTitle>Produk Terlaris</CardTitle>
          <CardDescription>Berdasarkan penjualan bulan ini</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center items-center">
          <div>Loading...</div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (isError) {
    return (
      <Card className="flex h-full w-full flex-col">
        <CardHeader>
          <CardTitle>Produk Terlaris</CardTitle>
          <CardDescription>Berdasarkan penjualan bulan ini</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center items-center">
          <div>
            Error:{" "}
            {error instanceof Error ? error.message : "Something went wrong"}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Jika data ada, render produk
  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader>
        <CardTitle>Produk Terlaris</CardTitle>
        <CardDescription>Berdasarkan penjualan bulan ini</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {topProducts?.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm font-bold",
                  index === 0
                    ? "bg-amber-500 ring-2 ring-amber-200"
                    : index === 1
                      ? "bg-slate-400 ring-2 ring-slate-200"
                      : index === 2
                        ? "bg-amber-700 ring-2 ring-orange-200"
                        : "bg-muted text-muted-foreground ring-1 ring-border",
                )}
              >
                {index === 0 ? (
                  <Trophy className="h-5 w-5" />
                ) : index === 1 || index === 2 ? (
                  <Medal className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              <div>
                <p className="font-semibold">{product.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground capitalize">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">{product.sold} terjual</div>
              <div className="text-sm text-emerald-600 font-medium">
                {toRupiah(product.revenueProduct)}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
