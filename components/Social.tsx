"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/data";

type Comment = { id: string; name: string; text: string; at: number };

const THREAD_POLL = 5000;
const COUNTS_POLL = 20000;

const copy = {
  en: {
    wallTitle: "Leave a note",
    wallSub: "Say hi, give feedback, or tell me what you're building. Notes appear live for everyone.",
    name: "Your name",
    comment: "Your comment",
    post: "Post",
    posting: "Posting…",
    empty: "No comments yet. Be the first.",
    left: (n: number) => (n === 1 ? "1 comment left" : `${n} comments left`),
    limit: "You've reached the 3-comment limit here.",
    comments: (n: number) => (n === 1 ? "1 comment" : `${n} comments`),
    hide: "Hide comments",
    formTitle: "Send me an email",
    email: "Your email",
    message: "Your message",
    send: "Send",
    sending: "Sending…",
    sent: "Thanks, your message is on its way. I'll reply to the address you gave.",
    errors: {
      name: "Please enter your name.",
      text: "Please write a comment.",
      email: "Please enter a valid email.",
      message: "Please write at least a short sentence.",
      limit: "Too many attempts. Please try again later.",
      generic: "Something went wrong. Please try again, or email me directly.",
    },
  },
  fr: {
    wallTitle: "Laissez un mot",
    wallSub: "Un bonjour, un retour, ou ce que vous construisez. Les messages s'affichent en direct pour tous.",
    name: "Votre nom",
    comment: "Votre commentaire",
    post: "Publier",
    posting: "Publication…",
    empty: "Aucun commentaire pour l'instant. Soyez le premier.",
    left: (n: number) => (n === 1 ? "1 commentaire restant" : `${n} commentaires restants`),
    limit: "Vous avez atteint la limite de 3 commentaires ici.",
    comments: (n: number) => (n === 1 ? "1 commentaire" : `${n} commentaires`),
    hide: "Masquer",
    formTitle: "M'envoyer un e-mail",
    email: "Votre e-mail",
    message: "Votre message",
    send: "Envoyer",
    sending: "Envoi…",
    sent: "Merci, votre message est parti. Je réponds à l'adresse indiquée.",
    errors: {
      name: "Indiquez votre nom.",
      text: "Écrivez un commentaire.",
      email: "Indiquez un e-mail valide.",
      message: "Écrivez au moins une courte phrase.",
      limit: "Trop de tentatives. Réessayez plus tard.",
      generic: "Une erreur est survenue. Réessayez ou écrivez-moi directement.",
    },
  },
  ar: {
    wallTitle: "اترك ملاحظة",
    wallSub: "قل مرحبًا، شارك رأيك، أو أخبرني بما تبنيه. تظهر الملاحظات مباشرة للجميع.",
    name: "اسمك",
    comment: "تعليقك",
    post: "نشر",
    posting: "جارٍ النشر…",
    empty: "لا توجد تعليقات بعد. كن الأول.",
    left: (n: number) => `متبقٍ ${n} من التعليقات`,
    limit: "لقد بلغت حد التعليقات الثلاثة هنا.",
    comments: (n: number) => `${n} تعليقات`,
    hide: "إخفاء التعليقات",
    formTitle: "راسلني عبر البريد",
    email: "بريدك الإلكتروني",
    message: "رسالتك",
    send: "إرسال",
    sending: "جارٍ الإرسال…",
    sent: "شكرًا، تم إرسال رسالتك. سأرد على البريد الذي أدخلته.",
    errors: {
      name: "يرجى إدخال اسمك.",
      text: "يرجى كتابة تعليق.",
      email: "يرجى إدخال بريد إلكتروني صالح.",
      message: "يرجى كتابة جملة قصيرة على الأقل.",
      limit: "محاولات كثيرة. حاول لاحقًا.",
      generic: "حدث خطأ. حاول مرة أخرى أو راسلني مباشرة.",
    },
  },
};

type ErrKey = keyof (typeof copy)["en"]["errors"];
const errKey = (e: unknown): ErrKey =>
  typeof e === "string" && e in copy.en.errors ? (e as ErrKey) : "generic";

const field =
  "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-[15px] text-fg placeholder:text-muted transition-colors focus:border-accent focus:outline-none";
const primary =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-on-accent transition-[filter] hover:brightness-110 disabled:opacity-60";

/** Runs `fn` now and every `ms` while the tab is visible. */
function usePoll(fn: () => void, ms: number, enabled = true) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    if (!enabled) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      ref.current();
      clearInterval(id);
      id = setInterval(() => ref.current(), ms);
    };
    const onVis = () => (document.hidden ? clearInterval(id) : start());
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ms, enabled]);
}

/* ─── comment counts for the project cards ─── */

const countSubs = new Set<(c: Record<string, number>) => void>();
let lastCounts: Record<string, number> = {};

export function useCommentCounts() {
  const [counts, setCounts] = useState(lastCounts);
  useEffect(() => {
    countSubs.add(setCounts);
    return () => void countSubs.delete(setCounts);
  }, []);
  return counts;
}

async function refreshCounts() {
  try {
    const res = await fetch("/api/comments?counts=1", { cache: "no-store" });
    if (!res.ok) return;
    lastCounts = (await res.json()).counts ?? {};
    countSubs.forEach((s) => s(lastCounts));
  } catch {}
}

/** Mount once on the page: keeps the 💬 counts fresh. */
export function CommentCountsPoller() {
  usePoll(refreshCounts, COUNTS_POLL);
  return null;
}

/* ─── one thread ─── */

function timeAgo(at: number, locale: Locale) {
  const s = Math.round((at - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  for (const [u, n] of [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]] as const) {
    if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), u);
  }
  return rtf.format(0, "second");
}

