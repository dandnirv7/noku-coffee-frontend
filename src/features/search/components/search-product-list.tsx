"use client";

import { ProductCard } from "@/components/shared/product-card";
import { cn } from "@/lib/utils";
import { useQueryStates } from "nuqs";
import { Activity } from "react";
import { useSearchProducts } from "../api/search-products";
import { searchParamsSchema } from "../lib/search-params";
import { SearchProductError } from "./search-product-error";
import { SearchProductFilterPanel } from "./search-product-filter-panel";
import { SearchProductListSkeleton } from "./search-product-list-skeleton";
import { SearchProductListingTopBar } from "./search-product-listing-topbar";

const SearchProductList = () => {
  const { data, isLoading, isError, refetch } = useSearchProducts();
  const [params] = useQueryStates(searchParamsSchema);

  if (isError) {
    return (
      <div className="container px-4 py-10 mx-auto">
        <SearchProductError reset={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="container px-4 py-4 mx-auto">
      <div className="flex relative flex-col gap-6 lg:flex-row">
        <aside className="hidden sticky top-24 w-64 h-fit lg:block shrink-0">
          <SearchProductFilterPanel />
        </aside>

        <main className="flex-1 space-y-6">
          <SearchProductListingTopBar />

          {isLoading && (
            <SearchProductListSkeleton viewMode={params.viewMode} />
          )}

          <Activity mode={!isLoading ? "visible" : "hidden"}>
            <div
              className={cn(
                "grid gap-4",
                params.viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1",
              )}
            >
              {data?.data.data.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={params.viewMode}
                />
              ))}
            </div>

            {!isLoading && data?.data.data.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">
                Produk tidak ditemukan.
              </div>
            )}
          </Activity>
        </main>
      </div>
    </div>
  );
};

export default SearchProductList;
