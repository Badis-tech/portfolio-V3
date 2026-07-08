import type { Metadata } from "next";
import AuthForm from "./AuthForm";

export const metadata: Metadata = {
  title: "Login — Lobby",
  description: "Sign in to join the live lobby chat.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <AuthForm />
    </main>
  );
}
