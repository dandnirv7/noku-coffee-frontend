"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateWithTime } from "@/features/user/hooks/formatDate";
import { CheckCircle2, Clock } from "lucide-react";
import { useOrderDetail } from "../../context/order-detail-context";

export default function OrderTimeline() {
  const { order } = useOrderDetail();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Riwayat Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-200 ml-3">
          {order.timeline.map((event, index) => (
            <li key={index} className="mb-6 ml-6">
              <span
                className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                  event.date
                    ? "bg-green-100 ring-8 ring-white"
                    : "bg-gray-100 ring-8 ring-white"
                }`}
              >
                {event.date ? (
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                ) : (
                  <Clock className="w-3 h-3 text-gray-400" />
                )}
              </span>
              <h3
                className={`flex items-center mb-1 text-base font-medium ${
                  event.date ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {event.status}
                {index === 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                    Terbaru
                  </span>
                )}
              </h3>
              <time
                className={`block mb-1 text-sm font-normal leading-none ${
                  event.date ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {event.date ? formatDateWithTime(event.date) : "Menunggu"}
              </time>
              <p
                className={`text-sm ${event.date ? "text-gray-600" : "text-gray-400"}`}
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
