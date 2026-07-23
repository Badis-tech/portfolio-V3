"use client";

import { I18nProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <I18nProvider>
      <main>
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </I18nProvider>
  );
}
