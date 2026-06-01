import { useState, useEffect, useCallback, useRef } from "react";
import api from "@/lib/api";
import { useRevalidateLanding } from "./useRevalidateLanding";
import type { GalleryItem } from "@/features/landing/types";

export function useGallery() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { revalidate } = useRevalidateLanding();
  const fetched = useRef(false);

  const fetchGalleries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/content/galleries");
      setGalleries(res.data.data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch galleries";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createGallery = async (data: Partial<GalleryItem>): Promise<void> => {
    try {
      await api.post("/content/galleries", data);
      await fetchGalleries();
      await revalidate();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create gallery item";
      throw new Error(message);
    }
  };

  const updateGallery = async (
    id: string,
    data: Partial<GalleryItem>,
  ): Promise<void> => {
    try {
      await api.patch(`/content/galleries/${id}`, data);
      await fetchGalleries();
      await revalidate();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update gallery item";
      throw new Error(message);
    }
  };

  const deleteGallery = async (id: string): Promise<void> => {
    try {
      await api.delete(`/content/galleries/${id}`);
      await fetchGalleries();
      await revalidate();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete gallery item";
      throw new Error(message);
    }
  };

  useEffect(() => {
    if (!fetched.current) {
      void fetchGalleries();
      fetched.current = true;
    }
  }, [fetchGalleries]);

  return {
    galleries,
    loading,
    error,
    fetchGalleries,
    createGallery,
    updateGallery,
    deleteGallery,
  };
}
