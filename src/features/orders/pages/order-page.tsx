import { Suspense } from "react";
import OrderInnerPage from "../components/order-list/order-inner-page";
import { Metadata } from "next";
import { OrderListSkeleton } from "../components/skeleton/order-list-skeleton";

export function generateMetadata(): Metadata {
  return {
    title: "Pesanan Saya | Noku Coffee",
    description:
      "Lihat dan kelola riwayat pesanan Anda di Noku Coffee. Pantau status pengiriman dan detail transaksi Anda.",
    openGraph: {
      title: "Pesanan Saya | Noku Coffee",
      description: "Kelola riwayat pesanan Anda di Noku Coffee.",
      url: "https://nokucoffee.me/orders",
      siteName: "Noku Coffee",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Pesanan Saya | Noku Coffee",
      description: "Kelola riwayat pesanan Anda di Noku Coffee.",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function OrderPage() {
  return (
    <Suspense fallback={<OrderListSkeleton />}>
      <OrderInnerPage />
    </Suspense>
  );
}
