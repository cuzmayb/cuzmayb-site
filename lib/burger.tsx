"use client";

import { Link } from "@/lib/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { nav } from "@/lib/site";
import { bare, T, tr } from "@/lib/t";
import { trapTab, useL } from "@/lib/use-lang";

// Narrow screens: a burger (bars turn into an X) opens a drawer with the menu; items slide in one by one.
export function Burger({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  const L = useL();
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      trapTab(e, [btn.current, ...(panel.current?.querySelectorAll("a") ?? [])]);
    };
    addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => { removeEventListener("keydown", esc); document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button ref={btn} type="button" className={`burger ${className}`} aria-label={L({ ko: "메뉴", en: "Menu", zh: "菜单" })} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span /><span /><span />
      </button>
      {mounted && createPortal(
      // Portal to <body>: the header's backdrop-filter would otherwise trap a fixed drawer inside it.
      <div className="drawer" data-open={open} onClick={(e) => e.target === e.currentTarget && setOpen(false)} aria-hidden={!open}>
        <nav ref={panel} className="drawer-panel" aria-label={L({ ko: "주 메뉴", en: "Main menu", zh: "主菜单" })}>
          {nav.map((n, i) => (
            <Link key={n.href} href={n.href} style={{ "--i": i } as React.CSSProperties} tabIndex={open ? 0 : -1}
              aria-current={bare(path).startsWith(n.href) ? "page" : undefined}>
              <T {...tr[n.key]} />
            </Link>
          ))}
        </nav>
      </div>,
      document.body)}
    </>
  );
}
