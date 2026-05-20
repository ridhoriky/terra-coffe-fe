import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import type { AuthUser } from "@/features/auth/types";
import { logger } from "@/lib/logger";
import axios from "axios";

export const useProfile = () => {
  const [profile, setProfile] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchProfile = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true);
      setError(null);
    }
    try {
      const { data } = await api.get("/users/profile");
      setProfile(data.data);
      // Sync with global auth store
      const currentToken = useAuthStore.getState().accessToken;
      if (currentToken) {
        useAuthStore.getState().setAuth(currentToken, data.data);
      }
    } catch (err) {
      logger.error(err, "Failed to fetch user profile");
      setError("Could not load user profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = async (input: {
    name?: string;
    avatarUrl?: string;
  }) => {
    setIsUpdating(true);
    setError(null);
    setSuccess(false);
    try {
      const { data } = await api.patch("/users/profile", input);
      setProfile(data.data);
      // Sync with global auth store
      const currentToken = useAuthStore.getState().accessToken;
      if (currentToken) {
        useAuthStore.getState().setAuth(currentToken, data.data);
      }
      setSuccess(true);
      return true;
    } catch (err) {
      logger.error(err, "Failed to update user profile");
      let msg = "Failed to update profile. Please try again.";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.error?.message || msg;
      }
      setError(msg);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile(false);
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    isUpdating,
    error,
    success,
    updateProfile,
    refetch: () => fetchProfile(true),
  };
};
