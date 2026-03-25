import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Package, Phone, User } from "lucide-react";
import { useInvoice } from "../context/invoices-context";

export const InvoiceDetails = () => {
  const { invoice } = useInvoice();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold print:text-gray-800">
        <User className="w-5 h-5" />
        Detail Pelanggan & Pengiriman
      </div>
      <Card className="bg-[#f8fafc] border-blue-100/50 shadow-none print:bg-white print:border-gray-200">
        <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 print:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <User className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Nama Pelanggan</p>
                <p className="text-sm font-semibold">{invoice.customerName}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-semibold">{invoice.customerEmail}</p>
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
                <p className="text-sm font-semibold">{invoice.shippingPhone}</p>
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
  );
};
