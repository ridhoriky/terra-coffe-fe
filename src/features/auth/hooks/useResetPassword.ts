"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "../schemas/auth.schema";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");

  const passwordStrength = useMemo(() => {
    const pass = password || "";
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength += 1;
    if (/\d/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  }, [password]);

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      setError("Reset token is missing. Please request a new link.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      console.log("Resetting password with token:", token);
      // TODO: Implement real API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    control: form.control,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    error,
    isSuccess,
    passwordStrength,
  };
};
