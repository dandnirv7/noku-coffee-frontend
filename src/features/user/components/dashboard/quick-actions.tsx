"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, Package, MessageSquare, Settings } from "lucide-react";

export function QuickActions() {
  return (
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
  );
}
