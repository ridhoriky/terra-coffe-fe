"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "../schemas/auth.schema";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import axios from "axios";

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      setError("Reset token is missing. Please request a new link.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await api.post("/auth/reset-password", {
        token,
        password: data.password,
      });
      setIsSuccess(true);
    } catch (err: unknown) {
      let message = "Something went wrong.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.error?.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    error,
    isSuccess,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
