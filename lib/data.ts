export type Locale = "en" | "fr";

export const cv = {
  en: { href: "/cv/Badis-Mahjoubi-CV-EN.pdf", label: "EN" },
  fr: { href: "/cv/Badis-Mahjoubi-CV-FR.pdf", label: "FR" },
};

/* ─── site-level ─── */

export const site = {
  name: "Badis Mahjoubi",
  email: "badismahjoubi.dev@gmail.com",
  github: "https://github.com/Badis-tech",
  linkedin: "https://www.linkedin.com/in/badis-mahjoubi-93a351189/",
  facebook: "https://facebook.com/badis.mahjoubi",
};

export const siteI18n = {
  en: {
    role: "Full-Stack & AI Developer",
    tagline:
      "Building SaaS platforms, automation systems, and data pipelines.",
    contactCta: "Get in touch",
    viewWork: "View work",
    scrollHint: "↓ scroll",
    cvLabel: "CV",
    downloadCvEn: "Download CV (English)",
    downloadCvFr: "Download CV (French)",
  },
  fr: {
    role: "Développeur Full-Stack & IA",
    tagline:
      "Création de plateformes SaaS, systèmes d'automatisation et pipelines de données.",
    contactCta: "Me contacter",
    viewWork: "Voir mes projets",
    scrollHint: "↓ défiler",
    cvLabel: "CV",
    downloadCvEn: "Télécharger le CV (Anglais)",
    downloadCvFr: "Télécharger le CV (Français)",
  },
};

/* ─── stats ─── */

export const stats = {
  en: [
    { value: "2+", label: "Years Experience" },
    { value: "10+", label: "Projects Shipped" },
    { value: "30K+", label: "Records Scraped" },
    { value: "3", label: "Languages" },
  ],
  fr: [
    { value: "2+", label: "Ans d'expérience" },
    { value: "10+", label: "Projets livrés" },
    { value: "30K+", label: "Enregistrements scrapés" },
    { value: "3", label: "Langues" },
  ],
};

/* ─── about ─── */

export const about = {
  en: [
    "Full-stack and backend developer based in Tunis, specializing in Python/FastAPI, TypeScript/Next.js, and Supabase. I build SaaS platforms, automation systems, and data pipelines — from large-scale web scraping to LLM integration.",
    "Freelance since graduating, I've delivered products for international clients: job-application automation on the German market, multi-agent scraping architectures, and multi-source data ingestion pipelines with deduplication and enrichment.",
  ],
  fr: [
    "Développeur full-stack et backend basé à Tunis, spécialisé en Python/FastAPI, TypeScript/Next.js et Supabase. Je conçois des plateformes SaaS, des systèmes d'automatisation et des pipelines de données — du web scraping à grande échelle à l'intégration de LLM.",
    "Freelance depuis l'obtention de mon diplôme, j'ai livré des produits pour des clients internationaux : automatisation de candidatures sur le marché allemand, architectures de scraping multi-agents et pipelines d'ingestion de données multi-sources avec dédoublonnage et enrichissement.",
  ],
};

/* ─── nav ─── */

export const navLinks = {
  en: [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
  ],
  fr: [
    { href: "#about", label: "À propos" },
    { href: "#experience", label: "Expérience" },
    { href: "#projects", label: "Projets" },
  ],
};

export const sectionTitles = {
  en: { about: "About", experience: "Experience", projects: "Projects" },
  fr: { about: "À propos", experience: "Expérience", projects: "Projets" },
};

/* ─── tech stack ─── */

export const techStack = [
  "Python",
  "FastAPI",
  "React",
  "Next.js",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Docker",
  "Playwright",
  "Tailwind CSS",
  "Redis",
  "LLM APIs",
  "REST APIs",
  "Linux",
];

/* ─── experience ─── */

export interface Experience {
  period: string;
  role: string;
  company: string;
  points: string[];
  tags: string[];
}

