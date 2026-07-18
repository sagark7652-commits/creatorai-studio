import { ReactNode } from "react";
import { AuthIllustration } from "@/components/auth/AuthIllustration";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-background">
      <AuthIllustration />

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </section>
    </main>
  );
}