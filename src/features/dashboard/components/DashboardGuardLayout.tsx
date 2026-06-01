"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { Loader2 } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

export default function DashboardGuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isInitializing, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && !isInitializing) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (pathname.startsWith("/dashboard") && user?.role !== "admin") {
        router.push("/");
      }
    }
  }, [mounted, isAuthenticated, isInitializing, user, pathname, router]);

  if (!mounted || isInitializing) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (
    !isAuthenticated ||
    (pathname.startsWith("/dashboard") && user?.role !== "admin")
  ) {
    return null;
  }

  // If it's not a dashboard route (e.g. /profile), just render children
  if (!pathname.startsWith("/dashboard")) {
    return <>{children}</>;
  }

  return (
    <div className="bg-muted/30 flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-7xl space-y-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
