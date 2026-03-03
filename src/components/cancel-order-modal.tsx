"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OrderDetail } from "@/features/orders/lib/order-schema";

interface CancelOrderModalProps {
  order: OrderDetail;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelOrderModal({
  order,
  onClose,
  onConfirm,
}: CancelOrderModalProps) {
  const [reason] = useState<string>("changed_mind");
  const [otherReason, setOtherReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onConfirm();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-medium">Cancel Order #{order.id}</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-sm flex items-start mb-4">
            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 mr-2 shrink-0" />
            <p className="text-gray-700">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">
              Please select a reason for cancellation:
            </h3>
            {/* <RadioGroup
              value={reason}
              onValueChange={setReason}
              className="grid gap-2"
            >
              <div className="flex items-start">
                <RadioGroupItem
                  value="changed_mind"
                  id="changed_mind"
                  className="mt-1"
                />
                <Label htmlFor="changed_mind" className="ml-2 cursor-pointer">
                  Changed my mind
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem
                  value="found_better_price"
                  id="found_better_price"
                  className="mt-1"
                />
                <Label
                  htmlFor="found_better_price"
                  className="ml-2 cursor-pointer"
                >
                  Found a better price elsewhere
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem
                  value="delivery_too_long"
                  id="delivery_too_long"
                  className="mt-1"
                />
                <Label
                  htmlFor="delivery_too_long"
                  className="ml-2 cursor-pointer"
                >
                  Delivery time is too long
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem
                  value="ordered_by_mistake"
                  id="ordered_by_mistake"
                  className="mt-1"
                />
                <Label
                  htmlFor="ordered_by_mistake"
                  className="ml-2 cursor-pointer"
                >
                  Ordered by mistake
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem value="other" id="other" className="mt-1" />
                <Label htmlFor="other" className="ml-2 cursor-pointer">
                  Other reason
                </Label>
              </div>
            </RadioGroup> */}
          </div>

          {reason === "other" && (
            <div className="mb-4">
              <Label
                htmlFor="other-reason"
                className="text-sm font-medium mb-1 block"
              >
                Please specify:
              </Label>
              <Textarea
                id="other-reason"
                placeholder="Tell us why you're cancelling this order..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="resize-none"
              />
            </div>
          )}

          <div className="text-sm text-gray-500 mb-4">
            <h4 className="font-medium text-gray-700 mb-1">
              Refund Information:
            </h4>
            {/* <p>
              {order.paymentMethod.includes("Bank Transfer")
                ? "Since your payment is still pending, no refund is needed."
                : "Your payment will be refunded to your original payment method within 3-5 business days."}
            </p> */}
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Keep Order
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={
              isSubmitting || (reason === "other" && !otherReason.trim())
            }
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </div>
            ) : (
              "Confirm Cancellation"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
