"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useReservation } from "../hooks/useReservation";
import { Loader2 } from "lucide-react";

const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z
    .string()
    .min(1, "Must have at least 1 guest")
    .refine((val) => {
      const num = Number(val);
      return !Number.isNaN(num) && num >= 1 && num <= 20;
    }, "Must be between 1 and 20 guests"),
  notes: z.string().max(500).optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

export function ReservationDialog({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const { createReservation, isLoading, error, success, resetStatus } =
    useReservation();

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 30);
  const maxDate = maxDateObj.toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
  });

  useEffect(() => {
    if (!isOpen) {
      resetStatus();
      if (success) reset();
    }
  }, [isOpen, success, reset, resetStatus]);

  const onSubmit = async (data: ReservationFormValues) => {
    const ok = await createReservation({
      name: data.name,
      email: data.email,
      phone: data.phone,
      reservationDate: data.date,
      reservationTime: data.time,
      guests: Number(data.guests),
      notes: data.notes || "",
    });

    if (ok) {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={children as React.ReactElement} />
      <DialogContent className="bg-surface-white border-outline/20 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline-md text-on-background text-2xl">
            Reserve a Table
          </DialogTitle>
          <DialogDescription className="font-body-md text-on-surface-variant">
            {success
              ? "Your reservation has been confirmed. We look forward to welcoming you."
              : "Experience the sanctuary. Book your table below."}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name")}
                className="bg-surface border-outline/30 focus-visible:ring-primary"
              />
              {errors.name && (
                <p className="text-error text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-surface border-outline/30 focus-visible:ring-primary"
                />
                {errors.email && (
                  <p className="text-error text-xs">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="0812..."
                  className="bg-surface border-outline/30 focus-visible:ring-primary"
                />
                {errors.phone && (
                  <p className="text-error text-xs">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  min={minDate}
                  max={maxDate}
                  {...register("date")}
                  suppressHydrationWarning
                  className="bg-surface border-outline/30 focus-visible:ring-primary"
                />
                {errors.date && (
                  <p className="text-error text-xs">{errors.date.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  {...register("time")}
                  className="bg-surface border-outline/30 focus-visible:ring-primary"
                />
                {errors.time && (
                  <p className="text-error text-xs">{errors.time.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="20"
                {...register("guests")}
                className="bg-surface border-outline/30 focus-visible:ring-primary"
              />
              {errors.guests && (
                <p className="text-error text-xs">{errors.guests.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="font-label-caps hover:bg-primary mt-4 h-12 w-full rounded-full bg-[#C4622D] text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Confirming...
                </>
              ) : (
                "Confirm Reservation"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
