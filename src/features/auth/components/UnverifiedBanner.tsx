"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import api from "@/lib/api";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const UnverifiedBanner = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated || !user || user.isVerified) {
    return null;
  }

  const handleResend = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post("/auth/resend-verification");
      setIsSuccess(true);
    } catch (err: unknown) {
      let errorMsg = "Failed to resend email.";
      if (axios.isAxiosError(err)) {
        errorMsg = err.response?.data?.error?.message || errorMsg;
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b border-amber-100 bg-amber-50 px-4 py-2 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between">
        <div className="flex flex-1 items-center">
          <span className="flex rounded-lg bg-amber-100 p-1.5 text-amber-600">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="ml-3 truncate text-sm font-medium text-amber-700">
            <span className="md:hidden">Please verify your email address.</span>
            <span className="hidden md:inline">
              Your email is not verified. Please check your inbox for the
              verification link.
            </span>
          </p>
        </div>
        <div className="order-3 mt-0 w-auto shrink-0 sm:order-2">
          {isSuccess ? (
            <span className="rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600">
              Verification email sent!
            </span>
          ) : (
            <div className="flex items-center gap-4">
              {error && (
                <span className="hidden text-[10px] text-red-500 lg:inline">
                  {error}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResend}
                disabled={isLoading}
                className="h-8 rounded-lg text-xs font-semibold text-amber-700 hover:bg-amber-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend Email"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
