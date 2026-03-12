"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OrderDetail } from "@/features/orders/lib/order-schema";

interface CancelOrderModalProps {
  order: OrderDetail;
  onClose: () => void;
  onConfirm: () => void;
}

const CANCEL_REASONS = [
  { id: "changed_mind", label: "Berubah pikiran" },
  { id: "found_better_price", label: "Menemukan harga yang lebih murah" },
  { id: "delivery_too_long", label: "Waktu pengiriman terlalu lama" },
  { id: "ordered_by_mistake", label: "Salah memesan barang" },
  { id: "other", label: "Alasan lainnya" },
];

export default function CancelOrderModal({
  order,
  onClose,
  onConfirm,
}: CancelOrderModalProps) {
  const [reason, setReason] = useState<string>("changed_mind");
  const [otherReason, setOtherReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b">
          <div className="font-semibold text-gray-900 truncate">
            Batalkan Pesanan #{order.id}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start p-4 mb-6 text-sm bg-amber-50 rounded-xl border border-amber-100">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 shrink-0" />
            <p className="text-amber-800 leading-relaxed">
              Apakah Anda yakin ingin membatalkan pesanan ini? Tindakan ini
              tidak dapat dibatalkan setelah dikonfirmasi.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Pilih alasan pembatalan:
            </h3>
            <RadioGroup
              value={reason}
              onValueChange={setReason}
              className="grid gap-3"
            >
              {CANCEL_REASONS.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={item.id} id={item.id} />
                  <Label
                    htmlFor={item.id}
                    className="text-sm font-medium text-gray-700 cursor-pointer leading-none"
                  >
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {reason === "other" && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label
                htmlFor="other-reason"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Jelaskan alasan Anda:
              </Label>
              <Textarea
                id="other-reason"
                placeholder="Beritahu kami mengapa Anda membatalkan pesanan ini..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="resize-none h-24 focus:ring-amber-500 border-gray-200"
              />
            </div>
          )}

          <div className="mb-2 p-3 bg-gray-50 rounded-lg">
            <h4 className="mb-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Informasi Pengembalian Dana:
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dana akan dikembalikan ke metode pembayaran awal Anda dalam waktu
              3-5 hari kerja setelah pembatalan disetujui.
            </p>
          </div>
        </div>

        <div className="flex gap-3 p-6 bg-gray-50/50 border-t">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 text-gray-600"
          >
            Kembali
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={
              isSubmitting || (reason === "other" && !otherReason.trim())
            }
            className="flex-1 shadow-sm"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="mr-2 w-4 h-4 rounded-full border-2 border-white animate-spin border-t-transparent"></div>
                Memproses...
              </div>
            ) : (
              "Konfirmasi"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
