import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isValid } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { CheckCircle2, Clock } from "lucide-react";
import { TrackingData } from "../../lib/order-schema";

interface TrackingTimelineProps {
  timeline: TrackingData["timeline"];
}

export const TrackingTimeline = ({ timeline }: TrackingTimelineProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Riwayat Perjalanan Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-200 ml-3 mt-4">
          {timeline.map((event, index) => {
            let eventDate = null;
            if (event.time) {
              const normalizedTime = event.time.includes(" ")
                ? event.time.replace(" ", "T")
                : event.time;
              eventDate = new Date(normalizedTime);
            }

            const isDateValid = eventDate ? isValid(eventDate) : false;

            return (
              <li key={index} className="mb-6 ml-6">
                <span
                  className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                    event.is_completed
                      ? "bg-green-100 ring-4 ring-white"
                      : "bg-gray-100 ring-4 ring-white"
                  }`}
                >
                  {event.is_completed ? (
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  ) : (
                    <Clock className="w-3 h-3 text-gray-400" />
                  )}
                </span>
                <h3
                  className={`flex items-center mb-1 text-base font-medium ${
                    event.is_completed ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {event.status}
                  {event.is_latest && (
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full ml-3 uppercase tracking-wide">
                      Terbaru
                    </span>
                  )}
                </h3>

                <time
                  suppressHydrationWarning
                  className={`block mb-1 text-sm font-normal leading-none ${
                    event.is_completed ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {isDateValid
                    ? format(eventDate!, "d MMMM, HH:mm", {
                        locale: localeId,
                      })
                    : "Menunggu"}
                </time>
                <p
                  className={`text-sm ${
                    event.is_completed ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {event.description}
                </p>
              </li>
            );
          })}
          {timeline.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <p>Riwayat pesanan belum tersedia.</p>
            </div>
          )}
        </ol>
      </CardContent>
    </Card>
  );
};
