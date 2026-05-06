"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/motion";

const images = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvjB_3MPqKkcvzJ5EqF1FMMkdhNRHd-U4SKwbfeVBRZWUnrqBf2T2RiYrGQTqY2T__Zio7B8m4_KO9i6Coyoj4vwAhdpPkU_oKuJfVsGy49X0siwLc30To9pWudEa-oWUhlIc3drXobQNUnFQFCMPx12W-7kCHr1Bt4cH4DpmOM0u7mY5ObzcvwITJCVUULSNN2m23j3Qt_Nq-BbcXWv0TzibYF8RIs7hexlAqdnBQQab7gJkrxbG7uT1LOqe20Fk3d9ZVFITvQTE",
    alt: "Barista meticulously pouring latte art into a ceramic cup",
    className: "md:col-span-6 md:row-span-2",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7UCs7OuD-IPy6oK1INTMOJfW2SHyD0FhTz2M5c9NHZj3uu5EyvuN6XoU6TbxwaNWV6ZNSZMWLIZ3HMfJsgJzxw2NHrbOmDqLENKVX5OriWARpUWSg-XpISO0oSsYeigzHxaLEWQ4tmFiR122p_B9wSXxEDWUCzcwmsny48vU83q6LLrd5jBATJ-V7j7wk3bPw7XNV7aM3QXkfy7lEZCxriHhMTUmcLogVO2kxGW8WMdk8M9N6cd42gSuwIUSwfP1XLpIEetlJR_k",
    alt: "Close-up macro shot of roasted dark coffee beans",
    className: "md:col-span-3",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIDVcJaRj5CAVMdD0WETSiOQfCqwHsm6IaihfxK1XXA2MG4fGuF3U3CbnpJDNBkmO2bmWRVpOwWmYabQfYafM3BfV4uCN9fHa4d2lHABhGLMKCE0AvbVJ_AXcJoxVMlz8yhjG6lDOg0zhXq2uXe7ku1SVdukZgWd0Z_iErriGyGgAejgiBJ_8D5oP_7LNYMANTKhgc_jveNpwopiBEWj55SrQNfOFbFZbPPYQPUenG1-ruKWH5wGnYMdEwVmIV9pMO-D6nVrM_xTA",
    alt: "A customer peacefully enjoying a cup of coffee in a warm sunlit corner",
    className: "md:col-span-3",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC8xxdmnU4XI90nOK_K9i6kv7d4le4cCa_7zySslWb1r2LJP-ATCGQUeQE-bkze9PuDyyHV8DfQO7qI0-QsBR8sWgQtM2xZPPfsgNvqbev-iAJ-wMsJk6jmqDWwKi3KRIWG3mTAImaGkYU14FgGxTDDAGOGE0JylhG6STQ7Uiff-Mw7Ar-4Rgrf3hSj9fnWAgTEhciV9Yl7z6mQ4g4cOWKFjAW2t31DZ1tpLpXb8AiUPDDMMdq_sLWjXXKMp8HZoD_uQotO1WSv_U",
    alt: "Cozy nook in the coffee shop with wooden shelves and stacks of books",
    className: "md:col-span-3",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEIGO4DXd1JfkgnxOFdTy4R14bcUJ6klo8cBWcquULhBgulQFmIB8-XcknNcjJB6Q9Wzlo6Zk8uOsisw_TNaLRzWdul7htTax3-WaAVdREdc3Q65794_WUwiBz2sRXvnhXx6rFKmfGYRi_LhDad1B5NTEKTPkGNhmG87qXnGOUpoAmMv4lXsZQjMb2pjKm43yaTJ0su1oyfZOi4acajXOC2lBPgF2z8sWVYZR60MCiBb6bjshasNcsOsbczR8ih5JyYxjoEla53wI",
    alt: "Inviting exterior of Terra Coffee shop during the golden hour",
    className: "md:col-span-3",
  },
];

export function GallerySection() {
  return (
    <section
      id="ambience"
      className="bg-terra-cream/30 w-full overflow-hidden py-16 md:py-24"
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
