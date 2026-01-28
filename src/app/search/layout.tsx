import Footer from "@/components/layout/landing/Footer";
import Navbar from "@/components/layout/landing/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
