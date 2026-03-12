"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrderDetail } from "../../context/order-detail-context";
import { OrderItemRow } from "./order-item-row";

export default function OrderItems() {
  const { order } = useOrderDetail();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Item Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <OrderItemRow
              key={index}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              image={null}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
