"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toRupiah } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetRecentOrders } from "../../api/use-get-recent-orders";

import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "../../hooks/formatDate";
import { StatusBadge, statusConfig } from "../dashboard/status-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function RecentOrders() {
  const { data: recentOrders, isLoading, isError } = useGetRecentOrders();

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-9 w-28" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-[120px] rounded-lg" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Terjadi kesalahan</AlertTitle>
        <AlertDescription>Gagal memuat pesanan terbaru.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-bold">Pesanan Terbaru</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/orders">
            Lihat Semua
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders?.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.orderNumber}`}
              className="block"
            >
              <div className="flex flex-col gap-4 justify-between p-4 rounded-sm border transition-colors lg:flex-row lg:items-center hover:border-primary/30">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2 md:gap-4 items-center">
                    <div className="flex items-end -space-x-3 shrink-0">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 1).map((item, index) => {
                          const imageUrl =
                            item.image || "/placeholder-product.png";
                          return (
                            <div
                              key={index}
                              className="h-10 w-10 rounded-full border-2 border-white overflow-hidden relative"
                            >
                              <Image
                                src={imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          );
                        })}
                        {order.items.length > 2 && (
                          <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium relative z-10">
                            +{order.items.length - 2}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold md:text-base md:font-bold text-gray-900">
                        {order.orderNumber}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(order.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-px md:gap-1 justify-between items-center md:items-start w-full md:w-auto">
                    <p className="text-sm font-semibold md:text-base md:font-bold text-primary">
                      {toRupiah(order.total)}
                    </p>
                    <div className="flex items-center">
                      <StatusBadge
                        status={order.status as keyof typeof statusConfig}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-center lg:w-auto">
                  {(order.status === "shipped" ||
                    order.status === "completed") && (
                    <div className="grid grid-cols-2 gap-2 w-full lg:flex lg:w-auto">
                      <Button variant="secondary" size="sm" className="h-9">
                        Pesan Lagi
                      </Button>
                      <Button variant="outline" size="sm" className="h-9">
                        Beri Rating
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
