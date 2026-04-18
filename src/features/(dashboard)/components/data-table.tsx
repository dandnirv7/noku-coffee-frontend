"use client";
"use no memo";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconLoader2,
} from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DatabaseBackup } from "lucide-react";

interface DataTableProps<TData> {
  table: TanstackTable<TData>;
  columnCount: number;
  emptyMessage?: string;
  showPagination?: boolean;
  isLoading?: boolean;
}

export function DataTable<TData>({
  table,
  columnCount,
  emptyMessage = "Tidak ada data.",
  showPagination = true,
  isLoading = false,
}: DataTableProps<TData>) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {Array.from({ length: columnCount }).map((_, colIndex) => (
                    <TableCell key={`skeleton-cell-${colIndex}`}>
                      <Skeleton className="h-5 w-full max-w-[200px]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center p-8 text-muted-foreground w-full h-full max-w-sm mx-auto">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-6 relative">
                      <div
                        className="absolute inset-0 bg-slate-200/50 rounded-full animate-ping"
                        style={{ animationDuration: "3s" }}
                      />
                      <DatabaseBackup
                        className="h-10 w-10 text-slate-400 z-10"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-xl font-semibold text-slate-700 mb-2">
                      Belum Ada Data
                    </p>
                    <p className="text-sm text-slate-500 mb-6 text-balance">
                      {emptyMessage}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <div className="flex items-center justify-between px-1">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <span>
                {table.getFilteredSelectedRowModel().rows.length} dari{" "}
                {table.getFilteredRowModel().rows.length} baris dipilih.
              </span>
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Baris per halaman</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(val) => table.setPageSize(Number(val))}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 50].map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1 text-sm font-medium">
              Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
              {table.getPageCount()}
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <IconChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <IconChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <IconChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <IconChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
