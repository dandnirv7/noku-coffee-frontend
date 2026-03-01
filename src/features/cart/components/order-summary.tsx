"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/features/auth/lib/auth-client";
import { toRupiah } from "@/lib/utils";
import { CheckCircle2, Loader2, Package, TicketPercent, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CartSummary } from "../lib/cart-schema";
import { PromoCode } from "../lib/promo-codes";
import { toast } from "sonner";

interface OrderSummaryProps {
  summary: CartSummary;
  onCheckout?: (addressId: string) => void;
  onApplyPromo?: (code: string) => Promise<void>;
  onRemovePromo?: () => void;
  appliedPromo?: PromoCode | null;
  isValidatingPromo?: boolean;
  isCheckingOut?: boolean;
}

export function OrderSummary({
  summary,
  onCheckout,
  onApplyPromo,
  onRemovePromo,
  appliedPromo,
  isValidatingPromo = false,
  isCheckingOut = false,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");

  const { data: session } = authClient.useSession();

  const addressId = (session?.user as unknown as { address?: { id: string }[] })
    ?.address?.[0]?.id;

  const handleApplyPromo = async () => {
    if (onApplyPromo) {
      await onApplyPromo(promoCode);
      if (appliedPromo) {
        setPromoCode("");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyPromo();
    }
  };

  const handleCheckout = () => {
    if (!addressId) {
      toast.error("Alamat pengiriman belum tersedia", {
        description:
          "Silakan tambahkan alamat pengiriman di profil Anda terlebih dahulu.",
      });
      return;
    }
    onCheckout?.(addressId);
  };

  return (
    <div className="w-full lg:w-96 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Ringkasan Pesanan
        </h2>

        <div className="mb-6">
          <Label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">
            Kode Promo
          </Label>

          {appliedPromo ? (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-green-900">
                  {appliedPromo.code}
                </p>
                <p className="text-xs text-green-700">
                  {appliedPromo.description}
                </p>
              </div>
              {onRemovePromo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRemovePromo}
                  className="h-8 w-8 p-0 hover:bg-green-100"
                >
                  <X className="w-4 h-4 text-green-700" />
                </Button>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <TicketPercent
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="NOKUHEMAT"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  disabled={isValidatingPromo}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A3D]/20 focus:border-[#FF7A3D] uppercase"
                />
              </div>
              <Button
                variant="outline"
                className="px-4"
                onClick={handleApplyPromo}
                disabled={isValidatingPromo || !promoCode.trim()}
              >
                {isValidatingPromo ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Pakai"
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-3 pb-6 border-b border-gray-100">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({summary.itemCount} item)</span>
            <span className="font-medium text-gray-900">
              {toRupiah(summary.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>PPN ({(summary.taxRate * 100).toFixed(0)}%)</span>
            <span className="font-medium text-gray-900">
              {toRupiah(summary.tax)}
            </span>
          </div>

          {summary.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Diskon</span>
              <span className="font-medium">-{toRupiah(summary.discount)}</span>
            </div>
          )}

          {summary.shipping > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Ongkir</span>
              <span className="font-medium text-gray-900">
                {toRupiah(summary.shipping)}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center py-4 mb-2">
          <span className="text-base font-bold text-gray-900">
            Total Tagihan
          </span>
          <span className="text-xl font-bold text-[#FF7A3D]">
            {toRupiah(summary.total)}
          </span>
        </div>

        <div className="flex gap-2 flex-col">
          <div className="text-center">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/search">Lanjut Belanja</Link>
            </Button>
          </div>

          <Button
            className="w-full py-3 text-base shadow-[#FF7A3D]/20 shadow-lg"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Checkout"
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
          <Package size={12} /> Gratis ongkir untuk pembelian di atas Rp500rb
        </p>
      </div>
    </div>
  );
}
