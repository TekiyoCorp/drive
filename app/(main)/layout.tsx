import { ScrollSnap } from "@/components/global/scroll-snap";
import Footer from "@/components/main/footer";
import MobileNavbar from "@/components/main/mobile-navbar";
import Navbar from "@/components/main/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollSnap>
      <main className="w-full grow flex flex-col h-full min-h-screen max-sm:overflow-x-hidden">
        <Navbar />
        <MobileNavbar />
        <div className="grow flex flex-col z-10 bg-[#181818]">{children}</div>
        <Footer />
      </main>
    </ScrollSnap>
  );
}
