import { Metadata } from "next";
import { getDetailOrder } from "@/features/orders/api/use-get-detail-order.server";
import OrderTrackingInnerPage from "../components/tracking/order-tracking-inner-page";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const orderId = params.id;
  try {
    const order = await getDetailOrder(orderId);
    return {
      title: `Lacak Pesanan #${order.id} | Noku Coffee`,
      description: `Lacak status pengiriman pesanan Anda #${order.id} dari Noku Coffee di real-time.`,
      openGraph: {
        title: `Lacak Pesanan #${order.id} | Noku Coffee`,
        description: `Status pengiriman pesanan #${order.id}.`,
        url: `https://noku.coffee/orders/tracking/${order.id}`,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `Lacak Pesanan #${order.id} | Noku Coffee`,
        description: `Status pengiriman pesanan #${order.id}.`,
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

export default async function OrderTrackingPage({
  params,
}: {
  params: { id: string };
}) {
  const orderId = params.id;
  let initialData = undefined;

  try {
    initialData = await getDetailOrder(orderId);
  } catch (error: unknown) {
    console.error(
      "Gagal mendapatkan initial data untuk order tracking:",
      error,
    );
  }

  return <OrderTrackingInnerPage orderId={orderId} initialData={initialData} />;
}
