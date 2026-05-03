"use client";

import { useState } from "react";
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

const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z
    .string()
    .min(1, "Must have at least 1 guest")
    .refine((val) => {
      const num = Number(val);
      return !Number.isNaN(num) && num >= 1 && num <= 10;
    }, "Must be between 1 and 10 guests"),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

export function ReservationDialog({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormValues) => {
    // TODO : API integration
    console.log(data);
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 500);
    }, 2000);
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
            {isSuccess
              ? "Your reservation has been confirmed. We look forward to welcoming you."
              : "Experience the sanctuary. Book your table below."}
          </DialogDescription>
        </DialogHeader>

        {!isSuccess && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name")}
                className="bg-surface border-outline/30 focus-visible:ring-primary"
              />
              {errors.name && (
                <p className="text-error text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-surface border-outline/30 focus-visible:ring-primary"
              />
              {errors.email && (
                <p className="text-error text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  {...register("date")}
                  className="bg-surface border-outline/30 focus-visible:ring-primary"
                />
                {errors.date && (
                  <p className="text-error text-sm">{errors.date.message}</p>
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
                  <p className="text-error text-sm">{errors.time.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                {...register("guests")}
                className="bg-surface border-outline/30 focus-visible:ring-primary"
              />
              {errors.guests && (
                <p className="text-error text-sm">{errors.guests.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-label-caps hover:bg-primary mt-4 h-12 w-full rounded-full bg-[#C4622D] text-white"
            >
              {isSubmitting ? "Confirming..." : "Confirm Reservation"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
