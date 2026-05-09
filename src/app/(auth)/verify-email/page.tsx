"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

const VerifyContent = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage(
          "Invalid verification link. Please check your email or request a new one.",
        );
        return;
      }

      try {
        await api.post("/auth/verify-email", { token });
        setStatus("success");
        setMessage(
          "Email verified successfully! You can now access all features.",
        );
      } catch (error: unknown) {
        let errorMsg = "Failed to verify email. The link may have expired.";
        if (axios.isAxiosError(error)) {
          errorMsg = error.response?.data?.error?.message || errorMsg;
        }
        setStatus("error");
        setMessage(errorMsg);
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="w-full max-w-md rounded-[24px] border border-neutral-100 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-12">
      <div className="mb-6 flex justify-center">
        {status === "loading" && (
          <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        )}
        {status === "success" && (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
            <CheckCircle2 className="h-8 w-8" />
          </div>
        )}
        {status === "error" && (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <XCircle className="h-8 w-8" />
          </div>
        )}
      </div>

      <h1 className="font-heading text-espresso-dark mb-2 text-2xl font-medium">
        {status === "loading"
          ? "Verifying..."
          : status === "success"
            ? "Verified!"
            : "Verification Failed"}
      </h1>
      <p className="mb-8 text-sm text-neutral-500">{message}</p>

      {status === "success" && (
        <Button asChild className="bg-primary h-12 w-full rounded-xl">
          <Link href="/login">Go to Login</Link>
        </Button>
      )}

      {status === "error" && (
        <div className="space-y-4">
          <Button asChild variant="outline" className="h-12 w-full rounded-xl">
            <Link href="/resend-verification">Resend Email</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
