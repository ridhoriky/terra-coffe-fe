"use client";

import { useState } from "react";
import api from "@/lib/api";

export function useDashboardMenu() {
  const [loading, setLoading] = useState(false);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await api.get("/menu");
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { fetchMenu, loading };
}
