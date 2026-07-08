"use client";

import { projects, type Project } from "@/lib/data";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import TiltCard from "./TiltCard";

const icons: Record<Project["icon"], React.ReactNode> = {
  search: (
    <path d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
  ),
  network: (
    <path d="M12 3v6m0 6v6M3 12h6m6 0h6M12 9a3 3 0 100 6 3 3 0 000-6zM5 5l3 3m8 8l3 3m0-14l-3 3M8 16l-3 3" />
  ),
  chart: <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" />,
  building: (
    <path d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M4 21h16M9 7h2m-2 4h2m-2 4h2m5-8h2m-2 4h2m-2 4h2M16 3h4a0 0 0 010 0v18" />
  ),
  invoice: (
    <path d="M7 3h10a2 2 0 012 2v16l-3-2-3 2-3-2-3 2V5a2 2 0 012-2zM9 8h6M9 12h6" />
  ),
  bank: <path d="M3 9l9-6 9 6M4 9v11m16-11v11M2 20h20M8 13v4m4-4v4m4-4v4" />,
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <Reveal>
      <article
        className={`group grid items-stretch gap-8 [perspective:1200px] lg:grid-cols-2 ${
          reversed ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* Visual — tilts in 3D toward the cursor */}
        <TiltCard className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-line [direction:ltr]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 20%, ${project.accent}22, transparent 60%), #0d0d0d`,
            }}
          />
          <span
            className="absolute left-6 top-5 font-mono text-sm [transform:translateZ(40px)]"
            style={{ color: project.accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={project.accent}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-28 w-28 opacity-80 transition-transform duration-500 [transform:translateZ(60px)] group-hover:scale-110"
          >
            {icons[project.icon]}
          </svg>
          <div
            aria-hidden
            className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full blur-[80px]"
            style={{ background: `${project.accent}33` }}
          />
        </TiltCard>

        {/* Text */}
        <div className="flex flex-col justify-center [direction:ltr]">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            {project.description}
          </p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-sm uppercase tracking-wider text-accent transition-transform hover:translate-x-1"
            >
              View code →
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28"
    >
      <SectionTitle index="03" title="Projects" />
      <div className="space-y-24">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
