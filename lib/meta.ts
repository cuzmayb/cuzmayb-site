import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { href, LANG_TAG, LANGS, type Lang, type Tr } from "@/lib/t";

// The [lang] segment as a known language, or the 404 page.
export function asLang(v: string): Lang {
  if (!(LANGS as readonly string[]).includes(v)) notFound();
  return v as Lang;
}

const OG_LOCALE: Record<Lang, string> = { ko: "ko_KR", en: "en_US", zh: "zh_CN" };

// Per-page metadata in the page's language, with its own address as canonical and the other languages as alternates.
export function pageMeta(lang: Lang, path: string, m: { title?: Tr; description?: Tr; article?: string }): Metadata {
  return {
    ...(m.title ? { title: m.title[lang] } : {}), // left out, not undefined, so the layout's default title stands
    ...(m.description ? { description: m.description[lang] } : {}),
    alternates: {
      canonical: href(lang, path),
      languages: { ...Object.fromEntries(LANGS.map((l) => [LANG_TAG[l], href(l, path)])), "x-default": href("ko", path) },
    },
    openGraph: { siteName: "cuzmayb", locale: OG_LOCALE[lang], ...(m.article ? { type: "article", publishedTime: m.article } : { type: "website" }) },
  };
}
