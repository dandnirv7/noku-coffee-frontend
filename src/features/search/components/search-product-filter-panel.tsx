"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { toRupiah } from "@/lib/utils";
import { useQueryStates } from "nuqs";
import { useState } from "react";
import { searchParamsSchema } from "../lib/search-params";

const mockCategories = [
  "Single Origin",
  "House Blend",
  "Bundling Packages",
  "Merchandise",
  "Manual Brew Gear",
];

const mockOrigins = [
  "Aceh Gayo",
  "Bali Kintamani",
  "Flores Bajawa",
  "Toraja Sapan",
  "Guatemala",
  "Ethiopia",
];

export function SearchProductFilterPanel() {
  const [params, setParams] = useQueryStates(searchParamsSchema, {
    shallow: true,
    history: "replace",
  });

  const toggleArrayItem = (key: "category" | "origin", item: string) => {
    const current = params[key];
    const next = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];

    setParams({
      [key]: next,
    });
  };

  return (
    <div className="p-4 space-y-4 w-full rounded-lg border border-border">
      <h2 className="text-lg font-bold tracking-tight">Filter Produk</h2>
      <Separator />

      <Accordion
        type="multiple"
        defaultValue={["category", "price", "origin"]}
        className="w-full"
      >
        <AccordionItem value="category" className="border-b-0">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Kategori
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 space-y-3">
              {mockCategories.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${item}`}
                    checked={params.category.includes(item)}
                    onCheckedChange={() => toggleArrayItem("category", item)}
                  />
                  <Label
                    htmlFor={`cat-${item}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item}
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
                value={[params.minPrice, params.maxPrice]}
                onValueChange={([min, max]) =>
                  setParams({ minPrice: min, maxPrice: max })
                }
                className="my-4"
              />
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 text-xs font-medium rounded border text-muted-foreground">
                  {toRupiah(params.minPrice)}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded border text-muted-foreground">
                  {toRupiah(params.maxPrice)}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="origin" className="border-b-0">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Origin (Asal)
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 space-y-3">
              {mockOrigins.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={`orig-${item}`}
                    checked={params.origin.includes(item)}
                    onCheckedChange={() => toggleArrayItem("origin", item)}
                  />
                  <Label
                    htmlFor={`orig-${item}`}
                    className="text-sm font-medium leading-none"
                  >
                    {item}
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
