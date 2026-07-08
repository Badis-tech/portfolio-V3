-- Lobby chat: profiles with roles, messages, RLS, realtime.

-- Roles ---------------------------------------------------------------------

create type public.app_role as enum ('player', 'admin');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique check (char_length(username) between 2 and 24),
  role public.app_role not null default 'player',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Every new auth user gets a profile. Username comes from signup metadata;
-- role always starts as 'player' so clients can't self-promote.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'username'), ''),
      'player-' || left(new.id::text, 8)
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- True when the calling user is an admin. security definer so it can be used
-- inside RLS policies without recursing into profiles' own policies.
create function public.is_admin()
returns boolean
language sql
security definer set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create policy "Profiles are readable by signed-in users"
  on public.profiles for select
  to authenticated
  using (true);

-- Messages ------------------------------------------------------------------

create table public.messages (
  id bigint generated always as identity primary key,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  username text not null,
  role public.app_role not null default 'player',
  content text not null check (char_length(trim(content)) between 1 and 500),
  created_at timestamptz not null default now()
);

create index messages_created_at_idx on public.messages (created_at desc);

alter table public.messages enable row level security;

-- Stamp username/role from the sender's profile so they can't be spoofed
-- and realtime payloads carry them without a join.
create function public.stamp_message_author()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  select p.username, p.role into new.username, new.role
  from public.profiles p
  where p.id = new.profile_id;
  return new;
end;
$$;

create trigger before_message_insert
  before insert on public.messages
  for each row execute function public.stamp_message_author();

create policy "Messages are readable by signed-in users"
  on public.messages for select
  to authenticated
  using (true);

create policy "Users can send messages as themselves"
  on public.messages for insert
  to authenticated
  with check (profile_id = (select auth.uid()));

-- Role-based: only admins can moderate the lobby.
create policy "Admins can delete any message"
  on public.messages for delete
  to authenticated
  using (public.is_admin());

-- Realtime ------------------------------------------------------------------

-- Full replica identity so DELETE events include the old row (needed for
-- removing moderated messages from connected clients).
alter table public.messages replica identity full;

alter publication supabase_realtime add table public.messages;
