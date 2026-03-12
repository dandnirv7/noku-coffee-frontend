import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

export const getStatusBadge = (status: string) => {
  const s = status.toUpperCase();
  switch (s) {
    case "PAID":
      return <Badge className="bg-green-500 text-white">Dibayar</Badge>;
    case "SHIPPED":
      return <Badge className="bg-blue-500 text-white">Dikirim</Badge>;
    case "PROCESSING":
      return <Badge className="bg-yellow-500 text-white">Diproses</Badge>;
    case "PENDING":
      return (
        <Badge className="bg-orange-500 text-white">Menunggu Pembayaran</Badge>
      );
    case "CANCELLED":
      return <Badge className="bg-red-500 text-white">Dibatalkan</Badge>;
    case "DELIVERED":
      return <Badge className="bg-green-600 text-white">Diterima</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white">Tidak Diketahui</Badge>;
  }
};

export const getStatusIcon = (status: string) => {
  const s = status.toUpperCase();
  switch (s) {
    case "PAID":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "SHIPPED":
      return <Truck className="w-5 h-5 text-blue-500" />;
    case "PROCESSING":
      return <Package className="w-5 h-5 text-yellow-500" />;
    case "PENDING":
      return <Clock className="w-5 h-5 text-orange-500" />;
    case "CANCELLED":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "DELIVERED":
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    default:
      return <ShoppingBag className="w-5 h-5 text-gray-500" />;
  }
};

export const statusLabelMap: Record<string, string> = {
  all: "semua",
  PENDING: "menunggu",
  PROCESSING: "diproses",
  SHIPPED: "dikirim",
  PAID: "dibayar",
  CANCELLED: "dibatalkan",
  DELIVERED: "diterima",
};
