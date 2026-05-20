"use client";

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MenuSection } from "@/features/menu";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="mb-2 block font-serif text-sm font-semibold tracking-widest text-[#C4622D] uppercase">
            Our Offerings
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            The Full Sanctuary Menu
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-base text-stone-500">
            Explore our curated selection of craft coffee, seasonal specialties,
            and artisanal bites.
          </p>
        </div>
        <MenuSection hideCta hideHeader />
      </main>
      <Footer />
    </div>
  );
}
