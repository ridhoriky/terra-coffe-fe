"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Coffee, UtensilsCrossed, CalendarDays, Tags } from "lucide-react";

export default function DashboardOverviewPage() {
  const stats = [
    {
      label: "Total Reservations",
      value: "0",
      icon: CalendarDays,
      color: "text-blue-500",
    },
    {
      label: "Active Menu Items",
      value: "0",
      icon: UtensilsCrossed,
      color: "text-amber-500",
    },
    { label: "Categories", value: "0", icon: Tags, color: "text-green-500" },
    {
      label: "Daily Visitors",
      value: "0",
      icon: Coffee,
      color: "text-stone-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground text-xs">
                +0% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
