"use client";

import { motion } from "framer-motion";
import { cardHover } from "@/lib/motion";
import Image from "next/image";

interface MenuCardProps {
  readonly title: string;
  readonly price: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
}

export function MenuCard({
  title,
  price,
  description,
  imageUrl,
  imageAlt,
}: MenuCardProps) {
  return (
    <motion.div
      className="group bg-surface-white flex flex-col overflow-hidden rounded-xl border border-transparent shadow-[0_8px_24px_rgba(44,26,14,0.04)] hover:border-[#C4622D]/30"
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Image
        alt={imageAlt}
        className="h-56 w-full object-cover md:h-48"
        src={imageUrl}
        width={800}
        height={600}
      />
      <div className="flex grow flex-col p-6">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="font-headline-md text-on-background text-lg font-medium">
            {title}
          </h3>
          <span className="font-body-md text-primary font-semibold">
            {price}
          </span>
        </div>
        <p className="font-body-md text-on-surface-variant text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
