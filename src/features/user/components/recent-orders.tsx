"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toRupiah } from "@/lib/utils";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetRecentOrders } from "../api/use-get-recent-orders";

import placeholderProduct from "../../../../public/placeholder-product.png";
import { formatDate } from "../hooks/formatDate";
import { Order, OrderItem } from "../hooks/order-schema";

const statusLabels: Record<string, string> = {
  PAID: "Dibayar",
  CANCELLED: "Dibatalkan",
  SHIPPED: "Dikirim",
  COMPLETED: "Selesai",
  PENDING: "Menunggu",
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "PAID":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "SHIPPED":
      return <Truck className="h-4 w-4 text-blue-500" />;
    case "PENDING":
      return <Clock className="h-4 w-4 text-orange-500" />;
    case "CANCELLED":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "PAID":
      return "bg-green-100 text-green-800";
    case "SHIPPED":
      return "bg-blue-100 text-blue-800";
    case "PENDING":
      return "bg-orange-100 text-orange-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function RecentOrders() {
  const { data: recentOrders, isLoading } = useGetRecentOrders();

  if (isLoading) {
    return <Skeleton className="w-full h-[300px] rounded-xl" />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pesanan Terbaru</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/orders">
            Lihat Semua
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {recentOrders?.map((order: Order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {order.items
                    .slice(0, 2)
                    .map((item: OrderItem, index: number) => {
                      const imageUrl =
                        placeholderProduct || item.product.images?.[0];

                      return (
                        <div
                          key={index}
                          className="h-10 w-10 rounded-full border-2 border-white overflow-hidden relative"
                        >
                          <Image
                            src={imageUrl}
                            alt={item.productNameSnapshot}
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

                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <p className="font-medium">
                    {toRupiah(Number(order.totalAmount))}
                  </p>

                  <div className="flex items-center justify-end">
                    {getStatusIcon(order.status)}
                    <Badge className={`ml-2 ${getStatusColor(order.status)}`}>
                      {statusLabels[order.status] ?? order.status}
                    </Badge>
                  </div>
                </div>

                <Button variant="outline" size="sm" asChild>
                  <Link href={`/orders/${order.id}`}>Lihat</Link>
                </Button>
              </div>
            </div>
          ))}

          {(!recentOrders || recentOrders.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              Belum ada pesanan terbaru.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
