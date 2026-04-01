import { Button } from "@/components/ui/button";
import { Download, FileText, Printer } from "lucide-react";

interface InvoiceBrandingProps {
  handlePrint: () => void;
}

export const InvoiceBranding = ({ handlePrint }: InvoiceBrandingProps) => {
  return (
    <div className="flex flex-row md:items-center justify-between gap-4 relative">
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
        <div className="flex items-center gap-2 text-primary font-semibold bg-primary/5 px-3 py-1 rounded-md uppercase text-sm">
          <FileText className="w-4 h-4" />
          Faktur
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-primary border-primary/10 hover:bg-primary/5 sm:hidden"
          onClick={handlePrint}
        >
          <Download className="w-4 h-4 mr-1" />
          Unduh
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-primary border-primary/10 hover:bg-primary/5 hidden sm:inline-flex"
          onClick={handlePrint}
        >
          <Printer className="w-4 h-4 mr-1" />
          Cetak / Simpan
        </Button>
      </div>

      <div className="hidden print:flex flex-col items-end gap-1 absolute top-0 right-0 ">
        <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-800">
          INVOICE
        </h2>
      </div>
    </div>
  );
};
