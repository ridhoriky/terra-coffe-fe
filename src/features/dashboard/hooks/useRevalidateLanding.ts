import { useState } from "react";

export function useRevalidateLanding() {
  const [isRevalidating, setIsRevalidating] = useState(false);

  const revalidate = async () => {
    try {
      setIsRevalidating(true);
      const res = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-revalidation-secret":
            process.env.NEXT_PUBLIC_REVALIDATION_SECRET || "supersecret",
        },
        body: JSON.stringify({ tag: "landing" }),
      });
      const data = await res.json();
      return data.success;
    } catch (error) {
      console.error("Revalidation error", error);
      return false;
    } finally {
      setIsRevalidating(false);
    }
  };

  return { revalidate, isRevalidating };
}
