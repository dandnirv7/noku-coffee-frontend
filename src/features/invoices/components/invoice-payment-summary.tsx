import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toRupiah } from "@/lib/utils";
import { CheckCircle2, CreditCard } from "lucide-react";
import { useInvoice } from "../context/invoices-context";

export const InvoicePaymentSummary = () => {
  const { invoice } = useInvoice();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold print:text-gray-800">
        <CreditCard className="w-5 h-5" />
        Detail Pembayaran
      </div>
      <div className="flex md:justify-end print:justify-end">
        <Card className="w-full md:w-[400px] print:w-1/2 shadow-sm print:shadow-none print:border-gray-200">
          <CardContent className="p-5 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">
                {toRupiah(Number(invoice.subtotal))}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Pajak (Tax)</span>
              <span className="font-semibold text-gray-900">
                {toRupiah(Number(invoice.taxAmount))}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Ongkos Kirim</span>
              <span className="font-semibold text-gray-900">
                {Number(invoice.shippingCost) === 0
                  ? "Gratis"
                  : toRupiah(Number(invoice.shippingCost))}
              </span>
            </div>
            <div className="flex justify-between text-sm font-medium text-green-600">
              <span>Diskon</span>
              <span>- {toRupiah(Number(invoice.discountAmount))}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total Keseluruhan</span>
              <span className="font-bold text-xl text-blue-600 print:text-gray-900">
                {toRupiah(Number(invoice.totalAmount))}
              </span>
            </div>

            <div className="mt-4 bg-blue-50 p-3 rounded-lg flex items-center justify-between border border-blue-100 print:bg-gray-50 print:border-gray-200">
              <div className="flex items-center gap-2">
                <CreditCard className="w-7 h-7 text-blue-600 print:text-gray-600 print:w-5 print:h-5" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-semibold">
                    Metode Pembayaran
                  </p>
                  <p className="font-bold text-sm text-gray-900">
                    {invoice.paymentMethod}
                  </p>
                </div>
              </div>
              {invoice.status === "PAID" && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none flex items-center gap-1 px-2 py-1 print:border print:border-green-300">
                  <CheckCircle2 className="w-3 h-3" />
                  Lunas
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
