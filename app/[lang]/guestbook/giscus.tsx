"use client";

import { useEffect, useRef } from "react";

// Loads the giscus widget (https://giscus.app). One fixed discussion holds the guestbook.
export function Giscus(p: { repo: string; repoId: string; category: string; categoryId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const s = document.createElement("script");
    const attrs: Record<string, string> = {
      "data-repo": p.repo,
      "data-repo-id": p.repoId,
      "data-category": p.category,
      "data-category-id": p.categoryId,
      "data-mapping": "specific",
      "data-term": "guestbook",
      "data-reactions-enabled": "1",
      "data-input-position": "top",
      "data-theme": document.documentElement.dataset.theme === "dark" ? "dark" : "light",
      "data-lang": { ko: "ko", en: "en", zh: "zh-CN" }[document.documentElement.dataset.lang ?? "ko"] ?? "ko",
    };
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    ref.current?.replaceChildren(s);
  }, [p.repo, p.repoId, p.category, p.categoryId]);
  return <div ref={ref} />;
}
