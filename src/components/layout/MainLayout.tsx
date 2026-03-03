import BottomNav from "@/components/layout/landing/BottomNav";
import Footer from "@/components/layout/landing/Footer";
import Navbar from "@/components/layout/landing/Navbar";
import { DynamicBreadcrumbs } from "@/components/shared/breadcrumbs";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0 min-h-screen flex flex-col">
        <DynamicBreadcrumbs />
        <div className="flex-1">{children}</div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
