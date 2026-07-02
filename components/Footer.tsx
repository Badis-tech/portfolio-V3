import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 font-mono text-xs text-muted sm:flex-row">
        <span>
          © {new Date().getFullYear()} Badis Mahjoubi — BM_SYSTEMS
        </span>
        <div className="flex gap-6">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={site.facebook}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            Facebook
          </a>
        </div>
        <span>
          System status: <span className="text-accent">online</span>
        </span>
      </div>
    </footer>
  );
}
