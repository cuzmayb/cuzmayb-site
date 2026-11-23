import type { Metadata } from "next";
import { asLang, pageMeta } from "@/lib/meta";
import { getAll } from "@/lib/content";
import { T } from "@/lib/t";
import { PostList, type Post } from "./post-list";

type P = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return pageMeta(asLang((await params).lang), "/blog", { title: { ko: "블로그", en: "Blog", zh: "博客" }, description: { ko: "ALD, MOS C-V, HBM 열 해석을 공부하며 정리한 글.", en: "Study notes on ALD, MOS C-V curves and HBM thermal analysis.", zh: "学习 ALD、MOS C-V 曲线与 HBM 热分析时整理的文章。" } });
}

export default function Blog() {
  // The client list only needs list fields, in every language.
  const posts: Post[] = getAll("blog").map((e) => ({
    slug: e.slug, date: e.date, tags: e.l.ko.tags, keyword: e.keyword, view: e.view,
    t: Object.fromEntries((["ko", "en", "zh"] as const).map((l) => [l, { title: e.l[l].title, summary: e.l[l].summary, view: e.l[l].view ?? "", minutes: e.l[l].minutes, tags: e.l[l].tags }])) as Post["t"],
  }));
  return (
    <div className="blog-page">
      <header className="blog-head">
        <h1><T ko="전체 글" en="All posts" zh="全部文章" /></h1>
        <p className="blog-result"><T ko={`${posts.length}개의 글`} en={`${posts.length} posts`} zh={`${posts.length} 篇文章`} /></p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
