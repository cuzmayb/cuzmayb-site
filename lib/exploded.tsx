"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { LEVELS, type LevelId, type Part } from "@/lib/pkg";
import { T } from "@/lib/t";

const FOOT = 320; // px of the widest footprint
const COL_TALL = 110; // px of the GPU and of each HBM, so stacks of equal real height look equal
const AWAY = 150; // px the plates above and below move off by
const STEP = FOOT * 1.12; // px between neighbours once those plates sit side by side
const STUB = 60; // px a power line shows under the interposer
// The sheet every part ends on, laid flat: three rows front to back, px before scaling.
const SHEET = { w: 1500, d: 1180, rowZ: 420, big: 350, mid: 160, cell: 66, cellZ: 70 };
const LOOK = { pitch: 40, yaw: 38 }; // how far the view tips over and squares up as the sheet forms

// Thickness spans 0.2 µm to 3 mm, so heights are drawn on a log scale.
// Kept low so parts read as plates, the way a real package is far wider than it is tall.
const tall = (um: number) => 2 + 7 * Math.log10(um + 1);
const r2 = (v: number) => Math.round(v * 100) / 100; // so server-rendered style strings match the client's exactly
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

type Line = { key: string; kind: "sig" | "pwr"; w: number; d: number; h: number; x: number; y: number; z: number };

