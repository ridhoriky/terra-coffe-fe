"use client";

import { useAuthStore } from "@/stores/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export default function DashboardTopbar() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  // Simple logic to get page title from pathname
  const getPageTitle = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return "Overview";
    const lastPart = parts[parts.length - 1];
    if (!lastPart) return "Overview";
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  return (
    <header className="bg-background flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold tracking-tight">
          {getPageTitle()}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm leading-none font-medium">
            {user?.name || "Admin"}
          </p>
          <p className="text-muted-foreground text-xs capitalize">
            {user?.role || "Administrator"}
          </p>
        </div>
        <Avatar className="h-9 w-9 border">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {(user?.name || "AD").substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
