import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export interface Reservation {
  id: string;
  name: string;
  email: string;
  reservationDate: string;
  reservationTime: string;
  numGuests: number;
  status: string;
}

export function useDashboardReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReservations = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/reservations");
      if (res.data.success) {
        setReservations(res.data.data as Reservation[]);
      }
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchReservations();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchReservations]);

  return { reservations, isLoading, refetch: fetchReservations };
}
