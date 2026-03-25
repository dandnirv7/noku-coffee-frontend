import { InvoiceFooter } from "@/features/invoices/components/layout/invoice-footer";
import { InvoiceNavbar } from "@/features/invoices/components/layout/invoice-navbar";

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InvoiceNavbar />
      {children}
      <InvoiceFooter />
    </>
  );
}
