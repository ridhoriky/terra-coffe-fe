import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Coffee,
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  Tags,
  LogOut,
  Settings,
  Image as ImageIcon,
  MessageSquareQuote,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { clearAuth } = useAuthStore();

  const mainLinks = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/menu", label: "Menu Items", icon: UtensilsCrossed },
    { href: "/dashboard/categories", label: "Categories", icon: Tags },
    {
      href: "/dashboard/reservations",
      label: "Reservations",
      icon: CalendarDays,
    },
  ];

  const contentLinks = [
    {
      href: "/dashboard/content/settings",
      label: "Site Settings",
      icon: Settings,
    },
    { href: "/dashboard/content/gallery", label: "Gallery", icon: ImageIcon },
    {
      href: "/dashboard/content/testimonials",
      label: "Testimonials",
      icon: MessageSquareQuote,
    },
  ];

  return (
    <aside className="bg-background flex w-64 flex-col border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <Coffee className="text-primary h-6 w-6" />
          <span className="font-serif text-lg font-bold">Terra Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <h3 className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
            Core
          </h3>
          <nav className="space-y-1">
            {mainLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Separator className="my-4" />

        <div className="mb-4">
          <h3 className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
            Landing Page
          </h3>
          <nav className="space-y-1">
            {contentLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="border-t p-4">
        <Button
          variant="ghost"
          onClick={() => {
            void clearAuth();
          }}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full justify-start"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
