"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toRupiah } from "@/lib/utils";
import { formatDate } from "@/features/user/hooks/formatDate";
import { AdminCustomer } from "../api/get-customers";

export const customersColumns: ColumnDef<AdminCustomer>[] = [
  {
    accessorKey: "name",
    header: "Pelanggan",
    cell: ({ row }) => {
      const customer = row.original;
      const initials = (customer.name || "U")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={customer.image ?? ""} alt={customer.name} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium leading-none">{customer.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {customer.email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "totalOrders",
    header: "Total Pesanan",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("totalOrders")}</span>
    ),
  },
  {
    accessorKey: "totalSpend",
    header: "Total Belanja",
    cell: ({ row }) => toRupiah(row.getValue("totalSpend")),
  },
  {
    accessorKey: "createdAt",
    header: "Bergabung",
    cell: ({ row }) => {
      const val = row.getValue<string | undefined>("createdAt");
      return (
        <span className="text-muted-foreground text-sm">
          {val ? formatDate(val) : "-"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="text-xs" asChild>
          <a href={`/dashboard/customers/${row.original.id}`}>Detail</a>
        </Button>
      </div>
    ),
  },
];
