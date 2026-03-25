import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { CheckCircle2, MapPin, Phone, Truck } from "lucide-react";
import { TrackingData } from "../../lib/order-schema";
import { useState, useEffect } from "react";

interface TrackingStatusCardProps {
  trackingData: TrackingData;
}

export const TrackingStatusCard = ({
  trackingData,
}: TrackingStatusCardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const orderDate = trackingData.status_summary.order_placed
    ? new Date(trackingData.status_summary.order_placed)
    : new Date();

  const estimatedDeliveryDate = trackingData.status_summary.estimated_delivery
    ? new Date(trackingData.status_summary.estimated_delivery)
    : new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000);

  const remainingTime = Math.max(
    0,
    estimatedDeliveryDate.getTime() - currentTime.getTime(),
  );
  const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
  const remainingMinutes = Math.floor(
    (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
  );

  const totalEvents = trackingData.timeline.length;
  const completedEvents = trackingData.timeline.filter(
    (t) => t.is_completed,
  ).length;
  const progress = totalEvents > 0 ? (completedEvents / totalEvents) * 100 : 0;

  const isFinished = trackingData.timeline.some(
    (t) => t.is_latest && t.status === "Selesai",
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Status Pengiriman</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!isFinished && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
              <Truck className="h-5 w-5 text-blue-500 mt-0.5 mr-3 shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">
                  {trackingData.status_summary.headline}
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  {trackingData.status_summary.sub_headline}
                </p>
              </div>
            </div>
          )}
          {isFinished && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 shrink-0" />
              <div>
                <h3 className="font-medium text-green-800">
                  {trackingData.status_summary.headline}
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  {trackingData.status_summary.sub_headline}
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
                {trackingData.status_summary.current_location}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Diperbarui{" "}
                {trackingData.status_summary.last_updated
                  ? format(
                      new Date(trackingData.status_summary.last_updated),
                      "d MMM, HH:mm",
                      {
                        locale: localeId,
                      },
                    )
                  : "-"}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Kurir Pengiriman</div>
              <div className="font-medium">
                {trackingData.delivery_information.shipping_method}
              </div>
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
