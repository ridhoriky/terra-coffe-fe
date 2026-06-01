import React from "react";
import { AuthInitializer } from "@/features/auth/components/AuthInitializer";
import DashboardGuardLayout from "@/features/dashboard/components/DashboardGuardLayout";

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <AuthInitializer>
      <DashboardGuardLayout>{children}</DashboardGuardLayout>
    </AuthInitializer>
  );
}
