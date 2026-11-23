"use client";

import { useEffect, useRef, useState } from "react";
import { T, type Tr } from "@/lib/t";
import { toast } from "@/lib/toast";
import { trapTab, useL, useLang } from "@/lib/use-lang";

type Toc = { id: string; text: string }[];
type Lang = "ko" | "en" | "zh";

const COPY: Tr = { ko: "복사", en: "Copy", zh: "复制" };

async function copy(text: string, done: Tr) {
  try {
    await navigator.clipboard.writeText(text);
    toast(done);
  } catch {
    toast({ ko: "복사하지 못했어요", en: "Could not copy", zh: "复制失败" });
  }
}

// Copy menu: URL or the post as Markdown.
export function CopyMenu({ title, raw }: { title: string; raw: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    addEventListener("pointerdown", close);
    addEventListener("keydown", close);
    return () => { removeEventListener("pointerdown", close); removeEventListener("keydown", close); };
  }, [open]);
  return (
    <div className="copymenu" ref={ref}>
      <button type="button" className="copymenu-trigger" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((o) => !o)}>
        <T {...COPY} /> <span className="chev" aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="copymenu-list" role="menu">
          <button role="menuitem" type="button" onClick={() => { setOpen(false); copy(location.href, { ko: "링크를 복사했어요", en: "Link copied", zh: "已复制链接" }); }}>
            <span aria-hidden="true">↗</span> <T ko="URL 복사" en="Copy URL" zh="复制链接" />
          </button>
          <button role="menuitem" type="button" onClick={() => { setOpen(false); copy(`# ${title}\n\n${raw}`, { ko: "Markdown을 복사했어요", en: "Markdown copied", zh: "已复制 Markdown" }); }}>
            <span aria-hidden="true">M↓</span> <T ko="Markdown 복사" en="Copy Markdown" zh="复制 Markdown" />
          </button>
        </div>
      )}
    </div>
  );
}

// Thin reading-progress bar, the section in view for the side TOC, code copy buttons, image lightbox.
export function ArticleEnhance({ tocs }: { tocs: Record<Lang, Toc> }) {
  const lang = useLang();
  const L = useL();
  const toc = tocs[lang];
  const bar = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  // progress: scaleX of a fixed bar, written straight to the DOM (no re-render per scroll frame)
  useEffect(() => {
    // Project pages: the section pill counts as stuck once the block above it has scrolled past the line it sticks to
    // (84px, under the header). Only then may it ride up when the header hides (.pj-nav in globals.css).
    const nav = document.querySelector<HTMLElement>(".pj-nav");
    const on = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty("--p", String(max > 0 ? Math.min(1, scrollY / max) : 0));
      const above = nav?.previousElementSibling;
      if (nav && above) nav.dataset.stuck = String(above.getBoundingClientRect().bottom + 56 <= 84); // 56 = the gap under that block
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);

  // active section: the last heading that has passed 30% of the viewport, marked on the side TOC (blog posts)
  useEffect(() => {
    if (!toc.length) return;
    const on = () => {
      let cur = toc[0].id;
      for (const t of toc) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.3) cur = t.id;
      }
      document.querySelectorAll<HTMLAnchorElement>(".toc-side a").forEach((a) => (a.dataset.active = String(a.hash === `#${cur}`)));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, [toc]);

  // In-page links (TOC) scroll without adding history entries, so Back leaves the page instead of
  // walking back through sections.
  useEffect(() => {
    const on = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      history.replaceState(history.state, "", a.hash);
    };
    document.addEventListener("click", on);
    return () => document.removeEventListener("click", on);
  }, []);

  // code copy buttons + zoomable images inside the article
  useEffect(() => {
    const art = document.querySelector("article");
    if (!art) return;
    const added: HTMLElement[] = [];
    art.querySelectorAll("pre").forEach((pre) => {
      const code = pre.textContent ?? ""; // read before the button is added, so its label never joins the copy
      const b = document.createElement("button");
      b.type = "button";
      b.className = "code-copy";
      b.innerHTML = `<span class="l-ko">${COPY.ko}</span><span class="l-en" lang="en">${COPY.en}</span><span class="l-zh" lang="zh">${COPY.zh}</span>`;
      b.onclick = () => copy(code.trim(), { ko: "코드를 복사했어요", en: "Code copied", zh: "已复制代码" });
      pre.append(b);
      added.push(b);
    });
    const onImg = (e: Event) => {
      const img = (e.target as HTMLElement).closest<HTMLImageElement>(".fig img, .prose img");
      if (img) setZoom({ src: img.currentSrc || img.src, alt: img.alt });
    };
    art.addEventListener("click", onImg);
    return () => { added.forEach((b) => b.remove()); art.removeEventListener("click", onImg); };
  }, []);

  // Lightbox: focus moves to the close button, Tab stays on it, Esc closes, focus returns where it was.
  useEffect(() => {
    if (!zoom) return;
    const before = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
      trapTab(e, [closeBtn.current]);
    };
    addEventListener("keydown", key);
    return () => { removeEventListener("keydown", key); before?.focus?.(); };
  }, [zoom]);

  return (
    <>
      <div ref={bar} className="progress" aria-hidden="true" />
      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={zoom.alt || L({ ko: "이미지 확대", en: "Enlarged image", zh: "放大图片" })} onClick={() => setZoom(null)}>
          <img src={zoom.src} alt={zoom.alt} />
          {zoom.alt && <p>{zoom.alt}</p>}
          <button ref={closeBtn} type="button" className="lightbox-close" aria-label={L({ ko: "닫기", en: "Close", zh: "关闭" })}>×</button>
        </div>
      )}
    </>
  );
}
