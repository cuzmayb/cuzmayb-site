"use client";

import { useEffect, useRef, useState } from "react";
import { T, type Tr } from "@/lib/t";
import { toast } from "@/lib/toast";
import { useL } from "@/lib/use-lang";

// Guestbook doodle pad. Pointer events cover mouse, pen and touch; pen pressure widens the stroke.
// ponytail: drawings stay in this browser only (localStorage); shared wall needs a backend.
const INKS: { c: string; name: Tr }[] = [
  { c: "#13213c", name: { ko: "남색", en: "Navy", zh: "深蓝" } },
  { c: "#c8102e", name: { ko: "빨강", en: "Red", zh: "红色" } },
  { c: "#5b6478", name: { ko: "회색", en: "Grey", zh: "灰色" } },
];
const KEY = "guestbook-doodle-v2"; // v2: points are fractions of the sheet (0..1), so a drawing fits any screen

export function DrawPad() {
  const L = useL();
  const cv = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<{ ink: string; pts: [number, number, number][] }[]>([]);
  const [ink, setInk] = useState(INKS[0].c);
  const [count, setCount] = useState(0);

  const paint = () => {
    const c = cv.current!;
    const g = c.getContext("2d")!;
    const k = c.width / 728; // line weight follows the sheet: 728 CSS px is the desktop width
    g.fillStyle = "#fff"; // white paper is part of the picture, so the saved PNG is not transparent
    g.fillRect(0, 0, c.width, c.height);
    g.lineCap = g.lineJoin = "round";
    for (const s of strokes.current) {
      g.strokeStyle = g.fillStyle = s.ink;
      const w = (p: number) => (1.5 + p * 4) * k;
      const [x, y, p] = s.pts[0];
      if (s.pts.length === 1) { g.beginPath(); g.arc(x * c.width, y * c.height, w(p) / 2, 0, Math.PI * 2); g.fill(); } // a tap is a dot
      for (let i = 1; i < s.pts.length; i++) {
        const [x0, y0] = s.pts[i - 1], [x1, y1, p1] = s.pts[i];
        g.lineWidth = w(p1);
        g.beginPath(); g.moveTo(x0 * c.width, y0 * c.height); g.lineTo(x1 * c.width, y1 * c.height); g.stroke();
      }
    }
  };

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(strokes.current)); } catch {} };

  useEffect(() => {
    const c = cv.current!;
    const fit = () => {
      const r = c.getBoundingClientRect();
      c.width = r.width * devicePixelRatio; c.height = r.height * devicePixelRatio;
      paint();
    };
    try { strokes.current = JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch {}
    setCount(strokes.current.length);
    fit();
    const ro = new ResizeObserver(fit); ro.observe(c);
    return () => ro.disconnect();
  }, []);

  const at = (e: React.PointerEvent): [number, number, number] => {
    const r = cv.current!.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, e.pressure || 0.5];
  };

  const down = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    cv.current!.setPointerCapture(e.pointerId);
    strokes.current.push({ ink, pts: [at(e)] });
    paint();
  };
  const move = (e: React.PointerEvent) => {
    if (!cv.current!.hasPointerCapture(e.pointerId)) return;
    strokes.current.at(-1)!.pts.push(at(e));
    paint();
  };
  const up = () => { setCount(strokes.current.length); save(); };

  const undo = () => { strokes.current.pop(); setCount(strokes.current.length); paint(); save(); };
  const clear = () => { strokes.current = []; setCount(0); paint(); save(); };
  const download = () => {
    const a = document.createElement("a");
    a.href = cv.current!.toDataURL("image/png");
    a.download = "cuzmayb-guestbook.png";
    a.click();
    toast({ ko: "그림을 저장했습니다", en: "Drawing saved", zh: "已保存画作" });
  };

  return (
    <div className="pad">
      <canvas ref={cv} className="pad-canvas" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        aria-label={L({ ko: "그림판", en: "Drawing pad", zh: "画板" })} data-empty={count === 0} />
      {count === 0 && <p className="pad-hint" aria-hidden="true"><T ko="여기에 그려 보세요" en="Draw something here" zh="在这里画点什么" /></p>}
      <div className="pad-bar">
        <div className="pad-inks" role="radiogroup" aria-label={L({ ko: "잉크", en: "Ink", zh: "墨水" })}>
          {INKS.map((i) => (
            <button key={i.c} type="button" role="radio" aria-checked={ink === i.c} aria-label={L(i.name)} style={{ background: i.c }} onClick={() => setInk(i.c)} />
          ))}
        </div>
        <button type="button" onClick={undo} disabled={!count}><T ko="되돌리기" en="Undo" zh="撤销" /></button>
        <button type="button" onClick={clear} disabled={!count}><T ko="지우기" en="Clear" zh="清除" /></button>
        <button type="button" onClick={download} disabled={!count}><T ko="PNG 저장" en="Save PNG" zh="保存 PNG" /></button>
      </div>
    </div>
  );
}
