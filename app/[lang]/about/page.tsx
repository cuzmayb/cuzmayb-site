import type { Metadata } from "next";
import { asLang, pageMeta } from "@/lib/meta";
import { getPage } from "@/lib/content";
import { Tools } from "@/lib/tools";
import { AboutFx } from "@/lib/about-fx";

type P = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return pageMeta(asLang((await params).lang), "/about", { title: { ko: "소개", en: "About", zh: "关于" }, description: { ko: "cuzmayb를 쓰는 사람과 이름의 유래, 다루는 도구.", en: "Who writes cuzmayb, where the name comes from, and the tools in use.", zh: "cuzmayb 的作者、名字的由来以及使用的工具。" } });
}

export default async function About({ params }: P) {
  const cur = asLang((await params).lang);
  const page = getPage("about");
  return (
    <div className="about">
      {[cur].map((lang) => (
        <article key={lang} className={`lb lb-${lang} prose`} lang={page[lang].translated ? (lang === "zh" ? "zh-CN" : lang) : "ko"}
          dangerouslySetInnerHTML={{ __html: page[lang].html }} />
      ))}
      <AboutFx />
      <Tools />
    </div>
  );
}
