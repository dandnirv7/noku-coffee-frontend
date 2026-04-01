"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";
import { useOrderDetail } from "@/features/orders/context/order-detail-context";

export default function CustomerInformation() {
  const { order } = useOrderDetail();

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="text-lg">Informasi Pelanggan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start">
            <User className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">Nama</div>
              <div className="font-medium">{order.customer.name}</div>
            </div>
          </div>
          <div className="flex items-start">
            <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">Telepon</div>
              <div className="font-medium">{order.customer.phone}</div>
            </div>
          </div>
          <div className="flex items-start">
            <Mail className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium">{order.customer.email}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
