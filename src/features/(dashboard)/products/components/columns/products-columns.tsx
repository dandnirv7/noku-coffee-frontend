"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toRupiah } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconDots,
  IconEdit,
  IconTrash,
  IconRefresh,
} from "@tabler/icons-react";
import Image from "next/image";
import { Product } from "@/features/product/lib/products-schema";

interface ProductActionsProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onRestore?: (product: Product) => void;
}

function ProductActions({
  product,
  onEdit,
  onDelete,
  onRestore,
}: ProductActionsProps) {
  const isDeleted = !!product.deletedAt;
  return (
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
        {!isDeleted && (
          <DropdownMenuItem onClick={() => onEdit?.(product)}>
            <IconEdit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {isDeleted ? (
          <DropdownMenuItem onClick={() => onRestore?.(product)}>
            <IconRefresh className="mr-2 h-4 w-4" />
            Pulihkan
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onDelete?.(product)}
          >
            <IconTrash className="mr-2 h-4 w-4" />
            Nonaktifkan
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const typeColors: Record<string, string> = {
  BEAN: "bg-amber-100 text-amber-800 border-amber-300 rounded-md",
  GEAR: "bg-slate-100 text-slate-800 border-slate-300 rounded-md",
  BUNDLE: "bg-indigo-100 text-indigo-800 border-indigo-300 rounded-md",
};

export function getProductsColumns(handlers?: {
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onRestore?: (product: Product) => void;
}): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: "Produk",
      cell: ({ row }) => {
        const product = row.original;
        const imageUrl = product.images?.[0];
        return (
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md bg-stone-100 shrink-0">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                  N/A
                </div>
              )}
            </div>
            <div>
              <p className="font-medium leading-none">{product.name}</p>
              {product.deletedAt && (
                <p className="text-xs text-destructive mt-0.5">Dinonaktifkan</p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Kategori",
      cell: ({ row }) => {
        const category = row.original.category;
        return (
          <span className="text-sm text-muted-foreground">
            {category?.name || "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Tipe",
      cell: ({ row }) => {
        const types: string[] = row.getValue("type") || [];
        return (
          <div className="flex flex-wrap gap-1">
            {types.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className={typeColors[t] ?? "bg-gray-100 text-gray-800"}
              >
                {t}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Harga",
      cell: ({ row }) => toRupiah(row.getValue("price")),
    },
    {
      accessorKey: "stock",
      header: "Stok",
      cell: ({ row }) => {
        const stock: number = row.getValue("stock");
        return (
          <span
            className={
              stock <= 5
                ? "text-destructive font-medium"
                : stock <= 20
                  ? "text-amber-600 font-medium"
                  : ""
            }
          >
            {stock}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <ProductActions product={row.original} {...handlers} />
        </div>
      ),
    },
  ];
}
