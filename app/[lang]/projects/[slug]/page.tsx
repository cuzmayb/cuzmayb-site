import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectArticle } from "@/lib/project";
import { pick } from "@/lib/article";
import { getAll, getOne } from "@/lib/content";
import { asLang, pageMeta } from "@/lib/meta";

export function generateStaticParams() {
  return getAll("projects").map((p) => ({ slug: p.slug }));
}

type P = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getOne("projects", slug);
  return p ? pageMeta(asLang(lang), `/projects/${slug}`, { title: pick(p, "title"), description: pick(p, "summary"), article: p.date }) : {};
}

export default async function Project({ params }: P) {
  const { lang, slug } = await params;
  const p = getOne("projects", slug);
  if (!p) notFound();
  return <ProjectArticle e={p} lang={asLang(lang)} />;
}
