"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import api from "@/lib/api";
import { logger } from "@/lib/logger";

export const useAuthInit = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Attempt to refresh session on mount
        const { data } = await api.post("/auth/refresh");

        // If successful (even if it's the first login), the backend returns new accessToken + user
        setAuth(data.data.accessToken, data.data.user);
      } catch (err) {
        // Log the error but silently fail if no refresh cookie present
        logger.error(
          err,
          "Session restoration failed (likely no valid refresh token)",
        );
        clearAuth();
      }
    };

    initializeAuth();
  }, [setAuth, clearAuth]);
};
