import { RegisterForm } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Terra Coffee",
  description:
    "Create an account with Terra Coffee for an exclusive experience.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
