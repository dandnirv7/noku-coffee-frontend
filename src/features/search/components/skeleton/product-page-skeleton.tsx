import { FilterPanelSkeleton } from "./search-product-filter-panel-skeleton";
import { SearchProductListSkeleton } from "./search-product-list-skeleton";
import { SearchProductListingTopBarSkeleton } from "./search-product-listing-topbar-skeleton";

export default function ProductPageSkeleton() {
  return (
    <div className="container px-4 py-4 mx-auto">
      <div className="flex relative flex-col gap-6 lg:flex-row">
        <aside className="hidden w-64 lg:block shrink-0">
          <FilterPanelSkeleton />
        </aside>
        <main className="flex-1 space-y-6">
          <SearchProductListingTopBarSkeleton />
          <SearchProductListSkeleton viewMode="grid" />
        </main>
      </div>
    </div>
  );
}
