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
import { IconDots, IconEdit, IconTrash, IconToggleRight } from "@tabler/icons-react";
import { AdminPromo } from "../api/promos-api";
import { toRupiah } from "@/lib/utils";
import { formatDate } from "@/features/user/hooks/formatDate";

export function getPromosColumns(handlers?: {
  onEdit?: (promo: AdminPromo) => void;
  onToggle?: (promo: AdminPromo) => void;
  onDelete?: (promo: AdminPromo) => void;
}): ColumnDef<AdminPromo>[] {
  return [
    {
      accessorKey: "code",
      header: "Kode",
      cell: ({ row }) => (
        <code className="font-mono font-bold text-sm bg-stone-100 px-1.5 py-0.5 rounded">
          {row.getValue("code")}
        </code>
      ),
    },
    {
      accessorKey: "discountValue",
      header: "Diskon",
      cell: ({ row }) => {
        const type = row.original.discountType;
        const value: number = row.getValue("discountValue");
        return (
          <span className="font-medium">
            {type === "PERCENTAGE" ? `${value}%` : toRupiah(value)}
          </span>
        );
      },
    },
    {
      accessorKey: "minOrderAmount",
      header: "Min. Order",
      cell: ({ row }) => {
        const min = row.getValue<number>("minOrderAmount");
        return min ? toRupiah(min) : <span className="text-muted-foreground text-sm">-</span>;
      },
    },
    {
      accessorKey: "usedCount",
      header: "Terpakai",
      cell: ({ row }) => {
        const used: number = row.getValue("usedCount");
        const max = row.original.maxUsage;
        return (
          <span className="text-sm">
            {used}
            {max ? ` / ${max}` : ""}
          </span>
        );
      },
    },
    {
      accessorKey: "expiresAt",
      header: "Berlaku Hingga",
      cell: ({ row }) => {
        const val = row.getValue<string | null | undefined>("expiresAt");
        if (!val) return <span className="text-muted-foreground text-sm">Tanpa batas</span>;
        const isExpired = new Date(val) < new Date();
        return (
          <span className={`text-sm ${isExpired ? "text-destructive" : ""}`}>
            {formatDate(val)}
          </span>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive: boolean = row.getValue("isActive");
        const expiresAt = row.original.expiresAt;
        const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;
        return (
          <Badge
            variant="outline"
            className={
              isExpired
                ? "bg-red-100 text-red-700 border-red-300"
                : isActive
                  ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                  : "bg-stone-100 text-stone-600 border-stone-300"
            }
          >
            {isExpired ? "Kedaluwarsa" : isActive ? "Aktif" : "Nonaktif"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <IconDots className="h-4 w-4" />
                <span className="sr-only">Aksi</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handlers?.onEdit?.(row.original)}>
                <IconEdit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlers?.onToggle?.(row.original)}>
                <IconToggleRight className="mr-2 h-4 w-4" />
                {row.original.isActive ? "Nonaktifkan" : "Aktifkan"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handlers?.onDelete?.(row.original)}
              >
                <IconTrash className="mr-2 h-4 w-4" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
}
