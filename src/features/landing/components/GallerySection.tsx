"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/motion";

const images = [
  {
    src: "/images/landing/Barista_pouring_coffee.png",
    alt: "Barista meticulously pouring latte art into a ceramic cup",
    className: "md:col-span-6 md:row-span-2",
  },
  {
    src: "/images/landing/Close-up.png",
    alt: "Close-up macro shot of roasted dark coffee beans",
    className: "md:col-span-3",
  },
  {
    src: "/images/landing/A customer.png",
    alt: "A customer peacefully enjoying a cup of coffee in a warm sunlit corner",
    className: "md:col-span-3",
  },
  {
    src: "/images/landing/Cozy nook.png",
    alt: "Cozy nook in the coffee shop with wooden shelves and stacks of books",
    className: "md:col-span-3",
  },
  {
    src: "/images/landing/Inviting.png",
    alt: "Inviting exterior of Terra Coffee shop during the golden hour",
    className: "md:col-span-3",
  },
];

export function GallerySection() {
  return (
    <section
      className="bg-terra-cream/30 w-full overflow-hidden py-16 md:py-24"
      id="gallery"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="mb-12 text-center"
        >
          <span className="text-terra-taupe mb-2 block text-xs font-bold tracking-widest uppercase">
            Atmosphere
          </span>
          <h2 className="font-headline-lg text-terra-espresso text-4xl font-medium md:text-5xl">
            The Terra Experience
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-[1400px]"
        >
          <div className="grid grid-cols-1 gap-4 md:h-[700px] md:grid-cols-12 md:grid-rows-2">
            {images.map((img) => (
              <motion.div
                key={img.src}
                variants={fadeUpVariant}
                className={`group relative overflow-hidden rounded-xl shadow-sm transition-all duration-500 hover:shadow-md ${img.className} h-[300px] md:h-auto`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
