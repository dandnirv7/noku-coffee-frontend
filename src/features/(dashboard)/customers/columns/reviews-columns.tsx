"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { formatDate } from "@/features/user/hooks/formatDate";
import { AdminReview } from "../api/get-reviews";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots, IconTrash } from "@tabler/icons-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating}</span>
    </div>
  );
}

export function getReviewsColumns(handlers?: {
  onDelete?: (review: AdminReview) => void;
}): ColumnDef<AdminReview>[] {
  return [
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
      accessorKey: "productName",
      header: "Produk",
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("productName") || "-"}</span>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => <StarRating rating={row.getValue("rating")} />,
    },
    {
      accessorKey: "comment",
      header: "Ulasan",
      cell: ({ row }) => {
        const comment = row.getValue<string | null | undefined>("comment");
        return (
          <span className="text-sm text-muted-foreground line-clamp-2 max-w-[300px]">
            {comment || <span className="italic">Tanpa komentar</span>}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal",
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
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handlers?.onDelete?.(row.original)}
              >
                <IconTrash className="mr-2 h-4 w-4" />
                Hapus Ulasan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
}
