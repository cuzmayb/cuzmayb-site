"use client";

import { Link } from "@/lib/link";
import { useState } from "react";
import { dateTr, kw, T, type Tr } from "@/lib/t";
import { useL } from "@/lib/use-lang";

type L = { title: string; summary: string; view: string; minutes: number; tags: string[] };
export type Post = { slug: string; date: string; tags: string[]; keyword?: string; view?: string; t: Record<"ko" | "en" | "zh", L> };
const all = (p: Post, k: "title" | "summary" | "view") => ({ ko: p.t.ko[k], en: p.t.en[k], zh: p.t.zh[k] });

const ALL = "__all";

// One filter row: label on the left, options as pills with a count each (reference layout).
export function Row({ label, options, value, set }: { label: Tr; options: { key: string; label: Tr; n: number }[]; value: string; set: (v: string) => void }) {
  return (
    <div className="bf-row">
      <p className="bf-label"><T {...label} /></p>
      <div className="bf-options">
        {options.map((o) => (
          <button key={o.key} type="button" aria-pressed={value === o.key} onClick={() => set(o.key)}>
            <T {...o.label} /> <span className="bf-count">{o.n}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PostList({ posts }: { posts: Post[] }) {
  const [view, setView] = useState(ALL);
  const L = useL();
  const [keyword, setKeyword] = useState(ALL);
  const allLabel = { ko: "전체", en: "All", zh: "全部" };

  const views = [...new Set(posts.map((p) => p.view).filter(Boolean) as string[])];
  const keywords = [...new Set(posts.map((p) => p.keyword).filter(Boolean) as string[])];
  const viewLabel = (v: string) => { const p = posts.find((x) => x.view === v)!; return all(p, "view"); };

  const shown = posts.filter((p) => (view === ALL || p.view === view) && (keyword === ALL || p.keyword === keyword));

  return (
    <>
      <nav className="bf" aria-label={L({ ko: "글 필터", en: "Post filters", zh: "文章筛选" })}>
        <Row label={{ ko: "관점", en: "Lens", zh: "视角" }} value={view} set={setView}
          options={[{ key: ALL, label: allLabel, n: posts.length }, ...views.map((v) => ({ key: v, label: viewLabel(v), n: posts.filter((p) => p.view === v).length }))]} />
        <Row label={{ ko: "키워드", en: "Topic", zh: "关键词" }} value={keyword} set={setKeyword}
          options={[{ key: ALL, label: { ko: "모든 키워드", en: "All topics", zh: "全部关键词" }, n: posts.length }, ...keywords.map((k) => ({ key: k, label: kw(k), n: posts.filter((p) => p.keyword === k).length }))]} />
      </nav>
      {shown.length === 0 && <p className="empty"><T ko="이 조건에 맞는 글이 아직 없습니다." en="No posts match yet." zh="暂无符合条件的文章。" /></p>}
      <div className="bl">
        {shown.map((p) => (
          <article key={p.slug} className="bl-card">
            <Link href={`/blog/${p.slug}`}>
              <div className="bl-meta">
                <time dateTime={p.date}><T {...dateTr(p.date)} /></time>
                <span><T ko={`${p.t.ko.minutes}분 읽기`} en={`${p.t.en.minutes} min read`} zh={`${p.t.zh.minutes} 分钟阅读`} /></span>
              </div>
              <h2 className="bl-title"><T {...all(p, "title")} /></h2>
              <p className="bl-desc"><T {...all(p, "summary")} /></p>
              <ul className="bl-tags">
                {p.tags.map((t, i) => (
                  <li key={t}>#<T ko={t} en={p.t.en.tags[i] ?? t} zh={p.t.zh.tags[i] ?? t} /></li>
                ))}
              </ul>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
