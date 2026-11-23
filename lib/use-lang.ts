"use client";

import { createContext, createElement, useContext, type ReactNode } from "react";
import type { Lang, Tr } from "@/lib/t";

// The page's language comes from its address (/…, /en/…, /zh/…); the root layout provides it here.
const LangContext = createContext<Lang>("ko");
export const LangProvider = ({ lang, children }: { lang: Lang; children: ReactNode }) => createElement(LangContext.Provider, { value: lang }, children);
export const useLang = (): Lang => useContext(LangContext);

// For attributes (aria-label, title), which take a plain string.
export function useL() {
  const lang = useLang();
  return (t: Tr) => t[lang];
}

// Keep Tab inside an open dialog: cycles through `items`, or stays put when there is nothing else to focus.
export function trapTab(e: { key: string; shiftKey: boolean; preventDefault: () => void }, items: (HTMLElement | null)[]) {
  if (e.key !== "Tab") return;
  const f = items.filter(Boolean) as HTMLElement[];
  e.preventDefault();
  if (!f.length) return;
  const i = f.indexOf(document.activeElement as HTMLElement);
  f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
}
