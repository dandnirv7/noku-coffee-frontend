import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateWithTime } from "@/features/user/hooks/formatDate";
import { Check, Coffee, Copy, CreditCard, Receipt } from "lucide-react";
import Image from "next/image";
import { StatusConfig } from "../constants/payment-status-config";
import { PaymentData, PaymentStatus } from "../lib/types";
import { formatIDR } from "../lib/utils";
import { getPaymentIcon } from "../utils/payment-icons";

type Props = {
  data: PaymentData;
  status: PaymentStatus;
  config: StatusConfig;
  isCopied: boolean;
  handleCopy: (text: string) => void;
  fontMonoVar: string;
};

export function PaymentCardContent({
  data,
  status,
  config,
  isCopied,
  handleCopy,
  fontMonoVar,
}: Props) {
  return (
    <CardContent className="pt-4 space-y-6 print:pt-2">
      <div className="p-4 space-y-3 rounded-xl border bg-muted/40 border-border/50 print:border-gray-200 print:bg-transparent print:p-0 print:space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground print:text-gray-600">
            Status
          </span>
          {config.badgeNode}
          <span className="hidden text-sm font-bold text-black print:inline">
            {config.badgePrint}
          </span>
        </div>

        {status === "pending" && data?.paidAt && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground print:text-gray-600">
              Batas Waktu
            </span>
            <span className="text-sm font-bold text-destructive print:text-black">
              {formatDateWithTime(data?.paidAt) ?? "-"}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground print:text-gray-600">
            Metode
          </span>
          <div className="flex gap-2 items-center text-sm font-medium print:text-black">
            <Image
              src={getPaymentIcon(data?.invoice?.paymentChannel)}
              alt={data?.invoice?.paymentChannel ?? ""}
              width={24}
              height={24}
            />
            {data?.invoice?.paymentChannel}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground print:text-gray-600">
            Waktu
          </span>
          <span className="text-sm font-medium print:text-black">
            {formatDateWithTime(data?.invoice?.paidAt ?? "")} WIB
          </span>
        </div>
      </div>

      {status === "pending" && data?.invoice?.paymentDestination && (
        <div className="space-y-3 print:space-y-2">
          <h3 className="flex gap-2 items-center text-sm font-semibold print:text-black">
            <CreditCard className="w-4 h-4 text-primary print:hidden" />
            {data?.invoice?.paymentMethod}
          </h3>
          <div className="flex justify-between items-center p-3 rounded-lg border bg-muted/80 border-border/50 print:bg-transparent print:p-0 print:border-none">
            <span className="font-mono text-lg font-bold tracking-wider text-foreground print:text-black">
              {data?.invoice?.paymentDestination}
            </span>
            <button
              onClick={() =>
                handleCopy(
                  data?.invoice?.paymentDestination ?? "".replace(/\s/g, ""),
                )
              }
              className="relative p-2 rounded-md transition-colors hover:bg-muted text-primary bg-primary/10 group print:hidden"
              title="Salin No. VA"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-green-500 animate-in zoom-in" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {isCopied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded shadow-sm whitespace-nowrap animate-fade-in-up">
                  Tersalin!
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {status !== "pending" && (
        <div className="space-y-3 print:space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground print:text-gray-600">
              No. Referensi
            </span>
            <div className="flex gap-2 items-center">
              <span
                className={`${fontMonoVar} relative max-w-[12ch] truncate md:max-w-none font-mono text-sm tracking-wider bg-muted px-2 py-0.5 rounded-md print:font-mono print:text-black`}
              >
                {data?.orderId}
              </span>
              <button
                onClick={() => handleCopy(data?.orderId ?? "")}
                className="p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground relative group print:hidden"
                title="Salin No. Referensi"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-green-500 animate-in zoom-in" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {isCopied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded shadow-sm whitespace-nowrap animate-fade-in-up">
                    Tersalin!
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground print:text-gray-600">
              No. Pesanan
            </span>
            <span
              className={`font-mono text-sm font-medium ${fontMonoVar} print:text-black`}
            >
              {data?.orderNumber}
            </span>
          </div>
        </div>
      )}

      {status === "pending" && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground print:text-gray-600">
            No. Pesanan
          </span>
          <span
            className={`font-mono text-sm font-medium ${fontMonoVar} print:text-black`}
          >
            {data?.orderNumber}
          </span>
        </div>
      )}

      <Separator className="bg-border/60 print:bg-gray-200" />

      <div className="space-y-4">
        <h3 className="flex gap-2 items-center text-sm font-semibold print:text-black">
          <Coffee className="w-4 h-4 text-primary print:hidden" />
          Pesanan Anda
        </h3>
        <div className="space-y-4 max-h-[180px] overflow-y-auto pr-2 print:max-h-none print:overflow-visible [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50">
          {data?.items.map((item, index) => (
            <div key={index} className="flex gap-4 justify-between items-start">
              <div className="flex gap-3 items-start">
                <div className="bg-muted p-2 rounded-lg border border-border/50 mt-0.5 print:hidden">
                  <Coffee className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight print:text-black">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground print:text-gray-600">
                    {item.quantity} x {formatIDR(item.price)}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold whitespace-nowrap print:text-black">
                {formatIDR(data?.subtotal)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/60 print:bg-gray-200" />

      <div className="space-y-3">
        <div className="flex gap-2 items-center mb-2 print:hidden">
          <Receipt className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Rincian Pembayaran</h3>
        </div>
        <div className="space-y-2 text-sm print:text-black">
          <div className="flex justify-between">
            <span className="text-muted-foreground print:text-gray-600">
              Subtotal Produk
            </span>
            <span>{formatIDR(Number(data?.subtotal))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground print:text-gray-600">
              Pajak 11%
            </span>
            <span>{formatIDR(Number(data?.tax))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground print:text-gray-600">
              Ongkos Kirim
            </span>
            <span>{formatIDR(Number(data?.shippingCost))}</span>
          </div>
          <div className="flex justify-between font-medium text-green-600 dark:text-green-500 print:text-black">
            <span>Diskon</span>
            <span>-{formatIDR(Number(data?.discount))}</span>
          </div>
        </div>

        <Separator className="my-2 bg-border/60 print:bg-gray-200" />

        <div className="flex justify-between items-center pt-1 print:text-black">
          <span className="font-semibold">
            Total {status === "success" ? "Bayar" : "Tagihan"}
          </span>
          <span className="text-lg font-bold text-primary print:text-black">
            {formatIDR(Number(data?.amount))}
          </span>
        </div>
      </div>
    </CardContent>
  );
}
