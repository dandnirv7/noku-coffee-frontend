import { ReactNode } from "react";
import { PaymentStatus } from "../lib/types";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export type StatusConfig = {
  accentClass: string;
  iconNode: ReactNode;
  title: string;
  subtitle: string;
  badgeNode: ReactNode;
  badgePrint: string;
};

export const STATUS_CONFIG: Record<PaymentStatus, StatusConfig> = {
  success: {
    accentClass: "bg-primary",
    iconNode: (
      <div className="flex relative justify-center items-center w-24 h-24">
        <div className="absolute inset-0 rounded-full blur-md bg-primary/20 animate-glow-pulse" />
        <div className="absolute inset-2 rounded-full opacity-75 duration-1000 animate-ping bg-primary/30" />
        <CheckCircle2 className="relative z-10 w-16 h-16 text-primary" />
      </div>
    ),
    title: "Pembayaran Berhasil!",
    subtitle: "Terima kasih, pesanan kopi Anda segera kami proses.",
    badgeNode: (
      <Badge variant="default" className="font-medium print:hidden">
        Berhasil
      </Badge>
    ),
    badgePrint: "BERHASIL",
  },
  cancelled: {
    accentClass: "bg-destructive",
    iconNode: (
      <div className="flex relative justify-center items-center w-24 h-24">
        <div className="absolute inset-2 rounded-full opacity-75 duration-1000 animate-ping bg-destructive/30" />
        <XCircle className="relative z-10 w-16 h-16 text-destructive" />
      </div>
    ),
    title: "Pembayaran Gagal",
    subtitle: "",
    badgeNode: (
      <Badge variant="destructive" className="font-medium print:hidden">
        Gagal
      </Badge>
    ),
    badgePrint: "GAGAL",
  },
  pending: {
    accentClass: "bg-orange-500",
    iconNode: (
      <div className="flex relative justify-center items-center w-24 h-24">
        <div className="absolute inset-2 rounded-full opacity-75 duration-1000 animate-ping bg-primary/30" />
        <AlertCircle className="relative z-10 w-16 h-16 text-primary" />
      </div>
    ),
    title: "Menunggu Pembayaran",
    subtitle: "Selesaikan pembayaran kopi Anda sebelum batas waktu berakhir.",
    badgeNode: (
      <Badge
        variant="outline"
        className="font-medium text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-500/10 dark:border-orange-500/20 print:hidden"
      >
        Tertunda
      </Badge>
    ),
    badgePrint: "TERTUNDA",
  },
} as const;
