import { NextResponse } from "next/server";
import { redis } from "@/lib/server/redis";
import { clean, esc, mailOwner, visitorKey } from "@/lib/server/util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PER_HOUR = 5;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

/* POST { name, email, message, website } — `website` is a honeypot */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("invalid body");
  }
  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const message = clean(body.message, 4000);
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });
  if (name.length < 2) return bad("name");
  if (!EMAIL.test(email)) return bad("email");
  if (message.length < 10) return bad("message");

  // Rate limit when Redis is available; never block mail on a Redis outage.
  try {
    const r = await redis();
    const k = `pf:rl:contact:${visitorKey(req)}`;
    const n = await r.incr(k);
    if (n === 1) await r.expire(k, 3600);
    if (n > PER_HOUR) return bad("limit", 429);
  } catch {}

  try {
    const sent = await mailOwner({
      subject: `Portfolio message from ${name}`,
      replyTo: email,
      html: `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt; wrote:</p>
<p style="white-space:pre-wrap">${esc(message)}</p>
<p style="color:#888">Reply to this email to answer them directly.</p>`,
    });
    if (!sent) return bad("mail not configured", 503);
    return NextResponse.json({ ok: true });
  } catch {
    return bad("send failed", 502);
  }
}