export function CommentThread({ thread, locale, compact = false }: { thread: string; locale: Locale; compact?: boolean }) {
  const t = copy[locale];
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [remaining, setRemaining] = useState(3);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [hp, setHp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ErrKey | null>(null);
  const [down, setDown] = useState(false);

  useEffect(() => {
    try {
      setName(localStorage.getItem("comment-name") ?? "");
    } catch {}
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?thread=${thread}`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setComments(data.comments);
      setRemaining(data.remaining);
      setDown(false);
    } catch {
      setDown(true);
      setComments((c) => c ?? []);
    }
  }, [thread]);

  usePoll(load, THREAD_POLL);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 2) return setError("name");
    if (text.trim().length < 2) return setError("text");
    setBusy(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ thread, name, text, website: hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "limit") setRemaining(0);
        return setError(errKey(data.error));
      }
      if (data.comment) setComments((c) => [data.comment, ...(c ?? []).filter((x) => x.id !== data.comment.id)]);
      if (typeof data.remaining === "number") setRemaining(data.remaining);
      setText("");
      try {
        localStorage.setItem("comment-name", name.trim());
      } catch {}
      refreshCounts();
    } catch {
      setError("generic");
    } finally {
      setBusy(false);
    }
  }

  const id = `c-${thread}`;
  return (
    <div className="flex flex-col gap-4">
      {remaining > 0 ? (
        <form onSubmit={submit} className="flex flex-col gap-2.5" noValidate>
          <div className={compact ? "flex flex-col gap-2.5" : "grid grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"}>
            <label className="sr-only" htmlFor={`${id}-name`}>{t.name}</label>
            <input
              id={`${id}-name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              placeholder={t.name}
              autoComplete="name"
              className={field}
            />
            <label className="sr-only" htmlFor={`${id}-text`}>{t.comment}</label>
            <textarea
              id={`${id}-text`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              rows={compact ? 2 : 1}
              placeholder={t.comment}
              className={`${field} min-h-[46px] resize-y`}
            />
          </div>
          {/* honeypot: hidden from people, bots fill it */}
          <input
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            name="website"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={busy} className={primary}>
              {busy ? t.posting : t.post}
            </button>
            <span className="font-mono text-xs text-muted">{t.left(remaining)}</span>
            {error && (
              <span role="alert" className="text-sm text-accent">
                {t.errors[error]}
              </span>
            )}
          </div>
        </form>
      ) : (
        <p className="rounded-xl border border-line bg-bg px-4 py-3 text-sm text-muted">{t.limit}</p>
      )}

      <ul aria-live="polite" className={`flex flex-col divide-y divide-line ${compact ? "max-h-[320px] overflow-y-auto" : ""}`}>
        {comments === null ? (
          <li className="py-3 text-sm text-muted">…</li>
        ) : comments.length === 0 ? (
          <li className="py-3 text-sm text-muted">{down ? t.errors.generic : t.empty}</li>
        ) : (
          comments.map((c) => (
            <li key={c.id} className="py-3">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-sm font-medium text-fg">{c.name}</span>
                <time dateTime={new Date(c.at).toISOString()} className="font-mono text-[11px] text-muted">
                  {timeAgo(c.at, locale)}
                </time>
              </p>
              <p className="mt-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-copy">{c.text}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

/* ─── project card: 💬 count that expands the thread ─── */

export function ProjectComments({ thread, locale }: { thread: string; locale: Locale }) {
  const t = copy[locale];
  const counts = useCommentCounts();
  const [open, setOpen] = useState(false);
  const n = counts[thread] ?? 0;
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`pc-${thread}`}
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-1 text-sm text-muted transition-colors hover:text-accent"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 rtl:-scale-x-100" aria-hidden>
          <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
        </svg>
        {open ? t.hide : t.comments(n)}
      </button>
      {open && (
        <div id={`pc-${thread}`} className="mt-2 rounded-xl border border-line bg-tile p-3">
          <CommentThread thread={thread} locale={locale} compact />
        </div>
      )}
    </div>
  );
}

/* ─── contact form ─── */

export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [f, setF] = useState({ name: "", email: "", message: "", website: "" });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<ErrKey | null>(null);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (f.name.trim().length < 2) return setError("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return setError("email");
    if (f.message.trim().length < 10) return setError("message");
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(errKey(data.error));
      setSent(true);
    } catch {
      setError("generic");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <p role="status" className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-4 text-[15px] text-fg">
        {t.sent}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2.5" noValidate>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <label className="sr-only" htmlFor="cf-name">{t.name}</label>
        <input id="cf-name" value={f.name} onChange={set("name")} maxLength={80} placeholder={t.name} autoComplete="name" className={field} />
        <label className="sr-only" htmlFor="cf-email">{t.email}</label>
        <input id="cf-email" type="email" dir="ltr" value={f.email} onChange={set("email")} maxLength={120} placeholder={t.email} autoComplete="email" className={`${field} rtl:text-right`} />
      </div>
      <label className="sr-only" htmlFor="cf-message">{t.message}</label>
      <textarea id="cf-message" value={f.message} onChange={set("message")} maxLength={4000} rows={5} placeholder={t.message} className={`${field} resize-y`} />
      <input tabIndex={-1} autoComplete="off" aria-hidden value={f.website} onChange={set("website")} name="website" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={busy} className={primary}>
          {busy ? t.sending : t.send}
        </button>
        {error && (
          <span role="alert" className="text-sm text-accent">
            {t.errors[error]}
          </span>
        )}
      </div>
    </form>
  );
}

export const socialCopy = copy;
