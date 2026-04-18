"use client";

import { FileX2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvoiceEmptyStateProps {
  onReset?: () => void;
}

export function InvoiceEmptyState({ onReset }: InvoiceEmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in zoom-in duration-300">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FileX2 className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Belum ada invoice</h3>
      <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
        Tidak ada data invoice yang ditemukan. Cobalah untuk mengubah filter
        atau buat invoice baru.
      </p>
      {onReset && (
        <Button onClick={onReset} variant="outline" size="sm">
          Reset Filter
        </Button>
      )}
    </div>
  );
}
