"use client";

import { Button } from "@/components/ui/button";
import { formatDateWithTime } from "@/features/user/hooks/formatDate";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useOrderDetail } from "../../context/order-detail-context";
import { OrderStatusBadge } from "../common/order-status-badge";

export default function OrderDetailHeader() {
  const { order } = useOrderDetail();

  return (
    <>
      <div className="flex items-center mb-6">
        <Link
          href="/orders"
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke pesanan
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              Pesanan #{order.orderNumber}
            </h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="flex items-center text-gray-500 mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDateWithTime(order.date)} WIB
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/orders/tracking/${order.trackingNumber}`}>
              Lacak Pesanan
            </Link>
          </Button>

          <Button variant="outline" size="sm">
            Hubungi Support
          </Button>
        </div>
      </div>
    </>
  );
}
