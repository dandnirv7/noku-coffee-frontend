"use client";

import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "../lib/search-params";
import { DebouncedInput } from "@/components/shared/debounced-input";

export function SearchProductListingTopBar() {
  const [params, setParams] = useQueryStates(searchParamsSchema, {
    shallow: true,
    history: "replace",
  });

  return (
    <div className="flex flex-col gap-4 pb-4 mb-6 border-b md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-full">
        <DebouncedInput
          value={params.q}
          onChange={(val) => setParams({ q: val || null })}
          placeholder="Cari produk kopi favoritmu..."
        />
      </div>

      <div className="flex gap-3 items-center w-full md:w-auto">
        <Label>Urutkan</Label>
        <Select
          defaultValue={params.sortBy}
          onValueChange={(value: string) =>
            setParams({
              sortBy: value as
                | "relevance"
                | "price-asc"
                | "price-desc"
                | "rating-desc",
            })
          }
        >
          <SelectTrigger className="w-[180px] rounded-lg">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Paling Relevan</SelectItem>
            <SelectItem value="price-asc">Harga Terendah</SelectItem>
            <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
            <SelectItem value="rating-desc">Rating Tertinggi</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center p-1 rounded-lg border bg-muted/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setParams({ viewMode: "grid" })}
            className={cn(
              "rounded-md px-2 h-8",
              params.viewMode === "grid" && "bg-white shadow-sm",
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setParams({ viewMode: "list" })}
            className={cn(
              "rounded-md px-2 h-8",
              params.viewMode === "list" && "bg-white shadow-sm",
            )}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
