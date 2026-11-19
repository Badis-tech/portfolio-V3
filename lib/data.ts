export type Locale = "en" | "fr" | "ar";

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
  ar: {
    role: "مطوّر Full-Stack وذكاء اصطناعي",
    tagline: "بناء منصات SaaS وأنظمة أتمتة وخطوط معالجة البيانات.",
    contactCta: "تواصل معي",
    viewWork: "أعمالي",
    scrollHint: "↓ مرّر",
    cvLabel: "السيرة",
    downloadCvEn: "تحميل السيرة الذاتية (الإنجليزية)",
    downloadCvFr: "تحميل السيرة الذاتية (الفرنسية)",
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
  ar: [
    { value: "2+", label: "سنوات خبرة" },
    { value: "10+", label: "مشروعًا منجزًا" },
    { value: "30K+", label: "سجل تم جمعه" },
    { value: "3", label: "لغات" },
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
  ar: [
    "مطوّر Full-Stack وBackend مقيم في تونس، متخصص في Python/FastAPI وTypeScript/Next.js وSupabase. أبني منصات SaaS وأنظمة أتمتة وخطوط معالجة بيانات — من جمع البيانات على نطاق واسع إلى دمج نماذج اللغة الكبيرة.",
    "أعمل بشكل مستقل منذ تخرّجي، وسلّمت منتجات لعملاء دوليين: أتمتة التقديم على الوظائف في السوق الألماني، وبنى جمع بيانات متعددة الوكلاء، وخطوط استيعاب بيانات من مصادر متعددة مع إزالة التكرار والإثراء.",
  ],
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
  ar: [
    {
      period: "2025 — الآن",
      role: "مطوّر مستقل",
      company: "عمل حر",
      points: [
        "تصميم وتسليم منصات SaaS وأنظمة أتمتة للعملاء (Next.js 14 وFastAPI وSupabase).",
        "تطوير نظام أتمتة التقديم على الوظائف (Playwright وواجهة Bundesagentur für Arbeit).",
        "بناء بنية متعددة الوكلاء لجمع البيانات على نطاق واسع (~30,000 منشأة).",
        "إعداد خطوط استيعاب بيانات من مصادر متعددة مع إزالة التكرار والإثراء.",
      ],
      tags: ["Next.js", "FastAPI", "Supabase", "Playwright"],
    },
    {
      period: "2024 — 2025",
      role: "مطوّر Backend",
      company: "Tontec تونس",
      points: [
        "تصميم وتطوير واجهات RESTful باستخدام FastAPI وPostgreSQL.",
        "دمج نماذج اللغة الكبيرة لأتمتة سير العمل.",
        "إعداد خطوط بيانات آلية (Supabase Edge Functions).",
      ],
      tags: ["FastAPI", "PostgreSQL", "LLM", "Supabase"],
    },
    {
      period: "2023 — 2024",
      role: "مطوّر بنية تحتية",
      company: "CODIX تونس",
      points: [
        "صيانة وتطوير منصة مالية عالية التوافر.",
        "العمل على البنية التحتية الخلفية وتحسين الأداء.",
      ],
      tags: ["Java", "Spring Boot", "OAuth 2.0"],
    },
  ] as Experience[],
};

/* ─── projects ─── */

type L10n = Record<Locale, string>;

export interface ProjectDef {
  title: string;
  kind: L10n;
  description: L10n;
  tags: string[];
  image: string;
  /** Live app or interactive mockup */
  demo?: string;
  /** True when `demo` is a front-end mockup with fictional data */
  mockup?: boolean;
  code?: string;
}

export interface Project extends Omit<ProjectDef, "kind" | "description"> {
  kind: string;
  description: string;
}

const projectDefs: ProjectDef[] = [
  {
    title: "AusbildungJobs",
    kind: { en: "SaaS", fr: "SaaS", ar: "SaaS" },
    description: {
      en: "Job board for German apprenticeships aggregating 78,000+ live postings from the Bundesagentur API and other sources, with smart filters and a premium CV service.",
      fr: "Plateforme d'emploi pour les apprentissages en Allemagne : 78 000+ offres agrégées (API Bundesagentur et autres sources), filtres intelligents et service CV premium.",
      ar: "منصة وظائف للتدريب المهني في ألمانيا تجمع أكثر من 78,000 عرض من واجهة Bundesagentur ومصادر أخرى، مع فلاتر ذكية وخدمة سيرة ذاتية مميزة.",
    },
    tags: ["Next.js", "FastAPI", "Supabase"],
    image: "/projects/jobs-pipe-line.png",
    demo: "https://jobs-pipe-line.vercel.app",
  },
  {
    title: "PlastiERP — ERP Plasturgie",
    kind: { en: "ERP · Final-year project", fr: "ERP · PFE", ar: "ERP · مشروع التخرج" },
    description: {
      en: "ERP for a plastic injection factory: production orders, live press monitoring, raw-material and finished-goods stock with low-stock alerts.",
      fr: "ERP pour une usine d'injection plastique : ordres de fabrication, suivi des presses en temps réel, stock matières premières et produits finis avec alertes.",
      ar: "نظام ERP لمصنع حقن البلاستيك: أوامر التصنيع، متابعة المكابس في الوقت الفعلي، ومخزون المواد الأولية والمنتجات النهائية مع التنبيهات.",
    },
    tags: ["Angular", "Spring Boot", "Java"],
    image: "/projects/erp-plasturgie.png",
    demo: "https://erp-plasturgie.vercel.app",
    mockup: true,
  },
  {
    title: "ERP Grossiste",
    kind: { en: "Business", fr: "Métier", ar: "أعمال" },
    description: {
      en: "Catalogue and stock management for a wholesaler. Stock is an immutable movement ledger kept in sync by Postgres triggers.",
      fr: "Catalogue et gestion de stock pour un grossiste. Le stock est un livre de mouvements immuable, synchronisé par des triggers Postgres.",
      ar: "إدارة الكتالوج والمخزون لتاجر جملة. المخزون سجل حركات غير قابل للتعديل تتم مزامنته عبر triggers في Postgres.",
    },
    tags: ["Next.js", "Supabase", "PostgreSQL"],
    image: "/projects/erp-grossiste.png",
    demo: "https://erp-grossiste.vercel.app",
    mockup: true,
    code: "https://github.com/Badis-tech/erp-grossiste",
  },
  {
    title: "Visa Hunter",
    kind: { en: "Automation", fr: "Automatisation", ar: "أتمتة" },
    description: {
      en: "Scrapes European job boards and scores each posting's visa-sponsorship probability with NLP keyword analysis; alerts above 80%.",
      fr: "Scrape les job boards européens et calcule la probabilité de sponsoring visa de chaque offre par analyse NLP ; alerte au-delà de 80 %.",
      ar: "يجمع عروض العمل الأوروبية ويحسب احتمال رعاية التأشيرة لكل عرض بتحليل الكلمات المفتاحية؛ تنبيه فوق 80%.",
    },
    tags: ["Python", "FastAPI", "Celery"],
    image: "/projects/visa-hunter.png",
    demo: "https://visa-hunter.vercel.app",
    mockup: true,
    code: "https://github.com/Badis-tech/visa-hunter",
  },
  {
    title: "PyBalancer",
    kind: { en: "Systems", fr: "Systèmes", ar: "أنظمة" },
    description: {
      en: "L4/L7 load balancer in pure Python: async event loop, health checks, round-robin and least-connections. The demo simulates traffic and failover.",
      fr: "Load balancer L4/L7 en Python pur : boucle async, health checks, round-robin et least-connections. La démo simule trafic et bascule.",
      ar: "موزّع أحمال L4/L7 بلغة Python الخالصة: حلقة غير متزامنة، فحوصات صحة، round-robin وleast-connections. العرض يحاكي الحركة والتبديل عند العطل.",
    },
    tags: ["Python", "Asyncio", "Sockets"],
    image: "/projects/pybalancer.png",
    demo: "https://pybalancer.vercel.app",
    mockup: true,
  },
  {
    title: "Mini-Prometheus",
    kind: { en: "Systems", fr: "Systèmes", ar: "أنظمة" },
    description: {
      en: "Lightweight observability agent collecting CPU, RAM and disk metrics with a pull-based model inspired by Prometheus internals.",
      fr: "Agent d'observabilité léger collectant CPU, RAM et disque avec un modèle pull inspiré des internals de Prometheus.",
      ar: "وكيل مراقبة خفيف يجمع مقاييس المعالج والذاكرة والقرص بنموذج سحب مستوحى من Prometheus.",
    },
    tags: ["Python", "Monitoring", "Systems"],
    image: "/projects/mini-prometheus.png",
    demo: "https://mini-prometheus.vercel.app",
    mockup: true,
  },
  {
    title: "AgriERP — Gestion animalière",
    kind: { en: "Business", fr: "Métier", ar: "أعمال" },
    description: {
      en: "Livestock, veterinary and feed-stock management for a farm, with role-based access for manager, vet and worker.",
      fr: "Gestion du cheptel, suivi vétérinaire et stock d'aliments pour une exploitation agricole, avec contrôle d'accès par rôle.",
      ar: "إدارة المواشي والمتابعة البيطرية ومخزون الأعلاف لمزرعة، مع صلاحيات حسب الدور.",
    },
    tags: ["Spring Boot", "MongoDB", "Java"],
    image: "/projects/erp-elevage.png",
    demo: "https://erp-elevage.vercel.app",
    mockup: true,
  },
];

const localize = (l: Locale): Project[] =>
  projectDefs.map((p) => ({ ...p, kind: p.kind[l], description: p.description[l] }));

export const projects: Record<Locale, Project[]> = {
  en: localize("en"),
  fr: localize("fr"),
  ar: localize("ar"),
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
  ar: {
    heading: ["لنبنِ", "شيئًا متينًا."],
    subtitle:
      "متاح لوظائف Full-Stack وBackend والمشاريع المستقلة والمشكلات التقنية المثيرة.",
  },
};
