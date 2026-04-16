"use client";
"use no memo";

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";
import { useState } from "react";

interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];

  pageIndex: number;
  pageSize: number;
  onPageChange: (index: number) => void;
  onPageSizeChange: (size: number) => void;

  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;

  manualPagination?: boolean;
  rowCount?: number;
}

export function useDataTable<TData>({
  data,
  columns,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
  enableRowSelection = false,
  rowSelection = {},
  onRowSelectionChange,
  manualPagination = false,
  rowCount,
}: UseDataTableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    manualPagination,
    rowCount: manualPagination ? rowCount : undefined,

    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },

    enableRowSelection,

    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,

    onRowSelectionChange: (updater) => {
      if (!onRowSelectionChange) return;
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;
      onRowSelectionChange(next);
    },

    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;

      if (next.pageIndex !== pageIndex) onPageChange(next.pageIndex);
      if (next.pageSize !== pageSize) onPageSizeChange(next.pageSize);
    },
  });

  return { table };
}