export const experience = {
  en: [
    {
      period: "2025 — Present",
      role: "Freelance / Independent Developer",
      company: "Self-employed",
      points: [
        "Designed and delivered SaaS platforms and automation systems for clients (Next.js 14, FastAPI, Supabase).",
        "Developed a job-application automation system (Playwright + Bundesagentur für Arbeit API).",
        "Built a multi-agent architecture for large-scale scraping (~30,000 establishments).",
        "Set up multi-source data ingestion pipelines with deduplication and enrichment.",
      ],
      tags: ["Next.js", "FastAPI", "Supabase", "Playwright"],
    },
    {
      period: "2024 — 2025",
      role: "Backend Developer",
      company: "Tontec Tunisia",
      points: [
        "Designed and developed RESTful APIs with FastAPI and PostgreSQL.",
        "Integrated LLM models to automate business workflows.",
        "Set up automated data pipelines (Supabase Edge Functions).",
      ],
      tags: ["FastAPI", "PostgreSQL", "LLM", "Supabase"],
    },
    {
      period: "2023 — 2024",
      role: "Infrastructure Developer",
      company: "CODIX Tunisia",
      points: [
        "Maintained and evolved a high-availability financial platform.",
        "Worked on backend infrastructure and performance optimization.",
      ],
      tags: ["Java", "Spring Boot", "OAuth 2.0"],
    },
  ] as Experience[],
  fr: [
    {
      period: "2025 — Présent",
      role: "Développeur Freelance / Indépendant",
      company: "Auto-entrepreneur",
      points: [
        "Conception et livraison de plateformes SaaS et de systèmes d'automatisation (Next.js 14, FastAPI, Supabase).",
        "Développement d'un système d'automatisation de candidatures (Playwright + API Bundesagentur für Arbeit).",
        "Construction d'une architecture multi-agents pour le scraping à grande échelle (~30 000 établissements).",
        "Mise en place de pipelines d'ingestion de données multi-sources avec dédoublonnage et enrichissement.",
      ],
      tags: ["Next.js", "FastAPI", "Supabase", "Playwright"],
    },
    {
      period: "2024 — 2025",
      role: "Développeur Backend",
      company: "Tontec Tunisie",
      points: [
        "Conception et développement d'APIs RESTful avec FastAPI et PostgreSQL.",
        "Intégration de modèles LLM pour automatiser les workflows métier.",
        "Mise en place de pipelines de données automatisés (Supabase Edge Functions).",
      ],
      tags: ["FastAPI", "PostgreSQL", "LLM", "Supabase"],
    },
    {
      period: "2023 — 2024",
      role: "Développeur Infrastructure",
      company: "CODIX Tunisie",
      points: [
        "Maintenance et évolution d'une plateforme financière haute disponibilité.",
        "Travail sur l'infrastructure backend et l'optimisation des performances.",
      ],
      tags: ["Java", "Spring Boot", "OAuth 2.0"],
    },
  ] as Experience[],
};

/* ─── projects ─── */

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  accent: string;
  icon: "search" | "network" | "chart" | "building" | "invoice" | "bank" | "bot" | "mail";
}

