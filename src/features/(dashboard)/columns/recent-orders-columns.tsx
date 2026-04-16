"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { toRupiah } from "@/lib/utils";
import { formatDate } from "@/features/user/hooks/formatDate";
import { cn } from "@/lib/utils";

export type RecentOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  totalAmount: number;
  status: string;
};

const statusVariantMap: Record<string, "default" | "destructive" | "outline"> =
  {
    CANCELLED: "destructive",
  };

const statusClassMap: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300",
  CANCELLED: "bg-red-100 text-red-800 hover:bg-red-100 border-red-300",
  COMPLETED:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-300",
};

const statusLabelMap: Record<string, string> = {
  COMPLETED: "Selesai",
  PENDING: "Pending",
  CANCELLED: "Dibatalkan",
};

export const recentOrdersColumns: ColumnDef<RecentOrder>[] = [
  {
    accessorKey: "orderNumber",
    header: "No. Pesanan",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("orderNumber")}</span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Pelanggan",
  },
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDate(row.getValue("date"))}
      </span>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => toRupiah(row.getValue("totalAmount")),
  },
  {
    accessorKey: "status",
    header: () => <span className="block text-right">Status</span>,
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <div className="text-right">
          <Badge
            variant={statusVariantMap[status] ?? "outline"}
            className={cn(statusClassMap[status] ?? "")}
          >
            {statusLabelMap[status] ?? status}
          </Badge>
        </div>
      );
    },
  },
];
