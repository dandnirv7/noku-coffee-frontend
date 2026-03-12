import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { MapPin, Phone, User } from "lucide-react";
import { OrderDetail } from "../../lib/order-schema";
import { OrderItemRow } from "../order-detail/order-item-row";

interface TrackingInfoSidebarProps {
  order: OrderDetail;
}

export const TrackingInfoSidebar = ({ order }: TrackingInfoSidebarProps) => {
  const estimatedDeliveryDate = order.shipping.estimatedDelivery
    ? new Date(order.shipping.estimatedDelivery)
    : new Date(new Date(order.date).getTime() + 2 * 24 * 60 * 60 * 1000);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Informasi Pengiriman</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Alamat Tujuan</h3>
              <div className="text-gray-600 space-y-1 text-sm">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400 shrink-0" />
                  <div>
                    <p>{order.shipping.address}</p>
                    <p>
                      {order.shipping.city}, {order.shipping.province}{" "}
                      {order.shipping.postalCode}
                    </p>
                    <p>{order.shipping.country}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Penerima</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  <div className="text-gray-600 font-medium">
                    {order.customer.name}
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <div className="text-gray-600">{order.customer.phone}</div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Rincian Kurir</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Metode</span>
                  <span className="font-medium text-right">
                    {order.shipping.method}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Nomor Resi</span>
                  <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                    {order.trackingNumber || "-"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estimasi Tiba</span>
                  <span className="font-medium text-right">
                    {format(estimatedDeliveryDate, "d MMM yyyy", {
                      locale: localeId,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <OrderItemRow
                key={index}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                image={null}
                className="py-1"
              />
            ))}

            <Separator />

            <div className="flex justify-between font-bold text-base pt-1">
              <span>Total Pembayaran</span>
              <span className="text-primary text-right">
                Rp {order.total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-orange-900">
            Butuh Bantuan?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-orange-800/80 mb-4 leading-relaxed">
            Mengalami kendala dengan pengiriman Anda? Tim layanan pelanggan kami
            siap membantu.
          </p>
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-sm border-0">
            Hubungi Bantuan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
