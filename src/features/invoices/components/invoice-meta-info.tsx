import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/features/user/hooks/formatDate";
import { useInvoice } from "../context/invoices-context";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

const getPaymentStatusConfig = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PAID":
      return {
        label: "Lunas",
        color:
          "bg-green-100 text-green-700 hover:bg-green-100 print:border-green-300",
        Icon: CheckCircle2,
      };
    case "PENDING":
      return {
        label: "Pending",
        color:
          "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 print:border-yellow-300",
        Icon: Clock,
      };
    case "FAILED":
      return {
        label: "Gagal",
        color: "bg-red-100 text-red-700 hover:bg-red-100 print:border-red-300",
        Icon: AlertCircle,
      };
    default:
      return {
        label: status || "Unknown",
        color:
          "bg-gray-100 text-gray-700 hover:bg-gray-100 print:border-gray-300",
        Icon: AlertCircle,
      };
  }
};

export const InvoiceMetaInfo = () => {
  const { invoice } = useInvoice();
  const statusConfig = getPaymentStatusConfig(invoice.status);
  const StatusIcon = statusConfig.Icon;

  const metaItems = [
    { label: "ID Faktur", value: invoice.invoiceNumber },
    {
      label: "Tanggal Faktur",
      value: formatDate(invoice.issuedAt),
    },
    {
      label: "Nomor Pesanan",
      value: invoice.order?.orderNumber || "-",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden">
        {metaItems.map((item, idx) => (
          <div
            key={idx}
            className={`bg-gray-50 p-4 rounded-lg border border-gray-100 print:bg-white print:border-gray-200 ${
              item.label === "ID Faktur" ? "print:hidden" : ""
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">{item.label}</p>
            <div
              className="font-semibold text-sm truncate"
              title={typeof item.value === "string" ? item.value : ""}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden print:grid grid-cols-[auto_32px_1fr] gap-y-1.5 text-sm max-w-lg">
        <p className="text-gray-500">No Invoice</p>
        <p className="text-gray-500 text-center pl-4">:</p>

        <div className="flex flex-row items-center gap-2">
          <p className="font-semibold text-gray-900 whitespace-nowrap">
            {invoice.invoiceNumber}
          </p>
          <div>
            <Badge
              className={`border-none flex items-center gap-1 print:border ${statusConfig.color}`}
            >
              <StatusIcon className="w-3 h-3" />
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        <p className="text-gray-500">Pembeli</p>
        <p className="text-gray-500 text-center pl-4">:</p>
        <p className="font-semibold text-gray-900">{invoice.customerName}</p>

        <p className="text-gray-500">Tanggal Pembelian</p>
        <p className="text-gray-500 text-center pl-4">:</p>
        <p className="font-semibold text-gray-900">
          {formatDate(invoice.issuedAt)}
        </p>
      </div>
    </>
  );
};
