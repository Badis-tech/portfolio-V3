"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/data";

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
              {site.role}
            </h2>
            <p className="mt-2 text-muted">{site.tagline}</p>
          </div>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-7 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-bg transition-transform hover:scale-105"
            >
              View work
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-7 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
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
          ↓ scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
