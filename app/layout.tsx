import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
