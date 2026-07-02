import Reveal from "./Reveal";

export default function SectionTitle({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal className="mb-14 flex items-baseline gap-4">
      <span className="font-mono text-sm text-accent">{index}</span>
      <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
        {title}
      </h2>
      <div className="hidden h-px flex-1 bg-line sm:block" />
    </Reveal>
  );
}
