import { useGetPayments } from "@/features/payment/api/use-get-payments";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PaymentStatus } from "../lib/types";
import { STATUS_CONFIG } from "../constants/payment-status-config";

export function usePaymentResult(orderId: string) {
  const { data, isLoading } = useGetPayments(orderId);

  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (text: string) => {
    try {
      if (!text) return;
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin teks", err);
    }
  };

  const handlePrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Struk-Pembayaran-${data?.orderNumber ?? orderId}`,
  });

  const handlePrint = () => {
    if (handlePrintFn) handlePrintFn();
  };

  const rawStatus = data?.status?.toLowerCase() ?? "";
  let status: PaymentStatus = "pending";

  if (["success", "paid", "settled"].includes(rawStatus)) {
    status = "success";
  } else if (["cancelled", "failed", "expired"].includes(rawStatus)) {
    status = "cancelled";
  }

  const config = STATUS_CONFIG[status];

  return {
    data,
    isLoading,
    status,
    config,
    isCopied,
    handleCopy,
    handlePrint,
    contentRef,
  };
}
