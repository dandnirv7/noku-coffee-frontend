import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  HelpCircle,
  Printer,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { PaymentData, PaymentStatus } from "../lib/types";

type Props = {
  status: PaymentStatus;
  data: PaymentData;
  handlePrint: () => void;
};

export function PaymentCardActions({ status, data, handlePrint }: Props) {
  return (
    <CardFooter className="flex flex-col gap-4 pb-6 print:hidden">
      <div className="flex flex-col gap-3 w-full">
        {status === "success" && (
          <>
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/orders">Lihat Pesanan Saya</Link>
            </Button>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button
                variant="outline"
                className="w-full"
                onClick={handlePrint}
              >
                <Printer className="mr-2 w-4 h-4" />
                Cetak Struk
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Beranda
                </Link>
              </Button>
            </div>
          </>
        )}

        {status === "cancelled" && (
          <>
            <Button asChild className="w-full" variant="destructive">
              <Link href={`/checkout/${data?.orderNumber}`}>
                <RefreshCcw className="mr-2 w-4 h-4" />
                Coba Bayar Lagi
              </Link>
            </Button>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button
                variant="outline"
                className="w-full"
                onClick={handlePrint}
              >
                <Printer className="mr-2 w-4 h-4" />
                Cetak Struk
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/help">Hubungi Bantuan</Link>
              </Button>
            </div>
          </>
        )}

        {status === "pending" && (
          <>
            <Button
              asChild
              className="w-full text-white bg-orange-500 hover:bg-orange-600"
            >
              <Link href={`/orders/${data?.orderId}`}>
                Cek Status Pesanan
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button
                variant="outline"
                className="w-full"
                onClick={handlePrint}
              >
                <Printer className="mr-2 w-4 h-4" />
                Cetak Struk
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/checkout/${data?.orderNumber}`}>
                  <CreditCard className="mr-2 w-4 h-4" />
                  Metode Lain
                </Link>
              </Button>
            </div>
            <Button
              variant="link"
              asChild
              className="p-0 h-auto text-muted-foreground hover:text-foreground"
            >
              <Link href="/help">
                <HelpCircle className="mr-1 w-4 h-4" /> Cara Pembayaran
              </Link>
            </Button>
          </>
        )}
      </div>

      <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>
          Secure payment by <strong>Xendit</strong>
        </span>
        <span>•</span>
        <span className="font-semibold tracking-wide text-foreground/80">
          NOKU
        </span>
      </div>
    </CardFooter>
  );
}
