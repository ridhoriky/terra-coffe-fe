"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import type { Category } from "../types";
import { logger } from "@/lib/logger";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data.data);
      } catch (err) {
        logger.error(err, "Failed to fetch categories");
        setError("Could not load categories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};
