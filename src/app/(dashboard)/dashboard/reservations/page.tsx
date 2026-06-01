"use client";

import ReservationTable from "@/features/dashboard/components/ReservationTable";

export default function DashboardReservationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Reservations Management
        </h2>
      </div>
      <ReservationTable />
    </div>
  );
}
