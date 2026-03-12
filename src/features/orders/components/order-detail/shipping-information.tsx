"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Truck } from "lucide-react";
import { useOrderDetail } from "../../context/order-detail-context";

export default function ShippingInformation() {
  const { order } = useOrderDetail();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Informasi Pengiriman</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">
              Alamat Pengiriman
            </h3>
            <div className="text-gray-600 space-y-1">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                <div>
                  <p>{order.shipping.address}</p>
                  <p>
                    {order.shipping.city}, {order.shipping.postalCode}
                  </p>
                  <p>{order.shipping.country}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">
              Metode Pengiriman
            </h3>
            <div className="text-gray-600 space-y-1">
              <p>{order.shipping.method}</p>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                Perkiraan tiba:
              </div>
              <div className="flex items-center text-sm mt-2">
                <Truck className="h-4 w-4 mr-1 text-gray-400" />
                Nomor resi: {order.trackingNumber}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
