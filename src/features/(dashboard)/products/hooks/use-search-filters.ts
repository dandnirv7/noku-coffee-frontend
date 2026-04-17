import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";

export function useSearchFilters() {
  const [params, setParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(10),
      search: parseAsString.withDefault(""),
      category: parseAsString.withDefault("all"),
      type: parseAsString.withDefault("all"),
      sort: parseAsString.withDefault("newest"),
    },
    { shallow: true, history: "replace", clearOnDefault: true },
  );

  return {
    params,
    setPage: (page: number) => setParams({ page }),
    setPerPage: (perPage: number) => setParams({ perPage, page: 1 }),
    updateSearch: (search: string) =>
      setParams({ search: search || null, page: 1 }),
    updateCategory: (category: string) => setParams({ category, page: 1 }),
    updateType: (type: string) => setParams({ type, page: 1 }),
    updateSort: (sort: string) => setParams({ sort, page: 1 }),
  };
}
