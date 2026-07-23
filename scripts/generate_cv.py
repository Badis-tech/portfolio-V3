"""
Generate ATS-optimized CV PDFs for Badis Mahjoubi (EN + FR).
Clean, dense layout — no wasted white space.
ATS-safe: no columns, no tables, no graphics, standard fonts.
Visual polish: accent color bars, tight spacing, professional hierarchy.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether,
    Flowable
)
import os

# ── Colors ──
BLACK = HexColor("#111111")
DARK = HexColor("#222222")
MID = HexColor("#444444")
LIGHT = HexColor("#666666")
ACCENT = HexColor("#1d4ed8")   # Strong professional blue
ACCENT_LIGHT = HexColor("#dbeafe")
LINE = HexColor("#cbd5e1")
WHITE = HexColor("#ffffff")

W, H = A4  # 595.27 x 841.89 pts


# ── Custom flowable: colored section bar ──
class SectionBar(Flowable):
    """A thin accent-colored bar + bold section title on one line."""
    def __init__(self, text, bar_color=ACCENT, width=None):
        super().__init__()
        self.text = text
        self.bar_color = bar_color
        self._width = width or (W - 36*mm)
        self.height = 12

    def wrap(self, availWidth, availHeight):
        self._width = availWidth
        return (availWidth, self.height)

    def draw(self):
        # Accent bar (left edge)
        self.canv.setFillColor(self.bar_color)
        self.canv.rect(0, 0, 2.6, self.height, fill=1, stroke=0)
        # Title text
        self.canv.setFillColor(BLACK)
        self.canv.setFont("Helvetica-Bold", 9.6)
        self.canv.drawString(9, 2.6, self.text.upper())


class ThinLine(Flowable):
    """Ultra-thin separator line."""
    def __init__(self, color=LINE, width=None):
        super().__init__()
        self.color = color
        self._width = width or (W - 36*mm)
        self.height = 3

    def wrap(self, availWidth, availHeight):
        self._width = availWidth
        return (availWidth, self.height)

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(0.4)
        self.canv.line(0, 1.5, self._width, 1.5)


# ── Styles (tight spacing) ──
def make_styles():
    return {
        "name": ParagraphStyle(
            "Name", fontName="Helvetica-Bold", fontSize=18, leading=20,
            textColor=BLACK, alignment=TA_LEFT, spaceAfter=0.6*mm,
        ),
        "role": ParagraphStyle(
            "Role", fontName="Helvetica", fontSize=9.8, leading=12,
            textColor=ACCENT, spaceAfter=1.2*mm,
        ),
        "contact": ParagraphStyle(
            "Contact", fontName="Helvetica", fontSize=8, leading=10.5,
            textColor=LIGHT, spaceAfter=1.8*mm,
        ),
        "profile": ParagraphStyle(
            "Profile", fontName="Helvetica", fontSize=8.5, leading=11.4,
            textColor=MID, spaceAfter=0.5*mm,
        ),
        "job_title": ParagraphStyle(
            "JobTitle", fontName="Helvetica-Bold", fontSize=9, leading=11.4,
            textColor=DARK, spaceAfter=0.2*mm,
        ),
        "job_meta": ParagraphStyle(
            "JobMeta", fontName="Helvetica-Oblique", fontSize=8, leading=10,
            textColor=LIGHT, spaceAfter=0.5*mm,
        ),
        "bullet": ParagraphStyle(
            "Bullet", fontName="Helvetica", fontSize=8.3, leading=10.7,
            textColor=MID, leftIndent=8, bulletIndent=0,
            spaceBefore=0.15*mm, spaceAfter=0.15*mm,
        ),
        "skills_cat": ParagraphStyle(
            "SkillsCat", fontName="Helvetica", fontSize=8.3, leading=11,
            textColor=MID, spaceAfter=0.25*mm,
        ),
        "edu_title": ParagraphStyle(
            "EduTitle", fontName="Helvetica-Bold", fontSize=8.7, leading=11,
            textColor=DARK, spaceAfter=0.15*mm,
        ),
        "edu_meta": ParagraphStyle(
            "EduMeta", fontName="Helvetica-Oblique", fontSize=8, leading=10,
            textColor=LIGHT, spaceAfter=0.4*mm,
        ),
        "lang": ParagraphStyle(
            "Lang", fontName="Helvetica", fontSize=8.5, leading=11,
            textColor=MID, spaceAfter=0.5*mm,
        ),
    }


def build_cv(data, output_path):
    doc = SimpleDocTemplate(
        output_path, pagesize=A4,
        leftMargin=15*mm, rightMargin=15*mm,
        topMargin=11*mm, bottomMargin=10*mm,
        title=data["pdf_title"],
        author="Badis Mahjoubi",
    )
    s = make_styles()
    story = []

    # ── Header ──
    story.append(Paragraph(data["name"], s["name"]))
    story.append(Paragraph(data["role"], s["role"]))
    story.append(Paragraph(data["contact"], s["contact"]))

    # ── Profile ──
    story.append(SectionBar(data["section_profile"]))
    story.append(Spacer(1, 0.8*mm))
    story.append(Paragraph(data["profile"], s["profile"]))

    # ── Skills ──
    story.append(Spacer(1, 1*mm))
    story.append(SectionBar(data["section_skills"]))
    story.append(Spacer(1, 0.6*mm))
    for cat, skills in data["skills"]:
        story.append(Paragraph(
            f'<b><font color="{DARK}">{cat}:</font></b>  {skills}',
            s["skills_cat"]
        ))

    # ── Experience ──
    story.append(Spacer(1, 1*mm))
    story.append(SectionBar(data["section_experience"]))
    story.append(Spacer(1, 0.6*mm))
    for job in data["experience"]:
        block = []
        block.append(Paragraph(job["title"], s["job_title"]))
        block.append(Paragraph(job["meta"], s["job_meta"]))
        for b in job["bullets"]:
            block.append(Paragraph(f"•  {b}", s["bullet"]))
        block.append(Spacer(1, 1*mm))
        story.append(KeepTogether(block))

    # ── Projects ──
    story.append(SectionBar(data["section_projects"]))
    story.append(Spacer(1, 0.6*mm))
    for proj in data["projects"]:
        block = []
        block.append(Paragraph(proj["title"], s["job_title"]))
        block.append(Paragraph(proj["desc"], s["bullet"]))
        block.append(Spacer(1, 0.7*mm))
        story.append(KeepTogether(block))

    # ── Education ──
    story.append(Spacer(1, 0.4*mm))
    story.append(SectionBar(data["section_education"]))
    story.append(Spacer(1, 0.6*mm))
    for edu in data["education"]:
        block = []
        block.append(Paragraph(edu["title"], s["edu_title"]))
        block.append(Paragraph(edu["meta"], s["edu_meta"]))
        story.append(KeepTogether(block))

    # ── Languages ──
    story.append(Spacer(1, 0.6*mm))
    story.append(SectionBar(data["section_languages"]))
    story.append(Spacer(1, 0.6*mm))
    story.append(Paragraph(data["languages"], s["lang"]))

    doc.build(story)
    print(f"  [ok] Generated: {output_path}  ({doc.page} page{'s' if doc.page > 1 else ''})")


# ═══════════════════════════════════════
# DATA
# ═══════════════════════════════════════

CONTACT_EN = (
    'Tunis, Tunisia  ·  +216 94 053 006  ·  +216 29 963 235  ·  '
    '<a href="mailto:badismahjoubi.dev@gmail.com" color="#1d4ed8">badismahjoubi.dev@gmail.com</a><br/>'
    '<a href="https://www.linkedin.com/in/badis-mahjoubi-93a351189/" color="#1d4ed8">linkedin.com/in/badis-mahjoubi-93a351189</a>  ·  '
    '<a href="https://github.com/Badis-tech" color="#1d4ed8">github.com/Badis-tech</a>  ·  '
    '<a href="https://portfolio-v3-tan-six.vercel.app" color="#1d4ed8">portfolio-v3-tan-six.vercel.app</a>'
)
CONTACT_FR = (
    'Tunis, Tunisie  ·  +216 94 053 006  ·  +216 29 963 235  ·  '
    '<a href="mailto:badismahjoubi.dev@gmail.com" color="#1d4ed8">badismahjoubi.dev@gmail.com</a><br/>'
    '<a href="https://www.linkedin.com/in/badis-mahjoubi-93a351189/" color="#1d4ed8">linkedin.com/in/badis-mahjoubi-93a351189</a>  ·  '
    '<a href="https://github.com/Badis-tech" color="#1d4ed8">github.com/Badis-tech</a>  ·  '
    '<a href="https://portfolio-v3-tan-six.vercel.app" color="#1d4ed8">portfolio-v3-tan-six.vercel.app</a>'
)

cv_en = {
    "pdf_title": "Badis Mahjoubi — Full-Stack & AI Developer — CV",
    "name": "BADIS MAHJOUBI",
    "role": "Full-Stack &amp; AI Developer  |  Software Engineer  |  Python &amp; TypeScript  |  SaaS &amp; Automation",
    "contact": CONTACT_EN,
    "section_profile": "Professional Summary",
    "profile": (
        "Full-stack developer with 2+ years of experience building production SaaS platforms, "
        "automation systems, and data pipelines. Core stack: Python (FastAPI, Flask), "
        "TypeScript (Next.js 15, React), PostgreSQL, Supabase, and Docker. "
        "Delivered a job-board SaaS serving 30,000+ scraped listings, built multi-agent "
        "scraping architectures with Playwright, and integrated LLM APIs into business workflows. "
        "Engineering degree (Fintech specialization) from ESPRIT. Fluent in French and English."
    ),
    "section_skills": "Technical Skills",
    "skills": [
        ("Languages", "Python, TypeScript, JavaScript, Java, SQL"),
        ("Backend", "FastAPI, Flask, Node.js, Spring Boot, REST APIs, OAuth 2.0, JWT"),
        ("Frontend", "Next.js 15, React, Tailwind CSS, shadcn/ui, HTML5, CSS3"),
        ("Databases", "PostgreSQL, Supabase, MongoDB, Redis"),
        ("Data & Automation", "Web scraping (Playwright, BeautifulSoup), ETL/ELT pipelines, data deduplication, multi-agent architecture"),
        ("AI & ML", "LLM API integration (OpenAI, OpenRouter), automated scoring, NLP pipelines"),
        ("DevOps & Tools", "Docker, Kubernetes, CI/CD (GitHub Actions), Linux (Ubuntu), Git, Vercel"),
    ],
    "section_experience": "Professional Experience",
    "experience": [
        {
            "title": "Freelance Full-Stack Developer",
            "meta": "Self-employed — Remote (Tunisia)  |  Jan 2025 – Present",
            "bullets": [
                "Built and launched AusbildungJobs, a SaaS job board for German apprenticeship positions using Next.js 15, FastAPI, and Supabase, serving 30,000+ scraped job listings with smart filtering.",
                "Developed an automated job-application pipeline using Playwright + Bundesagentur für Arbeit API, reducing manual application time by 90%.",
                "Architected a multi-agent web scraping system to ingest data from 30,000+ establishments with built-in deduplication and enrichment.",
                "Designed multi-source data ingestion pipelines (ETL) feeding into PostgreSQL with automated quality checks.",
                "Delivered SaaS platforms and automation systems for international clients, handling end-to-end delivery from architecture to deployment on Vercel.",
            ],
        },
        {
            "title": "Backend Developer — Internship",
            "meta": "Tontec Tunisia — Tunis, Tunisia  |  2024 – 2025",
            "bullets": [
                "Designed and developed RESTful APIs with FastAPI and PostgreSQL, handling 500+ daily requests for an internal business platform.",
                "Integrated LLM models (OpenAI API) to automate document classification and business workflow processing, cutting manual review time by 60%.",
                "Built automated data pipelines using Supabase Edge Functions for real-time event-driven processing.",
                "Collaborated with the product team to define API contracts and implemented comprehensive error handling and logging.",
            ],
        },
        {
            "title": "Infrastructure Developer — Internship",
            "meta": "CODIX Tunisia — Tunis, Tunisia  |  2023 – 2024",
            "bullets": [
                "Maintained and improved a high-availability financial platform processing invoice-financing transactions.",
                "Optimized backend infrastructure and database queries, contributing to improved response times.",
                "Implemented OAuth 2.0 and JWT-based authentication flows for secure API access.",
                "Participated in code reviews and contributed to CI/CD pipeline improvements.",
            ],
        },
    ],
    "section_projects": "Key Projects",
    "projects": [
        {
            "title": "AusbildungJobs — SaaS Job Board  (Next.js, FastAPI, Supabase)",
            "desc": "Production job board for German apprenticeship positions. Auto-scrapes Bundesagentur API, provides smart filters, includes a premium CV/cover-letter service. Deployed on Vercel with Supabase backend.",
        },
        {
            "title": "PyBalancer — L4/L7 Load Balancer  (Python, Asyncio)",
            "desc": "Pure-Python load balancer with zero dependencies. Async event loop, health checks, round-robin and least-connections strategies. Built from raw sockets.",
        },
        {
            "title": "Mini-Prometheus — Observability Agent  (Python)",
            "desc": "Lightweight metrics agent harvesting CPU, RAM, and disk metrics with a pull-based collection model inspired by Prometheus internals.",
        },
        {
            "title": "ERP — Animal Management  (Spring Boot, MongoDB)",
            "desc": "Veterinary tracking, livestock, and inventory management platform for a farming operation with role-based access control.",
        },
    ],
    "section_education": "Education",
    "education": [
        {
            "title": "Engineering Degree in Computer Science — Fintech Specialization",
            "meta": "ESPRIT — Tunis, Tunisia  |  2020 – 2025",
        },
        {
            "title": "Applied Bachelor's Degree in Electrical Engineering",
            "meta": "ISET Radès — Tunis, Tunisia  |  2016 – 2020",
        },
    ],
    "section_languages": "Languages",
    "languages": "Arabic (Native)  ·  French (Fluent)  ·  English (Professional working proficiency)",
}


cv_fr = {
    "pdf_title": "Badis Mahjoubi — Développeur Full-Stack & IA — CV",
    "name": "BADIS MAHJOUBI",
    "role": "Développeur Full-Stack &amp; IA  |  Ingénieur Logiciel  |  Python &amp; TypeScript  |  SaaS &amp; Automatisation",
    "contact": CONTACT_FR,
    "section_profile": "Résumé Professionnel",
    "profile": (
        "Développeur full-stack avec plus de 2 ans d'expérience dans la conception de plateformes "
        "SaaS, de systèmes d'automatisation et de pipelines de données en production. "
        "Stack principal : Python (FastAPI, Flask), TypeScript (Next.js 15, React), PostgreSQL, "
        "Supabase et Docker. Livraison d'un job board SaaS exploitant 30 000+ offres scrapées, "
        "conception d'architectures de scraping multi-agents avec Playwright, et intégration "
        "d'APIs LLM dans des workflows métier. Diplôme d'ingénieur (spécialisation Fintech) "
        "de l'ESPRIT. Français courant et anglais professionnel."
    ),
    "section_skills": "Compétences Techniques",
    "skills": [
        ("Langages", "Python, TypeScript, JavaScript, Java, SQL"),
        ("Backend", "FastAPI, Flask, Node.js, Spring Boot, APIs REST, OAuth 2.0, JWT"),
        ("Frontend", "Next.js 15, React, Tailwind CSS, shadcn/ui, HTML5, CSS3"),
        ("Bases de données", "PostgreSQL, Supabase, MongoDB, Redis"),
        ("Data & Automatisation", "Web scraping (Playwright, BeautifulSoup), pipelines ETL/ELT, dédoublonnage, architecture multi-agents"),
        ("IA & ML", "Intégration d'APIs LLM (OpenAI, OpenRouter), scoring automatisé, pipelines NLP"),
        ("DevOps & Outils", "Docker, Kubernetes, CI/CD (GitHub Actions), Linux (Ubuntu), Git, Vercel"),
    ],
    "section_experience": "Expérience Professionnelle",
    "experience": [
        {
            "title": "Développeur Full-Stack Freelance",
            "meta": "Auto-entrepreneur — Télétravail (Tunisie)  |  Janv. 2025 – Présent",
            "bullets": [
                "Conception et lancement d'AusbildungJobs, un job board SaaS pour les postes d'apprentissage en Allemagne (Next.js 15, FastAPI, Supabase), exploitant 30 000+ offres scrapées avec filtres intelligents.",
                "Développement d'un pipeline d'automatisation de candidatures via Playwright + API Bundesagentur für Arbeit, réduisant le temps de candidature manuelle de 90 %.",
                "Architecture d'un système de scraping multi-agents pour l'ingestion de données de 30 000+ établissements avec dédoublonnage et enrichissement intégrés.",
                "Conception de pipelines d'ingestion de données multi-sources (ETL) alimentant PostgreSQL avec contrôles qualité automatisés.",
                "Livraison de plateformes SaaS et de systèmes d'automatisation pour des clients internationaux, de l'architecture au déploiement sur Vercel.",
            ],
        },
        {
            "title": "Développeur Backend — Stage",
            "meta": "Tontec Tunisie — Tunis, Tunisie  |  2024 – 2025",
            "bullets": [
                "Conception et développement d'APIs RESTful avec FastAPI et PostgreSQL, traitant 500+ requêtes quotidiennes pour une plateforme métier interne.",
                "Intégration de modèles LLM (API OpenAI) pour automatiser la classification documentaire et le traitement de workflows métier, réduisant le temps de revue manuelle de 60 %.",
                "Construction de pipelines de données automatisés avec Supabase Edge Functions pour le traitement événementiel en temps réel.",
                "Collaboration avec l'équipe produit pour définir les contrats d'API et implémentation d'une gestion d'erreurs et d'un logging complets.",
            ],
        },
        {
            "title": "Développeur Infrastructure — Stage",
            "meta": "CODIX Tunisie — Tunis, Tunisie  |  2023 – 2024",
            "bullets": [
                "Maintenance et amélioration d'une plateforme financière haute disponibilité traitant des transactions d'affacturage.",
                "Optimisation de l'infrastructure backend et des requêtes de base de données, contribuant à l'amélioration des temps de réponse.",
                "Implémentation de flux d'authentification OAuth 2.0 et JWT pour un accès API sécurisé.",
                "Participation aux revues de code et contribution aux améliorations du pipeline CI/CD.",
            ],
        },
    ],
    "section_projects": "Projets Clés",
    "projects": [
        {
            "title": "AusbildungJobs — Job Board SaaS  (Next.js, FastAPI, Supabase)",
            "desc": "Job board en production pour les postes d'apprentissage en Allemagne. Scraping automatique de l'API Bundesagentur, filtres intelligents, service premium de CV/lettre de motivation. Déployé sur Vercel avec backend Supabase.",
        },
        {
            "title": "PyBalancer — Load Balancer L4/L7  (Python, Asyncio)",
            "desc": "Load balancer en Python pur sans dépendance. Boucle d'événements asynchrone, health checks, stratégies round-robin et least-connections. Construit à partir de sockets bruts.",
        },
        {
            "title": "Mini-Prometheus — Agent d'observabilité  (Python)",
            "desc": "Agent léger de collecte de métriques (CPU, RAM, disque) avec modèle de collecte pull inspiré des internals de Prometheus.",
        },
        {
            "title": "ERP — Gestion animalière  (Spring Boot, MongoDB)",
            "desc": "Plateforme de suivi vétérinaire, gestion de bétail et d'inventaire pour une exploitation agricole avec contrôle d'accès par rôle.",
        },
    ],
    "section_education": "Formation",
    "education": [
        {
            "title": "Diplôme d'Ingénieur en Informatique — Spécialisation Fintech",
            "meta": "ESPRIT — Tunis, Tunisie  |  2020 – 2025",
        },
        {
            "title": "Licence Appliquée en Génie Électrique",
            "meta": "ISET Radès — Tunis, Tunisie  |  2016 – 2020",
        },
    ],
    "section_languages": "Langues",
    "languages": "Arabe (Langue maternelle)  ·  Français (Courant)  ·  Anglais (Professionnel)",
}


# ── Generate both ──
out_dir = os.path.expanduser("~/portfolio-V3/public/cv")
os.makedirs(out_dir, exist_ok=True)

build_cv(cv_en, os.path.join(out_dir, "Badis-Mahjoubi-CV-EN.pdf"))
build_cv(cv_fr, os.path.join(out_dir, "Badis-Mahjoubi-CV-FR.pdf"))
print("\nDone! Both CVs generated.")
