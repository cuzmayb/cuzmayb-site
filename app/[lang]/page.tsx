import type { Metadata } from "next";
import { asLang, pageMeta } from "@/lib/meta";
import { Link } from "@/lib/link";
import { Burger } from "@/lib/burger";
import { Contacts } from "@/lib/contacts";
import { HomeFx } from "@/lib/home-fx";
import { HomeMark } from "@/lib/home-mark";
import { PillNav } from "@/lib/pill-nav";
import { Pn } from "@/lib/pn";
import { Prefs } from "@/lib/prefs";
import { T } from "@/lib/t";

type P = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return pageMeta(asLang((await params).lang), "/", {});
}

export default function Home() {
  return (
    <>
    <section className="home">
      <Burger className="burger-fixed" />
      <Prefs />
      <HomeMark />
      <h1>
        <Link href="/about">
          cuzmayb
          <span className="go" aria-hidden="true"><T ko="소개 →" en="About →" zh="关于 →" /></span>
        </Link>
      </h1>
      <p className="home-line"><T ko="반도체 공부와 프로젝트 기록" en="Semiconductor studies and project notes" zh="半导体学习与项目记录" /></p>
      <PillNav className="home-nav" />
      <Contacts />
      <Link href="/package" className="home-pkg">
        <T ko="GPU-HBM 패키지 모식도" en="GPU-HBM package schematic" zh="GPU-HBM 封装示意图" /> <span className="arrow" aria-hidden="true">→</span>
      </Link>
      <HomeFx />
    </section>
    <Pn />
    </>
  );
}
