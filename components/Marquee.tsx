import { techStack } from "@/lib/data";

export default function Marquee() {
  const row = [...techStack, ...techStack];
  return (
    <div className="overflow-hidden border-y border-line py-5">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((tech, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-mono text-sm uppercase tracking-widest text-muted"
          >
            {tech}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
