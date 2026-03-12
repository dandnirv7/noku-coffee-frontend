"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, Package, MessageSquare, Settings } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aksi Cepat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" asChild>
          <Link href="/shop">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Lihat Produk
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/orders">
            <Package className="mr-2 h-4 w-4" />
            Lacak Pesanan
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/reviews">
            <MessageSquare className="mr-2 h-4 w-4" />
            Ulasan Saya
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Pengaturan Akun
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
