"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Locale } from "./data";

interface I18nContext {
  locale: Locale;
  toggle: () => void;
}

const Ctx = createContext<I18nContext>({ locale: "en", toggle: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const toggle = useCallback(
    () => setLocale((l) => (l === "en" ? "fr" : "en")),
    [],
  );
  return <Ctx.Provider value={{ locale, toggle }}>{children}</Ctx.Provider>;
}

export function useLocale() {
  return useContext(Ctx);
}
