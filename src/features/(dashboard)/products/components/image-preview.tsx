"use client";

import Image from "next/image";
import { ComponentProps } from "react";
import { usePreviewUrl } from "../hooks/use-preview-url";

export default function ImagePreview({
  src,
  alt,
  ...props
}: {
  src: string | File;
  alt: string;
} & Omit<ComponentProps<typeof Image>, "src" | "alt">) {
  const url = usePreviewUrl(src);

  if (!url) return null;

  return <Image src={url} alt={alt} {...props} />;
}
