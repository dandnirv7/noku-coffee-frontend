"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, PackageOpen } from "lucide-react";
import { useLowStock } from "../api/get-low-stock";
import { LowStockSkeleton } from "./dashboard-skeleton";

export function LowStockAlert() {
  const { data: lowStockItems, isLoading, isError, error } = useLowStock();

  if (isLoading) {
    return <LowStockSkeleton />;
  }

  if (isError) {
    return (
      <Card className="py-0 flex h-[430px] w-full flex-col border-red-100 shadow-sm">
        <CardHeader className="bg-red-50/50 py-4">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle className="text-lg">Peringatan Stok Menipis</CardTitle>
          </div>
          <CardDescription>
            Produk yang membutuhkan restock segera
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-6 pt-6">
          <div className="flex items-center justify-center">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-red-600">{error?.message}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="py-0 flex h-[430px] w-full flex-col border-red-100 shadow-sm">
      <CardHeader className="bg-red-50/50 py-4">
        <div className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-5 w-5" />
          <CardTitle className="text-lg">Peringatan Stok Menipis</CardTitle>
        </div>
        <CardDescription>
          Produk yang membutuhkan restock segera
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6 pt-6 overflow-y-auto">
        {lowStockItems?.map((item) => {
          const percent = (item.stock / 100) * 100;
          return (
            <div key={item.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-muted p-1">
                    <PackageOpen className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="font-semibold text-sm">{item.name}</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-red-600">{item.stock}</span>
                  <span className="text-muted-foreground text-xs ml-1">
                    / {100}
                  </span>
                </div>
              </div>
              <Progress value={percent} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
