import { threadIds } from "@/lib/data";
import { redis } from "@/lib/server/redis";
import { verify } from "@/lib/server/util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const page = (msg: string, status = 200) =>
  new Response(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Comments</title><body style="font:16px system-ui;padding:40px">${msg}</body>`,
    { status, headers: { "content-type": "text/html; charset=utf-8" } },
  );

/* Link from the notification email: ?thread&id&sig (HMAC of "thread:id") */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const thread = q.get("thread") ?? "";
  const id = q.get("id") ?? "";
  if (!threadIds.includes(thread) || !id || !verify(`${thread}:${id}`, q.get("sig") ?? "")) {
    return page("Invalid link.", 403);
  }
  const r = await redis();
  const key = `pf:c:${thread}`;
  const all = await r.lRange(key, 0, -1);
  const hit = all.find((s) => s.includes(`"id":"${id}"`));
  if (!hit) return page("Already deleted.");
  await r.lRem(key, 1, hit);
  return page("Comment deleted.");
}
