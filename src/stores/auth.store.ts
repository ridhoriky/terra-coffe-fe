import { create } from "zustand";
import type { AuthUser } from "@/features/auth/types";

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
  setInitializing: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  setAuth: (token, user) =>
    set({
      accessToken: token,
      user,
      isAuthenticated: true,
      isInitializing: false,
    }),
  clearAuth: () =>
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isInitializing: false,
    }),
  setInitializing: (val) => set({ isInitializing: val }),
}));
