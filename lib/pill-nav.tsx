"use client";

import { Link } from "@/lib/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";
import { bare, T, tr } from "@/lib/t";
import { useL } from "@/lib/use-lang";

// Insets of the highlighted item inside the group: top, right, bottom, left.
type Puck = { t: number; r: number; b: number; l: number; show: boolean; jump: boolean };

// Pill group with one highlight ("puck") that slides to whatever the pointer or focus is on,
// and settles back on the current page when the pointer leaves. The puck covers the whole group and is cut down to
// one item with clip-path, so moving it never lays anything out again.
export function PillNav({ className }: { className: string }) {
  const path = usePathname();
  const L = useL();
  const ref = useRef<HTMLElement>(null);
  const hovered = useRef<HTMLElement | null>(null);
  const [puck, setPuck] = useState<Puck>({ t: 0, r: 0, b: 0, l: 0, show: false, jump: true });

  const current = () => ref.current?.querySelector<HTMLElement>('[aria-current="page"]') ?? null;
  const box = (el: HTMLElement) => {
    const n = ref.current!;
    return { t: el.offsetTop, r: n.clientWidth - el.offsetLeft - el.offsetWidth, b: n.clientHeight - el.offsetTop - el.offsetHeight, l: el.offsetLeft };
  };
  const moveTo = (el: HTMLElement | null) =>
    setPuck((p) => (el ? { ...box(el), show: true, jump: !p.show } : { ...p, show: false, jump: true }));

  // Rest on the current page on load and after navigation, without sliding in from nowhere.
  useLayoutEffect(() => moveTo(current()), [path]);
  // Labels change size with language, fonts and late CSS; re-measure in place (no slide) whenever a link resizes,
  // keeping whatever the pointer is on rather than snapping back to the current page.
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const el = hovered.current ?? current();
      setPuck(el ? { ...box(el), show: true, jump: true } : (p) => p);
    });
    if (ref.current) ro.observe(ref.current); // the group itself: wrapping moves the items without resizing them
    ref.current?.querySelectorAll("a").forEach((a) => ro.observe(a));
    return () => ro.disconnect();
  }, []);

  return (
    <nav ref={ref} className={className} aria-label={L({ ko: "주 메뉴", en: "Main menu", zh: "主菜单" })} onPointerLeave={() => { hovered.current = null; moveTo(current()); }}>
      <span className="puck" aria-hidden="true" data-show={puck.show} data-jump={puck.jump}
        style={{ clipPath: `inset(${puck.t}px ${puck.r}px ${puck.b}px ${puck.l}px round 999px)` }} />
      {nav.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          aria-current={bare(path).startsWith(n.href) ? "page" : undefined}
          onPointerEnter={(e) => { hovered.current = e.currentTarget; moveTo(e.currentTarget); }}
          onFocus={(e) => { hovered.current = e.currentTarget; moveTo(e.currentTarget); }}
          onBlur={() => { hovered.current = null; moveTo(current()); }}
        >
          <T {...tr[n.key]} />
        </Link>
      ))}
    </nav>
  );
}
