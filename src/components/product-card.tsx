import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  stock?: number;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  dealBadge?: React.ReactNode;
}

export function ProductCard({ product, dealBadge }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg relative group">
      {dealBadge}
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500">
            {product.reviewCount} reviews
          </span>
        </div>
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-gray-900 mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            {product.discountedPrice ? (
              <div className="flex items-center">
                <span className="font-medium text-gray-900">
                  Rp {product.discountedPrice.toLocaleString("id-ID")}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
              </div>
            ) : (
              <span className="font-medium text-gray-900">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
            )}
          </div>
          {product.stock !== undefined && product.stock < 10 && (
            <span className="text-xs text-orange-600">
              Only {product.stock} left
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
