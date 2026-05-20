import z from "zod";

export const CreateReservationSchema = z.object({
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
