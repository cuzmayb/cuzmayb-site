import type { Metadata } from "next";
import { asLang, pageMeta } from "@/lib/meta";
import { pick, tagsAll } from "@/lib/article";
import { getAll } from "@/lib/content";
import { T } from "@/lib/t";
import { Timeline, type Item } from "./timeline";

type P = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return pageMeta(asLang((await params).lang), "/projects", { title: { ko: "프로젝트", en: "Projects", zh: "项目" }, description: { ko: "HBM 본딩층 void 열 검출, GPU-HBM 채널 신호무결성, TGV 구리 충전 등 반도체 프로젝트 기록.", en: "Semiconductor project write-ups: thermal detection of voids in HBM bonding layers, GPU-HBM channel signal integrity, copper filling of through-glass vias.", zh: "半导体项目记录：HBM 键合层空洞的热检测、GPU-HBM 通道信号完整性、玻璃通孔铜填充等。" } });
}

export default function Projects() {
  const items: Item[] = getAll("projects").map((p) => ({
    slug: p.slug,
    date: p.date,
    cover: p.cover,
    coverSize: p.coverSize,
    title: pick(p, "title"),
    name: pick(p, "name"),
    summary: pick(p, "summary"),
    period: pick(p, "period"),
    role: pick(p, "role"),
    team: pick(p, "team"),
    result: pick(p, "result"),
    status: pick(p, "status"),
    tags: tagsAll(p),
  }));
  return (
    <div className="pt-page">
      <header className="pt-head">
        <h1 className="pt-h1"><T ko="프로젝트" en="Projects" zh="项目" /></h1>
        <p className="lede">
          <T ko="최근 작업부터 놓았습니다. 왼쪽 목록을 따라 내려가며 보세요." en="Newest first. Follow the list on the left as you scroll." zh="按时间倒序排列。沿着左侧列表往下看。" />
        </p>
      </header>
      <Timeline items={items} />
    </div>
  );
}
