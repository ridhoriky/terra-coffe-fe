"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { UserProfile } from "@/features/user";
import { Navbar } from "@/components/shared/Navbar";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, isInitializing } = useAuthStore();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-sm text-stone-500">Checking session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="font-label-caps text-label-caps text-outline mb-2 block tracking-widest uppercase">
            My Sanctuary
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Your Profile
          </h1>
        </div>
        <UserProfile />
      </main>
    </div>
  );
}
