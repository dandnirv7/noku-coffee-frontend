import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { CheckCircle2, MapPin, Phone, Truck } from "lucide-react";
import { OrderDetail } from "../../lib/order-schema";

interface TrackingStatusCardProps {
  order: OrderDetail;
  progress: number;
  remainingHours: number;
  remainingMinutes: number;
  currentLocation: string;
  latestEventDate?: string | null;
}

export const TrackingStatusCard = ({
  order,
  progress,
  remainingHours,
  remainingMinutes,
  currentLocation,
  latestEventDate,
}: TrackingStatusCardProps) => {
  const orderDate = new Date(order.date);
  const estimatedDeliveryDate = order.shipping.estimatedDelivery
    ? new Date(order.shipping.estimatedDelivery)
    : new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Status Pengiriman</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {order.status !== "delivered" && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
              <Truck className="h-5 w-5 text-blue-500 mt-0.5 mr-3 shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">
                  Pesanan Anda sedang dalam perjalanan!
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  {remainingHours > 0 || remainingMinutes > 0 ? (
                    <>
                      Estimasi tiba dalam{" "}
                      {remainingHours > 0 ? `${remainingHours} jam ` : ""}
                      {remainingMinutes > 0 ? `${remainingMinutes} menit` : ""}
                    </>
                  ) : (
                    "Pesanan Anda akan tiba sebentar lagi!"
                  )}
                </p>
              </div>
            </div>
          )}
          {order.status === "delivered" && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 shrink-0" />
              <div>
                <h3 className="font-medium text-green-800">
                  Pesanan Anda telah tiba!
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Pesanan telah diterima dengan baik.
                </p>
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Pesanan Dibuat</span>
              <span>Estimasi Kedatangan</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>
                {format(orderDate, "d MMM, HH:mm", { locale: localeId })}
              </span>
              <span>
                {format(estimatedDeliveryDate, "d MMM, HH:mm", {
                  locale: localeId,
                })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Lokasi Terkini</div>
              <div className="font-medium flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                {currentLocation}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Diperbarui{" "}
                {latestEventDate
                  ? format(new Date(latestEventDate), "d MMM, HH:mm", {
                      locale: localeId,
                    })
                  : "-"}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Kurir Pengiriman</div>
              <div className="font-medium">{order.shipping.method}</div>
              <div className="text-xs text-gray-500 mt-1 flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                Hubungi Bantuan Noku
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
