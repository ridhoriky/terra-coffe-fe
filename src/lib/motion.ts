import { Variants } from "framer-motion";

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 240 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 4px 24px rgba(44,26,14,0.08)" },
  hover: { y: -4, boxShadow: "0 12px 40px rgba(44,26,14,0.16)" },
};
