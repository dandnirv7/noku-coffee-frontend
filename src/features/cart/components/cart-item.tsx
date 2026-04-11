"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Heart, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { CartItem as CartItemType } from "../lib/cart-schema";
import { ProductCartMeta } from "./product-cart-meta";
import { toRupiah } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  onMoveToWishlist?: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  onDeleteItem: (productId: string) => Promise<void>;
  isPending: boolean;
}

export function CartItem({
  item,
  onMoveToWishlist,
  updateQuantity,
  onDeleteItem,
  isPending,
}: CartItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { product, quantity } = item;
  const stock = product.stock ?? 0;
  const imageSrc = product.images?.[0] || "/placeholder-product.png";

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;
  const canIncrement = quantity < stock;

  const lockRef = useRef(false);

  const handleIncrement = async () => {
    if (lockRef.current || isPending) return;
    lockRef.current = true;
    try {
      const nextQty = Math.min(quantity + 1, stock);
      await updateQuantity(item.productId, nextQty);
    } finally {
      lockRef.current = false;
    }
  };

  const handleDecrement = async () => {
    if (lockRef.current || isPending) return;
    lockRef.current = true;
    try {
      const nextQty = Math.max(quantity - 1, 1);
      await updateQuantity(item.productId, nextQty);
    } finally {
      lockRef.current = false;
    }
  };

  const handleConfirmDelete = async () => {
    if (lockRef.current || isPending) return;
    lockRef.current = true;
    try {
      await onDeleteItem(item.productId);
      setIsDeleteModalOpen(false);
    } finally {
      lockRef.current = false;
    }
  };

  const handleMoveToWishlist = async () => {
    if (!onMoveToWishlist || lockRef.current || isPending) return;
    lockRef.current = true;
    try {
      await onMoveToWishlist(item.productId);
    } finally {
      lockRef.current = false;
    }
  };

  return (
    <>
      <div className={`flex gap-4 ${isOutOfStock ? "opacity-60" : ""}`}>
        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative">
          <Image
            src={imageSrc}
            alt={product.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge
                variant="destructive"
                className="text-xs font-semibold rounded-md"
              >
                Habis
              </Badge>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-medium text-gray-900 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                {ProductCartMeta(product)}
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="font-medium text-gray-900">
                  {toRupiah(product.price)}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                {isOutOfStock && (
                  <Badge
                    variant="destructive"
                    className="text-xs flex items-center gap-1 rounded-md"
                  >
                    <AlertCircle className="h-3 w-3" />
                    Stok Habis
                  </Badge>
                )}
                {isLowStock && !isOutOfStock && (
                  <Badge
                    variant="outline"
                    className="text-xs border-orange-500 text-orange-600 flex items-center gap-1 rounded-md"
                  >
                    <AlertCircle className="h-3 w-3" />
                    Stok Terbatas ({stock} tersisa)
                  </Badge>
                )}
                {!isOutOfStock && !isLowStock && (
                  <span className="text-xs text-gray-500">
                    Stok: {stock} tersedia
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || isPending}
                  className="h-8 w-8 p-0 disabled:opacity-50"
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <span className="h-8 w-8 flex items-center justify-center">
                  {quantity}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleIncrement}
                  disabled={!canIncrement || isOutOfStock || isPending}
                  className="h-8 w-8 p-0 disabled:opacity-50"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {toRupiah(product.price * quantity)}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDeleteModalOpen(true)}
                  disabled={isPending}
                  className="bg-primary/20 text-primary h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>

                {onMoveToWishlist && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMoveToWishlist}
                    disabled={isPending}
                    className="bg-primary/20 text-primary h-8 w-8 p-0 disabled:opacity-50"
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Heart className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hapus Item dari Keranjang?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus{" "}
              <span className="font-semibold text-gray-900">
                {product.name}
              </span>{" "}
              dari keranjang belanja?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
