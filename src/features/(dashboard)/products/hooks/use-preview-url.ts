import { useMemo, useEffect } from "react";

export function usePreviewUrl(source: string | File) {
  const url = useMemo(() => {
    if (typeof source === "string") return source;
    return URL.createObjectURL(source);
  }, [source]);

  useEffect(() => {
    if (source instanceof File) {
      return () => URL.revokeObjectURL(url);
    }
  }, [source, url]);

  return url;
}