export const projects = {
  en: [
    {
      title: "AusbildungJobs",
      description:
        "SaaS job board for German Ausbildung (apprenticeship) positions. Auto-scrapes the Bundesagentur API, provides smart filters, and includes a premium CV/cover-letter service.",
      tags: ["Next.js", "Supabase", "FastAPI"],
      accent: "#00ff88",
      icon: "search" as const,
    },
    {
      title: "Jobs Scraper — Germany",
      description:
        "Ingestion and auto-application pipeline for the German job market (Pflege / Ausbildung) via the Bundesagentur für Arbeit API. Playwright-based automation.",
      tags: ["Playwright", "FastAPI", "Supabase"],
      link: "https://github.com/Badis-tech/visa-hunter",
      accent: "#00cfff",
      icon: "bot" as const,
    },
    {
      title: "PyBalancer",
      description:
        "An L4/L7 load balancer written in pure Python with zero dependencies. Async event loop, health checks, and round-robin / least-connections strategies — built from raw sockets up.",
      tags: ["Python", "Asyncio", "Sockets"],
      link: "https://github.com/Badis-tech/pybalancer",
      accent: "#ffd700",
      icon: "network" as const,
    },
    {
      title: "Mini-Prometheus",
      description:
        "A lightweight observability agent harvesting OS metrics — CPU, RAM, disk — with a pull-based collection model inspired by Prometheus internals.",
      tags: ["Python", "Monitoring", "Systems"],
      link: "https://github.com/Badis-tech/mini-prometheus",
      accent: "#bf5fff",
      icon: "chart" as const,
    },
    {
      title: "Mass Auto Mail Sender",
      description:
        "Mass email sending tool with proxy/VPN rotation and anti-spam handling for outreach campaigns.",
      tags: ["Python", "VPN", "Proxies"],
      accent: "#ff2d78",
      icon: "mail" as const,
    },
    {
      title: "ERP — Animal Management",
      description:
        "Veterinary tracking, livestock, and inventory management platform for a farming operation.",
      tags: ["Spring Boot", "MongoDB", "Java"],
      accent: "#00cfff",
      icon: "building" as const,
    },
  ] as Project[],
  fr: [
    {
      title: "AusbildungJobs",
      description:
        "Plateforme SaaS de recherche d'emploi pour les postes d'Ausbildung (apprentissage) en Allemagne. Scraping automatique de l'API Bundesagentur, filtres intelligents et service premium de CV/lettre de motivation.",
      tags: ["Next.js", "Supabase", "FastAPI"],
      accent: "#00ff88",
      icon: "search" as const,
    },
    {
      title: "Scraper d'emplois — Allemagne",
      description:
        "Pipeline d'ingestion et de candidature automatique pour le marché de l'emploi allemand (Pflege / Ausbildung) via l'API Bundesagentur für Arbeit. Automatisation basée sur Playwright.",
      tags: ["Playwright", "FastAPI", "Supabase"],
      link: "https://github.com/Badis-tech/visa-hunter",
      accent: "#00cfff",
      icon: "bot" as const,
    },
    {
      title: "PyBalancer",
      description:
        "Un load balancer L4/L7 écrit en Python pur sans aucune dépendance. Boucle d'événements asynchrone, health checks et stratégies round-robin / least-connections — construit à partir de sockets bruts.",
      tags: ["Python", "Asyncio", "Sockets"],
      link: "https://github.com/Badis-tech/pybalancer",
      accent: "#ffd700",
      icon: "network" as const,
    },
    {
      title: "Mini-Prometheus",
      description:
        "Un agent d'observabilité léger récoltant les métriques OS — CPU, RAM, disque — avec un modèle de collecte pull inspiré des internals de Prometheus.",
      tags: ["Python", "Monitoring", "Systèmes"],
      link: "https://github.com/Badis-tech/mini-prometheus",
      accent: "#bf5fff",
      icon: "chart" as const,
    },
    {
      title: "Envoi massif d'emails",
      description:
        "Outil d'envoi massif d'emails avec rotation de proxy/VPN et gestion anti-spam pour les campagnes de prospection.",
      tags: ["Python", "VPN", "Proxies"],
      accent: "#ff2d78",
      icon: "mail" as const,
    },
    {
      title: "ERP — Gestion animalière",
      description:
        "Plateforme de suivi vétérinaire, gestion de bétail et d'inventaire pour une exploitation agricole.",
      tags: ["Spring Boot", "MongoDB", "Java"],
      accent: "#00cfff",
      icon: "building" as const,
    },
  ] as Project[],
};

/* ─── contact section ─── */

export const contact = {
  en: {
    heading: ["Let's build", "something solid."],
    subtitle:
      "Open to full-stack and backend roles, freelance projects, and interesting technical problems.",
  },
  fr: {
    heading: ["Construisons", "quelque chose de solide."],
    subtitle:
      "Ouvert aux postes full-stack et backend, projets freelance et problèmes techniques intéressants.",
  },
};
