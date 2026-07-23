"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { cv, site, siteI18n } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const { locale } = useLocale();
  const t = siteI18n[locale];

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6">
      {/* Background grid + glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #141414 1px, transparent 1px), linear-gradient(to bottom, #141414 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-accent/10 blur-[160px]"
      />

      {/* 3D distributed-system network */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <HeroScene />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl"
      >
        <motion.p
          variants={item}
          className="mb-6 font-mono text-sm text-accent"
        >
          $ whoami
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-[clamp(3.2rem,11vw,9.5rem)] font-bold uppercase leading-[0.9] tracking-tight"
        >
          Badis
        </motion.h1>
        <motion.h1
          variants={item}
          className="text-outline font-display text-[clamp(3.2rem,11vw,9.5rem)] font-bold uppercase leading-[0.9] tracking-tight"
        >
          Mahjoubi
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-md">
            <h2 className="font-display text-xl font-medium text-fg">
              {t.role}
            </h2>
            <p className="mt-2 text-muted">{t.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-7 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-bg transition-transform hover:scale-105"
            >
              {t.viewWork}
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-7 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
            <div className="flex items-center overflow-hidden rounded-full border border-line font-mono text-sm uppercase tracking-wider">
              <span className="flex items-center gap-2 py-3 pl-5 pr-3 text-muted">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                </svg>
                {t.cvLabel}
              </span>
              <a
                href={cv.en.href}
                download
                aria-label={t.downloadCvEn}
                className="py-3 pl-2 pr-2 transition-colors hover:bg-accent/10 hover:text-accent"
              >
                {cv.en.label}
              </a>
              <span aria-hidden className="text-line">
                /
              </span>
              <a
                href={cv.fr.href}
                download
                aria-label={t.downloadCvFr}
                className="py-3 pl-2 pr-5 transition-colors hover:bg-accent/10 hover:text-accent"
              >
                {cv.fr.label}
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="inline-block"
        >
          {t.scrollHint}
        </motion.span>
      </motion.div>
    </section>
  );
}
