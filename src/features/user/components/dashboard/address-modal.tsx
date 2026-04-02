"use client";
import { useState, useEffect } from "react";
import { X, MapPin, CheckCircle, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Address } from "@/features/user/types";
import { AddressForm } from "@/features/user/components/address-form";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedId?: string;
  onSelect: (address: Address) => void;
}

export function AddressModal({
  isOpen,
  onClose,
  addresses,
  selectedId,
  onSelect,
}: AddressModalProps) {
  const [, setHasSelected] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        setHasSelected(false);
        setIsAddingNew(false);
      }, 0);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (address: Address) => {
    setHasSelected(true);
    onSelect(address);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg mx-auto max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b shrink-0 bg-white z-10">
          <div className="flex items-center gap-2">
            {isAddingNew && (
              <button
                onClick={() => setIsAddingNew(false)}
                className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Kembali"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <h2 className="text-lg font-semibold">
              {isAddingNew ? "Tambah Alamat Baru" : "Pilih Alamat Pengiriman"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4 bg-gray-50/50">
          {isAddingNew ? (
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <AddressForm
                isFirstAddress={addresses.length === 0}
                onCancel={() => setIsAddingNew(false)}
                onSuccess={(newId) => {
                  // In a real app, you might want to fetch the updated addresses.
                  // For now, we just close the form.
                  if (newId) console.log("Added new address:", newId);
                  setIsAddingNew(false);
                  onClose();
                }}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => handleSelect(addr)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all hover:border-primary hover:shadow-sm bg-white ${selectedId === addr.id ? "border-primary ring-1 ring-primary/20 bg-primary/10" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin
                      className={`h-5 w-5 mt-0.5 ${selectedId === addr.id ? "text-primary" : "text-gray-400"}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-semibold text-gray-900">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <Badge className="bg-primary hover:bg-primary/80 text-[10px] px-1.5 py-0 h-5">
                            Utama
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        {addr.receiverName}{" "}
                        <span className="text-gray-400 font-normal">|</span>{" "}
                        {addr.phone}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {addr.streetLine1}
                        {addr.streetLine2 ? `, ${addr.streetLine2}` : ""},{" "}
                        {addr.city}, {addr.province} {addr.postalCode}
                      </p>
                    </div>
                    {selectedId === addr.id && (
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isAddingNew && (
          <div className="p-4 border-t bg-white shrink-0">
            <Button
              variant="outline"
              className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors h-12"
              onClick={() => setIsAddingNew(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Alamat Baru
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
