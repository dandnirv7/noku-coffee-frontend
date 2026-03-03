import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? `${window.location.origin}/api/auth`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`,
  sessionCookieName: "noku_session",
  plugins: [adminClient()],
});
