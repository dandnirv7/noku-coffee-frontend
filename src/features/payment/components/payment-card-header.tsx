import { AlertCircle } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { StatusConfig } from "../constants/payment-status-config";
import { PaymentStatus } from "../lib/types";

type Props = {
  status: PaymentStatus;
  config: StatusConfig;
};

export function PaymentCardHeader({ status, config }: Props) {
  return (
    <CardHeader className="pt-8 pb-2 text-center print:pt-0">
      <div className="flex justify-center mb-4 print:hidden">
        {config.iconNode}
      </div>

      <CardTitle className="text-2xl font-bold tracking-tight print:text-black">
        {config.title}
      </CardTitle>
      <p className="mt-2 text-sm text-muted-foreground print:text-gray-600">
        {config.subtitle}
      </p>

      {status === "cancelled" && (
        <div className="flex gap-2 items-start p-3 mt-4 text-sm text-left rounded-lg border bg-destructive/10 text-destructive border-destructive/20 print:hidden">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>Waktu pembayaran telah kedaluwarsa atau transaksi dibatalkan.</p>
        </div>
      )}
    </CardHeader>
  );
}
