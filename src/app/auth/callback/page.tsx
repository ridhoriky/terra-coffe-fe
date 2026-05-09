"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import api from "@/lib/api";
import type { AuthResponse } from "@/features/auth/types";
import { Coffee } from "lucide-react";

const CallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");

      if (token) {
        try {
          // Verify token and get user data
          // We can call /auth/me or a specialized endpoint to get full user data
          // Since backend already issued a token, we just need to sync the user store
          const { data } = await api.get<AuthResponse>("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setAuth(token, data.data.user);
          router.push("/");
        } catch (error) {
          console.error("OAuth callback error:", error);
          router.push("/login?error=oauth_failed");
        }
      } else {
        router.push("/login");
      }
    };

    handleCallback();
  }, [searchParams, setAuth, router]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-primary/10 mb-6 flex h-16 w-16 animate-pulse items-center justify-center rounded-full">
        <Coffee className="text-primary h-8 w-8" />
      </div>
      <h2 className="font-heading text-xl font-medium">Completing login...</h2>
      <p className="mt-2 text-sm text-neutral-500">
        Please wait while we set up your session.
      </p>
    </div>
  );
};

export default function OAuthCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <Suspense fallback={<div>Loading...</div>}>
        <CallbackContent />
      </Suspense>
    </div>
  );
}
