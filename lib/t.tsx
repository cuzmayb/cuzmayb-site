// Three-language text. `T` (lib/t-view.tsx) shows the one for the page's language.
export const LANGS = ["ko", "en", "zh"] as const;
export type Lang = (typeof LANGS)[number];
export type Tr = Record<Lang, string>;
export const LANG_TAG: Record<Lang, string> = { ko: "ko", en: "en", zh: "zh-CN" }; // for <html lang> and hreflang
export { T } from "@/lib/t-view";

// Address of a page in a language: Korean has no prefix, the others live under /en and /zh.
export const href = (lang: Lang, path: string) => (lang === "ko" || !path.startsWith("/") ? path : `/${lang}${path === "/" ? "" : path}`);
// The address without its language prefix, for comparing against "/blog" and the like.
export const bare = (path: string) => path.replace(/^\/(ko|en|zh)(?=\/|$)/, "") || "/";

export const tr = {
  projects: { ko: "프로젝트", en: "Projects", zh: "项目" },
  blog: { ko: "블로그", en: "Blog", zh: "博客" },
  concepts: { ko: "개념", en: "Concepts", zh: "概念" },
  about: { ko: "소개", en: "About", zh: "关于" },
  guestbook: { ko: "방명록", en: "Guestbook", zh: "留言板" },
  resume: { ko: "이력서", en: "Resume", zh: "简历" },
  guestbookLede: { ko: "지나가다 그림 한 장 남겨 주세요. 그림은 이 브라우저에만 저장되고, PNG로 내려받을 수 있습니다.", en: "Doodle something on your way. It stays in this browser, and you can save it as a PNG.", zh: "路过请画一幅画。画作只保存在本浏览器中，可下载为 PNG。" },
  guestbookSoon: { ko: "글로 남기는 방명록(GitHub 계정)은 준비하고 있습니다.", en: "A written guestbook (GitHub sign-in) is on its way.", zh: "文字留言板（GitHub 账号）正在准备中。" },
  related: { ko: "관련 기록", en: "Related", zh: "相关记录" },
  kindProject: { ko: "프로젝트", en: "Project", zh: "项目" },
  kindPost: { ko: "글", en: "Post", zh: "文章" },
  backProjects: { ko: "프로젝트 목록", en: "All projects", zh: "项目列表" },
  backConcepts: { ko: "개념 목록", en: "All concepts", zh: "概念列表" },
  backBlog: { ko: "블로그 목록", en: "All posts", zh: "博客列表" },
  minRead: { ko: "분 읽기", en: " min read", zh: " 分钟阅读" },
  koreanOnly: { ko: "", en: "This page is written in Korean.", zh: "本页正文仅提供韩文。" },
  notFound: { ko: "없는 페이지입니다", en: "Page not found", zh: "页面不存在" },
  notFoundLede: { ko: "주소가 바뀌었거나 아직 쓰지 않은 글입니다.", en: "The address changed, or it hasn't been written yet.", zh: "地址已更改，或尚未撰写。" },
} satisfies Record<string, Tr>;

// "2026-11-18" -> 2026년 11월 18일 / Nov 18, 2026 / 2026年11月18日
export function dateTr(d: string): Tr {
  const [y, m, day] = d.split("-").map(Number);
  const en = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  return { ko: `${y}년 ${m}월 ${day}일`, en: `${en} ${day}, ${y}`, zh: `${y}年${m}月${day}日` };
}

// Blog keywords stay Korean in frontmatter (they are the filter key); this only translates the label.
const KW: Record<string, Tr> = {
  "박막 공정": { ko: "박막 공정", en: "Thin-film process", zh: "薄膜工艺" },
  "반도체 소자": { ko: "반도체 소자", en: "Semiconductor devices", zh: "半导体器件" },
  "3D 공모전": { ko: "3D 공모전", en: "3D design contest", zh: "3D 设计竞赛" },
};
export const kw = (k: string): Tr => KW[k] ?? { ko: k, en: k, zh: k };
