import { ResetPasswordForm } from "@/features/auth";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password | Terra Coffee",
  description: "Set a new password for your Terra Coffee account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[400px] w-full max-w-[480px] items-center justify-center rounded-[24px] border border-neutral-100 bg-white shadow-sm">
          <div className="border-primary/30 border-t-primary h-8 w-8 animate-spin rounded-full border-4"></div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
