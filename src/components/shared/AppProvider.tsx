"use client";

import React from "react";

export default function AppProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <>{children}</>;
}
