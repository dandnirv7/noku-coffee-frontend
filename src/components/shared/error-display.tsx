"use client";

import { Button } from "@/components/ui/button";
import { Coffee, LucideProps } from "lucide-react";
import Link from "next/link";
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
  return (
    <div className="flex flex-col items-center justify-center max-w-xs md:max-w-2xl lg:max-w-6xl mx-auto my-8 p-8 md:p-12 text-center border-3 border-dashed rounded-[2rem] bg-muted/5 border-muted-foreground/10 min-h-[80vh] gap-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-3xl bg-primary/20 animate-glow-pulse" />
        <div className="relative p-6 rounded-full bg-primary/10 text-primary animate-float">
          <Icon size={64} strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="font-black text-primary/80 text-7xl md:text-8xl">
        {statusCode}
      </h1>

      <div className="space-y-3 max-w-md">
        <h3 className="text-2xl md:text-3xl font-black  text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
          {message}
        </p>
      </div>

      <Button
        asChild
        className="px-8 h-12 font-bold rounded-xl shadow-none transition-all active:scale-95"
      >
        <Link href={actionUrl}>{actionText}</Link>
      </Button>

      <div className="px-3 py-1 rounded-full border bg-muted/50 border-border">
        <span className="text-[10px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">
          ERROR_CODE_{statusCode}
        </span>
      </div>
    </div>
  );
}
