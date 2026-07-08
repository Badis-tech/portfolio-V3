# Portfolio V3

Personal portfolio of Badis Mahjoubi — System Engineer & Backend Architect.

## Tech

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for scroll animations
- [Supabase](https://supabase.com) auth + realtime for the lobby chat

## Development

```bash
npm install
vercel env pull .env.local   # Supabase URL + anon key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Lobby chat

`/login` handles signup/sign-in (Supabase email auth, auto-confirmed). Signed-in
players land in `/lobby`: a realtime chat room with an online-players sidebar
(Supabase Realtime `postgres_changes` + presence). `middleware.ts` guards the
routes.

Roles are stored in `public.profiles` (`player` | `admin`) and enforced with
Postgres RLS — see `supabase/migrations/`. Everyone signs up as `player`;
admins get a badge and can delete any message. Promote someone from the
Supabase SQL editor:

```sql
update public.profiles set role = 'admin' where username = 'your-name';
```

Schema changes go through migrations: `supabase db push --workdir .`

## Content

All portfolio content (bio, experience, projects, links) lives in `lib/data.ts` — edit that one file to update the site.

## Deploy

Deploys as-is on [Vercel](https://vercel.com): import the repo, no configuration needed.
