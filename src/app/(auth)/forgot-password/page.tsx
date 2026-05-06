import { ForgotPasswordForm } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Terra Coffee",
  description: "Request a password reset link for your Terra Coffee account.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
