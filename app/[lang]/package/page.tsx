import type { Metadata } from "next";
import { asLang, pageMeta } from "@/lib/meta";
import { Exploded } from "@/lib/exploded";

type P = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return pageMeta(asLang((await params).lang), "/package", { title: { ko: "GPU-HBM 패키지 분해도", en: "GPU-HBM package, exploded view", zh: "GPU-HBM 封装分解图" }, description: { ko: "GPU-HBM 패키지를 부품 하나하나로 펼쳐 보고, GPU와 HBM 사이 신호가 지나는 길을 따라가 보는 3D 모식도.", en: "A 3D schematic that spreads a GPU-HBM package into its parts and follows the signal path between GPU and HBM.", zh: "把 GPU-HBM 封装逐个部件展开，并沿着 GPU 与 HBM 之间信号路径查看的 3D 示意图。" } });
}

export default function Package() {
  return <Exploded />;
}
