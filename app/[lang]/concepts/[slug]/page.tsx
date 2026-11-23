import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/lib/post";
import { pick } from "@/lib/article";
import { getAll, getOne } from "@/lib/content";
import { asLang, pageMeta } from "@/lib/meta";

export function generateStaticParams() {
  return getAll("concepts").map((p) => ({ slug: p.slug }));
}

type P = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getOne("concepts", slug);
  return p ? pageMeta(asLang(lang), `/concepts/${slug}`, { title: pick(p, "title"), description: pick(p, "summary"), article: p.date }) : {};
}

export default async function Concept({ params }: P) {
  const { lang, slug } = await params;
  const p = getOne("concepts", slug);
  if (!p) notFound();
  return <PostArticle e={p} lang={asLang(lang)} />;
}
