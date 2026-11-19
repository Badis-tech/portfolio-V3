import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, JetBrains_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const inter = DM_Sans({ subsets: ["latin"], variable: "--font-inter" });
const bricolage = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-bricolage",
});
const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Badis Mahjoubi — Full-Stack & AI Developer",
  description:
    "Portfolio of Badis Mahjoubi. Building SaaS platforms, automation systems, and data pipelines. Python, FastAPI, Next.js, Supabase, TypeScript.",
  keywords: [
    "Badis Mahjoubi",
    "Full-Stack Developer",
    "AI Developer",
    "Python",
    "FastAPI",
    "Next.js",
    "Supabase",
    "TypeScript",
  ],
  openGraph: {
    title: "Badis Mahjoubi — Full-Stack & AI Developer",
    description:
      "Building SaaS platforms, automation systems, and data pipelines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t!=="dark")t="light";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable} ${arabic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
