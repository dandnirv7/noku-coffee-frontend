"use client";

import { ProductCard } from "@/components/shared/product-card";
import { cn } from "@/lib/utils";
import { Activity, useMemo } from "react";
import { useSearchProducts } from "../api/search-products";
import { useSearchFilters } from "../hooks/use-search-filters";
import { SearchProductError } from "./search-product-error";
import { SearchProductFilterPanel } from "./search-product-filter-panel";
import { SearchProductListSkeleton } from "./skeleton/search-product-list-skeleton";
import { SearchProductListingTopBar } from "./search-product-listing-topbar";
import { FilterPanelSkeleton } from "./skeleton/search-product-filter-panel-skeleton";
import { SearchProductListingTopBarSkeleton } from "./skeleton/search-product-listing-topbar-skeleton";
import { SearchProductEmpty } from "./search-product-empty";

const SearchProductList = () => {
  const { params, reset } = useSearchFilters();

  const { data, isLoading, isError, refetch, isPlaceholderData } =
    useSearchProducts(params);

  const renderedProducts = useMemo(() => {
    return data?.data.data.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        viewMode={params.viewMode}
      />
    ));
  }, [data?.data.data, params.viewMode]);

  if (isLoading) {
    return (
      <div className="container px-4 py-4 mx-auto">
        <div className="flex relative flex-col gap-6 lg:flex-row">
          <aside className="hidden w-64 lg:block shrink-0">
            <FilterPanelSkeleton />
          </aside>
          <main className="flex-1 space-y-6">
            <SearchProductListingTopBarSkeleton />
            <SearchProductListSkeleton viewMode={params.viewMode} />
          </main>
        </div>
      </div>
    );
  }

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

        <main
          className={cn(
            "flex-1 space-y-6 transition-opacity duration-200",
            isPlaceholderData
              ? "opacity-50 pointer-events-none"
              : "opacity-100",
          )}
        >
          <SearchProductListingTopBar />

          <div
            className={cn(
              "grid gap-4",
              params.viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1",
            )}
          >
            {renderedProducts}
          </div>

          {!isLoading && data?.data.data.length === 0 && (
            <SearchProductEmpty
              onReset={() => reset()}
              hasFilters={
                !!params.search ||
                params.category.length > 0 ||
                params.type !== null ||
                params.minPrice > 0 ||
                params.maxPrice < 1000000
              }
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchProductList;
