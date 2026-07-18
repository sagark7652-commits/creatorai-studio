"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MailCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { authService } from "@/services/auth";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [loading, setLoading] = useState(false);

  async function handleResendEmail() {
    if (!email) {
      toast.error("Email address not found.");
      return;
    }

    try {
      setLoading(true);

      await authService.resendVerificationEmail(email);

      toast.success("Verification email sent successfully.");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-3xl border bg-card shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-violet-100 p-5 dark:bg-violet-900/30">
            <MailCheck className="h-12 w-12 text-violet-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold">Verify your email</h1>

        <p className="mt-5 text-muted-foreground">
          We've sent a verification email to
        </p>

        <p className="font-semibold text-violet-600 mt-2 break-all">
          {email || "your email address"}
        </p>

        <p className="mt-5 text-sm text-muted-foreground">
          Click the verification link in your inbox before logging into CreatorAI Studio.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={handleResendEmail}
            disabled={loading}
            className="w-full rounded-xl border py-3 font-medium hover:bg-muted transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              "Resend Verification Email"
            )}
          </button>

          <Link
            href="/login"
            className="block w-full rounded-xl bg-violet-600 py-3 text-center font-semibold text-white hover:bg-violet-700 transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}