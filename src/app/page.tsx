import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MenuPreviewSection } from "@/features/menu/components/preview/MenuPreviewSection";
import { STATIC_FEATURED_ITEMS } from "@/features/menu/constants";
import { CACHE_TAGS } from "@/lib/cacheTags";
import {
  HeroSection,
  AboutSection,
  GallerySection,
  TestimonialSection,
  LocationSection,
} from "@/features/landing";

async function getLandingData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

  const fetchOptions = { next: { tags: [CACHE_TAGS.landing] } };

  try {
    const [settingsRes, galleriesRes, testimonialsRes] = await Promise.all([
      fetch(`${baseUrl}/content/settings`, fetchOptions),
      fetch(`${baseUrl}/content/galleries`, fetchOptions),
      fetch(`${baseUrl}/content/testimonials`, fetchOptions),
    ]);

    const settings = await settingsRes.json();
    const galleries = await galleriesRes.json();
    const testimonials = await testimonialsRes.json();

    return {
      settings: settings.data,
      galleries: galleries.data,
      testimonials: testimonials.data,
    };
  } catch (error) {
    console.error("Failed to fetch landing data", error);
    return {
      settings: null,
      galleries: [],
      testimonials: [],
    };
  }
}

export default async function Home() {
  const { settings, galleries, testimonials } = await getLandingData();

  return (
    <>
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center">
        <HeroSection settings={settings} />
        <AboutSection settings={settings} />
        <GallerySection galleries={galleries} />
        <MenuPreviewSection items={STATIC_FEATURED_ITEMS} />
        <TestimonialSection testimonials={testimonials} />
        <LocationSection settings={settings} />
      </main>
      <Footer />
    </>
  );
}
