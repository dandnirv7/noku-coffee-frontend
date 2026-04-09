"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Product } from "@/features/product/lib/products-schema";
import { getProductBadges } from "@/lib/product-badges";
import { cn, toRupiah } from "@/lib/utils";
import { AlertCircle, Heart, Loader2, Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  onAddToCart?: (item: { productId: string; quantity: number }) => void;
  onToggleWishlist?: (productId: string) => void;
  onUpdateQuantity?: (data: { productId: string; quantity: number }) => void;
  onRemoveFromCart?: (productId: string) => void;
  cartQuantity?: number;
  isInWishlist?: boolean;
  isAddingToCart?: boolean;
  isUpdatingQuantity?: boolean;
  isTogglingWishlist?: boolean;
}

export function ProductCard({
  product,
  viewMode = "grid",
  onAddToCart,
  onToggleWishlist,
  onUpdateQuantity,
  onRemoveFromCart,
  cartQuantity = 0,
  isInWishlist = false,
  isAddingToCart = false,
  isUpdatingQuantity = false,
  isTogglingWishlist = false,
  dealBadge,
}: ProductCardProps & { dealBadge?: React.ReactNode }) {
  const [localAction, setLocalAction] = useState<
    "adding" | "updating" | "toggling" | null
  >(null);

  const [prevProps, setPrevProps] = useState({
    adding: isAddingToCart,
    updating: isUpdatingQuantity,
    toggling: isTogglingWishlist,
  });

  if (
    isAddingToCart !== prevProps.adding ||
    isUpdatingQuantity !== prevProps.updating ||
    isTogglingWishlist !== prevProps.toggling
  ) {
    setPrevProps({
      adding: isAddingToCart,
      updating: isUpdatingQuantity,
      toggling: isTogglingWishlist,
    });
    if (!isAddingToCart && localAction === "adding") setLocalAction(null);
    if (!isUpdatingQuantity && localAction === "updating") setLocalAction(null);
    if (!isTogglingWishlist && localAction === "toggling") setLocalAction(null);
  }

  const isActuallyAdding = isAddingToCart || localAction === "adding";
  const isActuallyUpdating = isUpdatingQuantity || localAction === "updating";
  const isActuallyToggling = isTogglingWishlist || localAction === "toggling";
  const pathname = usePathname();
  const isListView = viewMode === "list";
  const stock = product.stock ?? 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;
  const addDisabled = isOutOfStock || isActuallyAdding;

  const badges = getProductBadges(product);
  const productHref = `/products/${product.slug}`;

  return (
    <Card
      className={cn(
        "overflow-hidden gap-0 p-0 bg-white rounded-xl border-none shadow-sm transition-all group hover:shadow-md",
        isListView ? "flex flex-row" : "flex flex-col h-full",
        isOutOfStock && "opacity-60",
      )}
    >
      {dealBadge}
      <CardHeader className={cn("p-4", isListView && "w-40 md:w-60 shrink-0")}>
        <div className="overflow-hidden relative rounded-lg aspect-square bg-muted">
          <Link href={productHref} className="block w-full h-full">
            <Image
              src={product?.images?.[0] || "/placeholder-product.png"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {isOutOfStock && (
            <div className="flex absolute inset-0 justify-center items-center bg-black/50">
              <Badge
                variant="destructive"
                className="text-xs font-semibold rounded-md"
              >
                Stok Habis
              </Badge>
            </div>
          )}

          {isLowStock && !isOutOfStock && (
            <div className="hidden absolute top-3 left-3 z-10 md:block">
              <Badge
                variant="outline"
                className="text-xs text-orange-600 rounded-md border-orange-500 bg-white/90"
              >
                <AlertCircle className="inline mr-1 w-3 h-3" />
                Stok Terbatas
              </Badge>
            </div>
          )}

          {!pathname.includes("cart") && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hidden md:inline-flex absolute top-3 right-3 z-10 rounded-full backdrop-blur-md bg-white/70 hover:bg-white disabled:opacity-50",
                isInWishlist && "bg-white",
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isActuallyToggling) return;
                setLocalAction("toggling");
                onToggleWishlist?.(product.id);
                setTimeout(() => setLocalAction(null), 1000);
              }}
              disabled={isActuallyToggling}
            >
              {isActuallyToggling ? (
                <Loader2 size={20} className="animate-spin text-slate-600" />
              ) : (
                <Heart
                  size={20}
                  className={cn(isInWishlist && "fill-red-500 text-red-500")}
                />
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <div className={cn("flex flex-col flex-1", isListView && "py-4 md:py-6")}>
        <CardContent className="p-4 py-0 md:pb-4">
          <p
            className={cn(
              "text-[8px] md:text-[10px] hidden md:block md:font-bold tracking-widest uppercase text-muted-foreground/60 mb-1",
              isListView && "font-semibold",
            )}
          >
            {product.category.name}
          </p>

          <Link href={productHref} className="block group/title">
            <h3
              className={cn(
                "text-sm md:text-lg font-black md:tracking-tighter md:leading-tight md:uppercase transition-colors group-hover/title:text-primary line-clamp-1",
                isListView && "text-base",
              )}
            >
              {product.name}
            </h3>
          </Link>

          <div className="flex gap-1 items-center mt-2">
            <div className="flex text-orange-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-muted-foreground">
              (45)
            </span>
          </div>

          {!isListView && (
            <div className="hidden flex-wrap gap-2 mt-2 md:flex">
              {badges.slice(0, 3).map((badge, index) => (
                <Badge
                  key={`${badge.key}-${index}`}
                  variant={badge.variant ?? "default"}
                  className="px-3 py-1 text-[10px] font-medium rounded-md bg-secondary"
                >
                  {badge.value}
                </Badge>
              ))}
              {badges.length > 3 && (
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-[10px] font-medium rounded-md"
                >
                  +{badges.length - 3} lainnya
                </Badge>
              )}
            </div>
          )}

          {!pathname?.includes("cart") && (
            <p
              className={cn(
                "hidden mt-3 text-xs leading-relaxed text-muted-foreground md:block",
                isListView ? "block line-clamp-3" : "",
              )}
            >
              {product.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <div
            className={cn(
              "flex flex-col md:flex-row md:items-center justify-between w-full gap-4",
              pathname?.includes("cart") && "flex-col items-start",
              isListView && "max-w-xs flex-col items-start",
            )}
          >
            <div className="flex flex-col-reverse gap-1 md:flex-col">
              <p className="text-xl font-black tracking-tighter text-slate-900">
                {toRupiah(product.price)}
              </p>
              {!pathname?.includes("cart") && (
                <div className="gap-1 items-center md:flex">
                  {isOutOfStock ? (
                    <span className="flex gap-1 items-center text-xs font-medium text-red-600">
                      <AlertCircle className="w-3 h-3" /> Stok Habis
                    </span>
                  ) : isLowStock ? (
                    <span className="flex gap-1 items-center text-xs font-medium text-orange-600">
                      <AlertCircle className="w-3 h-3" /> Tersisa {stock} item
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">Stok: {stock}</span>
                  )}
                </div>
              )}
            </div>

            <div
              className={cn(
                "flex-1 max-w-40",
                isListView && "w-full",
                pathname?.includes("cart") && "max-w-none w-full",
              )}
            >
              {cartQuantity === 0 ? (
                <Button
                  className="w-full h-10 font-bold rounded-lg transition-all active:scale-95"
                  onClick={(e) => {
                    e.preventDefault();
                    if (addDisabled) return;
                    setLocalAction("adding");
                    onAddToCart?.({ productId: product.id, quantity: 1 });
                    setTimeout(() => setLocalAction(null), 1000);
                  }}
                  disabled={addDisabled}
                >
                  {isActuallyAdding ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Menambahkan...
                    </>
                  ) : isOutOfStock ? (
                    "Stok Habis"
                  ) : (
                    "+ Keranjang"
                  )}
                </Button>
              ) : (
                <div className="flex justify-between items-center px-1 h-10 rounded-lg border bg-primary/5 border-primary/10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        cartQuantity <= 0 ||
                        isActuallyAdding ||
                        isActuallyUpdating
                      )
                        return;
                      setLocalAction("updating");
                      if (cartQuantity === 1) onRemoveFromCart?.(product.id);
                      else
                        onUpdateQuantity?.({
                          productId: product.id,
                          quantity: cartQuantity - 1,
                        });
                      setTimeout(() => setLocalAction(null), 1000);
                    }}
                    disabled={
                      cartQuantity <= 0 ||
                      isActuallyAdding ||
                      isActuallyUpdating
                    }
                  >
                    <Minus size={14} />
                  </Button>

                  <span className="text-sm font-bold text-primary">
                    {cartQuantity}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        cartQuantity >= product.stock ||
                        isActuallyAdding ||
                        isActuallyUpdating
                      )
                        return;
                      setLocalAction("updating");
                      onUpdateQuantity?.({
                        productId: product.id,
                        quantity: Math.min(product.stock, cartQuantity + 1),
                      });
                      setTimeout(() => setLocalAction(null), 1000);
                    }}
                    disabled={
                      cartQuantity >= product.stock ||
                      isActuallyAdding ||
                      isActuallyUpdating
                    }
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