// `t` runs 0..1. First half (a): GPU, HBMs and interposer stay together while the plates over them rise and line up side
// by side above, and the plates under them drop and line up side by side below. Second half (b): every part comes apart
// and settles on one flat sheet, in rows, while the view tips over to look down on it.
function layout(id: LevelId, t: number, stage: { w: number; h: number }) {
  const { parts, routes = [] } = LEVELS[id];
  const all = parts.flatMap((p) => p.boxes.map((b) => ({ p, b, col: b.col ?? "_" })));
  const cols = [...new Set(all.map((x) => x.col))].filter((c) => c !== "_");
  const a = clamp(t / 0.5), b = clamp((t - 0.5) / 0.5);
  const k = FOOT / Math.max(...parts.flatMap((p) => p.boxes.map((bx) => Math.abs(bx.x ?? 0) * 2 + (bx.w ?? p.w))), ...parts.map((p) => p.d));

  // Shared plates. The top one (the interposer) sits at y 0; the ones under it are stacked below it when closed.
  const under = all.filter((x) => x.col === "_" && !x.b.above && !x.b.wrap);
  const m = Math.max(...under.map((x) => x.b.layer)) + 1;
  const hs = Array.from({ length: m }, (_, i) => Math.max(0, ...under.filter((x) => x.b.layer === i).map((x) => tall(x.b.t))));
  const closed: number[] = [];
  closed[m - 1] = 0;
  for (let i = m - 2; i >= 0; i--) closed[i] = closed[i + 1] - hs[i];
  const base: Record<string, number[]> = { _: closed.map((y, i) => (i === m - 1 ? 0 : mix(y, -AWAY - hs[i], a))) };
  const hgt: Record<string, number[]> = { _: hs }, fac: Record<string, number> = { _: 1 };

  // The GPU and the HBMs, straight on the interposer.
  const lift = hs[m - 1];
  for (const c of cols) {
    const mine = all.filter((x) => x.col === c);
    const n = Math.max(...mine.map((x) => x.b.layer)) + 1;
    const raw = Array.from({ length: n }, (_, i) => Math.max(0, ...mine.filter((x) => x.b.layer === i).map((x) => tall(x.b.t))));
    const f = COL_TALL / raw.reduce((s, h) => s + h, 0);
    let y = lift;
    base[c] = raw.map((h) => { const y0 = y; y += h * f; return y0; });
    hgt[c] = raw.map((h) => h * f); fac[c] = f;
  }
  const coreTop = lift + COL_TALL;

  // Plates over the stacks: stacked in order when closed, all at one height once away.
  const over = all.filter((x) => x.b.above).sort((p, q) => p.b.above! - q.b.above!);
  const overClosed = new Map<object, number>();
  let oy = coreTop;
  for (const x of over) { overClosed.set(x.b, oy); oy += tall(x.b.t); }
  const rowTop = coreTop + AWAY;
  const yMin = Math.min(...base._), yMax = Math.max(coreTop, mix(oy, rowTop + Math.max(0, ...over.map((x) => tall(x.b.t)), COL_TALL), a));

  const hbm = cols.filter((c) => c !== "g");
  const boxes = all.map(({ p, b: bx, col }, i) => {
    const lh = bx.wrap ? COL_TALL : bx.above ? tall(bx.t) : hgt[col][bx.layer];
    const h = bx.wrap || p.tone === "mold" ? lh : tall(bx.t) * (bx.above ? 1 : fac[col]);
    const y = bx.wrap ? mix(lift, rowTop, a) : bx.above ? mix(overClosed.get(bx)!, rowTop, a) : base[col][bx.layer] + (bx.float ? (lh - h) / 2 : 0);
    // Where a plate that moves away sits in its row: the mold shell, then the plates above in order; below, in stack order.
    const slot = !p.far ? 0 : bx.wrap ? -1 : bx.above ? bx.above - 1 : bx.layer - (m - 2) / 2;
    // Its place on the sheet. Back row: what was above. Front row: what was below, interposer last. Middle row: the
    // GPU's layers, then one line per HBM running bumps, base die, DRAM dies.
    const top = bx.wrap || !!bx.above, low = col === "_" && !top;
    const gx = top ? slot * SHEET.big : low ? (bx.layer - (m - 1) / 2) * SHEET.big : col === "g" ? -640 + bx.layer * SHEET.mid : -170 + bx.layer * SHEET.cell;
    const gz = top ? -SHEET.rowZ : low ? SHEET.rowZ : col === "g" ? 0 : (hbm.indexOf(col) - (hbm.length - 1) / 2) * SHEET.cellZ;
    return { key: p.id + i, part: p, col, w: r2((bx.w ?? p.w) * k), d: r2((bx.d ?? p.d) * k), h: r2(h), x: r2(mix((bx.x ?? 0) * k + slot * STEP * a, gx, b)), z: r2(mix((bx.z ?? 0) * k, gz, b)), y: r2(mix(y, 0, b)) };
  });

  // The view frames the package while it parts, then the whole sheet seen from above.
  const tip = ((24 + LOOK.pitch) * Math.PI) / 180;
  const fitAll = Math.min(1.5, stage.w / ((FOOT + 2 * STEP * a) * 1.25), stage.h / ((yMax - yMin) * 0.95 + FOOT * 0.45 + 40));
  const fitSheet = Math.min(1.5, stage.w / SHEET.w, stage.h / (SHEET.d * Math.sin(tip) + 260));
  const scale = mix(fitAll, fitSheet, b), mid = mix((yMin + yMax) / 2, 0, b);

  // Layer -1 is a point just under the interposer, where a power line comes in from.
  const bot = (c: string, l: number) => (l < 0 ? -STUB : base[c][l]);
  const top = (c: string, l: number) => (l < 0 ? -STUB : base[c][l] + hgt[c][l]);
  const th = 2.4 / scale; // line thickness, constant on screen
  const lines: Line[] = [];
  // The paths belong to the assembled package: once it starts coming apart they are gone.
  if (b < 0.02) routes.forEach((r, ri) => {
    const at = r.pts.map((pt) => ({ x: pt.x * k, z: pt.z * k, col: pt.col ?? "_", layer: pt.layer }));
    const add = (i: number, s: string, l: Omit<Line, "key" | "kind">) =>
      lines.push({ key: `${r.kind}${ri}-${i}${s}`, kind: r.kind, w: r2(l.w), d: r2(l.d), h: r2(l.h), x: r2(l.x), y: r2(l.y), z: r2(l.z) });
    for (let i = 0; i < at.length - 1; i++) {
      const p = at[i], q = at[i + 1];
      if (p.col !== q.col || p.layer !== q.layer) {
        // Vertical: from the top of the lower point's layer to the bottom of the upper one's.
        const [lo, hi] = bot(p.col, p.layer) <= bot(q.col, q.layer) ? [p, q] : [q, p];
        const y0 = top(lo.col, lo.layer), y1 = bot(hi.col, hi.layer);
        if (y1 - y0 > 0.5) add(i, "v", { w: th, d: th, h: y1 - y0, x: p.x, y: y0, z: p.z });
      } else {
        const yy = top(p.col, p.layer);
        add(i, "x", { w: Math.abs(q.x - p.x) + th, d: th, h: th, x: (p.x + q.x) / 2, y: yy, z: p.z });
        if (Math.abs(q.z - p.z) > 0.5) add(i, "z", { w: th, d: Math.abs(q.z - p.z) + th, h: th, x: q.x, y: yy, z: (p.z + q.z) / 2 });
      }
    }
  });
  // The floor sits a little under the lowest part, and right under everything once the sheet is laid out.
  return { boxes, lines, mid: r2(mid), scale: r2(scale), look: b, opened: b > 0.04, floor: r2(mix(yMin - 24, -3, b)) };
}

