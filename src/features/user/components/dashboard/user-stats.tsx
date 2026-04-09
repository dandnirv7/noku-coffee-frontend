"use client";

import { Clock, Package, ShoppingBag } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toRupiah } from "@/lib/utils";
import { useGetSummary } from "../../api/use-get-summary";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function UserStats() {
  const { data: summary, isLoading, isError } = useGetSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Skeleton className="h-[92px] w-full rounded-xl order-1 col-span-1" />
        <Skeleton className="h-[92px] w-full rounded-xl order-3 col-span-2 lg:order-2 lg:col-span-1" />
        <Skeleton className="h-[92px] w-full rounded-xl order-2 col-span-1 lg:order-3" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Terjadi kesalahan</AlertTitle>
        <AlertDescription>Gagal memuat statistik.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <Card className="order-1 col-span-1 bg-white border-none shadow-sm">
        <CardContent className="px-4 md:px-6">
          <div className="flex items-start md:items-center">
            <div className="p-3 rounded-lg bg-primary/10">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Total Pesanan
              </p>
              <p className="text-xl font-bold text-gray-900">
                {summary?.totalOrders ?? 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="order-3 col-span-2 bg-white border-none shadow-sm lg:order-2 lg:col-span-1">
        <CardContent className="px-4 md:px-6">
          <div className="flex items-start md:items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Total Pengeluaran
              </p>
              <p className="text-xl font-bold text-gray-900 lg:text-xl">
                {toRupiah(summary?.totalSpent ?? 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="order-2 col-span-1 bg-white border-none shadow-sm lg:order-3">
        <CardContent className="px-4 md:px-6">
          <div className="flex items-start md:items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Pesanan Aktif
              </p>
              <div className="flex flex-col gap-px md:gap-2 items-baseline md:flex-row">
                <p className="text-xl font-bold text-gray-900">
                  {summary?.activeOrders ?? 0}
                </p>
                <span className="text-xs font-medium text-orange-600">
                  Sedang Diproses
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
