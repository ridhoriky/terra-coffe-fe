import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MenuPreviewSection } from "@/features/menu/components/preview/MenuPreviewSection";
import { STATIC_FEATURED_ITEMS } from "@/features/menu/constants";
import {
  HeroSection,
  AboutSection,
  GallerySection,
  TestimonialSection,
  LocationSection,
} from "@/features/landing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center">
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <MenuPreviewSection items={STATIC_FEATURED_ITEMS} />
        <TestimonialSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
