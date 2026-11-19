"use client";

import { I18nProvider } from "@/lib/i18n";
import Board from "@/components/Board";

export default function Home() {
  return (
    <I18nProvider>
      <Board />
    </I18nProvider>
  );
}
