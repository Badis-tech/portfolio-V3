import { about, stats, site } from "@/lib/data";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionTitle index="01" title="About" />
      <div className="grid gap-14 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-6">
          {about.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-muted first:text-xl first:text-fg">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <div className="flex flex-wrap gap-5 pt-2 font-mono text-sm">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                GitHub ↗
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                LinkedIn ↗
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                Email ↗
              </a>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/50">
                <div className="font-display text-4xl font-bold text-accent sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
