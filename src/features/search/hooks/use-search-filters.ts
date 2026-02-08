import { useQueryStates } from "nuqs";
import { searchParamsSchema, ProductType } from "../lib/search-params";

export function useSearchFilters() {
  const [params, setParams] = useQueryStates(searchParamsSchema, {
    shallow: true,
    history: "replace",
  });

  const setPage = (page: number) => setParams({ page });

  const updateSearch = (val: string | null) => {
    setParams({ search: val || null, page: 1 });
  };

  const updateSort = (val: string) => {
    setParams({ sort: val as any, page: 1 });
  };

  const updateViewMode = (mode: "grid" | "list") => {
    setParams({ viewMode: mode });
  };

  const handleCategoryToggle = (slug: string) => {
    const currentCategories = params.category ?? [];
    const newCategories = currentCategories.includes(slug)
      ? currentCategories.filter((c) => c !== slug)
      : [...currentCategories, slug];
    setParams({ category: newCategories, page: 1 });
  };

  const handleTypeToggle = (type: string) => {
    const newType = params.type === type ? null : (type as ProductType);
    setParams({ type: newType, page: 1 });
  };

  const handlePriceChange = (min: number, max: number) => {
    setParams({ minPrice: min, maxPrice: max, page: 1 });
  };

  const reset = () => setParams(null);

  return {
    params,
    setPage,
    updateSearch,
    updateSort,
    updateViewMode,
    handleCategoryToggle,
    handleTypeToggle,
    handlePriceChange,
    reset,
  };
}
