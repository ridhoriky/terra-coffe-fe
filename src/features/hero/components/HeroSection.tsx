"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/motion";
import { ReservationDialog } from "@/features/reservation/components/ReservationDialog";
import Image from "next/image";

export function HeroSection() {
  return (
    <header className="relative flex h-screen min-h-[600px] w-full items-center justify-center overflow-hidden pt-[88px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Warm moody coffee shop interior"
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEIGO4DXd1JfkgnxOFdTy4R14bcUJ6klo8cBWcquULhBgulQFmIB8-XcknNcjJB6Q9Wzlo6Zk8uOsisw_TNaLRzWdul7htTax3-WaAVdREdc3Q65794_WUwiBz2sRXvnhXx6rFKmfGYRi_LhDad1B5NTEKTPkGNhmG87qXnGOUpoAmMv4lXsZQjMb2pjKm43yaTJ0su1oyfZOi4acajXOC2lBPgF2z8sWVYZR60MCiBb6bjshasNcsOsbczR8ih5JyYxjoEla53wI"
          width={800}
          height={600}
          loading="eager"
        />
        {/* Overlay */}
        <div className="bg-espresso-dark/60 absolute inset-0 mix-blend-multiply"></div>
        <div className="from-espresso-dark/90 absolute inset-0 bg-linear-to-t via-transparent to-transparent"></div>
      </div>

      <motion.div
        className="max-w-container-max md:px-gutter text-on-primary relative z-10 mx-auto w-full px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
      >
        <h1 className="font-display-xl md:text-display-xl text-surface-white mb-stack-md text-4xl leading-tight drop-shadow-lg">
          Rooted in Every Sip
        </h1>
        <p className="font-body-lg md:text-body-lg text-warm-ivory mb-stack-lg mx-auto max-w-2xl text-base drop-shadow-md">
          A sanctuary from the city&apos;s pace. Slow down, connect, and
          experience artisanal craft in a space designed for grounding and
          comfort.
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:px-0">
          <Link
            href="#menu"
            className="font-label-caps text-label-caps bg-primary w-full min-w-[200px] rounded-full px-8 py-4 text-center text-white shadow-[0_8px_24px_rgba(44,26,14,0.25)] transition-all duration-300 hover:-translate-y-1 hover:brightness-90 sm:w-auto"
          >
            Explore Our Menu
          </Link>
          <ReservationDialog>
            <button className="border-warm-ivory text-warm-ivory font-label-caps text-label-caps hover:bg-warm-ivory/10 w-full min-w-[200px] rounded-full border bg-transparent px-8 py-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 sm:w-auto">
              Reserve a Table
            </button>
          </ReservationDialog>
        </div>
      </motion.div>
    </header>
  );
}
