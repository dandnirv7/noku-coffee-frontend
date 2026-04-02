import BottomNav from "@/components/layout/landing/BottomNav";
import Navbar from "@/components/layout/landing/Navbar";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <BottomNav />
    </>
  );
}
