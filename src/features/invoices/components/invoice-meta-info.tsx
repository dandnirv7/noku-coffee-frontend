import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/features/user/hooks/formatDate";
import { useInvoice } from "../context/invoices-context";

const PAYMENT_STATUS = [
  {
    value: "PAID",
    label: "Lunas",
    color: "bg-green-100 text-green-700 hover:bg-green-100 border-none",
  },
  {
    value: "PENDING",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none",
  },
  {
    value: "FAILED",
    label: "Gagal",
    color: "bg-red-100 text-red-700 hover:bg-red-100 border-none",
  },
];

export const InvoiceMetaInfo = () => {
  const { invoice } = useInvoice();

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
    {
      label: "Status Pembayaran",
      value: (
        <Badge
          className={
            (PAYMENT_STATUS.find((item) => item.value === invoice.status)
              ?.color || "") + " uppercase print:border print:border-green-300"
          }
        >
          {PAYMENT_STATUS.find((item) => item.value === invoice.status)
            ?.label || invoice.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-3">
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
  );
};
