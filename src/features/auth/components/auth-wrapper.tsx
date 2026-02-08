"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

interface AuthWrapperProps {
  children: ReactNode;

  imageTitle: string;
  imageDescription: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";

  heading: string;
  subHeading: string;

  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export default function AuthWrapper({
  children,
  imageTitle,
  imageDescription,
  imageAlt = "Coffee",
  imagePosition = "left",
  heading,
  subHeading,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthWrapperProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="min-h-[calc(100vh-80px)] grid md:grid-cols-2 bg-background animate-fade-in">
      <div
        className={clsx(
          "hidden overflow-hidden relative md:block bg-primary/10",
          isImageLeft ? "order-1" : "order-2",
        )}
      >
        <Image
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200"
          alt={imageAlt}
          fill
          priority
          className="object-cover transition-transform duration-[20s] hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 via-transparent to-transparent bg-linear-to-t from-black/80" />

        <div className="absolute right-12 bottom-12 left-12 text-white">
          <h2 className="mb-4 text-4xl font-bold">{imageTitle}</h2>
          <p className="text-lg text-white/80">{imageDescription}</p>
        </div>
      </div>

      <div
        className={clsx(
          "flex justify-center items-center p-6 md:p-12",
          isImageLeft ? "order-2" : "order-1",
        )}
      >
        <div className="space-y-6 w-full max-w-md">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
            <p className="mt-2 text-muted-foreground">{subHeading}</p>
          </div>

          {children}

          <p className="text-sm text-center text-muted-foreground">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="text-primary hover:underline focus-within:underline focus-visible:outline-none focus-visible:ring-0"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
