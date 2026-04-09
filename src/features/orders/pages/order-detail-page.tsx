import OrderDetailInnerPage from "../components/order-detail/order-detail-inner-page";
import { Metadata } from "next";

type Props = {
  params: Promise<{ orderNumber: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderNumber } = await params;

  return {
    title: `Detail Pesanan #${orderNumber} | Noku Coffee`,
    description: `Periksa rincian lengkap pesanan #${orderNumber} Anda di Noku Coffee. Lihat item, rincian pembayaran, dan informasi pengiriman.`,
    openGraph: {
      title: `Detail Pesanan #${orderNumber} | Noku Coffee`,
      description: `Rincian lengkap pesanan #${orderNumber} di Noku Coffee.`,
      url: `https://nokucoffee.me/orders/${orderNumber}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Detail Pesanan #${orderNumber} | Noku Coffee`,
      description: `Rincian lengkap pesanan #${orderNumber} di Noku Coffee.`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function OrderDetailPage({ params }: Props) {
  const { orderNumber } = await params;

  return <OrderDetailInnerPage orderNumber={orderNumber} />;
}
