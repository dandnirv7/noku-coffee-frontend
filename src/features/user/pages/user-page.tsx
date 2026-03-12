import { Metadata } from "next";
import { UserPageInner } from "../components/user-page-inner";

export const metadata: Metadata = {
  title: "Dashboard Pengguna | Noku Coffee",
  description: "Lihat status pesanan, promo khusus, dan statistik akun Anda.",
};

export default function UserPage() {
  return <UserPageInner />;
}
