"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderDetail } from "@/features/orders/lib/order-schema";
import { useQuery } from "@tanstack/react-query";
import { getDetailOrderOptions } from "@/features/orders/api/use-get-detail-order";
import { TrackingStatusCard } from "./tracking-status-card";
import { TrackingTimeline } from "./tracking-timeline";
import { TrackingInfoSidebar } from "./tracking-info-sidebar";
import {
  ArrowLeft,
  MapPin,
  Package,
  RefreshCw,
  Share2,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function OrderTrackingInnerPage({
  orderId,
  initialData,
}: {
  orderId: string;
  initialData?: OrderDetail;
}) {
  const {
    data: order,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    ...getDetailOrderOptions(orderId),
    ...(initialData ? { initialData } : {}),
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6 animate-pulse flex-1">
        <Skeleton className="h-4 w-32 mb-6" />
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center flex-1">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Pencarian Pesanan Gagal</h2>
        <p className="text-muted-foreground mb-6">
          Tidak dapat menemukan informasi pelacakan untuk pesanan ini.
        </p>
        <Button asChild>
          <Link href="/orders">Kembali ke Daftar Pesanan</Link>
        </Button>
      </div>
    );
  }

  const estimatedDeliveryDate = order.shipping.estimatedDelivery
    ? new Date(order.shipping.estimatedDelivery)
    : new Date(new Date(order.date).getTime() + 2 * 24 * 60 * 60 * 1000);

  const remainingTime = Math.max(
    0,
    estimatedDeliveryDate.getTime() - currentTime.getTime(),
  );
  const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
  const remainingMinutes = Math.floor(
    (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
  );

  const sortedTimeline = [...(order.timeline || [])].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const latestEvent = sortedTimeline.find((t) => t.date);
  const currentLocation = latestEvent
    ? latestEvent.status
    : "Pusat Distribusi Noku";

  const totalEvents = order.timeline.length;
  const completedEvents = order.timeline.filter((t) => t.date !== null).length;
  const progress = totalEvents > 0 ? (completedEvents / totalEvents) * 100 : 0;

  return (
    <main className="container mx-auto px-4 py-8 flex-1">
      <div className="flex items-center mb-6">
        <Link
          href={`/orders/${order.id}`}
          className="flex items-center text-gray-500 hover:text-gray-700 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke rincian pesanan
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Lacak Pesanan Anda
          </h1>
          <div className="flex items-center text-gray-500 mt-1">
            <Package className="h-4 w-4 mr-1" />
            Pesanan #{order.id} • Resi #
            {order.trackingNumber || "Segera Tampil"}
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Menyegarkan...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Segarkan
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TrackingStatusCard
            order={order}
            progress={progress}
            remainingHours={remainingHours}
            remainingMinutes={remainingMinutes}
            currentLocation={currentLocation}
            latestEventDate={latestEvent?.date}
          />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Peta Lokasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg overflow-hidden h-64 relative border border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 z-10 backdrop-blur-[1px]">
                  <div className="flex flex-col items-center">
                    <MapPin className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500 font-medium text-sm">
                      Peta akan tersedia saat pesanan dikirim
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <TrackingTimeline
            timeline={order.timeline}
            completedEvents={completedEvents}
          />
        </div>

        <TrackingInfoSidebar order={order} />
      </div>
    </main>
  );
}
