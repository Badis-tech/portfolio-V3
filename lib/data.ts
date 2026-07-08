export const cv = {
  en: { href: "/cv/Badis-Mahjoubi-CV-EN.pdf", label: "EN" },
  fr: { href: "/cv/Badis-Mahjoubi-CV-FR.pdf", label: "FR" },
};

export const site = {
  name: "Badis Mahjoubi",
  role: "System Engineer & Backend Architect",
  tagline: "Building scalable distributed systems and automation tools.",
  email: "badismahjoubi.dev@gmail.com",
  github: "https://github.com/Badis-tech",
  linkedin: "https://linkedin.com/in/badismahjoubi",
  facebook: "https://facebook.com/badis.mahjoubi",
};

export const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "10+", label: "Projects Shipped" },
  { value: "8%", label: "Perf. Improvement" },
  { value: "1", label: "Publication" },
];

export const about = [
  "I'm a software engineer who enjoys turning complex business problems into real, working products. I've built web applications for finance and manufacturing, focusing on systems that don't just look good — but actually scale and deliver value.",
  "I work across the full stack, from designing clean user interfaces to building solid backend architectures. A lot of my work revolves around ERP systems, secure authentication, and data-driven dashboards that help teams make better decisions.",
];

export const techStack = [
  "Python",
  "FastAPI",
  "React",
  "Next.js",
  "Angular",
  "Spring Boot",
  "Supabase",
  "PostgreSQL",
  "MySQL",
  "OAuth 2.0",
  "Docker",
  "Linux",
  "Asyncio",
  "REST APIs",
];

export interface Experience {
  period: string;
  role: string;
  company: string;
  points: string[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    period: "2025 — Present",
    role: "Developer",
    company: "Moubeder Dheti",
    points: [
      "Designed a platform for home maintenance services across Tunisia.",
      "Implemented payment processing functionality.",
      "Developed responsive user interfaces using modern web technologies.",
    ],
    tags: ["React", "Supabase", "Python"],
  },
  {
    period: "2024 — 2025",
    role: "Full-Stack Developer",
    company: "Tontec Tunisia",
    points: [
      "Designed enterprise ERP with integrated analytics dashboard.",
      "Implemented interactive visualization improving operational performance by 8%.",
      "Optimized Angular components and lazy loading strategies.",
    ],
    tags: ["Angular", "Spring Boot", "Python"],
  },
  {
    period: "2023 — 2024",
    role: "Full-Stack Developer",
    company: "CODIX Tunisia",
    points: [
      "Developed factoring web application for invoice financing.",
      "Implemented OAuth 2.0 and JWT security protocols.",
      "Built scalable RESTful APIs for workflow automation.",
    ],
    tags: ["Angular", "Spring Security", "OAuth 2.0"],
  },
];

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  accent: string;
  icon: "search" | "network" | "chart" | "building" | "invoice" | "bank";
}

export const projects: Project[] = [
  {
    title: "Visa Hunter",
    description:
      "Automated job aggregator that scores visa-sponsorship probability using NLP. Crawls listings, extracts signals, and ranks opportunities so candidates focus on jobs they can actually get.",
    tags: ["Python", "FastAPI", "NLP"],
    link: "https://github.com/Badis-tech/visa-hunter",
    accent: "#00ff88",
    icon: "search",
  },
  {
    title: "PyBalancer",
    description:
      "An L4/L7 load balancer written in pure Python with zero dependencies. Async event loop, health checks, and round-robin / least-connections strategies — built from raw sockets up.",
    tags: ["Python", "Asyncio", "Sockets"],
    link: "https://github.com/Badis-tech/pybalancer",
    accent: "#00cfff",
    icon: "network",
  },
  {
    title: "Mini-Prometheus",
    description:
      "A lightweight observability agent harvesting OS metrics — CPU, RAM, disk — with a pull-based collection model inspired by Prometheus internals.",
    tags: ["Python", "Monitoring", "Systems"],
    link: "https://github.com/Badis-tech/mini-prometheus",
    accent: "#ffd700",
    icon: "chart",
  },
  {
    title: "ERP Web Application",
    description:
      "Enterprise resource planning system with an integrated analytics dashboard. Interactive visualizations improved operational performance by 8% at Tontec Tunisia.",
    tags: ["Angular", "Spring Boot", "Analytics"],
    accent: "#bf5fff",
    icon: "building",
  },
  {
    title: "Factoring Platform",
    description:
      "Invoice-financing platform for CODIX with secure authentication (OAuth 2.0 + JWT) and automated approval workflows over RESTful APIs.",
    tags: ["Spring Security", "OAuth 2.0", "REST"],
    accent: "#ff2d78",
    icon: "invoice",
  },
  {
    title: "Online Banking App",
    description:
      "Secure digital banking platform with multi-layer authentication, transaction history, and account management.",
    tags: ["MySQL", "Security", "Java"],
    accent: "#00cfff",
    icon: "bank",
  },
];
