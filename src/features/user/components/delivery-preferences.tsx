"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";
import Link from "next/link";

const deliveryPreferences = {
  preferredTime: "Pagi (09.00 - 12.00)",
  address: "Jl. Sudirman No. 123, Jakarta Pusat",
  instructions: "Taruh di depan pintu jika tidak ada orang",
};

export function DeliveryPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferensi Pengiriman</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Waktu Pengiriman
            </p>
            <p className="text-sm text-gray-500">
              {deliveryPreferences.preferredTime}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Alamat Utama</p>
            <p className="text-sm text-gray-500">
              {deliveryPreferences.address}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Instruksi Khusus
            </p>
            <p className="text-sm text-gray-500">
              {deliveryPreferences.instructions}
            </p>
          </div>
        </div>
        <Separator />
        <Button variant="outline" className="w-full" size="sm" asChild>
          <Link href="/settings/addresses">
            <MapPin className="mr-2 h-4 w-4" />
            Kelola Alamat
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
