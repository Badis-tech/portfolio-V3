import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { threadIds, threadTitle } from "@/lib/data";
import { redis } from "@/lib/server/redis";
import { clean, esc, mailOwner, sign, siteUrl, visitorKey } from "@/lib/server/util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PER_THREAD = 3; // comments per visitor per thread
const KEEP = 300; // newest comments kept per thread
const SHOW = 100; // newest comments returned
const YEAR = 60 * 60 * 24 * 365;

export type Comment = { id: string; name: string; text: string; at: number };

const listKey = (t: string) => `pf:c:${t}`;
const limitKey = (t: string, v: string) => `pf:rl:${t}:${v}`;

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

function parse(raw: string[]): Comment[] {
  return raw.flatMap((s) => {
    try {
      return [JSON.parse(s) as Comment];
    } catch {
      return [];
    }
  });
}

/* GET ?counts=1 → { counts }   |   GET ?thread=x → { comments, remaining } */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  try {
    const r = await redis();
    if (q.has("counts")) {
      const lens = await Promise.all(threadIds.map((t) => r.lLen(listKey(t))));
      return NextResponse.json({ counts: Object.fromEntries(threadIds.map((t, i) => [t, lens[i]])) });
    }
    const thread = q.get("thread") ?? "";
    if (!threadIds.includes(thread)) return bad("unknown thread");
    const [raw, used] = await Promise.all([
      r.lRange(listKey(thread), 0, SHOW - 1),
      r.get(limitKey(thread, visitorKey(req))),
    ]);
    return NextResponse.json({
      comments: parse(raw),
      remaining: Math.max(0, PER_THREAD - Number(used ?? 0)),
    });
  } catch {
    return bad("comments unavailable", 503);
  }
}

/* POST { thread, name, text, website } — `website` is a honeypot, humans leave it empty */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("invalid body");
  }
  const thread = clean(body.thread, 64);
  const name = clean(body.name, 40);
  const text = clean(body.text, 500);
  if (!threadIds.includes(thread)) return bad("unknown thread");
  if (clean(body.website, 200)) return NextResponse.json({ ok: true }); // bot: pretend success
  if (name.length < 2) return bad("name");
  if (text.length < 2) return bad("text");

  try {
    const r = await redis();
    const lk = limitKey(thread, visitorKey(req));
    const used = await r.incr(lk);
    if (used === 1) await r.expire(lk, YEAR);
    if (used > PER_THREAD) return bad("limit", 429);

    const c: Comment = { id: randomUUID(), name, text, at: Date.now() };
    await r.multi().lPush(listKey(thread), JSON.stringify(c)).lTrim(listKey(thread), 0, KEEP - 1).exec();

    const del = `${siteUrl()}/api/comments/delete?thread=${thread}&id=${c.id}&sig=${sign(`${thread}:${c.id}`)}`;
    await mailOwner({
      subject: `New comment on ${threadTitle(thread)} — ${name}`,
      html: `<p><b>${esc(name)}</b> on <b>${esc(threadTitle(thread))}</b>:</p>
<blockquote style="border-left:3px solid #ccc;margin:0;padding:4px 12px;white-space:pre-wrap">${esc(text)}</blockquote>
<p><a href="${siteUrl()}/#contact">View site</a> · <a href="${del}">Delete this comment</a></p>`,
    }).catch(() => {});

    return NextResponse.json({ comment: c, remaining: PER_THREAD - used });
  } catch {
    return bad("comments unavailable", 503);
  }
}
