export const logger = {
  info: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("ℹ️", ...args);
    }
  },
  warn: (...args: unknown[]) => {
    console.warn("⚠️", ...args);
  },
  error: (...args: unknown[]) => {
    console.error("❌", ...args);
  },
};
