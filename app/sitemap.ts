import type { MetadataRoute } from "next";
import { getAll } from "@/lib/content";
import { site } from "@/lib/site";
import { href, LANG_TAG, LANGS } from "@/lib/t";

// Every page once per language, each listing its counterparts in the other languages.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; date?: string }[] = [
    ...["/", "/projects", "/blog", "/concepts", "/about", "/resume", "/guestbook", "/package", "/privacy"].map((path) => ({ path })),
    ...[...getAll("projects"), ...getAll("blog"), ...getAll("concepts")].map((e) => ({ path: `/${e.kind}/${e.slug}`, date: e.date })),
  ];
  const abs = (lang: (typeof LANGS)[number], path: string) => site.url + (href(lang, path) === "/" ? "" : href(lang, path));
  return pages.flatMap(({ path, date }) =>
    LANGS.map((lang) => ({
      url: abs(lang, path),
      ...(date ? { lastModified: date } : {}),
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [LANG_TAG[l], abs(l, path)])) },
    })),
  );
}
