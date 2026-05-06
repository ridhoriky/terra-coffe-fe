import { LoginForm } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Terra Coffee",
  description:
    "Sign in to your Terra Coffee account to manage your reservations.",
};

export default function LoginPage() {
  return <LoginForm />;
}
