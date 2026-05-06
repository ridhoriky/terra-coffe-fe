"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Clock } from "lucide-react";
import { fadeUpVariant } from "@/lib/motion";
import { ReservationDialog } from "@/features/reservation/components/ReservationDialog";

export function LocationSection() {
  return (
    <section id="visit-us" className="bg-terra-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Left: Info & Map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <span className="text-terra-taupe mb-2 block text-xs font-bold tracking-widest uppercase">
              Connect
            </span>
            <h2 className="font-headline-lg text-terra-espresso mb-8 text-4xl font-medium md:text-5xl">
              Come Visit Us
            </h2>

            <div className="mb-12 space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-terra-primary mt-1 h-6 w-6" />
                <div>
                  <h4 className="text-terra-espresso mb-1 text-lg font-bold">
                    Our Sanctuary
                  </h4>
                  <p className="text-terra-taupe">
                    124 Artisanal Lane, Heritage District
                    <br />
                    New York, NY 10012
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-terra-primary mt-1 h-6 w-6" />
                <div>
                  <h4 className="text-terra-espresso mb-1 text-lg font-bold">
                    Get in Touch
                  </h4>
                  <p className="text-terra-taupe">
                    hello@terracoffee.com
                    <br />
                    (212) 555-0198
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Stylized Map Placeholder */}
            <div className="border-terra-taupe/30 bg-terra-cream relative aspect-video w-full overflow-hidden rounded-2xl border shadow-inner">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply brightness-95 grayscale"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJso7TzHqxp5Z_l2gSbqxMzQD5q9yXvas4hZZKkX5sVgpTbLfdC6P1r-LQ0uwobtNgd2Uaas6WbT1BfRQwSEdQ8guwRn6svcS-1Kg-0B0evTxpdw6RjbyL-U4cqofyKES-R8kq82PvicZ320dYXoaR4QbH8RoISMyrPFO41zr5AF1rUBUcHYdBqY0LD_7o1NcK6Nq0nvDtUZQn4C1VxHhguR5xtaaqGOOP23YqrbqwOFKwIX_raSPxdgO6eLipHWORGCm9B805U-c')",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="bg-terra-primary absolute -inset-1 animate-ping rounded-full opacity-20" />
                  <MapPin className="text-terra-primary relative z-10 h-12 w-12 fill-current" />
                </div>
              </div>
              <div className="border-terra-taupe/30 text-terra-espresso absolute bottom-4 left-4 rounded-lg border bg-white px-4 py-2 text-[10px] font-bold tracking-widest uppercase">
                View on Google Maps
              </div>
            </div>
          </motion.div>

          {/* Right: Hours Table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="border-terra-taupe/30 rounded-3xl border bg-white/50 p-10 md:p-16"
          >
            <div className="mb-8 flex items-center gap-4">
              <Clock className="text-terra-primary h-8 w-8" />
              <h3 className="font-headline-lg text-terra-espresso text-2xl font-medium">
                Operating Hours
              </h3>
            </div>

            <div className="space-y-6">
              <div className="border-terra-taupe/30 flex items-center justify-between border-b pb-4">
                <span className="text-terra-espresso font-semibold">
                  Monday — Friday
                </span>
                <span className="text-terra-taupe">7:00 AM — 6:00 PM</span>
              </div>
              <div className="border-terra-taupe/30 flex items-center justify-between border-b pb-4">
                <span className="text-terra-espresso font-semibold">
                  Saturday
                </span>
                <span className="text-terra-taupe">8:00 AM — 7:00 PM</span>
              </div>
              <div className="border-terra-taupe/30 flex items-center justify-between border-b pb-4">
                <span className="text-terra-espresso font-semibold">
                  Sunday
                </span>
                <span className="text-terra-taupe">8:00 AM — 5:00 PM</span>
              </div>
            </div>

            <div className="border-terra-taupe bg-terra-cream/50 mt-12 rounded-xl border border-dashed p-6">
              <p className="text-terra-taupe text-center text-sm italic">
                &quot;Join us early for a quiet sunrise pour, or visit during
                the golden hour to see our space truly shine.&quot;
              </p>
            </div>

            <div className="mt-12">
              <ReservationDialog>
                <button className="bg-terra-primary w-full rounded-full py-4 text-center text-xs font-bold tracking-widest text-white transition-all hover:brightness-90">
                  RESERVE A TABLE
                </button>
              </ReservationDialog>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
