"use client";

import { cv, site, contact as contactData, siteI18n } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Contact() {
  const { locale } = useLocale();
  const t = contactData[locale];
  const tSite = siteI18n[locale];

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-32 text-center">
        <Reveal>
          <p className="font-mono text-sm text-accent">04 — Contact</p>
          <h2 className="mt-6 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-bold uppercase leading-[1.02] tracking-tight">
            {t.heading[0]}
            <br />
            <span className="text-outline">{t.heading[1]}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-muted">
            {t.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-accent px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-bg transition-transform hover:scale-105"
            >
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-8 py-4 font-mono text-sm uppercase tracking-wider transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 font-mono text-sm">
            <a
              href={cv.en.href}
              download
              className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {tSite.downloadCvEn}
            </a>
            <a
              href={cv.fr.href}
              download
              className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {tSite.downloadCvFr}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
