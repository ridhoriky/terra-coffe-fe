import React from "react";
import { AuthInitializer } from "@/features/auth/components/AuthInitializer";

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <AuthInitializer>{children}</AuthInitializer>;
}
