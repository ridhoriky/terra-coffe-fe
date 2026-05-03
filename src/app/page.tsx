import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { AboutSection } from "@/features/about/components/AboutSection";
import { MenuSection } from "@/features/menu/components/MenuSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center">
        <HeroSection />
        <AboutSection />
        <MenuSection />
      </main>
      <Footer />
    </>
  );
}
