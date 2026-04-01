"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvoiceClient from "@/features/invoices/components/invoice-inner-page";
import { useGetTracking } from "@/features/orders/api/use-get-tracking";
import {
  AlertCircle,
  ArrowLeft,
  Dot,
  FileText,
  MapPin,
  Package,
  RefreshCw,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OrderTrackingPageSkeleton from "../skeleton/order-tracking-skeleton";
import { TrackingInfoSidebar } from "./tracking-info-sidebar";
import { TrackingStatusCard } from "./tracking-status-card";
import { TrackingTimeline } from "./tracking-timeline";

export default function OrderTrackingInnerPage({
  trackingNumber,
}: {
  trackingNumber: string;
}) {
  const router = useRouter();
  const {
    data: trackingData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetTracking(trackingNumber);

  if (isLoading) {
    return <OrderTrackingPageSkeleton />;
  }

  if (isError || !trackingData) {
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

  const reversedTimeline = [...(trackingData.timeline || [])].reverse();

  return (
    <>
      <main className="container mx-auto px-4 py-8 flex-1 print:hidden">
        <div className="flex items-center mb-6">
          <Link
            href={`/orders/${trackingData.order_number}`}
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
            <div className="flex flex-col md:flex-row items-center text-gray-500 mt-1">
              <div className="flex flex-row items-center">
                <Package className="h-4 w-4 mr-1" />
                Pesanan #{trackingData.order_number}
              </div>
              <Dot className="hidden md:block" />
              <div>Resi #{trackingData.tracking_number || "Segera Tampil"}</div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={() => router.push(`/invoice/${trackingData.invoice_id}`)}
              disabled={!trackingData.invoice_id}
            >
              <FileText className="w-4 h-4 mr-2" />
              Invoice
            </Button>
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
            <TrackingStatusCard trackingData={trackingData} />

            <Card className="gap-2">
              <CardHeader>
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

            <TrackingTimeline timeline={reversedTimeline} />
          </div>

          <TrackingInfoSidebar trackingData={trackingData} />
        </div>
      </main>

      <div className="hidden print:block">
        {trackingData.order_id && (
          <InvoiceClient invoiceId={trackingData.order_id} />
        )}
      </div>
    </>
  );
}
