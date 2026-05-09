"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import api from "@/lib/api";

export const useAuthInit = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Attempt to refresh session on mount
        const { data } = await api.post("/auth/refresh");

        // If successful (even if it's the first login), the backend returns new accessToken + user
        // Note: Backend might need to be adjusted to return 'user' on refresh if it doesn't already
        setAuth(data.data.accessToken, data.data.user);
      } catch (error) {
        // Silently fail if no refresh cookie present
        clearAuth();
      }
    };

    initializeAuth();
  }, [setAuth, clearAuth]);
};
