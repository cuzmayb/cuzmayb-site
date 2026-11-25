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

// Keep in step with what the code really does: lib/prefs.tsx, app/[lang]/layout.tsx (site.gaId).
const SECTIONS: Section[] = [
  {
    h: { ko: "수집·이용하는 정보", en: "What is collected and used", zh: "收集和使用的信息" },
    items: [
      {
        k: site.gaId ? { ko: "방문 통계", en: "Visit statistics", zh: "访问统计" } : { ko: "방문 분석", en: "Visit analytics", zh: "访问分析" },
        v: site.gaId
          ? { ko: "Google Analytics로 본 페이지, 들어온 경로, 머문 시간, 대략적인 지역(국가·도시), 브라우저와 기기 종류를 수집합니다. 이를 위해 Google Analytics 쿠키(_ga로 시작)를 브라우저에 저장해 같은 브라우저의 재방문을 구분합니다. 이름, 이메일 같은 개인을 직접 알아볼 정보는 수집하지 않고, 광고에 쓰지 않습니다. 광고와 회원 가입은 없습니다.", en: "Google Analytics collects the pages you view, where you came from, time on page, approximate location (country and city), and browser and device type. To do this it stores Google Analytics cookies (starting with _ga) in your browser, which tell repeat visits from the same browser apart. Nothing that names you directly, such as a name or email, is collected, and the data is not used for ads. There are no ads and no accounts.", zh: "通过 Google Analytics 收集浏览的页面、来源、停留时间、大致地区（国家、城市）以及浏览器和设备类型。为此会在浏览器中保存 Google Analytics Cookie（以 _ga 开头），用于区分同一浏览器的再次访问。不收集姓名、邮箱等可直接识别个人的信息，也不用于广告。没有广告，也没有账号注册。" }
          : { ko: "하지 않습니다. 분석 도구, 광고, 추적 쿠키가 없고 회원 가입도 없습니다.", en: "None. There are no analytics tools, ads or tracking cookies, and no accounts.", zh: "不做。没有分析工具、广告或跟踪 Cookie，也没有账号注册。" },
      },
      {
        k: { ko: "사이트 설정", en: "Site settings", zh: "站点设置" },
        v: { ko: "야간 모드 선택은 이 브라우저의 localStorage에만 저장합니다. 언어는 주소로 정해지고 따로 저장하지 않습니다. 이 설정에는 쿠키를 쓰지 않고 서버로 보내지 않습니다.", en: "Your night-mode choice is kept only in this browser's localStorage. The language comes from the address and is not stored. No cookie is used for it and nothing is sent to a server.", zh: "夜间模式的选择只保存在本浏览器的 localStorage 中。语言由网址决定，不另行保存。此设置不使用 Cookie，也不发送到服务器。" },
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
      ...(site.gaId
        ? [{
            k: { ko: "Google Analytics", en: "Google Analytics", zh: "Google Analytics" },
            v: { ko: "방문 통계는 Google이 처리하고 Google 서버(국외 포함)에 보관합니다. 접속 IP는 지역을 추정하는 데만 쓰이고 저장되지 않습니다. 보관 기간은 Google Analytics에서 정한 기간(2개월)입니다.", en: "Visit statistics are processed by Google and kept on Google's servers, which may be outside your country. The IP address is used only to estimate location and is not stored. Data is kept for the period set in Google Analytics (2 months).", zh: "访问统计由 Google 处理，并保存在 Google 的服务器上（可能位于境外）。访问 IP 仅用于推测地区，不会被保存。数据按 Google Analytics 中设定的期限（2 个月）保存。" },
          }]
        : []),
    ],
  },
  {
    h: { ko: "선택과 요청", en: "Choices and requests", zh: "选择与请求" },
    items: [
      ...(site.gaId
        ? [{
            k: { ko: "통계 거부", en: "Opting out", zh: "拒绝统计" },
            v: { ko: "브라우저 설정에서 쿠키를 막거나, Google의 Google Analytics 차단 부가기능(tools.google.com/dlpage/gaoptout)을 설치하면 방문 통계에서 빠집니다. 사이트 이용에는 지장이 없습니다.", en: "Block cookies in your browser settings, or install Google's Analytics opt-out add-on (tools.google.com/dlpage/gaoptout), and your visits are left out. The site works the same either way.", zh: "在浏览器设置中阻止 Cookie，或安装 Google 的 Analytics 停用插件（tools.google.com/dlpage/gaoptout），即可不被统计。不影响使用本站。" },
          }]
        : []),
      {
        k: { ko: "지우기", en: "Clearing", zh: "清除" },
        v: site.gaId
          ? { ko: "브라우저에서 이 사이트의 데이터를 지우면 야간 모드 설정과 Google Analytics 쿠키가 함께 사라집니다.", en: "Clearing this site's data in your browser removes the night-mode setting and the Google Analytics cookies.", zh: "在浏览器中清除本站数据后，夜间模式设置和 Google Analytics Cookie 会一并删除。" }
          : { ko: "브라우저에서 이 사이트의 데이터를 지우면 야간 모드 설정이 사라집니다.", en: "Clearing this site's data in your browser removes the night-mode setting.", zh: "在浏览器中清除本站数据后，夜间模式设置会被删除。" },
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
