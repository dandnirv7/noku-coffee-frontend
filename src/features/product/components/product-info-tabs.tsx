"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Coffee,
  Droplets,
  Minus,
  Plus,
  Star,
  Thermometer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toRupiah } from "@/lib/utils"; // Asumsi ada helper ini

export function ProductInfoTabs({ product, onAddToCart }: any) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("desc");

  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;

  const tastingNotes = ["Chocolate", "Caramel", "Fruity"];

  const brewingGuide = { method: "Pour Over", temp: "92°C", ratio: "1:16" };

  return (
    <div className="flex flex-col space-y-6 h-full">
      <div className="space-y-4">
        <div className="flex gap-3 items-center">
          <span className="text-xs font-bold tracking-wider uppercase text-primary">
            {product.category.name}
          </span>
          {isLowStock && (
            <Badge
              variant="secondary"
              className="gap-1 text-amber-600 bg-amber-50"
            >
              <AlertTriangle size={12} /> Stok Terbatas
            </Badge>
          )}
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase">
          {product.name}
        </h1>
        <div className="flex gap-4 items-center">
          <span className="text-3xl font-bold text-primary">
            {toRupiah(product.price)}
          </span>
          <div className="flex gap-1.5 items-center px-2 py-1 rounded-lg bg-orange-50 border border-orange-100">
            <Star size={14} className="text-orange-500 fill-orange-500" />
            <span className="text-sm font-bold">4.8</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-6 border-b border-border">
        {["desc", "specs", "brew"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-3 text-sm font-bold uppercase tracking-tighter transition-all border-b-2",
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground",
            )}
          >
            {tab === "desc"
              ? "Deskripsi"
              : tab === "specs"
                ? "Spesifikasi"
                : "Panduan"}
          </button>
        ))}
      </div>

      <div className="min-h-[150px]">
        {activeTab === "desc" && (
          <div>
            <p className="mb-4 text-muted-foreground">{product.description}</p>
            <div>
              <span className="block mb-2 text-xs font-bold tracking-wider uppercase">
                Tasting Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {tastingNotes.map((note, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="px-3 py-1 text-xs font-medium"
                  >
                    {note}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border bg-neutral-50">
              <span className="block mb-1 text-xs text-muted">Origin</span>
              <span className="text-sm font-bold text-foreground">
                {product.origin || "Indonesia"}
              </span>
            </div>
            <div className="p-3 rounded-lg border bg-neutral-50">
              <span className="block mb-1 text-xs text-muted">Process</span>
              <span className="text-sm font-bold text-foreground">
                {product.process || "Washed"}
              </span>
            </div>
          </div>
        )}

        {activeTab === "brew" && (
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-white rounded-lg border border-orange-100">
              <Coffee className="mx-auto mb-1 text-primary" size={16} />
              <div className="text-[10px] text-muted">Metode</div>
              <div className="text-xs font-bold">{brewingGuide.method}</div>
            </div>
            <div className="p-2 bg-white rounded-lg border border-orange-100">
              <Thermometer className="mx-auto mb-1 text-primary" size={16} />
              <div className="text-[10px] text-muted">Suhu Air</div>
              <div className="text-xs font-bold">{brewingGuide.temp}</div>
            </div>
            <div className="p-2 bg-white rounded-lg border border-orange-100">
              <Droplets className="mx-auto mb-1 text-primary" size={16} />
              <div className="text-[10px] text-muted">Rasio</div>
              <div className="text-xs font-bold">{brewingGuide.ratio}</div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-6 mt-auto border-t">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm font-bold">
            <span>Jumlah</span>
            <span
              className={isOutOfStock ? "text-destructive" : "text-green-600"}
            >
              {isOutOfStock ? "Habis" : `Tersedia ${product.stock} pcs`}
            </span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center px-2 w-32 h-12 rounded-xl border bg-background">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="flex-1 font-bold text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={quantity >= product.stock}
              >
                <Plus size={16} />
              </Button>
            </div>
            <Button
              className="flex-1 h-12 font-bold rounded-xl"
              disabled={isOutOfStock}
              onClick={() => onAddToCart?.({ productId: product.id, quantity })}
            >
              {isOutOfStock ? "Stok Habis" : "+ Keranjang"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
