"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { useState, useMemo } from "react";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
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

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Registering with:", data);
      // TODO: Implement real API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Registration successful (mock)");
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
    passwordStrength,
  };
};
