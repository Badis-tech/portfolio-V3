import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Message, Profile } from "@/lib/lobby-types";
import Chat from "./Chat";

export const metadata: Metadata = {
  title: "Lobby — Live Chat",
  description: "Live lobby chat for signed-in players.",
};

export default async function LobbyPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: messages }] = await Promise.all([
    supabase.from("profiles").select("id, username, role").eq("id", user.id).single(),
    supabase
      .from("messages")
      .select("id, profile_id, username, role, content, created_at")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  if (!profile) redirect("/login");

  return (
    <Chat
      profile={profile as Profile}
      initialMessages={((messages as Message[]) ?? []).reverse()}
    />
  );
}
