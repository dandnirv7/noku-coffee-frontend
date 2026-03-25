import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toRupiah } from "@/lib/utils";
import { Package } from "lucide-react";
import { useInvoice } from "../context/invoices-context";

export const InvoiceItems = () => {
  const { invoice } = useInvoice();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold print:text-gray-800">
        <Package className="w-5 h-5" />
        Ringkasan Pesanan
      </div>

      <div className="hidden md:block print:block border rounded-lg overflow-hidden print:border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50 print:bg-gray-100">
            <TableRow>
              <TableHead className="w-[300px] font-semibold text-gray-600 text-xs">
                NAMA PRODUK
              </TableHead>
              <TableHead className="font-semibold text-gray-600 text-xs">
                SKU
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-600 text-xs">
                QTY
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-600 text-xs">
                HARGA SATUAN
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-600 text-xs">
                TOTAL
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-semibold text-sm">
                  {item.productName}
                </TableCell>
                <TableCell className="text-gray-500 text-xs font-mono">
                  {item.productSku || "-"}
                </TableCell>
                <TableCell className="text-center font-semibold text-sm">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {toRupiah(Number(item.price))}
                </TableCell>
                <TableCell className="text-right font-bold text-sm">
                  {toRupiah(Number(item.subtotal))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden print:hidden space-y-3">
        {invoice.items.map((item, index: number) => (
          <Card key={index} className="shadow-none border-gray-200">
            <CardContent className="p-4 space-y-2">
              <div className="font-semibold text-sm">{item.productName}</div>
              <div className="text-xs text-gray-500 font-mono">
                SKU: {item.productSku || "-"}
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-gray-500">
                  Qty: {item.quantity} <span className="mx-1">•</span>{" "}
                  {toRupiah(Number(item.price))}
                </div>
                <div className="font-bold text-sm">
                  {toRupiah(Number(item.subtotal))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
