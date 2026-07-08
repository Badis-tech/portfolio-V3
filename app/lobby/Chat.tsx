"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Message, Profile } from "@/lib/lobby-types";

type Props = {
  profile: Profile;
  initialMessages: Message[];
};

type OnlinePlayer = { id: string; username: string; role: string };

export default function Chat({ profile, initialMessages }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [online, setOnline] = useState<OnlinePlayer[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const channel = supabase
      .channel("lobby", { config: { presence: { key: profile.id } } })
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const message = payload.new as Message;
          setMessages((prev) =>
            prev.some((m) => m.id === message.id) ? prev : [...prev, message]
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          const deletedId = (payload.old as { id?: number }).id;
          if (deletedId != null) {
            setMessages((prev) => prev.filter((m) => m.id !== deletedId));
          }
        }
      )
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<OnlinePlayer>();
        const players = Object.values(state)
          .map((presences) => presences[0])
          .filter(Boolean)
          .sort((a, b) => a.username.localeCompare(b.username));
        setOnline(players);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            id: profile.id,
            username: profile.username,
            role: profile.role,
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, profile]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const content = draft.trim();
    if (!content || sending) return;

    setSending(true);
    const { data, error } = await supabase
      .from("messages")
      .insert({ profile_id: profile.id, content })
      .select()
      .single();
    if (!error) {
      setDraft("");
      // Show own message immediately; the realtime echo dedupes by id.
      const message = data as Message;
      setMessages((prev) =>
        prev.some((m) => m.id === message.id) ? prev : [...prev, message]
      );
    }
    setSending(false);
  }

  async function deleteMessage(id: number) {
    // Optimistic: RLS only allows this for admins anyway.
    setMessages((prev) => prev.filter((m) => m.id !== id));
    await supabase.from("messages").delete().eq("id", id);
  }

  return (
    <main className="mx-auto flex h-dvh max-w-5xl flex-col px-4 py-6 sm:px-6">
      <header className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {"// lobby"}
          </p>
          <h1 className="font-display text-2xl font-bold">Live chat</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted">
            <span className="text-fg">{profile.username}</span>
            {profile.role === "admin" && (
              <span className="ml-2 border border-accent px-1.5 py-0.5 font-mono text-[10px] uppercase text-accent">
                admin
              </span>
            )}
          </span>
          <Link
            href="/"
            className="font-mono text-xs uppercase text-muted hover:text-fg"
          >
            Portfolio
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="border border-line px-3 py-1.5 font-mono text-xs uppercase text-muted hover:border-accent hover:text-accent"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 gap-6 pt-4">
        <section className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-2">
            {messages.length === 0 && (
              <p className="pt-8 text-center text-sm text-muted">
                No messages yet. Say hi!
              </p>
            )}
            {messages.map((m) => {
              const mine = m.profile_id === profile.id;
              return (
                <div key={m.id} className={mine ? "text-right" : "text-left"}>
                  <div
                    className={`inline-block max-w-[80%] border px-3 py-2 text-left ${
                      mine
                        ? "border-accent/40 bg-accent/10"
                        : "border-line bg-surface"
                    }`}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`font-mono text-xs font-bold ${
                          m.role === "admin" ? "text-accent" : "text-fg"
                        }`}
                      >
                        {m.username}
                        {m.role === "admin" && " ★"}
                      </span>
                      <span className="text-[10px] text-muted">
                        {new Date(m.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {profile.role === "admin" && (
                        <button
                          onClick={() => deleteMessage(m.id)}
                          className="text-[10px] text-muted hover:text-red-400"
                          title="Delete message (admin)"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <p className="mt-1 break-words text-sm text-fg">
                      {m.content}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={sendMessage} className="mt-4 flex gap-2">
            <input
              className="flex-1 border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
              placeholder="Type a message…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={500}
            />
            <button
              type="submit"
              disabled={sending || !draft.trim()}
              className="bg-accent px-5 font-mono text-sm font-bold uppercase text-bg transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>

        <aside className="hidden w-48 shrink-0 border-l border-line pl-4 sm:block">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Online — {online.length}
          </h2>
          <ul className="mt-3 space-y-2">
            {online.map((p) => (
              <li key={p.id} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className={p.role === "admin" ? "text-accent" : "text-fg"}>
                  {p.username}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
