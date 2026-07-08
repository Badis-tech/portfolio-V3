export type AppRole = "player" | "admin";

export type Profile = {
  id: string;
  username: string;
  role: AppRole;
};

export type Message = {
  id: number;
  profile_id: string;
  username: string;
  role: AppRole;
  content: string;
  created_at: string;
};
