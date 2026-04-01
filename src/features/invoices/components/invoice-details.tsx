import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Package, Phone, User } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useInvoice } from "../context/invoices-context";

export const InvoiceDetails = ({ trackingUrl }: { trackingUrl: string }) => {
  const { invoice } = useInvoice();

  return (
    <>
      <div className="hidden print:grid grid-cols-2 gap-4 border-t pt-4 ">
        <div className="max-w-xs">
          <p className="font-semibold print:text-gray-800">Alamat Pengiriman</p>
          <div className="space-y-px">
            <p className=" text-gray-900">
              {invoice.shippingReceiver} [{invoice.shippingPhone}]
            </p>
            <p className="text-gray-900">{invoice.shippingAddress}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border border-gray-100 p-3 rounded-xl bg-gray-50 print:bg-white print:border-none w-fit justify-self-end">
          <div className="w-20 h-20 flex items-center justify-center">
            <QRCodeSVG value={trackingUrl} height={80} width={80} />
          </div>
          <p className="text-[10px] text-gray-500 font-medium">
            Pindai untuk Lacak
          </p>
        </div>
      </div>

      <div className="print:hidden">
        <div className="flex items-center gap-2 mb-4 text-primary font-semibold">
          <User className="w-5 h-5" />
          Detail Pelanggan & Pengiriman
        </div>
        <Card className="bg-primary/5 border-primary/10 shadow-none">
          <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <User className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Nama Pelanggan</p>
                  <p className="text-sm font-semibold">
                    {invoice.customerName}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-semibold">
                    {invoice.customerEmail}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">No. Telepon</p>
                  <p className="text-sm font-semibold">
                    {invoice.customerPhone || "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Package className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Penerima Barang</p>
                  <p className="text-sm font-semibold">
                    {invoice.shippingReceiver}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">No. Telepon Penerima</p>
                  <p className="text-sm font-semibold">
                    {invoice.shippingPhone}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Alamat Pengiriman</p>
                  <p className="text-sm font-medium text-gray-700 leading-snug">
                    {invoice.shippingAddress}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
