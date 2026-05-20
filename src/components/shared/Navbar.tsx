"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReservationDialog } from "@/features/reservation/components/ReservationDialog";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Reserve", href: "/#reserve" },
    { name: "Our Story", href: "/#our-story" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Menu", href: "/#menu" },
    { name: "Visit Us", href: "/#visit-us" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-stone-200 bg-stone-50/95 shadow-sm shadow-stone-900/5 backdrop-blur-md duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 md:py-5">
        <Link
          href="/"
          className="font-serif text-xl font-bold tracking-tighter text-orange-800 uppercase md:text-2xl dark:text-orange-500"
        >
          Terra Coffee
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-serif text-stone-600 transition-colors hover:-translate-y-px hover:text-orange-700 hover:opacity-90 dark:text-stone-400 dark:hover:text-orange-400"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <ReservationDialog>
          <button className="font-label-caps text-label-caps hidden items-center justify-center rounded-full bg-[#C4622D] px-6 py-2.5 text-white shadow-[0_4px_14px_rgba(44,26,14,0.15)] transition-all duration-300 hover:-translate-y-1 hover:brightness-90 md:inline-flex">
            Reserve a Table
          </button>
        </ReservationDialog>
        {/* Mobile Menu Toggle */}
        <button
          className="text-stone-800 focus:outline-none md:hidden dark:text-stone-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-stone-200 bg-stone-50 md:hidden dark:border-stone-800 dark:bg-stone-950"
          >
            <div className="flex flex-col gap-6 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg text-stone-800 dark:text-stone-100"
                >
                  {link.name}
                </Link>
              ))}
              <ReservationDialog>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-label-caps text-label-caps inline-flex w-full items-center justify-center rounded-full bg-[#C4622D] px-6 py-3 text-center text-white shadow-md"
                >
                  Reserve a Table
                </button>
              </ReservationDialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
