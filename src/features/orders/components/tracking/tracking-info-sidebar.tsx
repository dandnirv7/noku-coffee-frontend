import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { MapPin, Phone, User } from "lucide-react";
import { TrackingData } from "../../lib/order-schema";
import { OrderItemRow } from "../order-detail/order-item-row";

interface TrackingInfoSidebarProps {
  trackingData: TrackingData;
}

export const TrackingInfoSidebar = ({
  trackingData,
}: TrackingInfoSidebarProps) => {
  const estimatedDeliveryDate = trackingData.status_summary.estimated_delivery
    ? new Date(trackingData.status_summary.estimated_delivery)
    : new Date();

  return (
    <div className="space-y-6">
      <Card className="gap-2">
        <CardHeader>
          <CardTitle className="text-lg">Informasi Pengiriman</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Alamat Tujuan</h3>
              <div className="text-gray-600 space-y-1 text-sm">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400 shrink-0" />
                  <div>{trackingData.delivery_information.address}</div>
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
                    {trackingData.delivery_information.recipient}
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <div className="text-gray-600">
                    {trackingData.delivery_information.phone}
                  </div>
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
                    {trackingData.delivery_information.shipping_method}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Nomor Resi</span>
                  <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                    {trackingData.tracking_number || "-"}
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

      <Card className="gap-2">
        <CardHeader>
          <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trackingData.order_summary.items.map((item, index) => (
              <OrderItemRow
                key={index}
                name={item.name}
                quantity={item.qty}
                price={item.price}
                image={null}
                className="py-1"
              />
            ))}

            <Separator />

            <div className="flex justify-between font-bold text-base pt-1">
              <span>Total Pembayaran</span>
              <span className="text-primary text-right">
                Rp {trackingData.order_summary.total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-100 shadow-sm gap-2">
        <CardHeader>
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
