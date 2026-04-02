"use client";

import {
  ArrowRight,
  CheckCircle,
  Clock,
  Coffee,
  MapPin,
  MessageSquare,
  Package,
  RotateCcw,
  Settings,
  ShoppingBag,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ProductCard } from "@/components/shared/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/features/product/lib/products-schema";
import { Address } from "@/features/user/types";
import { toRupiah } from "@/lib/utils";
import { AddressModal } from "../components/dashboard/address-modal";
import {
  StatusBadge,
  statusConfig,
} from "../components/dashboard/status-badge";

const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
  memberSince: "2023",
  totalOrders: 24,
  totalSpent: 2450000,
};

const recentOrders = [
  {
    id: "ORD-001",
    date: "2025-01-05",
    status: "delivered",
    total: 125000,
    items: [
      {
        name: "Kenyan AA Beans",
        quantity: 2,
        image:
          "https://qsdlsjidmrzdpctnfuet.supabase.co/storage/v1/object/public/product-images/products/xc5t6mngzvnwfxyyc2m47h3e.png",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2025-01-03",
    status: "shipped",
    total: 89000,
    items: [
      {
        name: "Caramel Macchiato Bundle",
        quantity: 1,
        image:
          "https://qsdlsjidmrzdpctnfuet.supabase.co/storage/v1/object/public/product-images/products/xc5t6mngzvnwfxyyc2m47h3e.png",
      },
    ],
  },
  {
    id: "ORD-003",
    date: "2025-01-01",
    status: "processing",
    total: 156000,
    items: [
      {
        name: "Ceramic Pour-Over Set",
        quantity: 1,
        image:
          "https://qsdlsjidmrzdpctnfuet.supabase.co/storage/v1/object/public/product-images/products/xc5t6mngzvnwfxyyc2m47h3e.png",
      },
      {
        name: "Ethiopian Beans",
        quantity: 1,
        image:
          "https://qsdlsjidmrzdpctnfuet.supabase.co/storage/v1/object/public/product-images/products/xc5t6mngzvnwfxyyc2m47h3e.png",
      },
    ],
  },
];

const frequentlyBought = [
  {
    id: "4",
    name: "Sumatra Mandheling",
    price: 58000,
    image: "/placeholder.svg?height=200&width=200",
    lastOrdered: "2024-12-15",
    orderCount: 5,
  },
  {
    id: "5",
    name: "Coffee Filter Papers",
    price: 25000,
    image: "/placeholder.svg?height=200&width=200",
    lastOrdered: "2024-12-20",
    orderCount: 3,
  },
  {
    id: "6",
    name: "Milk Frother",
    price: 89000,
    image: "/placeholder.svg?height=200&width=200",
    lastOrdered: "2024-11-30",
    orderCount: 1,
  },
  {
    id: "10",
    name: "Vietnam Drip",
    price: 45000,
    image: "/placeholder.svg?height=200&width=200",
    lastOrdered: "2024-12-28",
    orderCount: 2,
  },
];

const addresses = [
  {
    id: "address-1",
    label: "Rumah",
    receiverName: "John Doe",
    phone: "08123456789",
    streetLine1: "Jl. Sudirman No.105",
    streetLine2: "Blok J2",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12345",
    isDefault: true,
  },
];

export default function DashboardPage() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address>(
    addresses[0] as Address,
  );

  const activeOrdersCount = recentOrders.filter(
    (order) => order.status === "processing" || order.status === "shipped",
  ).length;

  const userPoints = 1200;
  const POINTS_GOAL = 1500;
  const isGoalReached = userPoints >= POINTS_GOAL;
  const progressPercentage = Math.min((userPoints / POINTS_GOAL) * 100, 100);

  return (
    <>
      <main className="px-4 py-6 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <div className="mb-6 space-y-4 md:hidden">
              <div
                className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-all duration-500 ${
                  isGoalReached
                    ? "bg-linear-to-br from-green-700 to-emerald-500 shadow-green-900/20 scale-[1.02]"
                    : "bg-linear-to-br from-orange-700 to-orange-500 shadow-orange-700/20"
                }`}
              >
                <div className="absolute -top-4 -right-4 opacity-10">
                  {isGoalReached ? (
                    <CheckCircle className="w-24 h-24" />
                  ) : (
                    <Package className="w-24 h-24 rotate-12" />
                  )}
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p
                        className={`text-xs font-medium uppercase tracking-widest ${isGoalReached ? "text-green-100" : "text-orange-200"}`}
                      >
                        {isGoalReached
                          ? "Reward Tersedia!"
                          : "Noku Gold Member"}
                      </p>
                      <h2 className="mt-1 text-2xl font-bold">
                        {userPoints.toLocaleString()} Poin
                      </h2>
                    </div>
                    <Badge
                      className={
                        isGoalReached
                          ? "text-green-700 bg-white"
                          : "text-orange-100 bg-orange-500/20 border-orange-400/30"
                      }
                    >
                      {isGoalReached ? "Ready" : "Level 4"}
                    </Badge>
                  </div>

                  {!isGoalReached ? (
                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] mb-1 text-orange-200">
                        <span>
                          Tinggal {POINTS_GOAL - userPoints} poin lagi untuk
                          Kopi Gratis!
                        </span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-400 transition-all duration-1000"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center p-3 mt-4 rounded-xl border backdrop-blur-md bg-white/10 border-white/20">
                      <div>
                        <p className="text-[10px] text-green-100 uppercase font-bold">
                          Kode Klaim:
                        </p>
                        <p className="font-mono text-lg font-black tracking-widest">
                          FREEKOPI24
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="font-bold text-green-700 bg-white shadow-sm hover:bg-green-50"
                      >
                        Salin Kode
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              <Card className="order-1 col-span-1 bg-white border-none shadow-sm">
                <CardContent>
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                        Total Pesanan
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        {user.totalOrders}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="order-3 col-span-2 bg-white border-none shadow-sm lg:order-2 lg:col-span-1">
                <CardContent>
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <ShoppingBag className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                        Total Pengeluaran
                      </p>
                      <p className="text-xl font-bold text-gray-900 lg:text-xl">
                        {toRupiah(user.totalSpent)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="order-2 col-span-1 bg-white border-none shadow-sm lg:order-3">
                <CardContent>
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                        Pesanan Aktif
                      </p>
                      <div className="flex gap-2 items-baseline">
                        <p className="text-xl font-bold text-gray-900">
                          {activeOrdersCount}
                        </p>
                        <span className="text-xs font-medium text-orange-600">
                          Sedang Diproses
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-lg font-bold">
                  Pesanan Terbaru
                </CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/orders">
                    Lihat Semua
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col gap-4 justify-between p-4 rounded-sm border transition-colors lg:flex-row lg:items-center hover:border-primary/30"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex gap-4 items-center">
                          <div className="flex items-end -space-x-3 shrink-0">
                            {order.items.slice(0, 1).map((item, index) => (
                              <div
                                key={index}
                                className="overflow-hidden w-12 h-12 rounded-sm border-2 border-white shadow-sm"
                              >
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                  className="object-cover"
                                />
                              </div>
                            ))}
                            {order.items.length > 1 && (
                              <div className="flex justify-center items-center w-10 h-10 text-xs font-bold text-gray-600 bg-gray-100 rounded-sm border-2 border-white shadow-sm">
                                +{order.items.length - 1}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              {order.id}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(order.date).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 justify-between items-center w-full md:w-auto">
                          <p className="font-bold text-primary">
                            {toRupiah(order.total)}
                          </p>
                          <div className="flex items-center">
                            <StatusBadge
                              status={order.status as keyof typeof statusConfig}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-center lg:w-auto">
                        {order.status === "shipped" && (
                          <div className="grid grid-cols-2 gap-2 w-full lg:flex lg:w-auto">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-9"
                              asChild
                            >
                              <Link href={`/orders/${order.id}`}>
                                Pesan Lagi
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9"
                              asChild
                            >
                              <Link href={`/orders/${order.id}`}>
                                Beri Rating
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="md:hidden">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-800">
                  Kategori Cepat
                </h3>
              </div>
              <div className="flex overflow-x-auto gap-3 px-4 pb-2 -mx-4 scrollbar-hide snap-x">
                {[
                  { label: "Biji Kopi", icon: <Coffee className="w-5 h-5" /> },
                  {
                    label: "Alat Seduh",
                    icon: <Coffee className="w-5 h-5" />,
                  },
                  {
                    label: "Merchandise",
                    icon: <Store className="w-5 h-5" />,
                  },
                  { label: "Bundling", icon: <Package className="w-5 h-5" /> },
                ].map((cat) => (
                  <Button
                    variant="outline"
                    key={cat.label}
                    className="flex gap-2 items-center px-4 py-2 whitespace-nowrap bg-white rounded-lg border border-gray-100 shadow-sm transition-transform snap-start active:scale-95"
                  >
                    {cat.icon}
                    <span className="text-xs font-semibold text-gray-700">
                      {cat.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-lg font-bold">
                  Produk Terlaris
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/5"
                  asChild
                >
                  <Link href="/products">Lihat Semua</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {frequentlyBought.map((product) => {
                    const mockProduct = {
                      id: product.id,
                      name: product.name,
                      slug: product.name.toLowerCase().replace(/ /g, "-"),
                      description: "Produk rekomendasi untuk Anda",
                      price: product.price,
                      stock: 10,
                      images: [
                        "https://qsdlsjidmrzdpctnfuet.supabase.co/storage/v1/object/public/product-images/products/xc5t6mngzvnwfxyyc2m47h3e.png",
                      ],
                      categoryId: "1",
                      category: { id: "1", name: "Kopi", slug: "kopi" },
                      isFeatured: false,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    } as unknown as Product;

                    return (
                      <div
                        key={product.id}
                        className="min-w-[160px] md:min-w-[200px] snap-start shrink-0"
                      >
                        <ProductCard product={mockProduct} viewMode="grid" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="hidden space-y-6 md:block">
            <Card className="overflow-hidden gap-0 py-0 pb-6 border-none shadow-sm">
              <CardHeader className="flex items-center px-4 py-2 bg-primary/5">
                <CardTitle className="text-base font-bold text-primary">
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Button className="justify-start w-full shadow-sm" asChild>
                  <Link href="/shop">
                    <ShoppingBag className="mr-3 w-4 h-4" />
                    Belanja
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start w-full hover:bg-gray-50"
                  asChild
                >
                  <Link href="/orders">
                    <Package className="mr-3 w-4 h-4" />
                    Lacak Pesanan
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start w-full hover:bg-gray-50"
                  asChild
                >
                  <Link href="/reviews">
                    <MessageSquare className="mr-3 w-4 h-4" />
                    Ulasan Saya
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start w-full hover:bg-gray-50"
                  asChild
                >
                  <Link href="/settings">
                    <Settings className="mr-3 w-4 h-4" />
                    Pengaturan Akun
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sering Dibeli</CardTitle>
                <p className="text-sm text-gray-500">
                  Produk yang sering Anda beli
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {frequentlyBought.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-3 justify-between lg:flex-row"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="overflow-hidden w-12 h-12 rounded-lg">
                          <Image
                            src={
                              "https://qsdlsjidmrzdpctnfuet.supabase.co/storage/v1/object/public/product-images/products/xc5t6mngzvnwfxyyc2m47h3e.png"
                            }
                            alt={item.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Rp {item.price.toLocaleString("id-ID")}
                          </p>
                          <p className="text-xs text-gray-400">
                            Dipesan {item.orderCount}x
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <RotateCcw className="mr-1 w-3 h-3" />
                        Beli Lagi
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Alamat Pengiriman</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg border">
                  <div className="flex gap-2 items-center mb-2">
                    <Badge variant="outline">{selectedAddress.label}</Badge>
                    {selectedAddress.isDefault && (
                      <Badge className="bg-primary">Utama</Badge>
                    )}
                  </div>
                  <p className="font-medium">{selectedAddress.receiverName}</p>
                  <p className="text-sm text-gray-500">
                    {selectedAddress.phone}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedAddress.streetLine1}
                    {selectedAddress.streetLine2
                      ? `, ${selectedAddress.streetLine2}`
                      : ""}
                    , {selectedAddress.city}, {selectedAddress.province}{" "}
                    {selectedAddress.postalCode}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => setShowAddressModal(true)}
                >
                  <MapPin className="mr-2 w-4 h-4" />
                  Ganti Alamat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        addresses={addresses}
        selectedId={selectedAddress.id}
        onSelect={setSelectedAddress}
      />
    </>
  );
}
