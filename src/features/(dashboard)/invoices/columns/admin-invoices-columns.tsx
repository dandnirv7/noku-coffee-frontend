"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { toRupiah } from "@/lib/utils";
import { formatDate } from "@/features/user/hooks/formatDate";
import { AdminInvoice } from "../api/get-admin-invoices";
import { cn } from "@/lib/utils";

const statusClassMap: Record<string, string> = {
  PAID: "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-100",
  PENDING: "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-100",
  EXPIRED: "bg-red-100 text-red-800 border-red-300 hover:bg-red-100",
};

const statusLabelMap: Record<string, string> = {
  PAID: "Dibayar",
  PENDING: "Belum Dibayar",
  EXPIRED: "Kedaluwarsa",
};

export const adminInvoicesColumns: ColumnDef<AdminInvoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "No. Invoice",
    cell: ({ row }) => (
      <span className="font-medium text-sm">
        {row.getValue("invoiceNumber") || row.original.id.slice(0, 8).toUpperCase()}
      </span>
    ),
  },
  {
    accessorKey: "orderNumber",
    header: "No. Pesanan",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("orderNumber") || "-"}
      </span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Pelanggan",
    cell: ({ row }) => (
      <div>
        <p className="font-medium leading-none">{row.getValue("customerName")}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {row.original.customerEmail}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Jumlah",
    cell: ({ row }) => (
      <span className="font-medium">{toRupiah(row.getValue("amount"))}</span>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Jatuh Tempo",
    cell: ({ row }) => {
      const val = row.getValue<string | null | undefined>("dueDate");
      return (
        <span className="text-muted-foreground text-sm">
          {val ? formatDate(val) : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge variant="outline" className={cn(statusClassMap[status] ?? "")}>
          {statusLabelMap[status] ?? status}
        </Badge>
      );
    },
  },
];
