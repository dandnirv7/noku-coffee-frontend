"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { toRupiah } from "@/lib/utils";
import { useProductCategories } from "../api/category-products";
import { useSearchFilters } from "../hooks/use-search-filters";

type ProductType = "BEAN" | "GEAR" | "BUNDLE";

const typeLabels: Record<ProductType, string> = {
  BEAN: "Biji Kopi",
  GEAR: "Peralatan",
  BUNDLE: "Paket Bundling",
};

export function SearchProductFilterPanel() {
  const { data: categories } = useProductCategories();

  const {
    params,
    handleCategoryToggle,
    handleTypeToggle,
    handlePriceChange,
    reset,
  } = useSearchFilters();

  return (
    <div className="p-4 space-y-4 w-full rounded-lg border border-border">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold tracking-tight">Filter Produk</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          className="text-xs font-medium hover:text-primary"
        >
          Reset
        </Button>
      </div>
      <Separator />

      <Accordion
        type="multiple"
        defaultValue={["category", "price"]}
        className="w-full"
      >
        <AccordionItem value="category" className="border-b-0">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Kategori
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 space-y-3">
              {categories?.data.data.map((item) => (
                <div key={item.id} className="flex items-center pl-1 space-x-2">
                  <Checkbox
                    id={`cat-${item.slug}`}
                    checked={params.category?.includes(item.slug) ?? false}
                    onCheckedChange={() => handleCategoryToggle(item.slug)}
                  />
                  <Label
                    htmlFor={`cat-${item.slug}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Harga
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-2 space-y-4">
              <Slider
                defaultValue={[0, 1000000]}
                max={1000000}
                step={10000}
                value={[params.minPrice ?? 0, params.maxPrice ?? 1000000]}
                onValueChange={(values) =>
                  handlePriceChange(values[0], values[1])
                }
                className="my-4"
              />
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 text-xs font-medium rounded border text-muted-foreground">
                  {toRupiah(params.minPrice ?? 0)}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded border text-muted-foreground">
                  {toRupiah(params.maxPrice ?? 1000000)}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="multiple" defaultValue={["category", "price", "type"]}>
        <AccordionItem value="type" className="border-b-0">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Jenis Produk
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pl-1 space-y-3">
              {Object.entries(typeLabels).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${key}`}
                    checked={params.type === key}
                    onCheckedChange={() => handleTypeToggle(key)}
                  />
                  <Label
                    htmlFor={`type-${key}`}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
