import { useState, useEffect, useCallback, useRef } from "react";
import api from "@/lib/api";
import { useRevalidateLanding } from "./useRevalidateLanding";
import type { Testimonial } from "@/features/landing/types";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { revalidate } = useRevalidateLanding();
  const fetched = useRef(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/content/testimonials");
      setTestimonials(res.data.data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch testimonials";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTestimonial = async (
    data: Partial<Testimonial>,
  ): Promise<void> => {
    try {
      await api.post("/content/testimonials", data);
      await fetchTestimonials();
      await revalidate();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create testimonial";
      throw new Error(message);
    }
  };

  const updateTestimonial = async (
    id: string,
    data: Partial<Testimonial>,
  ): Promise<void> => {
    try {
      await api.patch(`/content/testimonials/${id}`, data);
      await fetchTestimonials();
      await revalidate();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update testimonial";
      throw new Error(message);
    }
  };

  const deleteTestimonial = async (id: string): Promise<void> => {
    try {
      await api.delete(`/content/testimonials/${id}`);
      await fetchTestimonials();
      await revalidate();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete testimonial";
      throw new Error(message);
    }
  };

  useEffect(() => {
    if (!fetched.current) {
      void fetchTestimonials();
      fetched.current = true;
    }
  }, [fetchTestimonials]);

  return {
    testimonials,
    loading,
    error,
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
}
