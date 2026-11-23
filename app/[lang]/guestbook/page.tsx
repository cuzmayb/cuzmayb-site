import type { Metadata } from "next";
import { asLang, pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";
import { Giscus } from "./giscus";
import { DrawPad } from "@/lib/draw-pad";
import { T, tr } from "@/lib/t";

type P = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return pageMeta(asLang((await params).lang), "/guestbook", { title: { ko: "방명록", en: "Guestbook", zh: "留言板" }, description: { ko: "지나가다 그림 한 장 남기는 방명록.", en: "A guestbook: leave a doodle on your way.", zh: "留言板：路过请画一幅画。" } });
}

export default function Guestbook() {
  return (
    <>
      <h1 className="page"><T {...tr.guestbook} /></h1>
      <p className="lede"><T {...tr.guestbookLede} /></p>
      <DrawPad />
      {site.giscus ? <Giscus {...site.giscus} /> : <p className="empty"><T {...tr.guestbookSoon} /></p>}
    </>
  );
}
