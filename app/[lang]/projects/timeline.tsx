"use client";

import { Link } from "@/lib/link";
import { useEffect, useRef, useState } from "react";
import { Mark } from "@/lib/mark";
import { T, type Tr } from "@/lib/t";
import { useL } from "@/lib/use-lang";
import { Row } from "../blog/post-list";

export type Item = {
  slug: string;
  date: string; // YYYY-MM-DD
  cover?: string;
  coverSize?: [number, number];
  title: Tr;
  name: Tr; // short project name; falls back to the title
  summary: Tr;
  period: Tr;
  role: Tr;
  team: Tr;
  result: Tr;
  status: Tr;
  tags: Tr[];
};

const MONTH: Record<"ko" | "en" | "zh", (m: number) => string> = {
  ko: (m) => `${m}월`,
  en: (m) => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1],
  zh: (m) => `${m}月`,
};
const num = (i: number) => String(i + 1).padStart(2, "0");

// Projects: a sticky rail on the left (year, month, numbered list) follows the card being read on the right.
export function Timeline({ items: allItems }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [tag, setTag] = useState("");
  // Filter by a tool or topic. Only tags shared by two or more projects get a pill; a pill for one project filters nothing.
  const count = (t: string) => allItems.filter((p) => p.tags.some((x) => x.ko === t)).length;
  const shared = [...new Map(allItems.flatMap((p) => p.tags).map((t) => [t.ko, t])).values()].filter((t) => count(t.ko) > 1).sort((a, b) => count(b.ko) - count(a.ko));
  const items = tag ? allItems.filter((p) => p.tags.some((x) => x.ko === tag)) : allItems;
  const no = (p: Item) => num(allItems.indexOf(p)); // keep each project's number while filtered
  const L = useL();
  const entries = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const on = () => {
      let cur = 0;
      entries.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < innerHeight * 0.4) cur = i;
      });
      setActive(cur);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, [tag]);

  const go = (i: number) =>
    entries.current[i]?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });

  const a = items[active];
  const [y, m] = a ? [a.date.slice(0, 4), Number(a.date.slice(5, 7))] : ["", 1];

  return (
    <>
    {shared.length > 0 && (
      <nav className="bf pt-filter" aria-label={L({ ko: "프로젝트 필터", en: "Project filters", zh: "项目筛选" })}>
        <Row label={{ ko: "기술·주제", en: "Tool or topic", zh: "技术·主题" }} value={tag} set={(v) => { setTag(v); setActive(0); }}
          options={[{ key: "", label: { ko: "전체", en: "All", zh: "全部" }, n: allItems.length }, ...shared.map((t) => ({ key: t.ko, label: t, n: count(t.ko) }))]} />
      </nav>
    )}
    <div className="pt-layout">
      <aside className="pt-side" aria-label={L({ ko: "프로젝트 목록", en: "Project list", zh: "项目列表" })}>
        <div className="pt-sticky">
          <p className="pt-label"><T ko="프로젝트" en="Projects" zh="项目" /></p>
          {/* key = value, so the year and month replay their entrance when they change */}
          <div className="pt-year" key={y} aria-hidden="true">{y}</div>
          <p className="pt-month" key={y + m} aria-hidden="true"><T ko={MONTH.ko(m)} en={MONTH.en(m)} zh={MONTH.zh(m)} /></p>
          <ol className="pt-list">
            {items.map((p, i) => (
              <li key={p.slug}>
                <button type="button" aria-current={i === active ? "true" : undefined} onClick={() => go(i)}>
                  <span className="pt-dash" aria-hidden="true" />
                  <span className="pt-num">{no(p)}</span>
                  <span className="pt-name"><T {...(p.name.ko ? p.name : p.title)} /></span>
                  {allItems.indexOf(p) === 0 && <span className="pt-new"><T ko="최신" en="Latest" zh="最新" /></span>}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <ol className="pt-entries">
        {items.map((p, i) => (
          <li key={p.slug} ref={(el) => { entries.current[i] = el; }} className="pt-entry" data-active={i === active}>
            <article className="pt-card">
              <Link href={`/projects/${p.slug}`} className="pt-thumb" tabIndex={-1} aria-hidden="true">
                {p.cover ? <img src={p.cover} alt="" width={p.coverSize?.[0]} height={p.coverSize?.[1]} loading={i === 0 ? "eager" : "lazy"} /> : <span className="pt-placeholder"><Mark size={64} /></span>}
              </Link>
              <div className="pt-body">
                <h2 className="pt-title">
                  <span className="pt-num">{no(p)}</span>
                  <Link href={`/projects/${p.slug}`}><T {...(p.name.ko ? p.name : p.title)} /></Link>
                </h2>
                {p.name.ko && <p className="pt-fullname"><T {...p.title} /></p>}
                <p className="pt-desc"><T {...p.summary} /></p>
                <dl className="pt-facts">
                  <div><dt><T ko="기간" en="Period" zh="时间" /></dt><dd><T {...p.period} /></dd></div>
                  {p.team.ko && <div><dt><T ko="팀" en="Team" zh="团队" /></dt><dd><T {...p.team} /></dd></div>}
                  {p.role.ko && <div><dt><T ko="역할" en="Role" zh="角色" /></dt><dd><T {...p.role} /></dd></div>}
                  {(p.result.ko || p.status.ko) && <div><dt><T ko="결과" en="Result" zh="结果" /></dt><dd><T {...(p.result.ko ? p.result : p.status)} /></dd></div>}
                </dl>
                <ul className="pt-tech">
                  {p.tags.map((t) => (
                    <li key={t.ko}><T {...t} /></li>
                  ))}
                </ul>
                <Link href={`/projects/${p.slug}`} className="pt-more">
                  <T ko="프로젝트 자세히 보기" en="Read the project" zh="查看项目详情" /> <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
    </>
  );
}
