"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MenuCard } from "../MenuCard";
import type { MenuItem } from "../../types";
import { staggerContainer, fadeUpVariant } from "@/lib/motion";

interface MenuPreviewSectionProps {
  items: MenuItem[];
}

export function MenuPreviewSection({
  items,
}: Readonly<MenuPreviewSectionProps>) {
  return (
    <section
      className="md:py-section-padding-v-desktop bg-surface-white py-12"
      id="menu"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeUpVariant}
        >
          <span className="mb-2 block font-serif text-sm font-semibold tracking-widest text-[#C4622D] uppercase">
            What We Brew
          </span>
          <h2 className="mb-4 font-serif text-3xl leading-tight font-bold text-stone-900 md:text-4xl">
            Curated Signatures
          </h2>
          <p className="mx-auto max-w-2xl text-base text-stone-500">
            A selection of our most cherished pours, each crafted to highlight
            the nuanced profiles of our earth-conscious roasts.
          </p>
        </motion.div>

        {/* 3-column grid on desktop, simple responsive grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUpVariant}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <MenuCard item={item} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center md:mt-12">
          <Link
            href="/menu"
            className="inline-block rounded-full border border-stone-300 bg-transparent px-8 py-3 font-medium text-stone-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-400 hover:bg-stone-50"
          >
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
