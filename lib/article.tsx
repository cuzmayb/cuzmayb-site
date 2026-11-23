import type { Entry } from "@/lib/content";

// Field from every language, for <T>.
export const tagsAll = (e: Entry) => e.l.ko.tags.map((t, i) => ({ ko: t, en: e.l.en.tags[i] ?? t, zh: e.l.zh.tags[i] ?? t }));
export const pick = (e: Entry, k: "title" | "name" | "summary" | "role" | "team" | "result" | "view" | "status" | "period") =>
  ({ ko: e.l.ko[k] ?? "", en: e.l.en[k] ?? "", zh: e.l.zh[k] ?? "" });
