"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import Image from "next/image";
import { useGetFrequentlyBought } from "../api/use-get-frequently-bought";
import { Skeleton } from "@/components/ui/skeleton";
import { toRupiah } from "@/lib/utils";

import placeholderProduct from "../../../../public/placeholder-product.png";

export function FrequentlyBought() {
  const { data: items, isLoading } = useGetFrequentlyBought();

  if (isLoading) {
    return <Skeleton className="w-full h-[300px] rounded-xl" />;
  }

  if (!items || items.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sering Dibeli</CardTitle>
        <p className="text-sm text-gray-500">Item yang rutin Anda pesan</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-lg overflow-hidden relative shrink-0">
                <Image
                  src={placeholderProduct || item.product.images?.[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.product.name}
                </p>
                <p className="text-sm text-gray-500">
                  {toRupiah(Number(item.product.price))}
                </p>
                <p className="text-xs text-gray-400">
                  Dipesan {item.totalBought} kali
                </p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                <RotateCcw className="h-3 w-3 mr-1" />
                Beli Lagi
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
