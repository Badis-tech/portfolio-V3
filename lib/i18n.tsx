"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "./data";

interface I18nContext {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const Ctx = createContext<I18nContext>({ locale: "en", setLocale: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  // Keep <html lang/dir> in sync so fonts and layout flip for Arabic (RTL)
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return <Ctx.Provider value={{ locale, setLocale }}>{children}</Ctx.Provider>;
}

export function useLocale() {
  return useContext(Ctx);
}
