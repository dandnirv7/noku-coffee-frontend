"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, ShoppingBag, Star } from "lucide-react";
import { useGetUserStats } from "../api/use-get-user-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { toRupiah } from "@/lib/utils";

export function UserStats() {
  const { data: stats, isLoading } = useGetUserStats();

  console.log(stats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-primary" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Pesanan</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalOrders}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Total Pengeluaran
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {toRupiah(Number(stats.totalSpent))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Anggota Sejak</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.memberSince}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
