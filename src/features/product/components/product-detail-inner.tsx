"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useToggleWishlist,
  useWishlist,
} from "@/features/cart/api/use-wishlist";
import { useCreateCart } from "@/features/cart/api/use-create-cart";
import { useUpdateQuantity } from "@/features/cart/api/use-update-quantity";
import { useDeleteItem } from "@/features/cart/api/use-delete-item";
import { useGetCart } from "@/features/cart/api/use-get-cart";
import { ProductCard } from "@/components/shared/product-card";
import { useSearchProducts } from "@/features/search/api/search-products";
import { useGetProductBySlug } from "../api/get-product-by-slug";
import { ProductDetailSkeleton } from "./product-detail-skeleton";
import { ProductDetailError } from "./product-detail-error";
import { ProductInfoTabs } from "./product-info-tabs";
import { Product } from "../lib/products-schema";
import { useRequireAuth } from "@/hooks/use-require-auth";

interface ProductDetailViewProps {
  slug: string;
  initialData?: Product;
}

export function ProductDetailView({
  slug,
  initialData,
}: ProductDetailViewProps) {
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductBySlug(slug, initialData);
  const { data: relatedProducts } = useSearchProducts();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { requireAuth } = useRequireAuth();

  const { data: wishlistData } = useWishlist();

  const { mutate: toggleWishlist, isPending: isTogglingWishlist } =
    useToggleWishlist({
      mutationConfig: {
        onSuccess: (data) =>
          toast.success(
            data.data.isAdded
              ? "Ditambahkan ke wishlist"
              : "Dihapus dari wishlist",
          ),
      },
    });

  const { data: cartData } = useGetCart();

  const [updatingQuantityItemId, setUpdatingQuantityItemId] = useState<
    string | null
  >(null);
  const [creatingCartItemId, setCreatingCartItemId] = useState<string | null>(
    null,
  );

  const { mutate: createCart } = useCreateCart({
    mutationConfig: {
      onSuccess: () =>
        toast.success("Produk berhasil ditambahkan ke keranjang"),
    },
  });

  const { mutate: updateQuantity } = useUpdateQuantity({
    mutationConfig: {
      onSuccess: () => toast.success("Jumlah berhasil diperbarui"),
    },
  });

  const { mutate: deleteItem } = useDeleteItem({
    mutationConfig: {
      onSuccess: () => toast.success("Dihapus dari keranjang"),
    },
  });

  const handleAddToCart = (item: { productId: string; quantity: number }) => {
    requireAuth(() => {
      setCreatingCartItemId(item.productId);
      createCart(item, {
        onSettled: () => setCreatingCartItemId(null),
      });
    });
  };

  const handleUpdateQuantity = (data: {
    productId: string;
    quantity: number;
  }) => {
    setUpdatingQuantityItemId(data.productId);
    updateQuantity(data, {
      onSettled: () => setUpdatingQuantityItemId(null),
    });
  };

  const handleRemoveFromCart = (productId: string) => deleteItem({ productId });

  const handleToggleWishlist = (productId: string) =>
    requireAuth(() => toggleWishlist(productId));

  const getCartQuantity = (productId: string) =>
    cartData?.data?.items?.find((i) => i.productId === productId)?.quantity ??
    0;

  const isInWishlistCheck = (productId: string) =>
    wishlistData?.data?.some((item) => item.productId === productId) ?? false;

  const isInWishlist = isInWishlistCheck(product?.id || "");

  if (isError) return <ProductDetailError reset={() => refetch()} />;

  return (
    <div className="container px-4 py-8 pb-24 mx-auto scale-105 md:px-6">
      {isLoading && <ProductDetailSkeleton />}

      {!isLoading && product && (
        <div className="duration-700 animate-in fade-in">
          <nav className="flex gap-2 items-center mb-6 text-sm text-muted-foreground">
            <Link href="/search" className="font-medium hover:text-primary">
              Belanja
            </Link>
            <ChevronRight size={14} />
            <span className="font-medium text-foreground">
              {product.category.name}
            </span>
            <ChevronRight size={14} />
            <span className="font-medium text-foreground truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>

          <div className="grid gap-8 md:grid-cols-12 lg:gap-12">
            <div className="space-y-4 md:col-span-7">
              <div className="overflow-hidden relative rounded-3xl border aspect-square bg-muted group">
                <Image
                  src={
                    product.images?.[activeImageIndex] ??
                    "/placeholder-product.png"
                  }
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  className="absolute top-4 right-4 p-3 rounded-full shadow-sm transition-all bg-white/80 hover:bg-white disabled:opacity-50"
                  onClick={() => requireAuth(() => toggleWishlist(product.id))}
                  disabled={isTogglingWishlist}
                >
                  <Heart
                    size={20}
                    className={cn(
                      "transition-colors",
                      isInWishlist
                        ? "fill-red-500 text-red-500"
                        : "text-slate-600",
                    )}
                  />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.images?.slice(0, 4)?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={cn(
                      "overflow-hidden relative rounded-xl border aspect-square bg-muted cursor-pointer transition-all",
                      activeImageIndex === i
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "border-transparent hover:border-primary/50",
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <ProductInfoTabs product={product} />
            </div>
          </div>

          <div className="pt-10 mt-20 border-t border-border">
            <h3 className="mb-6 text-2xl font-black tracking-tighter uppercase">
              Mungkin Anda Suka
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedProducts?.data?.data?.slice(0, 3)?.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveFromCart={handleRemoveFromCart}
                  cartQuantity={getCartQuantity(p.id)}
                  isInWishlist={isInWishlistCheck(p.id)}
                  isAddingToCart={creatingCartItemId === p.id}
                  isUpdatingQuantity={updatingQuantityItemId === p.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
