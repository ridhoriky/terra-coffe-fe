"use client";

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
        // Filter to only load available items for the public listings
        params.append("available", "true");

        const { data } = await api.get(`/menu?${params.toString()}`);

        interface ApiMenuItem {
          id: string;
          categoryId: string | null;
          categoryName: string | null;
          name: string;
          description: string | null;
          price: string | number;
          discount: string | number | null;
          imageUrl: string | null;
          isAvailable: boolean;
          createdAt: string;
          updatedAt: string;
        }

        const mappedItems: MenuItem[] = data.data.map((item: ApiMenuItem) => {
          const price = Number(item.price);
          const discountAmount = Number(item.discount || 0);
          const finalPrice = price - discountAmount;

          return {
            id: item.id,
            category: {
              id: item.categoryId || "",
              name: item.categoryName || "",
              slug: "",
            },
            name: item.name,
            slug: "",
            description: item.description,
            price: price,
            finalPrice: finalPrice,
            imageUrl: item.imageUrl,
            calories: null,
            tags: [],
            isAvailable: item.isAvailable,
            isFeatured: false,
            discount: {
              active: discountAmount > 0,
              type: discountAmount > 0 ? "fixed" : null,
              value: discountAmount > 0 ? discountAmount : null,
              label:
                discountAmount > 0
                  ? `Save ${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(discountAmount)}`
                  : null,
              endsAt: null,
            },
            sortOrder: 0,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        });

        setItems(mappedItems);
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
