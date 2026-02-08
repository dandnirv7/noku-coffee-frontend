"use client";

import { ProductCard } from "@/components/shared/product-card";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useSearchProducts } from "../api/search-products";
import { useSearchFilters } from "../hooks/use-search-filters";
import { SearchProductError } from "./search-product-error";
import { SearchProductFilterPanel } from "./search-product-filter-panel";
import { SearchProductListSkeleton } from "./skeleton/search-product-list-skeleton";
import { SearchProductListingTopBar } from "./search-product-listing-topbar";
import { FilterPanelSkeleton } from "./skeleton/search-product-filter-panel-skeleton";
import { SearchProductListingTopBarSkeleton } from "./skeleton/search-product-listing-topbar-skeleton";
import { SearchProductEmpty } from "./search-product-empty";
import { useCreateCart } from "@/features/cart/api/use-create-cart";
import { useGetCart } from "@/features/cart/api/use-get-cart";
import { useUpdateQuantity } from "@/features/cart/api/use-update-quantity";
import { useDeleteItem } from "@/features/cart/api/use-delete-item";
import {
  useToggleWishlist,
  useWishlist,
} from "@/features/cart/api/use-wishlist";
import { toast } from "sonner";

const SearchProductList = () => {
  const { params, reset } = useSearchFilters();

  const { data, isLoading, isError, refetch, isPlaceholderData } =
    useSearchProducts(params);

  const { data: cartData } = useGetCart();
  const { data: wishlistData } = useWishlist();

  const { mutate: createCart } = useCreateCart({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Produk berhasil ditambahkan ke keranjang");
      },
    },
  });

  const { mutate: updateQuantity } = useUpdateQuantity({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Jumlah berhasil diperbarui");
      },
    },
  });

  const { mutate: deleteItem } = useDeleteItem({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Dihapus dari keranjang");
      },
    },
  });

  const { mutate: toggleWishlist } = useToggleWishlist({
    mutationConfig: {
      onSuccess: (data) => {
        toast.success(
          data.data.isAdded
            ? "Ditambahkan ke wishlist"
            : "Dihapus dari wishlist",
        );
      },
    },
  });

  const getCartQuantity = (productId: string) => {
    const item = cartData?.data.items.find((i) => i.productId === productId);
    return item?.quantity ?? 0;
  };

  const isInWishlist = (productId: string) => {
    return (
      wishlistData?.data.some((item) => item.productId === productId) ?? false
    );
  };

  const handleToggleWishlist = (productId: string) => {
    toggleWishlist(productId);
  };

  const handleUpdateQuantity = (data: {
    productId: string;
    quantity: number;
  }) => {
    updateQuantity(data);
  };

  const handleRemoveFromCart = (productId: string) => {
    deleteItem({ productId });
  };

  const renderedProducts = useMemo(() => {
    return data?.data.data.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        viewMode={params.viewMode}
        onAddToCart={(item) => createCart(item)}
        onToggleWishlist={handleToggleWishlist}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        cartQuantity={getCartQuantity(product.id)}
        isInWishlist={isInWishlist(product.id)}
      />
    ));
  }, [data?.data.data, params.viewMode, cartData, wishlistData]);

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
