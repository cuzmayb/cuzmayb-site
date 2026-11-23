"use client";

import type { Tr } from "@/lib/t";
import { useLang } from "@/lib/use-lang";

// Shows the text for the page's language, and only that one, so each address carries a single language.
export function T(t: Tr) {
  return <>{t[useLang()]}</>;
}
