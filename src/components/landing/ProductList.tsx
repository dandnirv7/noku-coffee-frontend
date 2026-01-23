import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

import grinder from "@/assets/grinder.png";
import espressoMachine from "@/assets/espresso-machine.png";
import Image, { StaticImageData } from "next/image";
import { toRupiah } from "@/lib/utils";
import Link from "next/link";

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
  return (
    <section id={id} className="py-24 bg-background scroll-mt-20">
      <div className="container px-4 mx-auto md:px-6">
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
            <Link href="/products">Lihat Katalog Lengkap</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex relative flex-col p-4 h-full shadow-sm transition-all group border-border hover:shadow-lg"
            >
              {product.tag && (
                <Badge className="absolute top-4 left-4 z-10 bg-primary">
                  {product.tag}
                </Badge>
              )}

              <div className="flex overflow-hidden relative justify-center items-center mb-5 rounded-xl transition-all aspect-square bg-neutral-100 group-hover:shadow-inner">
                <div className="absolute inset-0 opacity-5 bg-pattern" />
                <Image
                  height={600}
                  width={600}
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-4 bottom-4 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  <Button className="w-full bg-white border shadow-lg text-foreground hover:bg-primary hover:text-white border-border">
                    <Link href={`/products/${product.slug}`}>+ Keranjang</Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex gap-2 items-center mb-2 text-xs font-medium text-muted">
                  <span className="uppercase">
                    {product.roast || product.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{product.weight || product.material}</span>
                </div>
                <h3 className="mb-1 text-lg font-bold transition-colors cursor-pointer text-foreground group-hover:text-primary">
                  {product.name}
                </h3>
                <div className="flex gap-1 items-center mb-4">
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

                <div className="flex justify-between items-center pt-4 mt-auto border-t border-border/50">
                  <span className="text-lg font-bold text-foreground">
                    {toRupiah(product.price)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
