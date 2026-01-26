"use client";

import { Button } from "@/components/ui/button";
import { Coffee, LucideProps } from "lucide-react";
import { useRouter } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface ErrorDisplayProps {
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  statusCode: string;
  title: string;
  message: string;
  actionText?: string;
  actionUrl?: string;
}

export function ErrorDisplay({
  Icon = Coffee,
  statusCode,
  title,
  message,
  actionText = "Kembali ke Beranda",
  actionUrl = "/",
}: ErrorDisplayProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="p-6 mb-6 bg-transparent rounded-full border-6 border-foreground/80">
        <Icon className="w-16 h-16 text-primary/80" />
      </div>
      <h1 className="text-8xl font-black text-primary/80">{statusCode}</h1>
      <h2 className="mt-2 text-2xl font-bold text-foreground">{title}</h2>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">{message}</p>
      <Button
        onClick={() => router.push(actionUrl)}
        className="px-8 py-6 mt-8 font-semibold rounded-full bg-primary/80 hover:bg-primary/60"
      >
        {actionText}
      </Button>
    </div>
  );
}
