import { Metadata } from "next";
import InvoiceInnerPage from "../components/invoice-inner-page";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Faktur | Noku Coffee",
  description:
    "Lihat dan kelola riwayat pesanan Anda di Noku Coffee. Pantau status pengiriman dan detail transaksi Anda.",
  openGraph: {
    title: "Faktur | Noku Coffee",
    description: "Lihat faktur pesanan Anda di Noku Coffee.",
    url: "https://noku.coffee/orders/invoice",
    siteName: "Noku Coffee",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faktur | Noku Coffee",
    description: "Lihat faktur pesanan Anda di Noku Coffee.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function InvoicePage({ params }: Props) {
  const { id } = await params;
  return <InvoiceInnerPage invoiceId={id} />;
}
