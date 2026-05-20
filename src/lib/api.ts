import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true, // Required for httpOnly cookies (refreshToken)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach accessToken to Authorization header
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop if refresh itself fails (401 on /auth/refresh)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          {
            withCredentials: true,
            validateStatus: (status) =>
              (status >= 200 && status < 300) || status === 401,
          },
        );

        if (data.success && data.data?.accessToken) {
          const { accessToken, user } = data.data;

          // Update store
          useAuthStore.getState().setAuth(accessToken, user);

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } else {
          // Session expired or invalid
          useAuthStore.getState().clearAuth();
          if (
            globalThis.window !== undefined &&
            !globalThis.window.location.pathname.includes("/login")
          ) {
            globalThis.window.location.href = "/login";
          }
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Network or server error during refresh
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
