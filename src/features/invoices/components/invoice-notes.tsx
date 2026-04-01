import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Mail, Package } from "lucide-react";

export const InvoiceNotes = () => {
  return (
    <Card className="bg-yellow-50/50 border-yellow-200 shadow-none print:hidden no-print">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3 text-yellow-800 font-semibold">
          <FileText className="w-5 h-5" />
          Catatan & Syarat
        </div>
        <ul className="space-y-2 text-xs text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 mt-0.5">•</span>
            <span>
              Terima kasih telah berbelanja di <strong>Noku Coffee</strong>.
              Kami menghargai kepercayaan Anda.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">
              <Package className="w-3 h-3" />
            </span>
            <span>
              Harap periksa kondisi barang saat diterima. Komplain berlaku 1x24
              jam sejak pesanan sampai. Syarat dan ketentuan berlaku.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">
              <Mail className="w-3 h-3" />
            </span>
            <span>
              Untuk dukungan atau pertanyaan:{" "}
              <a
                href="mailto:support@nokucoffee.me"
                className="text-primary font-semibold hover:underline"
              >
                support@nokucoffee.me
              </a>
            </span>
          </li>
        </ul>
        <Separator className="my-4 bg-yellow-200/60" />
        <p className="text-[10px] text-gray-400 text-center">
          Ini adalah faktur yang dihasilkan oleh komputer dan tidak memerlukan
          tanda tangan fisik. Semua informasi tunduk pada verifikasi.
        </p>
      </CardContent>
    </Card>
  );
};
