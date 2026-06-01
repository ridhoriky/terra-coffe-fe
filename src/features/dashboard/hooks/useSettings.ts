import { useState, useEffect, useCallback, useRef } from "react";
import api from "@/lib/api";
import { useRevalidateLanding } from "./useRevalidateLanding";
import type { SiteSettings } from "@/features/landing/types";

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { revalidate } = useRevalidateLanding();
  const fetched = useRef(false);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/content/settings");
      setSettings(res.data.data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch settings";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = async (data: Partial<SiteSettings>): Promise<void> => {
    try {
      await api.patch("/content/settings", data);
      await fetchSettings();
      await revalidate();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update settings";
      throw new Error(message);
    }
  };

  useEffect(() => {
    if (!fetched.current) {
      void fetchSettings();
      fetched.current = true;
    }
  }, [fetchSettings]);

  return { settings, loading, error, fetchSettings, updateSettings };
}
