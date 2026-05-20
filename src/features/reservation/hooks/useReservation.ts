import { useState } from "react";
import api from "@/lib/api";
import axios from "axios";

export interface CreateReservationInput {
  name: string;
  email: string;
  phone: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  notes?: string;
}

export const useReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createReservation = async (input: CreateReservationInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.post("/reservations", input);
      setSuccess(true);
      return true;
    } catch (err: unknown) {
      let message = "Failed to create reservation. Please try again.";

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          const availableCapacity =
            err.response.data?.availableCapacity ??
            err.response.data?.error?.availableCapacity;
          if (availableCapacity) {
            message = `Jadwal penuh. Sisa kapasitas untuk jam ini hanya ${availableCapacity} tamu.`;
          } else {
            message =
              err.response?.data?.error?.message ||
              err.response?.data?.message ||
              message;
          }
        } else {
          message =
            err.response?.data?.error?.message ||
            err.response?.data?.message ||
            message;
        }
      }

      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetStatus = () => {
    setSuccess(false);
    setError(null);
  };

  return {
    createReservation,
    isLoading,
    error,
    success,
    resetStatus,
  };
};
