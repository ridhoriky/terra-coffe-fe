"use client";

import React from "react";
import { useAuthInit } from "../hooks/useAuthInit";
import { UnverifiedBanner } from "./UnverifiedBanner";

export function AuthInitializer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useAuthInit();
  return (
    <>
      <UnverifiedBanner />
      {children}
    </>
  );
}
