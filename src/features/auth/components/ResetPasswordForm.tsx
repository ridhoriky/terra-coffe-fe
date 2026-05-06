"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import { motion, Transition } from "framer-motion";
import { useResetPassword } from "../hooks/useResetPassword";
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

export const ResetPasswordForm = () => {
  const { form, onSubmit, isLoading, error, isSuccess, passwordStrength } =
    useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = form;

  const strengthColors = [
    "bg-neutral-200", // 0
    "bg-red-500", // 1
    "bg-amber-500", // 2
    "bg-emerald-500", // 3
    "bg-emerald-600", // 4
  ];

  if (isSuccess) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="w-full max-w-[480px] rounded-[24px] border border-neutral-100 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-12"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="font-heading text-espresso-dark mb-4 text-[32px] font-medium">
          Password reset!
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-neutral-500">
          Your password has been successfully updated. You can now securely
          access your account.
        </p>
        <Link
          href="/login"
          className={cn(
            buttonVariants(),
            "h-12 w-full rounded-xl bg-neutral-400 font-medium text-white hover:bg-neutral-500",
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
      className="w-full max-w-[480px] rounded-[24px] border border-neutral-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-12"
    >
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="bg-primary/10 mb-6 flex h-12 w-12 items-center justify-center rounded-full">
          <ShieldCheck className="text-primary h-6 w-6" />
        </div>
        <h1 className="font-heading text-espresso-dark mb-2 text-[32px] font-medium">
          Set new password
        </h1>
        <p className="text-sm text-neutral-500">
          Create a strong, secure password to protect your Terra Coffee account.
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
            htmlFor="password"
            className="text-sm font-medium text-neutral-700"
          >
            New Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              {...register("password")}
              className={cn(
                "focus:ring-primary focus:border-primary h-12 rounded-xl border-neutral-200 pr-11 transition-all",
                errors.password && "border-red-500 focus:ring-red-500",
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-neutral-400 transition-colors hover:text-neutral-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="mt-3 flex h-1.5 gap-1.5">
            {[1, 2, 3, 4].map((segment) => (
              <div
                key={segment}
                className={cn(
                  "flex-1 rounded-full transition-colors duration-300",
                  passwordStrength >= segment
                    ? strengthColors[passwordStrength]
                    : "bg-neutral-100",
                )}
              />
            ))}
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <p className="text-[11px] text-neutral-400">
              Use symbols & numbers
            </p>
            <p
              className={cn(
                "text-[11px] font-medium",
                passwordStrength >= 3 ? "text-emerald-600" : "text-neutral-400",
              )}
            >
              {passwordStrength >= 3 ? "Strong" : ""}
            </p>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-neutral-700"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat new password"
              {...register("confirmPassword")}
              className={cn(
                "focus:ring-primary focus:border-primary h-12 rounded-xl border-neutral-200 pr-11 transition-all",
                errors.confirmPassword && "border-red-500 focus:ring-red-500",
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-neutral-400 transition-colors hover:text-neutral-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 shadow-primary/20 h-12 w-full rounded-xl text-base font-medium text-white shadow-lg transition-all active:scale-[0.98]"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-neutral-600"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </form>
    </motion.div>
  );
};
