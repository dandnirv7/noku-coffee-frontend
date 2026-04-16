"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/features/(dashboard)/components/data-table";
import { useDataTable } from "@/features/(dashboard)/hooks/use-data-table";
import { getCategoriesColumns } from "../components/columns/categories-columns";
import { useCategories, Category } from "../api/get-categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { IconPlus } from "@tabler/icons-react";

function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => api.post("/categories", { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Kategori berhasil ditambahkan");
    },
    onError: () => toast.error("Gagal menambahkan kategori"),
  });
}

function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Kategori berhasil dihapus");
    },
    onError: () => toast.error("Gagal menghapus kategori"),
  });
}

export function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const { data: categories = [] } = useCategories();
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const columns = useMemo(
    () =>
      getCategoriesColumns({
        onDelete: (category: Category) => {
          if (
            confirm(
              `Yakin hapus kategori "${category.name}"? Aksi ini tidak dapat dibatalkan.`,
            )
          ) {
            deleteCategory(category.id);
          }
        },
      }),
    [deleteCategory],
  );

  const { table } = useDataTable({ data: categories, columns, pageSize: 20 });

  const handleCreate = () => {
    if (!newCategoryName.trim()) return;
    createCategory(newCategoryName.trim(), {
      onSuccess: () => {
        setNewCategoryName("");
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kategori</h1>
          <p className="text-muted-foreground text-sm">
            Kelola kategori produk
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <IconPlus className="mr-2 h-4 w-4" />
          Tambah Kategori
        </Button>
      </div>

      <DataTable
        table={table}
        columnCount={columns.length}
        emptyMessage="Belum ada kategori"
        showPagination={false}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kategori Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="category-name">Nama Kategori</Label>
            <Input
              id="category-name"
              placeholder="Contoh: Seasonal"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
