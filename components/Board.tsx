"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  about,
  contact as contactData,
  cv,
  experience,
  projects,
  site,
  siteI18n,
  type Locale,
  type Project,
  techStack,
} from "@/lib/data";
import { useLocale } from "@/lib/i18n";

const pill =
  "inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm transition-colors";

/* ─── icons: one 1.75 stroke family ─── */
const Icon = ({ d, className = "h-4 w-4" }: { d: string; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} shrink-0 rtl:-scale-x-100`}
    aria-hidden
  >
    <path d={d} />
  </svg>
);
const ic = {
  arrow: "M7 17L17 7M9 7h8v8",
  down: "M12 4v12m0 0l-5-5m5 5l5-5M5 20h14",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  code: "M9 8l-4 4 4 4m6-8l4 4-4 4",
  sun: "M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10l1.4 1.4m0-12.8L17 7M7 17l-1.4 1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
  moon: "M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z",
};

const locales: Locale[] = ["en", "fr", "ar"];

const copy = {
  en: {
    toggleTheme: "Toggle dark / light mode",
    status: "Available · Tunis, UTC+1",
    seeDemos: "See the demos",
    downloadCv: "Download CV",
    contact: "Contact",
    projects: "Work you can open",
    projectsSub: "One product in production and six interactive mockups with fictional data. Every card opens.",
    experience: "Experience",
    education: "Education",
    stack: "Stack",
    live: "Live",
    mockup: "Mockup",
    liveDemo: "Open the site",
    mockupDemo: "Try the demo",
    code: "Code",
    mockupNote: "Interactive mockup with fictional data",
    expSummaries: [
      "SaaS platforms and automation systems for clients. Job-application automation on the German market, a multi-agent scraper (~30,000 establishments) and multi-source ingestion pipelines.",
      "RESTful APIs with FastAPI and PostgreSQL, LLM integration to automate business workflows, automated data pipelines on Supabase Edge Functions.",
      "Maintained and evolved a high-availability financial platform; backend infrastructure and performance optimization.",
    ],
    edu: [
      ["ESPRIT", "Engineering degree in Computer Science, Fintech", "2020 — 2025"],
      ["ISET Radès", "Applied bachelor's in Electrical Engineering", "2016 — 2020"],
    ],
    emailMe: "Email me",
    nav: { work: "Work", experience: "Experience", education: "Education", stack: "Stack", contact: "Contact" },
    menu: "Sections",
  },
  fr: {
    toggleTheme: "Basculer le mode sombre / clair",
    status: "Disponible · Tunis, UTC+1",
    seeDemos: "Voir les démos",
    downloadCv: "Télécharger le CV",
    contact: "Contact",
    projects: "Des projets à ouvrir",
    projectsSub: "Un produit en production et six maquettes interactives aux données fictives. Chaque carte s'ouvre.",
    experience: "Expérience",
    education: "Formation",
    stack: "Stack",
    live: "En ligne",
    mockup: "Maquette",
    liveDemo: "Ouvrir le site",
    mockupDemo: "Tester la démo",
    code: "Code",
    mockupNote: "Maquette interactive, données fictives",
    expSummaries: [
      "Plateformes SaaS et systèmes d'automatisation pour des clients. Automatisation de candidatures sur le marché allemand, scraper multi-agents (~30 000 établissements) et pipelines d'ingestion multi-sources.",
      "APIs RESTful avec FastAPI et PostgreSQL, intégration de LLM pour automatiser les workflows métier, pipelines de données sur Supabase Edge Functions.",
      "Maintenance et évolution d'une plateforme financière haute disponibilité ; infrastructure backend et optimisation des performances.",
    ],
    edu: [
      ["ESPRIT", "Diplôme d'ingénieur en informatique, spécialité Fintech", "2020 — 2025"],
      ["ISET Radès", "Licence appliquée en génie électrique", "2016 — 2020"],
    ],
    emailMe: "M'écrire",
    nav: { work: "Projets", experience: "Expérience", education: "Formation", stack: "Stack", contact: "Contact" },
    menu: "Sections",
  },
  ar: {
    toggleTheme: "تبديل الوضع الداكن / الفاتح",
    status: "متاح · تونس، UTC+1",
    seeDemos: "شاهد العروض",
    downloadCv: "تحميل السيرة الذاتية",
    contact: "التواصل",
    projects: "أعمال يمكنك فتحها",
    projectsSub: "منتج قيد التشغيل وستة نماذج تفاعلية ببيانات وهمية. كل بطاقة قابلة للفتح.",
    experience: "الخبرة",
    education: "التعليم",
    stack: "التقنيات",
    live: "مباشر",
    mockup: "نموذج",
    liveDemo: "افتح الموقع",
    mockupDemo: "جرّب العرض",
    code: "الكود",
    mockupNote: "نموذج تفاعلي ببيانات وهمية",
    expSummaries: [
      "منصات SaaS وأنظمة أتمتة للعملاء. أتمتة التقديم على الوظائف في السوق الألماني، وجامع بيانات متعدد الوكلاء (~30,000 منشأة)، وخطوط استيعاب من مصادر متعددة.",
      "واجهات RESTful باستخدام FastAPI وPostgreSQL، ودمج نماذج اللغة لأتمتة سير العمل، وخطوط بيانات آلية على Supabase Edge Functions.",
      "صيانة وتطوير منصة مالية عالية التوافر؛ البنية التحتية الخلفية وتحسين الأداء.",
    ],
    edu: [
      ["ESPRIT", "شهادة مهندس في الإعلامية، اختصاص التكنولوجيا المالية", "2020 — 2025"],
      ["ISET Radès", "إجازة تطبيقية في الهندسة الكهربائية", "2016 — 2020"],
    ],
    emailMe: "راسلني",
    nav: { work: "الأعمال", experience: "الخبرة", education: "التعليم", stack: "التقنيات", contact: "التواصل" },
    menu: "الأقسام",
  },
};

type Copy = (typeof copy)["en"];

function Section({ id, title, sub, children }: { id: string; title: string; sub?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-t border-line py-14 sm:py-20">
      <div className="mb-8 flex flex-col gap-2 sm:mb-10">
        <h2 id={`${id}-h`} className="font-display text-3xl font-bold tracking-[-0.02em] text-balance sm:text-4xl">
          {title}
        </h2>
        {sub && <p className="max-w-[62ch] text-base text-muted">{sub}</p>}
      </div>
      {children}
    </section>
  );
}

const sectionIds = ["work", "experience", "education", "stack", "contact"] as const;
type SectionId = (typeof sectionIds)[number];

/* highlights the nav link of the section crossing the middle of the viewport */
function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as SectionId)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}


function Badge({ live, t }: { live: boolean; t: Copy }) {
  return (
    <span
      className={`absolute start-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium shadow-[0_2px_8px_rgb(0_0_0/0.35)] ${
        live ? "bg-accent text-on-accent" : "bg-bg/90 text-fg backdrop-blur-sm"
      }`}
    >
      {live && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-accent" />}
      {live ? t.live : t.mockup}
    </span>
  );
}

function Actions({ p, t }: { p: Project; t: Copy }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
      {p.demo && (
        <a
          href={p.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-medium text-on-accent transition-[filter] hover:brightness-110"
        >
          {p.mockup ? t.mockupDemo : t.liveDemo}
          <Icon d={ic.arrow} className="h-3.5 w-3.5" />
        </a>
      )}
      {p.code && (
        <a
          href={p.code}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line px-4 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          <Icon d={ic.code} className="h-3.5 w-3.5" />
          {t.code}
        </a>
      )}
    </div>
  );
}

function Shot({ p, t, live, className = "" }: { p: Project; t: Copy; live: boolean; className?: string }) {
  return (
    <a
      href={p.demo ?? p.code}
      target="_blank"
      rel="noreferrer"
      tabIndex={-1}
      aria-hidden
      className={`relative block overflow-hidden rounded-xl border border-line bg-bg ${className}`}
    >
      <Badge live={live} t={t} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.image}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
      />
    </a>
  );
}

export default function Board() {
  const { locale, setLocale } = useLocale();
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const active = useActiveSection();

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const t = copy[locale];
  const tSite = siteI18n[locale];
  const c = contactData[locale];
  const [featured, ...rest] = projects[locale];
  const expList = experience[locale];
  const cvHref = locale === "fr" ? cv.fr.href : cv.en.href;

  const navItems: [SectionId, string][] = sectionIds.map((id) => [id, t.nav[id]]);
  const ghost = `${pill} border-line hover:border-accent hover:text-accent`;
  const navLink = (id: SectionId, mobile = false) =>
    `inline-flex ${mobile ? "min-h-[36px] px-3" : "min-h-[40px] px-3.5"} items-center rounded-full text-sm transition-colors ${
      active === id ? "bg-accent/10 font-medium text-accent" : "text-copy hover:text-accent"
    }`;

  return (
    <div className="min-h-screen bg-bg font-body text-fg">
      {/* ─── navigation ─── */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex min-h-[60px] items-center font-display text-lg font-bold tracking-[-0.01em]">
            Badis Mahjoubi
          </a>
          <nav aria-label={t.menu} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} aria-current={active === id ? "true" : undefined} className={navLink(id)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1">
            <div className="flex items-center font-mono" role="group" aria-label="Language">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  aria-pressed={locale === l}
                  className={`min-h-[40px] min-w-[36px] rounded-full px-2 text-xs uppercase transition-colors hover:text-accent ${
                    locale === l ? "font-semibold text-accent" : "text-muted"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              aria-label={t.toggleTheme}
              className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full text-copy transition-colors hover:text-accent"
            >
              <Icon d={theme === "dark" ? ic.sun : ic.moon} />
            </button>
          </div>
        </div>
        {/* mobile: section links in a scrollable row */}
        <nav aria-label={t.menu} className="border-t border-line md:hidden">
          <ul className="mx-auto flex max-w-[1120px] gap-1 overflow-x-auto px-3 py-1.5 [scrollbar-width:none]">
            {navItems.map(([id, label]) => (
              <li key={id} className="shrink-0">
                <a href={`#${id}`} aria-current={active === id ? "true" : undefined} className={navLink(id, true)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-[1120px] overflow-x-clip px-4 sm:px-6">
        {/* ─── hero ─── */}
        {/* phone: a large transparent portrait circle sits behind the name, 30% cut off by the screen edge (main clips it);
            md+: a 440px circle in its own column beside the intro */}
        <section className="relative pt-8 pb-16 sm:pb-24 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-x-12 md:py-24">
          <div
            style={{ animationDelay: "120ms" }}
            className="rise absolute -end-[58px] top-0 sm:-end-[50px] aspect-square w-[248px] overflow-hidden rounded-full md:static md:order-last md:w-[320px] lg:w-[400px] xl:w-[440px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/badis.webp"
              alt="Badis Mahjoubi"
              width={303}
              height={370}
              className="absolute left-1/2 top-[8%] w-full max-w-none -translate-x-[52%]"
            />
          </div>
          <div className="relative z-10 min-w-0">
          <p style={{ animationDelay: "0ms" }} className="rise inline-flex items-center gap-2 text-sm text-copy">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t.status}
          </p>
          <h1
            style={{ animationDelay: "70ms" }}
            className="rise mt-[96px] font-display md:mt-6 text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.035em]"
          >
            Badis <span className="text-accent">Mahjoubi</span>
          </h1>
          <p style={{ animationDelay: "140ms" }} className="rise mt-4 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium text-copy">
            {tSite.role}
          </p>
          <p style={{ animationDelay: "210ms" }} className="rise mt-6 max-w-[62ch] text-base leading-relaxed text-muted sm:text-lg">
            {about[locale][0]}
          </p>
          <div style={{ animationDelay: "280ms" }} className="rise mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-6 font-medium text-on-accent transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-110"
            >
              {t.seeDemos}
              <Icon d={ic.arrow} />
            </a>
            <a href={cvHref} download className={`${pill} min-h-[48px] border-edge px-6 font-medium hover:border-accent hover:text-accent`}>
              <Icon d={ic.down} />
              {t.downloadCv}
            </a>
            <span className="flex items-center text-sm">
              <a href={site.github} target="_blank" rel="noreferrer" className="rounded-full px-3 py-2 text-copy underline-offset-4 hover:text-accent hover:underline">
                GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="rounded-full px-3 py-2 text-copy underline-offset-4 hover:text-accent hover:underline">
                LinkedIn
              </a>
            </span>
          </div>
          </div>
        </section>

        {/* ─── work ─── */}
        <Section id="work" title={t.projects} sub={t.projectsSub}>
          <article className="group grid grid-cols-1 gap-6 rounded-2xl border border-line bg-tile p-4 transition-colors hover:border-accent sm:p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-xl border border-line">
              <div className="flex items-center gap-1.5 border-b border-line bg-bg px-3 py-2" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span dir="ltr" className="ms-3 truncate rounded-md bg-tile px-2 py-0.5 font-mono text-[11px] text-muted">
                  {featured.demo?.replace("https://", "")}
                </span>
              </div>
              <Shot p={featured} t={t} live className="aspect-[16/10] rounded-none border-0" />
            </div>
            <div className="flex flex-col gap-3 py-1">
              <h3 className="font-display text-3xl font-bold tracking-[-0.02em]">{featured.title}</h3>
              <p className="text-[15px] leading-relaxed text-copy">{featured.description}</p>
              <p className="font-mono text-xs text-muted">{featured.tags.join(" · ")}</p>
              <Actions p={featured} t={t} />
            </div>
          </article>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <article key={p.title} className="group flex min-w-0 flex-col gap-3">
                <Shot p={p} t={t} live={!p.mockup} className="aspect-[16/10] transition-colors group-hover:border-accent" />
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="font-display text-lg font-bold leading-tight text-balance">{p.title}</h3>
                  <p className="line-clamp-2 text-sm leading-normal text-muted">{p.description}</p>
                  <p className="font-mono text-[11px] text-muted">{p.tags.join(" · ")}</p>
                </div>
                <Actions p={p} t={t} />
              </article>
            ))}
          </div>
        </Section>

        {/* ─── experience ─── */}
        <Section id="experience" title={t.experience}>
          <ol className="divide-y divide-line border-y border-line">
            {expList.map((e, i) => (
              <li key={e.period} className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
                <div>
                  <p className="font-mono text-xs text-muted tabular-nums">{e.period}</p>
                  <p className="mt-1 text-sm font-medium text-accent">{e.company}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">{e.role}</h3>
                  <p className="mt-1.5 max-w-[68ch] text-[15px] leading-relaxed text-copy">{t.expSummaries[i]}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ─── education ─── */}
        <Section id="education" title={t.education}>
          <ul className="divide-y divide-line border-y border-line">
            {t.edu.map(([school, degree, years]) => (
              <li key={school} className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
                <p className="font-mono text-xs text-muted tabular-nums sm:pt-1.5">{years}</p>
                <div>
                  <h3 className="font-display text-lg font-bold">{school}</h3>
                  <p className="mt-1 text-[15px] text-copy">{degree}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* ─── stack ─── */}
        <Section id="stack" title={t.stack}>
          <ul className="flex flex-wrap gap-2">
            {techStack.map((s) => (
              <li key={s} className="rounded-full border border-line bg-tile px-3.5 py-1.5 text-sm text-copy">
                {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* ─── contact ─── */}
        <section id="contact" aria-labelledby="contact-h" className="scroll-mt-28 border-t border-line py-16 sm:py-24">
          <h2 id="contact-h" className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            {c.heading[0]} <span className="text-accent">{c.heading[1]}</span>
          </h2>
          <p className="mt-4 max-w-[55ch] text-muted">{c.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-6 font-medium text-on-accent transition-[filter] hover:brightness-110"
            >
              <Icon d={ic.mail} />
              {t.emailMe}
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className={`${ghost} min-h-[48px] px-6`}>
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className={`${ghost} min-h-[48px] px-6`}>
              GitHub
            </a>
            <a href={cvHref} download className={`${ghost} min-h-[48px] px-6`}>
              <Icon d={ic.down} />
              CV
            </a>
          </div>
          <p dir="ltr" className="mt-6 font-mono text-sm text-muted">
            {site.email}
          </p>
        </section>
      </main>
    </div>
  );
}
