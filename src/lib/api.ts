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

// Response interceptor: handle token refresh on 401 and centralize error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. Handle Token Refresh
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
          useAuthStore.getState().setAuth(accessToken, user);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } else {
          useAuthStore.getState().clearAuth();
          if (
            globalThis.window !== undefined &&
            !globalThis.window.location.pathname.includes("/login")
          ) {
            globalThis.window.location.href = "/login";
          }
        }
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    // 2. Centralize Error Message Extraction
    // If it's an Axios error, extract the message from the API response
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.error?.message;
      if (apiMessage) {
        // We override the default axios error message with the one from our API
        error.message = apiMessage;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
