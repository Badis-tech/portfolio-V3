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
  title: "Badis Mahjoubi — System Engineer & Backend Architect",
  description:
    "Portfolio of Badis Mahjoubi. Building scalable distributed systems, secure backends, and automation tools. Python, FastAPI, React, Angular, Spring Boot.",
  keywords: [
    "Badis Mahjoubi",
    "System Engineer",
    "Backend Architect",
    "Full-Stack Developer",
    "Python",
    "FastAPI",
    "Spring Boot",
  ],
  openGraph: {
    title: "Badis Mahjoubi — System Engineer & Backend Architect",
    description:
      "Building scalable distributed systems, secure backends, and automation tools.",
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
