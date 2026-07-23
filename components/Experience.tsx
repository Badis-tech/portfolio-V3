"use client";

import { experience, sectionTitles } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  const { locale } = useLocale();
  const jobs = experience[locale];
  const titles = sectionTitles[locale];

  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28"
    >
      <SectionTitle index="02" title={titles.experience} />
      <div className="space-y-4">
        {jobs.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.08}>
            <article className="group grid gap-6 rounded-2xl border border-line bg-surface p-8 transition-colors hover:border-accent/50 md:grid-cols-[200px_1fr]">
              <div className="font-mono text-sm text-accent">{job.period}</div>
              <div>
                <h3 className="font-display text-2xl font-bold">
                  {job.role}
                  <span className="text-muted"> · {job.company}</span>
                </h3>
                <ul className="mt-4 space-y-2 text-muted">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-[2px] text-accent">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
