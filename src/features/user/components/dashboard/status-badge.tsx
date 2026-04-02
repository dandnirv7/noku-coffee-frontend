"use client";
import { Clock, Package, Truck, CheckCircle, AlertCircle } from "lucide-react";

export const statusConfig = {
  pending: {
    label: "Menunggu",
    color: "text-yellow-800",
    bg: "bg-yellow-100",
    icon: Clock,
  },
  processing: {
    label: "Diproses",
    color: "text-blue-800",
    bg: "bg-blue-100",
    icon: Package,
  },
  shipped: {
    label: "Dikirim",
    color: "text-purple-800",
    bg: "bg-purple-100",
    icon: Truck,
  },
  delivered: {
    label: "Selesai",
    color: "text-green-800",
    bg: "bg-green-100",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Dibatalkan",
    color: "text-red-800",
    bg: "bg-red-100",
    icon: AlertCircle,
  },
};

export function StatusBadge({ status }: { status: keyof typeof statusConfig }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}
    >
      <Icon className="h-3 w-3" /> {config.label}
    </span>
  );
}
