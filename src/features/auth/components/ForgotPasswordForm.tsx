"use client";

import React from "react";
import { Lock, Mail, ChevronLeft } from "lucide-react";
import { motion, Transition } from "framer-motion";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as Transition,
  },
};

export const ForgotPasswordForm = () => {
  const { form, onSubmit, isLoading, error, isSuccess } = useForgotPassword();
  const {
    register,
    formState: { errors },
  } = form;

  if (isSuccess) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="w-full max-w-[480px] rounded-[24px] border border-neutral-100 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-12"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <Mail className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="font-heading text-espresso-dark mb-4 text-[32px] font-medium">
          Reset link sent
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-neutral-500">
          We&apos;ve sent a password reset link to your email. Please check your
          inbox.
        </p>
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-12 w-full rounded-xl border border-neutral-200 bg-white font-medium text-neutral-700 hover:bg-neutral-50",
          )}
        >
          Return to Login
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUpVariant}
      className="relative w-full max-w-[480px] rounded-[24px] border border-neutral-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-12"
    >
      <Link
        href="/login"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-neutral-600"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Login
      </Link>

      <div className="mt-6 mb-8 flex flex-col items-center text-center">
        <div className="bg-primary/10 mb-6 flex h-12 w-12 items-center justify-center rounded-full">
          <Lock className="text-primary h-6 w-6" />
        </div>
        <h1 className="font-heading text-espresso-dark mb-2 text-[32px] font-medium">
          Forgot your password?
        </h1>
        <p className="text-sm text-neutral-500">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-neutral-700"
          >
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={cn(
              "focus:ring-primary focus:border-primary h-12 rounded-xl border-neutral-200 transition-all",
              errors.email && "border-red-500 focus:ring-red-500",
            )}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 shadow-primary/20 h-12 w-full rounded-xl text-base font-medium text-white shadow-lg transition-all active:scale-[0.98]"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500">
            Remembered it?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};
