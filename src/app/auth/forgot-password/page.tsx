import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | CreatorAI Studio",
  description: "Reset your password.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-6 py-12">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]" />

      <div className="relative z-10 w-full flex justify-center">
        <ForgotPasswordForm />
      </div>

    </main>
  );
}