import React from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 md:p-12">
      {/* Decorative background elements if any */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-[0.03]">
        {/* Subtle grid or texture could go here */}
      </div>

      <main className="z-10 mx-auto flex w-full max-w-7xl grow items-center justify-center">
        {children}
      </main>

      <footer className="z-10 mt-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-6 text-sm text-neutral-500">
          <Link
            href="/privacy"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link
            href="/support"
            className="hover:text-primary transition-colors"
          >
            Support
          </Link>
        </div>
        <p className="text-xs text-neutral-400" suppressHydrationWarning>
          © {currentYear} Terra Coffee. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
