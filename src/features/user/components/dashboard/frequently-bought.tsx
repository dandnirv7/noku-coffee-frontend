"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toRupiah } from "@/lib/utils";
import { RotateCcw, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetFrequentlyBought } from "../../api/use-get-frequently-bought";
import { IconCoffee } from "@tabler/icons-react";

export default function FrequentlyBought() {
  const {
    data: frequentlyBought,
    isLoading,
    isError,
  } = useGetFrequentlyBought();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-60 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[60%]" />
                  <Skeleton className="h-4 w-[40%]" />
                  <Skeleton className="h-3 w-[30%]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sering Dibeli</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Terjadi kesalahan</AlertTitle>
            <AlertDescription>
              Gagal memuat produk yang sering dibeli.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!frequentlyBought || frequentlyBought.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sering Dibeli</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl bg-primary/10 animate-glow-pulse" />
              <div className="relative p-3 rounded-full bg-primary/10 text-primary animate-float">
                <ShoppingBag size={24} strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Belum ada produk favorit
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Jelajahi produk kami dan temukan produk favoritmu.
              </p>
            </div>
            <Button size="sm" asChild className="mt-2">
              <Link href="/search">
                <IconCoffee className="mr-2 w-4 h-4" />
                Cari Produk
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sering Dibeli</CardTitle>
        <p className="text-sm text-gray-500">Produk yang sering Anda beli</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {frequentlyBought.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 justify-between lg:flex-row"
            >
              <div className="flex items-center space-x-3">
                <div className="overflow-hidden w-12 h-12 rounded-lg">
                  <Image
                    src={
                      item.image ??
                      "https://qsdlsjidmrzdpctnfuet.supabase.co/storage/v1/object/public/product-images/products/xc5t6mngzvnwfxyyc2m47h3e.png"
                    }
                    alt={item.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {toRupiah(item.price)}
                  </p>
                  <p className="text-xs text-gray-400">
                    Dipesan {item.timesOrdered}x
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <RotateCcw className="mr-1 w-3 h-3" />
                Beli Lagi
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
