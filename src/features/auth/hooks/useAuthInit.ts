"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";
import { logger } from "@/lib/logger";

export const useAuthInit = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setInitializing = useAuthStore((state) => state.setInitializing);

  useEffect(() => {
    const initializeAuth = async () => {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

      try {
        // Use global axios to bypass interceptors for the initial silent check
        // validateStatus allows 401 to be handled as a valid response to prevent Axios console noise
        const response = await axios.post(
          `${apiUrl}/auth/refresh`,
          {},
          {
            withCredentials: true,
            validateStatus: (status) =>
              (status >= 200 && status < 300) || status === 401,
          },
        );

        if (response.status === 200 && response.data.success) {
          setAuth(response.data.data.accessToken, response.data.data.user);
        } else {
          logger.info("No active session found (guest user)");
          clearAuth();
        }
      } catch (err) {
        logger.error(
          "Session restoration failed due to network or server error:",
          err,
        );
        clearAuth();
      } finally {
        setInitializing(false);
      }
    };

    initializeAuth();
  }, [setAuth, clearAuth, setInitializing]);
};
