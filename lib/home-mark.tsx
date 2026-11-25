"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IntroVideo } from "@/lib/intro-video";
import { Mark } from "@/lib/mark";
import { site, youtubeEmbed } from "@/lib/site";
import { href, T } from "@/lib/t";
import { toast } from "@/lib/toast";
import { useL, useLang } from "@/lib/use-lang";

const HOLD_MS = 1333; // press and hold: heat + pressure + time = thermocompression bond
const SLOP = 6; // px of movement that cancels a press (no tap, no bond)
const FULL_STACK = 16; // bonds that finish the stack and open the package view
const ENTER_MS = 900; // pause after the last bond, so its pulse and toast are seen before the page changes

// A local file plays as-is; anything else is treated as a YouTube link.
const VIDEO = site.introVideo ? (/\.(mp4|webm)$/i.test(site.introVideo) ? site.introVideo : youtubeEmbed(site.introVideo)) : null;

export function HomeMark() {
  const [video, setVideo] = useState(false);
  const L = useL();
  const router = useRouter();
  const lang = useLang();
  const enter = useRef(0);
  useEffect(() => () => clearTimeout(enter.current), []);
  const [replay, setReplay] = useState(0);
  const [holding, setHolding] = useState(false); // the hold ring is filling
  const [pulse, setPulse] = useState(0);
  const press = useRef<{ x: number; y: number; t: number; drag: boolean; timer: number; done: boolean } | null>(null);

  const stopHold = () => {
    if (press.current) clearTimeout(press.current.timer);
    setHolding(false);
  };

  // Layers bonded on this visit only: lives in memory, so every visitor starts from 0 and a reload resets it.
  const layers = useRef(0);

  const bond = () => {
    const n = (layers.current = (layers.current % FULL_STACK) + 1); // after 16 a new stack starts at 1
    setReplay((r) => r + 1);
    setPulse((p) => p + 1);
    const done = n === 12 ? "HBM3E" : n === FULL_STACK ? "HBM4" : null;
    // The sixteenth bond completes the stack and opens the package it belongs to.
    if (n === FULL_STACK) enter.current = window.setTimeout(() => router.push(href(lang, "/package")), ENTER_MS);
    toast(
      done
        ? { ko: `${n}단 적층 · ${done} 완성`, en: `${n}-high stack · ${done} complete`, zh: `${n} 层堆叠 · ${done} 完成` }
        : { ko: `열압착 본딩 · ${n}단`, en: `Thermocompression bond · layer ${n}`, zh: `热压键合 · 第 ${n} 层` },
    );
  };

  // A double click on empty space (HomeFx) bonds too.
  useEffect(() => {
    const on = () => bond();
    window.addEventListener("cm-bond", on);
    return () => window.removeEventListener("cm-bond", on);
  });

  const onDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {} // release outside the logo still ends the press
    start(e.clientX, e.clientY);
  };

  // Shared by pointer and keyboard: holding Enter or Space bonds exactly like holding the pointer down.
  const start = (x: number, y: number) => {
    const p = { x, y, t: performance.now(), drag: false, timer: 0, done: false };
    press.current = p;
    // The timer decides when the bond happens; animation frames only draw the ring.
    p.timer = window.setTimeout(() => {
      p.done = true;
      setHolding(false);
      bond();
    }, HOLD_MS);
    setHolding(true); // the ring fills by a CSS animation: no re-render per frame
  };

  const onMove = (e: React.PointerEvent) => {
    const p = press.current;
    if (!p || p.done) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (!p.drag && Math.hypot(dx, dy) > SLOP) {
      p.drag = true;
      stopHold();
    }
  };

  const onUp = () => {
    const p = press.current;
    if (!p) return;
    stopHold(); // before clearing press: stopHold cancels the timer stored on it
    press.current = null;
    // A tap opens the intro video (or re-stacks the logo when no video is set).
    if (!p.drag && !p.done && performance.now() - p.t < 400) (VIDEO ? setVideo(true) : setReplay((r) => r + 1));
  };

  return (
    <>
    <button
      type="button"
      className="home-mark"
      aria-label={L({ ko: "로고: 길게 눌러 본딩", en: "Logo: press and hold to bond", zh: "标志：长按键合" })}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!e.repeat && !press.current) start(0, 0); } }}
      onKeyUp={(e) => (e.key === "Enter" || e.key === " ") && onUp()}
      onBlur={onUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <span className="home-mark-body" key={pulse} data-pulse={pulse > 0}>
        <Mark size={148} replay={replay} />
      </span>
      <svg className="hold-ring" viewBox="0 0 120 120" aria-hidden="true" data-on={holding} style={{ "--hold": `${HOLD_MS}ms` } as React.CSSProperties}>
        <circle cx="60" cy="60" r="56" pathLength={1} />
      </svg>
    </button>
    {video && VIDEO && <IntroVideo src={VIDEO} onClose={() => setVideo(false)} />}
    </>
  );
}
