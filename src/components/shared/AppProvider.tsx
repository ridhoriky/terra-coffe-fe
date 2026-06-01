"use client";

import React from "react";
import { Toaster } from "@/components/ui/sonner";

export default function AppProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
