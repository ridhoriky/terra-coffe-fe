"use client";

import {
  useDashboardReservations,
  type Reservation,
} from "../hooks/useDashboardReservations";
import DataTable from "./DataTable";
import { Loader2 } from "lucide-react";

export default function ReservationTable() {
  const { reservations, isLoading } = useDashboardReservations();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getStatusClass = (status: string): string => {
    if (status === "confirmed") return "bg-green-100 text-green-800";
    if (status === "pending") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Date/Time",
      render: (row: Reservation) =>
        `${row.reservationDate} at ${row.reservationTime}`,
    },
    { header: "Guests", accessor: "numGuests" },
    {
      header: "Status",
      render: (row: Reservation) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${getStatusClass(row.status)}`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return <DataTable data={reservations} columns={columns} />;
}
