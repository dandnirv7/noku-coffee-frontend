"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useGetAddresses } from "../../api/use-get-addresses";
import { AddressModal } from "../address-modal";
import { Address } from "../../types";

export default function UserAddress() {
  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    isError,
  } = useGetAddresses();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | undefined
  >(undefined);

  const selectedAddress =
    addresses?.find((a) => a.id === selectedAddressId) ??
    addresses?.find((a) => a.isDefault) ??
    addresses?.[0];

  if (isLoadingAddresses) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="p-3 rounded-lg border space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-full" />
          </div>

          <Skeleton className="h-9 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Terjadi kesalahan</AlertTitle>
        <AlertDescription>Gagal memuat alamat.</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alamat Pengiriman</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {selectedAddress ? (
            <div className="p-3 rounded-lg border">
              <div className="flex gap-2 items-center mb-2">
                <Badge variant="outline">{selectedAddress.label}</Badge>
                {selectedAddress.isDefault && (
                  <Badge className="bg-primary text-white">Utama</Badge>
                )}
              </div>
              <p className="font-medium">{selectedAddress.receiverName}</p>
              <p className="text-sm text-gray-500">{selectedAddress.phone}</p>
              <p className="mt-1 text-sm text-gray-500">
                {selectedAddress.streetLine1}
                {selectedAddress.streetLine2
                  ? `, ${selectedAddress.streetLine2}`
                  : ""}
                , {selectedAddress.city}, {selectedAddress.province}{" "}
                {selectedAddress.postalCode}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-3xl bg-primary/10 animate-glow-pulse" />
                <div className="relative p-4 rounded-full bg-gray-100 text-gray-400 animate-float">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800">
                Belum ada alamat
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Tambahkan alamat untuk pengiriman pesanan Anda.
              </p>
            </div>
          )}

          <Button
            variant="outline"
            className="w-full"
            size="sm"
            onClick={() => setShowAddressModal(true)}
          >
            {selectedAddress ? (
              <>
                <MapPin className="mr-2 w-4 h-4" />
                Ganti Alamat
              </>
            ) : (
              "Tambah Alamat"
            )}
          </Button>
        </CardContent>
      </Card>

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        addresses={addresses ?? []}
        selectedId={selectedAddress?.id ?? ""}
        onSelect={(address: Address) => setSelectedAddressId(address.id)}
        defaultView={selectedAddress ? "list" : "add"}
      />
    </>
  );
}
