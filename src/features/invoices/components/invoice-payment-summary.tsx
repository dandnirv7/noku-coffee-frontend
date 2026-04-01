import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toRupiah } from "@/lib/utils";
import { CreditCard } from "lucide-react";
import { useInvoice } from "../context/invoices-context";
import { getPaymentStatusConfig } from "../hooks/payment-status";

export const InvoicePaymentSummary = () => {
  const { invoice } = useInvoice();
  const statusConfig = getPaymentStatusConfig(invoice.status);
  const StatusIcon = statusConfig.Icon;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 text-primary font-semibold print:hidden">
        <CreditCard className="w-5 h-5" />
        Detail Pembayaran
      </div>

      <div className="flex md:justify-end print:justify-end print:border-t">
        <Card className="w-full md:w-[400px] print:w-full print:max-w-sm shadow-sm print:shadow-none print:border-none print:bg-transparent">
          <CardContent className="p-5 print:p-0 space-y-3">
            <div className="flex justify-between text-sm text-gray-600 print:text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900 print:text-black">
                {toRupiah(Number(invoice.subtotal))}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-600 print:text-gray-700">
              <span>Ongkos Kirim</span>
              <span className="font-semibold text-gray-900 print:text-black">
                {Number(invoice.shippingCost) === 0
                  ? "Gratis"
                  : toRupiah(Number(invoice.shippingCost))}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-600 print:text-gray-700">
              <span>Pajak (Tax)</span>
              <span className="font-semibold text-gray-900 print:text-black">
                {toRupiah(Number(invoice.taxAmount))}
              </span>
            </div>

            <div className="flex justify-between text-sm font-medium text-green-600 ">
              <span>Diskon</span>
              <span>- {toRupiah(Number(invoice.discountAmount))}</span>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 print:border-gray-300 pt-3 mt-3">
              <span className="font-bold text-gray-900 print:text-gray-800">
                Total Keseluruhan
              </span>
              <span className="font-bold text-xl text-primary print:text-black print:text-lg">
                {toRupiah(Number(invoice.totalAmount))}
              </span>
            </div>

            <div className="mt-4 bg-primary/5 p-3 rounded-lg flex items-center justify-between border border-primary/10 print:bg-gray-50 print:border-gray-200">
              <div className="flex items-center gap-2">
                <CreditCard className="w-7 h-7 text-primary print:text-gray-600 print:w-5 print:h-5" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-semibold">
                    Metode Pembayaran
                  </p>
                  <p className="font-bold text-sm text-gray-900">
                    {invoice.paymentChannel}
                  </p>
                </div>
              </div>

              <Badge
                className={`print:hidden border-none flex items-center gap-1 px-2 py-1 print:border ${statusConfig.color}`}
              >
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
