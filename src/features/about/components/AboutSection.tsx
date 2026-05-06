"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section
      className="py-section-padding-v-mobile md:py-section-padding-v-desktop bg-terra-cream"
      id="our-story"
    >
      <div className="max-w-container-max md:px-gutter mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-2">
          <motion.div
            className="order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
          >
            <span className="font-label-caps text-label-caps text-outline mb-stack-sm block tracking-widest uppercase">
              Our Roots
            </span>
            <h2 className="font-headline-lg md:text-headline-lg text-on-background mb-stack-md text-3xl leading-tight">
              Crafting a Sanctuary in the City
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
              Terra Coffee was born from a simple desire: to create a tactile,
              grounding experience amidst the urban rush. We source our beans
              with profound respect for the earth and the farmers who nurture
              them, roasting each batch to coax out its intrinsic warmth.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
              Our space is an extension of our philosophy—minimalist yet deeply
              textured, designed to foster intentionality and calm. Here, every
              cup is an invitation to pause, breathe, and find comfort in the
              craft.
            </p>
            <Link
              href="#visit-us"
              className="text-primary hover:text-primary-container font-body-md inline-flex items-center gap-2 font-semibold transition-colors"
            >
              Learn more about our philosophy{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </motion.div>
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Decorative subtle shadow block */}
            <div className="bg-warm-ivory/50 absolute -inset-4 -z-10 rotate-2 transform rounded-xl"></div>
            <Image
              alt="Barista pouring coffee"
              className="aspect-4/5 h-auto w-full rounded-xl object-cover shadow-[0_12px_32px_rgba(44,26,14,0.08)]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvjB_3MPqKkcvzJ5EqF1FMMkdhNRHd-U4SKwbfeVBRZWUnrqBf2T2RiYrGQTqY2T__Zio7B8m4_KO9i6Coyoj4vwAhdpPkU_oKuJfVsGy49X0siwLc30To9pWudEa-oWUhlIc3drXobQNUnFQFCMPx12W-7kCHr1Bt4cH4DpmOM0u7mY5ObzcvwITJCVUULSNN2m23j3Qt_Nq-BbcXWv0TzibYF8RIs7hexlAqdnBQQab7gJkrxbG7uT1LOqe20Fk3d9ZVFITvQTE"
              width={800}
              height={600}
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
