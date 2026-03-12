"use client";

import { authClient } from "@/features/auth/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useRequireAuth() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const requireAuth = useCallback(
    (action: () => void) => {
      if (!session) {
        const callbackUrl = encodeURIComponent(pathname);
        router.push(`/login?callbackUrl=${callbackUrl}`);
        return;
      }
      action();
    },
    [session, router, pathname],
  );

  return { session, requireAuth };
}
