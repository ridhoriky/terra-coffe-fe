"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUpVariant } from "@/lib/motion";
import { MenuCard } from "./MenuCard";
import { useMenuItems } from "../hooks/useMenuItems";
import { useCategories } from "../hooks/useCategories";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const { categories, isLoading: isCatsLoading } = useCategories();
  const {
    items,
    isLoading: isItemsLoading,
    error,
  } = useMenuItems({
    category: selectedCategory,
  });

  const isLoading = isCatsLoading || isItemsLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="mx-auto max-w-md rounded-xl border border-red-100 bg-red-50 p-8 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary mt-4 text-sm font-medium underline"
          >
            Try again
          </button>
        </div>
      );
    }

    return (
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <MenuCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section
      className="md:py-section-padding-v-desktop bg-surface-white py-12"
      id="menu"
    >
      <div className="max-w-container-max md:px-gutter mx-auto px-4">
        <motion.div
          className="mb-10 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeUpVariant}
        >
          <span className="font-label-caps text-label-caps text-outline mb-stack-sm block tracking-widest uppercase">
            What We Brew
          </span>
          <h2 className="font-headline-lg md:text-headline-lg text-on-background mb-stack-md text-3xl leading-tight">
            Curated Signatures
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mx-auto max-w-2xl">
            A selection of our most cherished pours, each crafted to highlight
            the nuanced profiles of our earth-conscious roasts.
          </p>
        </motion.div>

        {/* Category Tabs */}
        {!isCatsLoading && categories.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium transition-all",
                !selectedCategory
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-dim text-on-surface-variant hover:bg-surface-dim/80",
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-medium transition-all",
                  selectedCategory === cat.slug
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface-dim text-on-surface-variant hover:bg-surface-dim/80",
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {renderContent()}

        {!isLoading && items.length === 0 && !error && (
          <div className="py-12 text-center">
            <p className="text-on-surface-variant italic">
              No items found in this category.
            </p>
          </div>
        )}

        <div className="mt-10 text-center md:mt-12">
          <Link
            href="#menu"
            className="border-outline text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-dim inline-block rounded-full border bg-transparent px-8 py-3 transition-all duration-300 hover:-translate-y-1"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
