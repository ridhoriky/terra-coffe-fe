"use client";

import { motion } from "framer-motion";
import { cardHover } from "@/lib/motion";
import Image from "next/image";
import type { MenuItem } from "../types";

interface MenuCardProps {
  readonly item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Log the image URL to console for debugging if it's missing or broken
  const displayImage = item.imageUrl || "/placeholder-coffee.jpg";

  return (
    <motion.div
      className="group bg-surface-white flex flex-col overflow-hidden rounded-xl border border-transparent shadow-[0_8px_24px_rgba(44,26,14,0.04)] hover:border-[#C4622D]/30"
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <div className="relative h-56 w-full overflow-hidden md:h-48">
        <Image
          alt={item.name}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          src={displayImage}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {item.discount.active && item.discount.label && (
          <div className="bg-primary absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
            {item.discount.label}
          </div>
        )}
      </div>

      <div className="flex grow flex-col p-6">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h3 className="font-headline-md text-on-background line-clamp-1 text-lg font-medium">
            {item.name}
          </h3>
          <div className="flex flex-col items-end">
            {item.discount.active && (
              <span className="text-on-surface-variant text-[11px] font-medium line-through decoration-red-500/50">
                {formatPrice(item.price)}
              </span>
            )}
            <span className="font-body-md text-primary font-semibold">
              {formatPrice(item.finalPrice)}
            </span>
          </div>
        </div>
        <p className="font-body-md text-on-surface-variant line-clamp-2 text-sm">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
