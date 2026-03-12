"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toRupiah } from "@/lib/utils";
import { useOrderDetail } from "@/features/orders/context/order-detail-context";

export default function OrderSummary() {
  const { order } = useOrderDetail();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>{toRupiah(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Diskon</span>
              <span className="text-green-600">
                -{toRupiah(order.discount)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Ongkos Kirim</span>
              <span>{toRupiah(order.deliveryFee)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{toRupiah(order.total)}</span>
          </div>

          <div className="pt-2">
            <div className="text-sm text-gray-500 mb-1">Metode Pembayaran</div>
            <div className="font-medium">{order.paymentMethod}</div>
            <div className="text-sm text-green-600 mt-1">
              {order.paymentStatus}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
