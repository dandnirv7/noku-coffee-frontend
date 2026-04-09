"use client";

import { DebouncedInput } from "@/components/shared/debounced-input";
import ScrollCategories from "@/components/shared/scroll-categories";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Filter, LayoutGrid, List } from "lucide-react";
import { useSearchFilters } from "../hooks/use-search-filters";
import { SearchProductFilterPanel } from "./search-product-filter-panel";
import QuickCategories from "@/components/shared/quick-categories";

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
    <div className="flex flex-col gap-4 justify-between pb-4 mb-6 border-b lg:flex-row lg:items-center">
      <div className="relative w-full">
        <DebouncedInput
          value={params.search}
          onChange={updateSearch}
          placeholder="Cari produk kopi favoritmu..."
        />
      </div>

      <div className="flex gap-3 items-center w-auto">
        <QuickCategories classNames="max-w-[172px]" isTitleHidden />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="px-3 rounded-lg lg:hidden">
              <Filter className="mr-2 w-4 h-4" />
              Filter
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[85vw] sm:w-[400px] overflow-y-auto [&>button:first-of-type]:hidden"
          >
            <SearchProductFilterPanel />
          </SheetContent>
        </Sheet>

        <Label className="hidden sm:inline">Urutkan</Label>
        <Select value={params.sort} onValueChange={updateSort}>
          <SelectTrigger className="w-[80px] md:w-[180px] rounded-lg">
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

        <div className="hidden items-center p-1 rounded-lg border md:flex bg-muted/50">
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
