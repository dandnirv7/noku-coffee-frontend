"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { ProductCard } from "@/components/shared/product-card";
import {
  DailyDiscount,
  useGetDailyDiscount,
} from "../api/use-get-daily-discounts";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/features/product/lib/products-schema";

export function PersonalizedDeals() {
  const { data: personalizedDeals, isLoading } = useGetDailyDiscount();

  if (isLoading) {
    return <Skeleton className="w-full h-[400px] rounded-xl" />;
  }

  if (!personalizedDeals || personalizedDeals.length === 0) return null;

  const getJakartaTimeEnd = (dayKey: string) => {
    const dayDate = new Date(dayKey + "T00:00:00Z");
    dayDate.setHours(dayDate.getHours() + 7);
    dayDate.setDate(dayDate.getDate() + 1);
    return dayDate;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
        <div>
          <CardTitle>Promo Harian Khusus Untukmu</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Penawaran personal berdasarkan preferensi Anda
          </p>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-primary mr-2" />
          <span className="text-sm text-gray-700 mr-2">Berakhir dalam:</span>
          {personalizedDeals.length > 0 && (
            <CountdownTimer
              targetDate={getJakartaTimeEnd(personalizedDeals[0].dayKey)}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personalizedDeals.slice(0, 3).map((product: DailyDiscount) => (
            <div key={product.id} className="relative">
              <ProductCard
                product={product.product as Product}
                dealBadge={
                  <div className="absolute top-3 left-3 space-y-1 z-30 pointer-events-none">
                    <Badge className="bg-primary hover:bg-primary/90 block shadow-sm">
                      DISKON {product.discountPercent}%
                    </Badge>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
