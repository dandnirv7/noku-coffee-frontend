"use client";

import { useGetInvoice } from "@/features/invoices/api/use-get-invoice";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InvoiceSkeleton from "./invoice-skeleton";
import { InvoiceBranding } from "./invoice-branding";
import { InvoiceMetaInfo } from "./invoice-meta-info";
import { InvoiceDetails } from "./invoice-details";
import { InvoiceItems } from "./invoice-items";
import { InvoicePaymentSummary } from "./invoice-payment-summary";
import { InvoiceNotes } from "./invoice-notes";
import { InvoiceCompanyInfo } from "./invoice-compay-info";

import { InvoiceProvider } from "../context/invoices-context";

export default function InvoiceInnerPage({
  invoiceId,
  isPrintOnly = false,
}: {
  invoiceId: string;
  isPrintOnly?: boolean;
}) {
  const { data: invoiceData, isLoading, isError } = useGetInvoice(invoiceId);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Faktur Noku Coffee - ${invoiceData?.invoiceNumber}`,
    pageStyle: `  
      @page { 
        size: auto;
        margin: 0mm !important; 
      }
      @media print {
        html, body {
          width: 100%;
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
          -webkit-print-color-adjust: exact; 
        }
      }
    `,
  });

  if (isLoading) {
    return <InvoiceSkeleton />;
  }

  if (isError || !invoiceData) {
    if (isPrintOnly) return null;
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center justify-center font-sans">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Faktur Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-6 text-center max-w-sm">
          Maaf, kami tidak dapat menemukan faktur untuk pesanan ini. Mungkin
          pesanan belum dibayar atau terjadi kesalahan.
        </p>
        <Button asChild>
          <Link href="/orders" className="text-blue-600 hover:text-blue-800">
            Kembali ke Daftar Pesanan
          </Link>
        </Button>
      </div>
    );
  }

  const orderNumber = invoiceData.order?.orderNumber || "NOT_FOUND";
  const trackingUrl = `https://nokucoffee.me/orders/${orderNumber}/tracking`;

  return (
    <div
      ref={printRef}
      className={`min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center font-sans print:p-0 print:bg-white ${
        isPrintOnly ? "hidden print:block" : ""
      }`}
    >
      <div className="w-full max-w-4xl bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden print:shadow-none print:border-none print:rounded-none">
        <div className="p-6 md:p-10 space-y-8 print:p-[20mm] print:space-y-6">
          <InvoiceProvider invoice={invoiceData}>
            <InvoiceBranding
              handlePrint={handlePrint}
              isPrintOnly={isPrintOnly}
            />

            <InvoiceMetaInfo />

            <InvoiceDetails />

            <InvoiceItems />

            <InvoicePaymentSummary />

            <InvoiceNotes />

            <div className="border-t border-gray-100 print:my-6" />

            <InvoiceCompanyInfo trackingUrl={trackingUrl} />
          </InvoiceProvider>
        </div>
      </div>
    </div>
  );
}