const faces = <><i className="xt" /><i className="xf" /><i className="xk" /><i className="xr" /><i className="xl" /></>;
// While the GPU and the HBMs are closed each counts as one thing; once open, their layers are told apart.
const whole = (src: "gpu" | "hbm") => LEVELS.pkg.parts.find((x) => x.id === src)!;
const WHOLE: Record<string, Part> = { "@g": whole("gpu"), "@h": whole("hbm") };
const LV: LevelId = "all";

export function Exploded() {
  const [hov, setHov] = useState<string | null>(null);
  const [t, setT] = useState(0);
  const rot = useRef({ yaw: -38, pitch: 24 }); // turning writes straight to the scene: no re-render per pointer move
  const view = useRef({ scale: 1, mid: 0, look: 0 });
  const scene = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ w: 640, h: 480 }); // of the stage; the drawing is scaled to fit it
  const [show, setShow] = useState({ sig: true, pwr: false });
  // True while the spread is being dragged (parts follow at once, no easing) and until the stage has been measured,
  // so the first fit to the real size is a cut and the opening that follows is the only move on arrival.
  const [live, setLive] = useState(true);
  const calm = useRef(0);
  const stage = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLDivElement>(null);

  const { boxes, lines, mid, scale, look, opened, floor } = useMemo(() => layout(LV, t, size), [t, size]);
  view.current = { scale, mid, look };
  const pose = () => `scale(${view.current.scale}) rotateX(${-Math.min(86, rot.current.pitch + LOOK.pitch * view.current.look)}deg) rotateY(${r2(rot.current.yaw + LOOK.yaw * view.current.look)}deg) translateY(${view.current.mid}px)`;
  const turn = (dyaw: number, dpitch: number) => {
    rot.current = { yaw: rot.current.yaw + dyaw, pitch: Math.min(80, Math.max(8, rot.current.pitch + dpitch)) };
    if (scene.current) scene.current.style.transform = pose();
  };
  const unit = (p: Part, col: string) => (opened || col === "_" ? p.id : col === "g" ? "@g" : "@h");
  const told = hov ? (WHOLE[hov] ?? LEVELS[LV].parts.find((p) => p.id === hov)) : null;
  const last = useRef(told); // the note keeps its text while it fades out
  if (told) last.current = told;

  const spread = (v: number | ((old: number) => number)) => {
    setLive(true); setT(v);
    clearTimeout(calm.current);
    calm.current = window.setTimeout(() => setLive(false), 200);
  };

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    // Parts the package once when it first comes into view: far enough to see where the signal runs.
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setT(0.5); io.disconnect(); } }, { threshold: 0.5 });
    let measured = false, armed = 0;
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width), h = Math.round(e.contentRect.height);
      setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
      if (measured) return;
      measured = true;
      // Two frames later the fitted size is on screen: turn easing on, then let the opening start.
      armed = requestAnimationFrame(() => { armed = requestAnimationFrame(() => { setLive(false); io.observe(el); }); });
    });
    ro.observe(el);
    // The wheel spreads and closes in. Only where the page itself does not scroll (the wide layout).
    // Wheel events arrive several to a frame; they are summed and applied once per frame.
    let sum = 0, raf = 0;
    const wheel = (e: WheelEvent) => {
      if (document.documentElement.scrollHeight > window.innerHeight + 1) return;
      e.preventDefault();
      sum += e.deltaY;
      raf ||= requestAnimationFrame(() => { const d = sum; sum = 0; raf = 0; spread((v) => clamp(v - d * 0.0012)); });
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => { io.disconnect(); ro.disconnect(); el.removeEventListener("wheel", wheel); cancelAnimationFrame(raf); cancelAnimationFrame(armed); clearTimeout(calm.current); };
  }, []);

  // The note follows the pointer; moved straight on the element so hovering costs no re-render.
  const follow = (e: React.PointerEvent) => {
    const el = tip.current, box = stage.current?.getBoundingClientRect();
    if (!el || !box) return;
    const x = Math.min(e.clientX - box.left + 16, box.width - el.offsetWidth - 8), y = Math.min(e.clientY - box.top + 16, box.height - el.offsetHeight - 8);
    el.style.transform = `translate(${Math.max(8, x)}px, ${Math.max(8, y)}px)`;
  };
  const onDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    let px = e.clientX, py = e.clientY, moved = false;
    const touch = e.pointerType === "touch"; // touch keeps vertical drags for scrolling the page
    const move = (m: PointerEvent) => {
      const dx = m.clientX - px, dy = m.clientY - py;
      if (!moved && Math.abs(dx) + Math.abs(dy) < 4) return;
      if (!moved) { moved = true; setDragging(true); }
      px = m.clientX; py = m.clientY;
      turn(dx * 0.4, touch ? 0 : dy * 0.3);
    };
    const up = () => { setDragging(false); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return; // arrow keys on the slider belong to the slider
    const d = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, 6], ArrowDown: [0, -6] }[e.key];
    if (!d) return;
    e.preventDefault();
    turn(d[0], d[1]);
  };
  const place = (b: { w: number; d: number; h: number; x: number; y: number; z: number }) =>
    ({ "--w": `${b.w}px`, "--d": `${b.d}px`, "--h": `${b.h}px`, transform: `translate3d(${b.x}px, ${-b.y}px, ${b.z}px)` }) as CSSProperties;
  const hush = (e: React.PointerEvent) => e.stopPropagation(); // the controls must not turn the view

  return (
    <section className="xv" aria-labelledby="xv-h">
      <h1 id="xv-h"><T ko="GPU-HBM 패키지 분해도" en="GPU-HBM package, exploded view" zh="GPU-HBM 封装分解图" /></h1>
      <div
        ref={stage} className="xv-stage" data-drag={dragging} data-live={live} tabIndex={0} role="group" onPointerDown={onDown} onPointerMove={follow} onPointerLeave={() => setHov(null)} onKeyDown={onKey}
        aria-label="3D view of the GPU-HBM package. Arrow keys turn it."
      >
        <div ref={scene} className="xv-scene" style={{ transform: pose() }}>
          <div className="xv-floor" aria-hidden="true" style={{ transform: `translateY(${-floor}px) rotateX(90deg)` }} />
          {boxes.map((b) => {
            const id = unit(b.part, b.col);
            return <div key={b.key} className="xb" data-tone={b.part.tone} data-skin={b.part.skin} data-sel={id === hov} onPointerEnter={() => setHov(id)} onClick={() => setHov(id)} style={place(b)}>{faces}</div>;
          })}
          {lines.filter((l) => show[l.kind]).map((l) => <div key={l.key} className="xb" data-tone={l.kind} style={place(l)}>{faces}</div>)}
        </div>
        <div ref={tip} className="xv-tip" role="status" data-show={!!told && !dragging}>
          {last.current && <><strong><T {...last.current.name} /></strong><T {...last.current.about} /></>}
        </div>
        <div className="xv-ctl" onPointerDown={hush} onPointerMove={hush}>
          <label className="xv-range">
            <T ko="펼치기" en="Spread" zh="展开" />
            <input type="range" min={0} max={100} value={Math.round(t * 100)} onChange={(e) => spread(+e.target.value / 100)} />
          </label>
          <label data-kind="sig"><input type="checkbox" checked={show.sig} onChange={(e) => setShow((s) => ({ ...s, sig: e.target.checked }))} /><T ko="신호" en="Signal" zh="信号" /></label>
          <label data-kind="pwr"><input type="checkbox" checked={show.pwr} onChange={(e) => setShow((s) => ({ ...s, pwr: e.target.checked }))} /><T ko="전력" en="Power" zh="电力" /></label>
        </div>
      </div>
      {/* The same notes as text, for anyone who cannot hover the picture. */}
      <dl className="sr-only">{LEVELS[LV].parts.map((p) => <div key={p.id}><dt><T {...p.name} /></dt><dd><T {...p.about} /></dd></div>)}</dl>
    </section>
  );
}
