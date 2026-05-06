"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { fadeUpVariant } from "@/lib/motion";

const testimonials = [
  {
    id: 1,
    quote:
      "The most peaceful corner in the city. The brown sugar oat latte is transformative, and the atmosphere makes me want to stay for hours.",
    author: "ELARA VANCE",
  },
  {
    id: 2,
    quote:
      "Terra Coffee understands craft. Their pourover selection is always on point, highlighting unique notes I've never tasted before.",
    author: "JULIAN REED",
  },
  {
    id: 3,
    quote:
      "A truly grounding space. I come here to escape the rush, and I always leave feeling more connected and refreshed. Simply beautiful.",
    author: "MAYA SHOR",
  },
];

export function TestimonialSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by width of one card, or fallback to 300
      const scrollAmount =
        current.querySelector(".testimonial-card")?.clientWidth || 300;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-espresso-dark text-terra-cream w-full overflow-hidden py-16 md:py-24">
      <div className="max-w-container-max px-gutter mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="mb-16 text-center"
        >
          <span className="text-terra-primary mb-2 block text-xs font-bold tracking-widest uppercase">
            Kind Words
          </span>
          <h2 className="font-headline-lg text-surface-white text-4xl font-medium md:text-5xl">
            What Our Guests Say
          </h2>
        </motion.div>

        <div className="group relative">
          <div
            ref={scrollRef}
            className="-mx-4 flex snap-x snap-mandatory gap-8 overflow-x-auto px-4 pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Adding a style tag to hide webkit scrollbar specifically for this container */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="testimonial-card relative w-full shrink-0 snap-center rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.33px)]"
              >
                <Quote className="text-primary absolute top-6 left-6 h-16 w-16 opacity-40" />
                <div className="text-primary relative mb-6 flex gap-1">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <blockquote className="text-surface-white relative mb-8 text-lg leading-relaxed italic">
                  &quot;{t.quote}&quot;
                </blockquote>
                <cite className="text-primary block text-xs font-bold tracking-widest not-italic">
                  — {t.author}
                </cite>
              </motion.div>
            ))}
          </div>

          {/* Desktop visual hint / controls */}
          <div className="mt-8 hidden justify-center gap-4 md:flex">
            <button
              onClick={() => scroll("left")}
              className="text-surface-white hover:bg-terra-primary/20 hover:text-terra-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 transition-all"
            >
              <ChevronLeft className="material-symbols-outlined h-6 w-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="text-surface-white hover:bg-terra-primary/20 hover:text-terra-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 transition-all"
            >
              <ChevronRight className="material-symbols-outlined h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
