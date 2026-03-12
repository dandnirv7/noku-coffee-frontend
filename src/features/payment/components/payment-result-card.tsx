"use client";

import { usePaymentResult } from "../hooks/use-payment-result";

import { Card } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { ConfettiSideCannons } from "@/components/ui/confetti-side-cannon";
import { Inconsolata } from "next/font/google";

import { PaymentResultSkeleton } from "./payment-result-skeleton";
import { PaymentCardHeader } from "./payment-card-header";
import { PaymentCardContent } from "./payment-card-content";
import { PaymentCardActions } from "./payment-card-actions";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

export default function PaymentResultCard({ orderId }: { orderId: string }) {
  const {
    data,
    isLoading,
    status,
    config,
    isCopied,
    handleCopy,
    handlePrint,
    contentRef,
  } = usePaymentResult(orderId);

  if (isLoading || !data) {
    return <PaymentResultSkeleton />;
  }

  return (
    <div className="flex overflow-hidden relative flex-1 justify-center items-center px-4 py-12 w-full h-full bg-background print:p-0 print:bg-white">
      {status === "success" && <ConfettiSideCannons />}
      <div className="fixed inset-0 bg-pattern -z-20 print:hidden" />

      <div className="relative w-full max-w-md">
        <BlurFade delay={0.1} inView>
          <Card
            ref={contentRef}
            className="overflow-hidden relative w-full shadow-2xl backdrop-blur-xl border-border/50 bg-surface/90 print:shadow-none print:border-none print:max-w-full print:bg-white print:p-8"
          >
            <PaymentCardHeader status={status} config={config} />
            <PaymentCardContent
              data={data}
              status={status}
              config={config}
              isCopied={isCopied}
              handleCopy={handleCopy}
              fontMonoVar={inconsolata.variable}
            />
            <PaymentCardActions
              status={status}
              data={data}
              handlePrint={handlePrint}
            />
          </Card>
        </BlurFade>
      </div>
    </div>
  );
}
