import { Button } from "@/components/ui/button";
import { Facebook, Instagram, MapPin, Twitter } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface InvoiceCompanyInfoProps {
  trackingUrl: string;
}

export const InvoiceCompanyInfo = ({
  trackingUrl,
}: InvoiceCompanyInfoProps) => {
  return (
    <>
      <div className="flex flex-row justify-between items-start md:items-center gap-6 pb-4 print:flex-row">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
            <MapPin className="w-4 h-4 text-blue-600 print:text-gray-800" />
            Noku Coffee Headquarters
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Gedung Noku Lantai 3<br />
            Kawasan Bisnis Sudirman
            <br />
            Jakarta Selatan, DKI Jakarta 12345
            <br />
            Indonesia
          </p>

          <div className="pt-2 print:hidden no-print">
            <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider">
              Ikuti Kami
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-full text-gray-500"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-full text-gray-500"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-full text-gray-500"
              >
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border border-gray-100 p-3 rounded-xl bg-gray-50 print:bg-white print:border-none">
          <div className="w-20 h-20 flex items-center justify-center">
            <QRCodeSVG value={trackingUrl} height={80} width={80} />
          </div>
          <p className="text-[10px] text-gray-500 font-medium">
            Pindai untuk Lacak
          </p>
        </div>
      </div>

      <div className="text-center text-[10px] text-gray-400 pt-4 print:text-left print:pt-6 print:border-t print:border-gray-200">
        © {new Date().getFullYear()} Noku Coffee. Hak cipta dilindungi
        undang-undang.
        <br className="print:hidden" />
        <span className="print:hidden">
          Faktur dicetak pada {new Date().toLocaleString("id-ID")}
        </span>
      </div>
    </>
  );
};
