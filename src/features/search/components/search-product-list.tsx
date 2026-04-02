"use client";

import { ProductCard } from "@/components/shared/product-card";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useSearchProductList } from "../hooks/use-search-product-list";
import { SearchProductFilterPanel } from "./search-product-filter-panel";
import { FilterPanelSkeleton } from "./skeleton/search-product-filter-panel-skeleton";
import { SearchProductListSkeleton } from "./skeleton/search-product-list-skeleton";
import { SearchProductListingTopBarSkeleton } from "./skeleton/search-product-listing-topbar-skeleton";

const SearchProductEmpty = dynamic(() =>
  import("./search-product-empty").then((mod) => mod.SearchProductEmpty),
);
const SearchProductError = dynamic(() =>
  import("./search-product-error").then((mod) => mod.SearchProductError),
);

import { SearchProductListingTopBar } from "./search-product-listing-topbar";

const SearchProductList = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isPlaceholderData,
    params,
    reset,
    getCartQuantity,
    isInWishlist,
    updatingQuantityItemId,
    creatingCartItemId,
    togglingWishlistItemId,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleToggleWishlist,
  } = useSearchProductList();

  const renderedProducts = data?.data.data.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      viewMode={params.viewMode}
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveFromCart={handleRemoveFromCart}
      cartQuantity={getCartQuantity(product.id)}
      isInWishlist={isInWishlist(product.id)}
      isAddingToCart={creatingCartItemId === product.id}
      isUpdatingQuantity={updatingQuantityItemId === product.id}
      isTogglingWishlist={togglingWishlistItemId === product.id}
    />
  ));

  if (isLoading) {
    return (
      <div className="px-4 py-4 mx-auto">
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
      <div className="px-4 py-10 mx-auto">
        <SearchProductError reset={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="mx-auto lg:px-4">
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
              "grid gap-2 md:gap-4",
              params.viewMode === "grid"
                ? "grid-cols-2 lg:grid-cols-3"
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
