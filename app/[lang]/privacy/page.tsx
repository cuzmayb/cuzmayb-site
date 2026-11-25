import type { Metadata } from "next";
import { asLang, pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";
import { T, type Tr } from "@/lib/t";

type P = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return pageMeta(asLang((await params).lang), "/privacy", { title: { ko: "개인정보 처리 안내", en: "Privacy", zh: "隐私说明" }, description: { ko: "이 사이트가 저장하는 정보와 저장하지 않는 정보.", en: "What this site stores and what it does not.", zh: "本站保存与不保存的信息。" } });
}

type Item = { k: Tr; v: Tr };
type Section = { h: Tr; items: Item[] };

// Keep in step with what the code really does: lib/prefs.tsx, app/layout.tsx.
const SECTIONS: Section[] = [
  {
    h: { ko: "수집·이용하는 정보", en: "What is collected and used", zh: "收集和使用的信息" },
    items: [
      {
        k: { ko: "방문 분석", en: "Visit analytics", zh: "访问分析" },
        v: { ko: "하지 않습니다. 분석 도구, 광고, 추적 쿠키가 없고 회원 가입도 없습니다.", en: "None. There are no analytics tools, ads or tracking cookies, and no accounts.", zh: "不做。没有分析工具、广告或跟踪 Cookie，也没有账号注册。" },
      },
      {
        k: { ko: "사이트 설정", en: "Site settings", zh: "站点设置" },
        v: { ko: "야간 모드 선택은 이 브라우저의 localStorage에만 저장합니다. 언어는 주소로 정해지고 따로 저장하지 않습니다. 쿠키를 쓰지 않고 서버로 보내지 않습니다.", en: "Your night-mode choice is kept only in this browser's localStorage. The language comes from the address and is not stored. No cookie is used and nothing is sent to a server.", zh: "夜间模式的选择只保存在本浏览器的 localStorage 中。语言由网址决定，不另行保存。不使用 Cookie，也不发送到服务器。" },
      },
    ],
  },
  {
    h: { ko: "외부 서비스", en: "Outside services", zh: "外部服务" },
    items: [
      {
        k: { ko: "호스팅", en: "Hosting", zh: "托管" },
        v: { ko: "사이트를 제공하는 호스팅 사업자는 접속 IP 같은 요청 로그를 자체 정책에 따라 처리할 수 있습니다.", en: "The hosting provider that serves this site may process request logs, such as your IP address, under its own policy.", zh: "提供本站的托管服务商可能按其自身政策处理访问 IP 等请求日志。" },
      },
    ],
  },
  {
    h: { ko: "선택과 요청", en: "Choices and requests", zh: "选择与请求" },
    items: [
      {
        k: { ko: "지우기", en: "Clearing", zh: "清除" },
        v: { ko: "브라우저에서 이 사이트의 데이터를 지우면 야간 모드 설정이 사라집니다.", en: "Clearing this site's data in your browser removes the night-mode setting.", zh: "在浏览器中清除本站数据后，夜间模式设置会被删除。" },
      },
      {
        k: { ko: "문의와 요청", en: "Questions and requests", zh: "咨询与请求" },
        v: { ko: "서버에 개인별로 저장하는 기록은 없습니다. 문의나 요청은 아래 이메일로 보내 주세요.", en: "No per-person record is stored on the server. If you still have a question or a request, write to the address below.", zh: "服务器上不保存针对个人的记录。如仍有疑问或请求，请发送至下方邮箱。" },
      },
    ],
  },
];

export default function Privacy() {
  return (
    <div className="prose privacy">
      <h1><T ko="개인정보 처리 안내" en="Privacy notice" zh="个人信息处理说明" /></h1>
      <p className="lede"><T ko="cuzmayb가 실제로 쓰는 데이터와 그 이유를 간단히 밝힙니다." en="What data cuzmayb actually uses, and why, in brief." zh="简要说明 cuzmayb 实际使用的数据及其原因。" /></p>
      <p className="privacy-date"><T ko="시행일 · 2026년 11월 25일" en="Effective · Nov 25, 2026" zh="生效日期 · 2026年11月25日" /></p>
      {SECTIONS.map((s) => (
        <section key={s.h.en}>
          <h2><T {...s.h} /></h2>
          <ul>
            {s.items.map((it) => (
              <li key={it.k.en}><strong><T {...it.k} /></strong>: <T {...it.v} /></li>
            ))}
          </ul>
        </section>
      ))}
      <h2><T ko="문의" en="Contact" zh="联系" /></h2>
      <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
    </div>
  );
}
