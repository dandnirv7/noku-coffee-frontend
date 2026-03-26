import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStatusBadge, getStatusIcon } from "@/features/orders/lib/constants";
import { OrderList } from "@/features/orders/lib/order-schema";
import { formatDate } from "@/features/user/hooks/formatDate";
import { toRupiah } from "@/lib/utils";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { OrderItemRow } from "../order-detail/order-item-row";

interface OrderCardProps {
  order: OrderList;
  onCancel?: (order: OrderList) => void;
}

export const OrderCard = ({ order, onCancel }: OrderCardProps) => {
  return (
    <Card className="overflow-hidden p-0 transition-all hover:shadow-md">
      <CardHeader className="py-4 bg-gray-50/50">
        <div className="flex flex-col gap-4 justify-between md:flex-row md:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center">
              {getStatusIcon(order.status)}
              <span className="ml-2 font-semibold">#{order.orderNumber}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="mr-1.5 w-4 h-4" />
              {formatDate(order.createdAt)}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {getStatusBadge(order.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            {order.items.slice(0, 1).map((item, index) => (
              <OrderItemRow
                key={index}
                name={item.productNameSnapshot || ""}
                quantity={item.quantity}
                price={Number(item.priceAtPurchase)}
                image={null}
              />
            ))}
            {order.items.length > 1 && (
              <div className="text-sm text-gray-400 mt-1 ml-[52px]">
                + {order.items.length - 1} produk lainnya
              </div>
            )}
          </div>

          <Separator className="opacity-50" />

          <div className="flex flex-col gap-4 justify-between sm:flex-row sm:items-center">
            <div className="space-y-0.5">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Pembayaran
              </div>
              <div className="text-lg font-bold text-primary">
                {toRupiah(Number(order.totalAmount))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {order.status === "PENDING" && onCancel && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                  onClick={() => onCancel(order)}
                >
                  Batalkan
                </Button>
              )}
              {order.shipping?.trackingNumber && (
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={`/orders/tracking/${order.shipping.trackingNumber}`}
                  >
                    Lacak
                  </Link>
                </Button>
              )}
              <Button asChild size="sm">
                <Link href={`/orders/${order.id}`} className="group">
                  Detail
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
