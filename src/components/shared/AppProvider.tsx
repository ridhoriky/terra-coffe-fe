"use client";

import { useAuthInit } from "@/features/auth/hooks/useAuthInit";
import { UnverifiedBanner } from "@/features/auth/components/UnverifiedBanner";

export default function AppProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  useAuthInit();

  return (
    <>
      <UnverifiedBanner />
      {children}
    </>
  );
}
