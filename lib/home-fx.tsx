"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { href, T } from "@/lib/t";
import { useLang } from "@/lib/use-lang";

// A second press within this window opens the package view. It is longer than a usual double click
// so that someone who reads the "once more" guide after the first press still has time to press again.
const SECOND_TAP_MS = 1600;
const SWAP_MS = 4000; // how long the bubble shows each of its two notes

// Home-only extras: a double click (or double tap) on empty space opens the exploded package view at /package.
// The first press on empty space shows a ring and a "press once more" label right there, so the gesture teaches itself;
// moving the mouse brings up a speech bubble above the p-n strip that says what a double click does.
export function HomeFx() {
  const router = useRouter();
  const lang = useLang();
  const [hint, setHint] = useState(false);
  const [line, setLine] = useState(0); // which of the two notes the bubble shows: 0 package schematic, 1 bonding
  // On the home page a toast (bonding count) is shown here, in the note's place, instead of in the layout's slot: that slot
  // is fixed to the window and lands on the p-n strip whenever the window size or the scroll position moves the strip.
  const [msg, setMsg] = useState<{ text: string; id: number } | null>(null);
  useEffect(() => {
    let t = 0;
    const on = (e: Event) => {
      setMsg({ text: (e as CustomEvent<string>).detail, id: Date.now() });
      clearTimeout(t);
      t = window.setTimeout(() => setMsg(null), 2200); // the toast animation's length (globals.css)
    };
    window.addEventListener("cm-toast", on);
    return () => { window.removeEventListener("cm-toast", on); clearTimeout(t); };
  }, []);
  const [tap, setTap] = useState<{ x: number; y: number; k: number } | null>(null);
  const lastTap = useRef(-Infinity); // not 0: a first press within 1.6 s of page load would count as the second

  useEffect(() => {
    let clear = 0;
    // Timed pointerdowns rather than dblclick, which touch browsers do not fire reliably.
    const onTap = (e: PointerEvent) => {
      if (e.button !== 0 || (e.target as HTMLElement).closest("button, a, nav, p, h1, .prefs, .home-mark")) return; // not on text: a double click there selects a word
      const now = performance.now();
      if (now - lastTap.current < SECOND_TAP_MS) { lastTap.current = -Infinity; router.push(href(lang, "/package")); return; }
      lastTap.current = now;
      // Keep the label inside the window near the edges.
      setTap({ x: Math.min(Math.max(e.clientX, 160), innerWidth - 160), y: Math.max(e.clientY, 72), k: now });
      clearTimeout(clear);
      clear = window.setTimeout(() => setTap(null), SECOND_TAP_MS);
    };
    window.addEventListener("pointerdown", onTap);
    return () => { window.removeEventListener("pointerdown", onTap); clearTimeout(clear); };
  }, [router, lang]);

  // Speech bubble right above the p-n junction strip (tail pointing down at the junction): it pops up when the mouse moves and says what a double
  // click on empty space does, then how to bond, swapping every 4 s. It leaves after 8 s of stillness or on a click, key
  // or scroll, and pops up again on the next movement. Touch screens never fire a mouse move; there the first tap's
  // "once more" label does the teaching.
  useEffect(() => {
    let idle = 0;
    const hide = () => { clearTimeout(idle); setHint(false); };
    const show = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setHint(true); // same value while it is up, so moving costs no re-render
      clearTimeout(idle);
      idle = window.setTimeout(() => setHint(false), 2 * SWAP_MS); // long enough to read both notes once
    };
    window.addEventListener("pointermove", show);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("pointerdown", hide);
    window.addEventListener("keydown", hide);
    return () => {
      clearTimeout(idle);
      window.removeEventListener("pointermove", show);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("pointerdown", hide);
      window.removeEventListener("keydown", hide);
    };
  }, []);

  // While the bubble is up its note swaps every 4 s, starting from the package one each time it appears.
  useEffect(() => {
    if (!hint) return;
    setLine(0);
    const id = window.setInterval(() => setLine((l) => 1 - l), SWAP_MS);
    return () => clearInterval(id);
  }, [hint]);

  return (
    <>
      <div className="hint" role="status" data-show={hint}>
        {/* Both notes share one grid cell, so the bubble keeps the wider one's size and the swap is a crossfade. */}
        <span className="hint-bubble">
          <span className="hint-line" data-on={line === 0} aria-hidden={line !== 0}><T ko="두 번 클릭 시 패키지 모식도" en="Double-click for the package schematic" zh="双击查看封装示意图" /></span>
          <span className="hint-line" data-on={line === 1} aria-hidden={line !== 1}><T ko="로고를 꾹 누르면 본딩" en="Hold the logo to bond" zh="长按标志键合" /></span>
        </span>
        {msg && <span key={msg.id} className="toast">{msg.text}</span>}
      </div>
      {tap && (
        <div key={tap.k} className="tap-guide" style={{ left: tap.x, top: tap.y }} aria-hidden="true">
          <span className="tap-ring" />
          <span className="tap-label"><T ko="한 번 더 누르면 패키지 모식도" en="Press once more for the package schematic" zh="再按一次进入封装示意图" /></span>
        </div>
      )}
    </>
  );
}
