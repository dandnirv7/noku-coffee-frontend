"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { Category } from "../../api/get-categories";
import { formatDate } from "@/features/user/hooks/formatDate";

interface CategoryActionsProps {
  category: Category;
  onDelete?: (category: Category) => void;
}

function CategoryActions({ category, onDelete }: CategoryActionsProps) {
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
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => onDelete?.(category)}
        >
          <IconTrash className="mr-2 h-4 w-4" />
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function getCategoriesColumns(handlers?: {
  onDelete?: (category: Category) => void;
}): ColumnDef<Category>[] {
  return [
    {
      accessorKey: "name",
      header: "Nama Kategori",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("name")}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Dibuat",
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
          <CategoryActions category={row.original} {...handlers} />
        </div>
      ),
    },
  ];
}
