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
import { AlertCircle, Heart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartItem as CartItemType } from "../lib/cart-schema";
import { ProductCartMeta } from "./product-cart-meta";

interface CartItemProps {
  item: CartItemType;
  onMoveToWishlist?: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  onDeleteItem: (productId: string) => void;
}

export function CartItem({
  item,
  onMoveToWishlist,
  updateQuantity,
  onDeleteItem,
}: CartItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { product, quantity } = item;
  const stock = product.stock ?? 0;
  const imageSrc =
    product.images?.length > 0 ? product.images[0] : "/placeholder-product.png";

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;
  const isOverStock = quantity > stock;
  const canIncrement = quantity < stock;

  useEffect(() => {
    if (isOverStock && stock > 0) {
      updateQuantity(item.productId, stock);
    }
  }, [isOverStock, stock, item.productId, updateQuantity]);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteItem(item.productId);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row gap-4 ${
          isOutOfStock ? "opacity-60" : ""
        }`}
      >
        <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden shrink-0 relative">
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
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Stock Status Badges */}
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
                  onClick={() => updateQuantity(item.productId, quantity - 1)}
                  disabled={quantity <= 1}
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
                  onClick={() => updateQuantity(item.productId, quantity + 1)}
                  disabled={!canIncrement || isOutOfStock}
                  className="h-8 w-8 p-0 disabled:opacity-50"
                  title={
                    !canIncrement && !isOutOfStock
                      ? `Stok maksimal: ${stock}`
                      : isOutOfStock
                        ? "Stok habis"
                        : ""
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Rp {(product.price * quantity).toLocaleString("id-ID")}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeleteClick}
                  className="bg-primary/20 text-primary h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                {onMoveToWishlist && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMoveToWishlist(item.productId)}
                    className="bg-primary/20 text-primary h-8 w-8 p-0"
                  >
                    <Heart className="h-4 w-4" />
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
              onClick={handleCancelDelete}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
