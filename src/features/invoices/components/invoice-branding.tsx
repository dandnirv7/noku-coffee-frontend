import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useInvoice } from "../context/invoices-context";

interface InvoiceBrandingProps {
  handlePrint: () => void;
  isPrintOnly?: boolean;
}

export const InvoiceBranding = ({
  handlePrint,
  isPrintOnly = false,
}: InvoiceBrandingProps) => {
  const { invoice } = useInvoice();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center font-bold text-xl text-white print:-ml-1">
          NK
        </div>
        <div>
          <h1 className="font-bold text-xl text-gray-900">Noku Coffee</h1>
          <p className="text-sm text-gray-500">Biji Kopi & Peralatan</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 print:hidden no-print">
        <div className="flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-md uppercase text-sm">
          <FileText className="w-4 h-4" />
          Faktur
        </div>
        <Button
          variant="outline"
          size="sm"
          className={`text-blue-600 border-blue-200 hover:bg-blue-50 ${isPrintOnly ? "hidden" : ""}`}
          onClick={handlePrint}
        >
          <Download className="w-4 h-4 mr-2" />
          Cetak / Simpan PDF
        </Button>
      </div>
      <div className="hidden print:flex flex-col items-end gap-1">
        <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-800">
          INVOICE
        </h2>
        <p className="text-sm font-medium text-gray-500">
          {invoice.invoiceNumber}
        </p>
      </div>
    </div>
  );
};
