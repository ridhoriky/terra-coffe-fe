import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { AboutSection } from "@/features/about/components/AboutSection";
import { MenuSection } from "@/features/menu/components/MenuSection";
import { GallerySection } from "@/features/gallery";
import { TestimonialSection } from "@/features/testimonials";
import { LocationSection } from "@/features/location";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center">
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <MenuSection />
        <TestimonialSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
