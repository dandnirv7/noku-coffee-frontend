import OrderDetailInnerPage from "../components/order-detail/order-detail-inner-page";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Detail Pesanan #${id} | Noku Coffee`,
    description: `Periksa rincian lengkap pesanan #${id} Anda di Noku Coffee. Lihat item, rincian pembayaran, dan informasi pengiriman.`,
    openGraph: {
      title: `Detail Pesanan #${id} | Noku Coffee`,
      description: `Rincian lengkap pesanan #${id} di Noku Coffee.`,
      url: `https://noku.coffee/orders/${id}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Detail Pesanan #${id} | Noku Coffee`,
      description: `Rincian lengkap pesanan #${id} di Noku Coffee.`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;

  return <OrderDetailInnerPage orderId={id} />;
}
