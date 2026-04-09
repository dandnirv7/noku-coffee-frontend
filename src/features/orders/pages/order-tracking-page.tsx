import { Metadata } from "next";
import { getTracking } from "@/features/orders/api/use-get-tracking.server";
import OrderTrackingInnerPage from "../components/tracking/order-tracking-inner-page";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: trackingNumber } = await params;
  try {
    const trackingData = await getTracking(trackingNumber);
    return {
      title: `Lacak Pesanan #${trackingData.order_number} | Noku Coffee`,
      description: `Lacak status pengiriman pesanan Anda #${trackingData.order_number} dari Noku Coffee di real-time.`,
      openGraph: {
        title: `Lacak Pesanan #${trackingData.order_number} | Noku Coffee`,
        description: `Status pengiriman pesanan #${trackingData.order_number}.`,
        url: `https://nokucoffee.me/orders/tracking/${trackingData.tracking_number}`,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `Lacak Pesanan #${trackingData.order_number} | Noku Coffee`,
        description: `Status pengiriman pesanan #${trackingData.order_number}.`,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  } catch {
    return {
      title: "Lacak Pesanan | Noku Coffee",
      description: "Lacak status pengiriman pesanan Anda dari Noku Coffee.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default async function OrderTrackingPage({ params }: Props) {
  const { id: trackingNumber } = await params;

  try {
    await getTracking(trackingNumber);
  } catch (error: unknown) {
    console.error(
      "Gagal mendapatkan initial data untuk order tracking:",
      error,
    );
  }

  return <OrderTrackingInnerPage trackingNumber={trackingNumber} />;
}
