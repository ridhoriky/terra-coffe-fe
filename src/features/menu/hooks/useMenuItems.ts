import { useEffect, useState } from "react";
import api from "@/lib/api";
import type { MenuItem } from "../types";
import { logger } from "@/lib/logger";

interface UseMenuItemsOptions {
  category?: string | undefined;
  featured?: boolean | undefined;
}

export const useMenuItems = (options: UseMenuItemsOptions = {}) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (options.category) params.append("category", options.category);
        if (options.featured) params.append("featured", "true");

        const { data } = await api.get(`/menu/items?${params.toString()}`);
        setItems(data.data);
      } catch (err) {
        logger.error(err, "Failed to fetch menu items");
        setError("Could not load menu items. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [options.category, options.featured]);

  return { items, isLoading, error };
};
