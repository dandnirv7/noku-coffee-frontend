"use client";

import { Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

import espressoMachine from "@/assets/espresso-machine.png";
import grinder from "@/assets/grinder.png";
import { toRupiah } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Products {
  id: string;
  name: string;
  category: string;
  slug: string;
  price: number;
  weight?: string;
  roast?: string;
  score: number;
  tag: string;
  image: string | StaticImageData;
  material?: string;
}

const products: Products[] = [
  {
    id: "c123abc456def789",
    name: "Noku House Blend",
    slug: "noku-house-blend-c123abc456def789",
    category: "Coffee",
    price: 85000,
    weight: "200g",
    roast: "Medium",
    score: 4.8,
    tag: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "c987xyz654lmn321",
    name: "Gayo Wine Process",
    slug: "gayo-wine-process-c987xyz654lmn321",
    category: "Coffee",
    price: 120000,
    weight: "200g",
    roast: "Light",
    score: 4.9,
    tag: "Limited",
    image:
      "https://coldcrafters.com/cdn/shop/files/GAYOORANGETHUMB.jpg?v=1701938067&width=713",
  },
  {
    id: "c456def123ghi789",
    name: "Mesin Espresso",
    slug: "mesin-espresso-c456def123ghi789",
    category: "Gear",
    price: 8500000,
    material: "Metal & Plastic",
    score: 4.7,
    tag: "Premium",
    image: espressoMachine,
  },
  {
    id: "c321uvw987rst654",
    name: "Manual Grinder",
    slug: "manual-grinder-c321uvw987rst654",
    category: "Gear",
    price: 450000,
    material: "Stainless Steel",
    score: 5.0,
    tag: "Premium",
    image: grinder,
  },
];

export default function ProductList({ id }: { id?: string }) {
  const router = useRouter();

  return (
    <section id={id} className="py-24 bg-background scroll-mt-20">
      <div className="px-4 mx-auto md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Produk Pilihan
            </h2>
            <p className="text-muted">
              Biji kopi musiman yang sedang diminati.
            </p>
          </div>
          <Button variant="link" className="hidden md:flex text-primary">
            <Link href="/search">Lihat Katalog Lengkap</Link>
          </Button>
        </div>

        <div
          className={`
    flex gap-4 overflow-x-auto pb-4
    sm:gap-6 sm:overflow-x-auto
    lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-x-visible
  `}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              className="shrink-0 w-72 lg:w-auto flex flex-col overflow-hidden gap-0 p-0 h-full bg-white rounded-xl border-none shadow-sm transition-all group hover:shadow-md"
            >
              <div className="overflow-hidden relative aspect-square bg-neutral-100">
                {product.tag && (
                  <Badge className="absolute top-3 left-3 z-10 bg-primary text-[10px]">
                    {product.tag}
                  </Badge>
                )}
                <Image
                  height={600}
                  width={600}
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-1 p-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 mb-1">
                  {product.roast || product.category}
                  {(product.weight || product.material) && (
                    <span className="ml-1 font-normal">
                      · {product.weight || product.material}
                    </span>
                  )}
                </p>

                <Link href={`/login`} className="block group/title">
                  <h3 className="mb-2 text-base font-black tracking-tighter leading-tight uppercase transition-colors group-hover/title:text-primary line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex gap-1 items-center mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      className={
                        s <= Math.round(product.score)
                          ? "text-orange-400 fill-orange-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-1 text-xs text-muted">
                    ({product.score})
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 mt-auto border-t border-border/50">
                  <span className="text-lg font-black tracking-tighter text-slate-900">
                    {toRupiah(product.price)}
                  </span>
                </div>

                <Button
                  className="mt-3 w-full h-10 font-bold rounded-lg"
                  onClick={() => router.push(`/login`)}
                >
                  + Keranjang
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/products">Lihat Katalog Lengkap</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
