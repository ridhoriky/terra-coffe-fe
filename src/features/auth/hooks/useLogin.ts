"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Logging in with:", data);
      // TODO: Implement real API call to Express backend
      // await authService.login(data);

      // Mock success delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Login successful (mock)");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong during login.";
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
  };
};
