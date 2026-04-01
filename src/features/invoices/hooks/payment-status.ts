import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

export const getPaymentStatusConfig = (status: string) => {
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
