import PaymentPage from "@/features/payment/pages/payment-page";
import { Metadata } from "next";

type Props = {
  params: Promise<{ orderId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Pembayaran Berhasil | Noku Coffee`,
    description: `Detail pembayaran pesanan ${orderId} di Noku Coffee`,
  };
}

export default async function Page({ params }: Props) {
  const { orderId } = await params;

  return <PaymentPage orderId={orderId} />;
}
