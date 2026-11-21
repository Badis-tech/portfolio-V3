import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";
import { site } from "@/lib/data";

// Signing key for visitor ids and delete links. Uses COMMENTS_SECRET when set;
// otherwise derives one from RESEND_API_KEY (server-only), so no extra env var is needed.
// The fixed fallback is only allowed outside production.
const secret = () => {
  if (process.env.COMMENTS_SECRET) return process.env.COMMENTS_SECRET;
  const key = process.env.RESEND_API_KEY;
  if (key) return createHmac("sha256", key).update("portfolio-v3/comments-signing").digest("hex");
  if (process.env.NODE_ENV === "production") throw new Error("Missing COMMENTS_SECRET or RESEND_API_KEY");
  return "dev-only-secret";
};

/** Visitor key: a hash of the IP, so raw IPs are never stored. */
export function visitorKey(req: Request) {
  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";
  return createHmac("sha256", secret()).update(ip).digest("hex").slice(0, 24);
}

export const sign = (value: string) => createHmac("sha256", secret()).update(value).digest("hex");

export function verify(value: string, sig: string) {
  const a = Buffer.from(sign(value));
  const b = Buffer.from(sig);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Trim, drop control characters, cap length. */
export function clean(v: unknown, max: number) {
  if (typeof v !== "string") return "";
  return v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Sends to the site owner. No-ops (returns false) if Resend isn't configured. */
export async function mailOwner(opts: { subject: string; html: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const { error } = await new Resend(key).emails.send({
    from: process.env.MAIL_FROM || "Portfolio <onboarding@resend.dev>",
    to: process.env.MAIL_TO || site.email,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
  });
  if (error) throw new Error(error.message);
  return true;
}

export const siteUrl = () =>
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
