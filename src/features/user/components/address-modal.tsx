import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddressForm } from "@/features/user/components/address-form";
import { Address } from "@/features/user/types";
import { ArrowLeft, CheckCircle, MapPin, Plus } from "lucide-react";
import { useState } from "react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedId?: string;
  onSelect?: (address: Address) => void;
  onAddSuccess?: (addressId: string) => void;
  defaultView?: "list" | "add";
}

export function AddressModal({
  isOpen,
  onClose,
  addresses,
  selectedId,
  onSelect,
  onAddSuccess,
  defaultView = "list",
}: AddressModalProps) {
  const [, setHasSelected] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(defaultView === "add");

  const handleSelect = (address: Address) => {
    setHasSelected(true);
    onSelect?.(address);
    setTimeout(onClose, 300);
  };

  return (
    <Dialog
      key={isOpen ? "open" : "closed"}
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="w-full md:max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center gap-2">
            {isAddingNew && addresses.length > 0 && (
              <button
                onClick={() => setIsAddingNew(false)}
                className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <DialogTitle>
              {isAddingNew ? "Tambah Alamat Baru" : "Pilih Alamat Pengiriman"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto p-4 bg-gray-50/50">
          {isAddingNew ? (
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <AddressForm
                isFirstAddress={addresses.length === 0}
                onCancel={() => setIsAddingNew(false)}
                onSuccess={(newId) => {
                  setIsAddingNew(false);
                  onClose();
                  if (newId) onAddSuccess?.(newId);
                }}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => handleSelect(addr)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all hover:border-primary hover:shadow-sm bg-white ${
                    selectedId === addr.id
                      ? "border-primary ring-1 ring-primary/20 bg-primary/10"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin
                      className={`h-5 w-5 mt-0.5 ${
                        selectedId === addr.id
                          ? "text-primary"
                          : "text-gray-400"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-semibold text-gray-900">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <Badge className="bg-primary text-[10px] px-1.5 py-0 h-5">
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
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full border-dashed border-2 h-12"
              onClick={() => setIsAddingNew(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Alamat Baru
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
