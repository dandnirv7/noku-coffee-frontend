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
import { Heart, Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const isListView = viewMode === "list";

  const productHref = `/products/${product.slug}`;

  const badges = getProductBadges(product);

  return (
    <Card
      className={cn(
        "overflow-hidden gap-0 p-0 bg-white rounded-xl border-none shadow-sm transition-all group hover:shadow-md",
        isListView ? "flex flex-row" : "flex flex-col h-full",
      )}
    >
      <CardHeader className={cn("p-4", isListView && "w-40 md:w-60 shrink-0")}>
        <div className="overflow-hidden relative rounded-lg aspect-square bg-muted">
          <Link href={productHref} className="block w-full h-full">
            <Image
              src={product.images[0] || "/placeholder-product.png"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 z-10 rounded-full backdrop-blur-md bg-white/70 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlist(!isWishlist);
            }}
          >
            <Heart
              size={20}
              className={cn(isWishlist && "fill-red-500 text-red-500")}
            />
          </Button>
        </div>
      </CardHeader>

      <div
        className={cn("flex flex-col flex-1", isListView && " py-4 md:py-6")}
      >
        <CardContent className="p-4 pt-0">
          <p
            className={cn(
              "text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 mb-1",
              isListView && "font-semibold",
            )}
          >
            {product.category.name}
          </p>

          <Link href={productHref} className="block group/title">
            <h3
              className={cn(
                "text-lg font-black tracking-tighter leading-tight uppercase transition-colors group-hover/title:text-primary line-clamp-1",
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
            <div className="flex flex-wrap gap-2 mt-2">
              {badges.map((badge, index) => (
                <Badge
                  key={`${badge.key}-${index}`}
                  variant={badge.variant ?? "default"}
                  className="px-3 py-1 text-[10px] font-medium rounded-md bg-secondary"
                >
                  {badge.value}
                </Badge>
              ))}
            </div>
          )}

          <p
            className={cn(
              "mt-3 text-xs leading-relaxed text-muted-foreground",
              isListView ? "line-clamp-3" : "line-clamp-2",
            )}
          >
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <div
            className={cn(
              "flex items-center justify-between w-full gap-4",
              isListView && "max-w-xs flex-col items-start",
            )}
          >
            <p className="text-xl font-black tracking-tighter text-slate-900">
              {toRupiah(product.price)}
            </p>

            <div className={cn("flex-1 max-w-40", isListView && "w-full")}>
              {quantity === 0 ? (
                <Button
                  className="w-full h-10 font-bold rounded-lg transition-all active:scale-95"
                  onClick={() => setQuantity(1)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? "Habis" : "+ Keranjang"}
                </Button>
              ) : (
                <div className="flex justify-between items-center px-1 h-10 rounded-lg border bg-primary/5 border-primary/10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-primary"
                    onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="text-sm font-bold text-primary">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-primary"
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
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
