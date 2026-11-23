import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { cache } from "react";

export type Kind = "projects" | "blog" | "concepts";
export { LANGS, type Lang } from "@/lib/t";
import { LANGS, type Lang } from "@/lib/t";

// Everything that changes with the language. Korean is the source; x.en.md / x.zh.md sit next to x.md.
export type Part = {
  title: string;
  name?: string; // projects: short name shown as the card title; the full title sits under it
  summary: string;
  view?: string; // blog: 경험 / 개인 공부 / 프로덕트
  role?: string; // projects
  team?: string; // projects: e.g. "3인 팀"
  result?: string; // projects: one short line for the facts row
  status?: string; // e.g. "진행 중"
  coverCaption?: string;
  findings: string[]; // key results shown above the body
  tags: string[]; // shown tags; matching for related posts uses the Korean ones
  period?: string;
  groupLabel?: string; // concepts: the topic heading in this language (grouping itself uses the Korean `group`)
  minutes: number;
  toc: { id: string; text: string }[];
  html: string;
  raw: string; // markdown body, for "copy as Markdown"
  translated: boolean; // false = this language fell back to Korean
};

export type Entry = Part & {
  slug: string;
  kind: Kind;
  date: string; // YYYY-MM-DD, used for sorting
  keyword?: string; // blog: project keyword
  group?: string; // concepts: the topic it is filed under, e.g. 결정 구조
  cover?: string; // /images/... in public/
  coverSize?: [number, number]; // its pixel size, so the <img> holds its space before it loads
  sources: { label: string; href?: string }[]; // projects: papers, reports, code and data behind the numbers (same in every language)
  l: Record<Lang, Part>;
};

const root = path.join(process.cwd(), "content");

// Pixel size of a WebP in public/, read from its header (lossy, lossless or extended), for <img width height>.
export function webpSize(src: string): [number, number] | undefined {
  try {
    const b = fs.readFileSync(path.join(process.cwd(), "public", src));
    const kind = b.toString("ascii", 12, 16);
    if (kind === "VP8X") return [b.readUIntLE(24, 3) + 1, b.readUIntLE(27, 3) + 1];
    if (kind === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (kind === "VP8L") { const n = b.readUInt32LE(21); return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1]; }
  } catch {}
}
const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const LOCALE_FILE = /\.(en|zh)\.md$/;

// Heading ids carry the language so the three rendered versions on one page never collide.
function render(content: string, lang: Lang) {
  const toc: Part["toc"] = [];
  const md = new Marked({
    // No strikethrough: "3.5~5.9 K ... 5~10 mL" in one paragraph would be struck through between the two tildes.
    tokenizer: { del: () => undefined },
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        if (depth !== 2) return `<h${depth}>${text}</h${depth}>`;
        const id = `${lang}-s${toc.length + 1}`;
        toc.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h2 id="${id}">${text}</h2>`;
      },
      // ![alt](/images/x.webp "caption") on a line of its own becomes a figure; width and height come from the file.
      paragraph({ tokens }) {
        const t = tokens.length === 1 && tokens[0].type === "image" ? tokens[0] : null;
        if (!t) return `<p>${this.parser.parseInline(tokens)}</p>\n`;
        const size = webpSize(t.href);
        const dims = size ? ` width="${size[0]}" height="${size[1]}"` : "";
        return `<figure class="fig"><img src="${esc(t.href)}" alt="${esc(t.text)}"${dims} loading="lazy" decoding="async">${t.title ? `<figcaption>${esc(t.title)}</figcaption>` : ""}</figure>\n`;
      },
    },
  });
  return { html: md.parse(content, { async: false }), toc };
}

// Reading speed: about 300 characters a minute for Korean and Chinese, 200 words for English.
const minutes = (content: string, lang: Lang) =>
  Math.max(1, Math.round(lang === "en" ? content.split(/\s+/).length / 200 : content.replace(/[\s#*|>`\-]/g, "").length / 300));

function part(data: Record<string, any>, content: string, lang: Lang, translated: boolean): Part {
  content = content.replace(/<!--[\s\S]*?-->/g, ""); // authoring notes (TODO) stay in the file only
  return {
    title: data.title,
    name: data.name,
    summary: data.summary ?? "",
    view: data.view,
    role: data.role,
    team: data.team,
    result: data.result,
    status: data.status,
    coverCaption: data.coverCaption,
    findings: data.findings ?? [],
    tags: data.tags ?? [],
    period: data.period,
    groupLabel: data.group,
    minutes: minutes(content, lang),
    raw: content.trim(),
    translated,
    ...render(content, lang),
  };
}

function read(kind: Kind, file: string): Entry {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  // YAML turns 2026-11-17 into a Date and 2026.10 into a number; fail the build instead of showing garbage.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
  if (!data.title || typeof date !== "string" || !DATE.test(date)) throw new Error(`${file}: title and date (YYYY-MM-DD) are required`);
  if (data.period !== undefined && typeof data.period !== "string") throw new Error(`${file}: quote period, e.g. period: "2026.10"`);
  const ko = part(data, content, "ko", true);
  const l = { ko } as Record<Lang, Part>;
  for (const lang of ["en", "zh"] as const) {
    const f = file.replace(/\.md$/, `.${lang}.md`);
    if (!fs.existsSync(f)) { l[lang] = { ...ko, translated: false }; continue; }
    const t = matter(fs.readFileSync(f, "utf8"));
    if (!t.data.title) throw new Error(`${f}: title is required`);
    l[lang] = part({ tags: ko.tags, period: ko.period, ...t.data }, t.content, lang, true); // untranslated tags/period fall back
  }
  return {
    ...ko,
    slug: path.basename(file, ".md"),
    kind,
    date,
    keyword: data.keyword,
    group: data.group,
    cover: data.cover,
    coverSize: data.cover ? webpSize(data.cover) : undefined,
    sources: data.sources ?? [],
    l,
  };
}

// Cached per request: one project page asks for the list five times, and each call re-reads and re-parses every file.
export const getAll = cache(function getAll(kind: Kind): Entry[] {
  const dir = path.join(root, kind);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !LOCALE_FILE.test(f))
    .map((f) => read(kind, path.join(dir, f)))
    .sort((a, b) => b.date.localeCompare(a.date));
});

export function getOne(kind: Kind, slug: string): Entry | undefined {
  return getAll(kind).find((e) => e.slug === slug);
}

// Other projects and posts sharing at least one tag, most shared first.
export function related(e: Entry, n = 3): Entry[] {
  return [...getAll("projects"), ...getAll("blog")]
    .filter((o) => !(o.kind === e.kind && o.slug === e.slug))
    .map((o) => ({ o, k: o.tags.filter((t) => e.tags.includes(t)).length }))
    .filter((x) => x.k > 0)
    .sort((a, b) => b.k - a.k)
    .slice(0, n)
    .map((x) => x.o);
}

// A standalone page (about) in every language, falling back to Korean.
export function getPage(name: string): Record<Lang, { html: string; translated: boolean }> {
  const out = {} as Record<Lang, { html: string; translated: boolean }>;
  for (const lang of LANGS) {
    const f = path.join(root, lang === "ko" ? `${name}.md` : `${name}.${lang}.md`);
    const src = fs.existsSync(f) ? f : path.join(root, `${name}.md`);
    out[lang] = { html: render(matter(fs.readFileSync(src, "utf8")).content, lang).html, translated: src === f };
  }
  return out;
}
