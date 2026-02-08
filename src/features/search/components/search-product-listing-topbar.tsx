"use client";

import { DebouncedInput } from "@/components/shared/debounced-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LayoutGrid, List } from "lucide-react";
import { useSearchFilters } from "../hooks/use-search-filters";

const sortOptions: { value: string; label: string }[] = [
  { value: "name_asc", label: "A - Z" },
  { value: "name_desc", label: "Z - A" },
  { value: "price_asc", label: "Harga Terendah" },
  { value: "price_desc", label: "Harga Tertinggi" },
];

export function SearchProductListingTopBar() {
  const { params, updateSearch, updateSort, updateViewMode } =
    useSearchFilters();

  return (
    <div className="flex flex-col gap-4 pb-4 mb-6 border-b md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-full">
        <DebouncedInput
          value={params.search}
          onChange={updateSearch}
          placeholder="Cari produk kopi favoritmu..."
        />
      </div>

      <div className="flex gap-3 items-center w-full md:w-auto">
        <Label className="hidden sm:inline">Urutkan</Label>
        <Select value={params.sort} onValueChange={updateSort}>
          <SelectTrigger className="w-[180px] rounded-lg">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center p-1 rounded-lg border bg-muted/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateViewMode("grid")}
            className={cn(
              "rounded-md px-2 h-8",
              params.viewMode === "grid" && "bg-white shadow-sm hover:bg-white",
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateViewMode("list")}
            className={cn(
              "rounded-md px-2 h-8",
              params.viewMode === "list" && "bg-white shadow-sm hover:bg-white",
            )}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
