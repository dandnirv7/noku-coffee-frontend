"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateWithTime } from "@/features/user/hooks/formatDate";
import { CheckCircle2, Clock } from "lucide-react";
import { useOrderDetail } from "../../context/order-detail-context";

export default function OrderTimeline() {
  const { order } = useOrderDetail();

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="text-lg">Riwayat Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-200 ml-3">
          {order.timeline.map((event, index) => (
            <li key={index} className="mb-6 ml-6">
              <span
                className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                  !event.isSimulated
                    ? "bg-green-100 ring-8 ring-white"
                    : "bg-gray-100 ring-8 ring-white"
                }`}
              >
                {!event.isSimulated ? (
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                ) : (
                  <Clock className="w-3 h-3 text-gray-400" />
                )}
              </span>
              <h3
                className={`flex items-center mb-1 text-base font-medium ${
                  !event.isSimulated ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {event.status}
                {event.isLatest && (
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full ml-3 uppercase tracking-wide">
                    Terbaru
                  </span>
                )}
              </h3>
              <time
                className={`block mb-1 text-sm font-normal leading-none ${
                  !event.isSimulated ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {event.date
                  ? event.isSimulated
                    ? `${formatDateWithTime(event.date)} (Estimasi)`
                    : formatDateWithTime(event.date)
                  : "Menunggu"}
              </time>
              <p
                className={`text-sm ${
                  !event.isSimulated ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {event.description}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
