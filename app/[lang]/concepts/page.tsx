import type { Metadata } from "next";
import { getAll } from "@/lib/content";
import { Link } from "@/lib/link";
import { asLang, pageMeta } from "@/lib/meta";
import { T, tr } from "@/lib/t";

type P = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return pageMeta(asLang((await params).lang), "/concepts", { title: tr.concepts, description: { ko: "재료와 반도체의 기초 개념을 한 장씩 정리한 노트.", en: "Notes on the basics of materials and semiconductors, one concept per page.", zh: "材料与半导体基础概念的笔记，每个概念一页。" } });
}

// Concept notes, filed by topic. Each is one short page: what it is, the numbers, why, and where it shows up in my work.
export default async function Concepts({ params }: P) {
  const lang = asLang((await params).lang);
  const all = getAll("concepts");
  const groups = [...new Set(all.map((e) => e.group ?? ""))];
  return (
    <div className="cc">
      <h1 className="page"><T {...tr.concepts} /></h1>
      <p className="lede"><T ko="기초 개념을 한 장씩 정리합니다. 정의, 숫자, 그렇게 되는 이유 순서입니다." en="The basics, one concept per page: the definition, the numbers, then why." zh="把基础概念一页一页整理下来：定义、数字，然后是原因。" /></p>
      {groups.map((g) => (
        <section key={g} className="cc-group">
          {g && <h2>{all.find((e) => e.group === g)?.l[lang].groupLabel ?? g}</h2>}
          <ul>
            {all.filter((e) => (e.group ?? "") === g).map((e) => (
              <li key={e.slug}>
                <Link href={`/concepts/${e.slug}`}>
                  <strong>{e.l[lang].title}</strong>
                  <span>{e.l[lang].summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
