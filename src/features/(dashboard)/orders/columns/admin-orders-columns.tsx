"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots, IconCheck, IconRefresh } from "@tabler/icons-react";
import { toRupiah } from "@/lib/utils";
import { formatDate } from "@/features/user/hooks/formatDate";
import { cn } from "@/lib/utils";

export type AdminOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  totalAmount: number;
  status: string;
};

const statusClassMap: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300",
  PAID: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300",
  SHIPPED: "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-300",
  COMPLETED: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-300",
  CANCELLED: "bg-red-100 text-red-800 hover:bg-red-100 border-red-300",
  REFUND_REQUESTED: "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-300",
};

const statusLabelMap: Record<string, string> = {
  PENDING: "Pending",
  PAID: "Dibayar",
  SHIPPED: "Dikirim",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  REFUND_REQUESTED: "Refund Diminta",
};

interface OrderActionsProps {
  order: AdminOrder;
  onManualApprove?: (order: AdminOrder) => void;
  onApproveRefund?: (order: AdminOrder) => void;
}

function OrderActions({
  order,
  onManualApprove,
  onApproveRefund,
}: OrderActionsProps) {
  const showManualApprove = order.status === "PENDING";
  const showApproveRefund = order.status === "REFUND_REQUESTED";

  if (!showManualApprove && !showApproveRefund) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <IconDots className="h-4 w-4" />
          <span className="sr-only">Aksi</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi Admin</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {showManualApprove && (
          <DropdownMenuItem onClick={() => onManualApprove?.(order)}>
            <IconCheck className="mr-2 h-4 w-4" />
            Setujui Manual
          </DropdownMenuItem>
        )}
        {showApproveRefund && (
          <DropdownMenuItem onClick={() => onApproveRefund?.(order)}>
            <IconRefresh className="mr-2 h-4 w-4" />
            Setujui Refund
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function getAdminOrdersColumns(handlers?: {
  onManualApprove?: (order: AdminOrder) => void;
  onApproveRefund?: (order: AdminOrder) => void;
}): ColumnDef<AdminOrder>[] {
  return [
    {
      accessorKey: "orderNumber",
      header: "No. Pesanan",
      cell: ({ row }) => (
        <span className="font-medium text-sm">{row.getValue("orderNumber")}</span>
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
      accessorKey: "date",
      header: "Tanggal",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {formatDate(row.getValue("date"))}
        </span>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-medium">{toRupiah(row.getValue("totalAmount"))}</span>
      ),
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
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <OrderActions order={row.original} {...handlers} />
        </div>
      ),
    },
  ];
}
