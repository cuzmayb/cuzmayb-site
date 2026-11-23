"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bare, href, LANG_TAG, type Lang } from "@/lib/t";
import { useL, useLang } from "@/lib/use-lang";

const LANGS: { v: Lang; label: string; name: string }[] = [
  { v: "ko", label: "KO", name: "한국어" },
  { v: "en", label: "EN", name: "English" },
  { v: "zh", label: "中", name: "中文" },
];

function save(k: string, v: string) {
  try { localStorage.setItem(k, v); } catch {}
}

// Language and night-mode switches. The language is the address: each button is a plain link to this page in that
// language (a full load, since the whole document changes language). Night mode lives on <html data-theme>.
export function Prefs({ inline = false }: { inline?: boolean }) {
  const lang = useLang();
  const path = bare(usePathname());
  const [dark, setDark] = useState(false);
  const L = useL();

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const flipTheme = () => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    save("theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <div className={inline ? "prefs prefs-inline" : "prefs"}>
      <div className="langs" role="group" aria-label={L({ ko: "언어", en: "Language", zh: "语言" })}>
        {LANGS.map((l) => (
          <a key={l.v} href={href(l.v, path)} hrefLang={LANG_TAG[l.v]} lang={LANG_TAG[l.v]} data-v={l.v} aria-current={lang === l.v ? "true" : undefined} aria-label={`${l.label} ${l.name}`}>
            {l.label}
          </a>
        ))}
      </div>
      <button type="button" className="theme" aria-pressed={dark} aria-label={L({ ko: "야간 모드", en: "Night mode", zh: "夜间模式" })} onClick={flipTheme}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <g className="sun">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </g>
          <path className="moon" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
      </button>
    </div>
  );
}
