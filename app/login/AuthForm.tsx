"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { data: { username: username.trim() } },
          });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/lobby");
    router.refresh();
  }

  const inputClass =
    "w-full border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none";

  return (
    <div className="w-full max-w-sm">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {"// lobby access"}
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">
        {mode === "login" ? "Welcome back" : "Join the lobby"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {mode === "login"
          ? "Sign in to enter the live chat."
          : "Create a player account to start chatting."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {mode === "signup" && (
          <input
            className={inputClass}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={2}
            maxLength={24}
            required
          />
        )}
        <input
          className={inputClass}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent px-4 py-3 font-mono text-sm font-bold uppercase tracking-widest text-bg transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "..." : mode === "login" ? "Sign in" : "Sign up"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "signup" : "login");
          setError(null);
        }}
        className="mt-6 text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
      >
        {mode === "login"
          ? "No account yet? Sign up"
          : "Already a player? Sign in"}
      </button>
    </div>
  );
}
