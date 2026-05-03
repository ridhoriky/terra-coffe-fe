"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariant } from "@/lib/motion";
import { MenuCard } from "./MenuCard";

const MENU_ITEMS = [
  {
    id: 1,
    title: "Terra Signature Espresso",
    price: "$4.50",
    description:
      "Our house blend, featuring notes of dark cocoa, toasted hazelnut, and a hint of wild berry.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7UCs7OuD-IPy6oK1INTMOJfW2SHyD0FhTz2M5c9NHZj3uu5EyvuN6XoU6TbxwaNWV6ZNSZMWLIZ3HMfJsgJzxw2NHrbOmDqLENKVX5OriWARpUWSg-XpISO0oSsYeigzHxaLEWQ4tmFiR122p_B9wSXxEDWUCzcwmsny48vU83q6LLrd5jBATJ-V7j7wk3bPw7XNV7aM3QXkfy7lEZCxriHhMTUmcLogVO2kxGW8WMdk8M9N6cd42gSuwIUSwfP1XLpIEetlJR_k",
    imageAlt: "Espresso",
  },
  {
    id: 2,
    title: "Brown Sugar Oat Latte",
    price: "$6.00",
    description:
      "Creamy oat milk perfectly balanced with house-made caramelized brown sugar syrup.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIDVcJaRj5CAVMdD0WETSiOQfCqwHsm6IaihfxK1XXA2MG4fGuF3U3CbnpJDNBkmO2bmWRVpOwWmYabQfYafM3BfV4uCN9fHa4d2lHABhGLMKCE0AvbVJ_AXcJoxVMlz8yhjG6lDOg0zhXq2uXe7ku1SVdukZgWd0Z_iErriGyGgAejgiBJ_8D5oP_7LNYMANTKhgc_jveNpwopiBEWj55SrQNfOFbFZbPPYQPUenG1-ruKWH5wGnYMdEwVmIV9pMO-D6nVrM_xTA",
    imageAlt: "Latte",
  },
  {
    id: 3,
    title: "Cold Brew Reserve",
    price: "$5.50",
    description:
      "Steeped for 24 hours, delivering a remarkably smooth, low-acidity profile with chocolate undertones.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJwbgpDuMEciJ4iAtUTsnHF3AIRhOoyJajbtAv7SSoJqhZUeit6X3bZUShkp4RDaS5_1vCRf-y4iEq3h7XMYykF6FKX5VF6dOE5_cpvL8laWM34uM1ehgnqFJxyCYKKnI1qwW0AKNFadMMVdJxvcfayGoDyWcqQKcVe_1kMXNhPoyMOEF9AyUVT3bXKw0xxZ0NiVKG8CZxFT96TmMubzm5w0-TjL2Pdx96SBe3AEqS3RlGb3qy0YUdIgyUsRXAmJnwgYW2s6w7JtA",
    imageAlt: "Cold Brew",
  },
  {
    id: 4,
    title: "Matcha Mist Latte",
    price: "$6.50",
    description:
      "Ceremonial grade matcha whisked to perfection, served with lightly sweetened steamed milk.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAspiS0WQRgcGeP63WCdJj9n91wSNQ0T1C448xgjZDGajpC_xQeXvRmVs_zsMu-lgg60U67Bu43sE0jfU8FulrWwZUfa58hFAgoS2ILQGO5MU5m6KdB2lGiZFTA6I6ecZwalbcyzREByhKOHPK1TzRrVA2z-188zRVIo4OcwiVHcQuqrLC8Jp9MLJjWHWH_IHs_3vDfW1jKnPlvOkgZsY4KB_puHcIiCV7391thNsHv2eejdzAQNuDUrKv7VEBtFTu6s7SDiVNvJBk",
    imageAlt: "Matcha",
  },
  {
    id: 5,
    title: "Honey Cortado",
    price: "$5.00",
    description:
      "Equal parts espresso and steamed milk, kissed with a touch of local wildflower honey.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALjNMCNyCdvYWbKmqx0AvgZTk0DZGO3etE5KHM-9PeGX-iEc1qw2X2ioAImw4MzhpYcztVPjeOtKOvi8gx5UAq8q13LrrvBE5oqyspUPUl7-BYNDVrdsXmFuEI7vXRCZUsjOtt-9qQQwcvOQOT0csAGD0uH47PK3p1rWahBcuPmXlZ72y0_m7P9NGQvbNw0CJRvxv1cbO47uioa0Yf7SoxmgprHMIUbGR2iFtfa6gfExxgDd70PgFnHUnw9EVI0XCkzNpzSYap7tA",
    imageAlt: "Cortado",
  },
  {
    id: 6,
    title: "Seasonal Pourover",
    price: "$7.00",
    description:
      "A rotating selection of single-origin beans, meticulously brewed to highlight distinct regional flavors.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC8xxdmnU4XI90nOK_K9i6kv7d4le4cCa_7zySslWb1r2LJP-ATCGQUeQE-bkze9PuDyyHV8DfQO7qI0-QsBR8sWgQtM2xZPPfsgNvqbev-iAJ-wMsJk6jmqDWwKi3KRIWG3mTAImaGkYU14FgGxTDDAGOGE0JylhG6STQ7Uiff-Mw7Ar-4Rgrf3hSj9fnWAgTEhciV9Yl7z6mQ4g4cOWKFjAW2t31DZ1tpLpXb8AiUPDDMMdq_sLWjXXKMp8HZoD_uQotO1WSv_U",
    imageAlt: "Pourover",
  },
];

export function MenuSection() {
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

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {MENU_ITEMS.map((item) => (
            <motion.div key={item.id} variants={fadeUpVariant}>
              <MenuCard {...item} />
            </motion.div>
          ))}
        </motion.div>

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
