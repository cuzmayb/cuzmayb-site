"use client";

import { useEffect, useRef, useState } from "react";
import * as k from "@/lib/iso/iso-kit";
import type { Plan, Point3, SolidPaths } from "@/lib/iso/iso-kit";
import { Dots, Line, Solid } from "@/lib/iso/react/draw";
import { useInView } from "@/lib/iso/react/live";
import { useL } from "@/lib/use-lang";
import "@/lib/iso/iso.css";
import "@/lib/iso/site.css";

// The energy band diagram of a p-n junction, built as a bench model (an abacus of two bent bars) under the first screen: two bent bars on posts are the
// conduction band (back, higher) and the valence band (front, lower), both stepping down from the p half of the bench to the
// n half; a red wire stretched level between the two end blocks is the Fermi level, flat at equilibrium. Electrons (solid
// beads) run along the conduction bar from the n end, holes (hollow beads) along the valence bar from the p end; at the
// junction each drops or rises into the gap, they meet on the wire and vanish (recombination), with a small flash.
// Paused, it is the textbook diagram: carriers at rest, the three levels named. Motion keeps playing when the system asks
// for less motion, as the strip did before (globals.css exempts it): it is small, slow and the point of the strip.

const W = 760;
const H = 136;
const L = 380; // half length of the bars
const STEP = 30; // half width of the band bend at the junction
const EC = { p: 60, n: 42 };
const EV = { p: 30, n: 12 };
const EF = 36;
const Y_EC = -7;
const Y_EV = 7;
const BAR_T = 3; // bar thickness across the bench
const BAR_H = 3; // bar height
const BENCH: Plan = { x: -L - 18, y: -22, w: 2 * L + 36, d: 44, r: 4 };
const BLOCK_H = 66;

const P = k.fitProjection(
  [...k.boxCorners(BENCH, -8, 0), [-L - 18, -22, BLOCK_H + 4], [L + 18, -22, BLOCK_H + 4]],
  W,
  H,
  { pad: 8, azimuth: 88, elevation: 18 },
);
const at = (p: Point3) => k.iso(p, P);
const smooth = (u: number) => {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
};
// Height of a band at x: the p level on the left, the n level on the right, an S-bend between.
const band = (lv: { p: number; n: number }, x: number) => lv.p + (lv.n - lv.p) * smooth((x + STEP) / (2 * STEP));
const xs = Array.from({ length: (2 * L) / 4 + 1 }, (_, i) => -L + i * 4);
const d = (pts: Point3[], closed = false) => k.pathOf(pts.map(at), closed);

// A bent bar standing on its edge: its top face and its front face, shaded like a kit solid.
function bar(lv: { p: number; n: number }, y: number): SolidPaths {
  const back = xs.map((x): Point3 => [x, y - BAR_T / 2, band(lv, x)]);
  const topFront = xs.map((x): Point3 => [x, y + BAR_T / 2, band(lv, x)]);
  const bottom = xs.map((x): Point3 => [x, y + BAR_T / 2, band(lv, x) - BAR_H]);
  return {
    fill: d([...back, ...[...bottom].reverse()], true),
    top: d([...back, ...[...topFront].reverse()], true),
    shades: ["", "", d([...topFront, ...[...bottom].reverse()], true), ""],
    crease: d(topFront),
    outline: d([...back, ...[...bottom].reverse()], true),
  };
}

const slab = (plan: Plan, z: number, h: number, steps = 3, bevel = 0.5) => k.slabOf(plan, z, h, P, steps, bevel);
const POSTS_EC = [-320, -200, -80, 80, 200, 320];
const POSTS_EV = [-260, -140, 140, 260];
const post = (x: number, y: number, top: number) => [k.cylinder(x, y, 3.4, 0, 1.4, P, 20), k.cylinder(x, y, 1.8, 1.4, top - 1.4, P, 16)];
const P_HALF: Plan = { x: BENCH.x, y: BENCH.y, w: BENCH.w / 2 - 0.5, d: BENCH.d, r: 4 };
const N_HALF: Plan = { x: 0.5, y: BENCH.y, w: BENCH.w / 2 - 0.5, d: BENCH.d, r: 4 };
const BLOCK_L: Plan = { x: -L - 14, y: -14, w: 14, d: 28, r: 1.5 };
const BLOCK_R: Plan = { x: L, y: -14, w: 14, d: 28, r: 1.5 };

const ART = {
  halo: k.haloOf(BENCH, -8, 8, P),
  feet: k.corners(BENCH, 14).map(([x, y]) => k.cylinder(x, y, 4, -11, 3, P, 20)),
  halves: [slab(P_HALF, -8, 8, 4, 1), slab(N_HALF, -8, 8, 4, 1)],
  grooves: k.joinPaths([k.planOutline(k.insetPlan(P_HALF, 4), 0, P, 3), k.planOutline(k.insetPlan(N_HALF, 4), 0, P, 3)]),
  screws: k.pointsAt([...k.corners(P_HALF, 8), ...k.corners(N_HALF, 8)].map(([x, y]) => [x, y, 0] as Point3), P),
  ecPosts: POSTS_EC.map((x) => post(x, Y_EC, band(EC, x) - BAR_H)),
  evPosts: POSTS_EV.map((x) => post(x, Y_EV, band(EV, x) - BAR_H)),
  ec: bar(EC, Y_EC),
  ev: bar(EV, Y_EV),
  blocks: [slab(BLOCK_L, 0, BLOCK_H, 2, 0.6), slab(BLOCK_R, 0, BLOCK_H, 2, 0.6)],
  blockScrews: k.pointsAt([[-L - 7, -8, BLOCK_H], [-L - 7, 8, BLOCK_H], [L + 7, -8, BLOCK_H], [L + 7, 8, BLOCK_H]], P),
  wire: d([[-L, 0, EF], [L, 0, EF]]),
  wireEnds: [at([-L, 0, EF]), at([L, 0, EF])],
};

// A carrier's trip, u from 0 to 1: along its bar from the far end to just short of the junction, then into the gap.
const RUN = 0.86;
const RIDE = -BAR_H / 2; // beads are threaded on their bars, like an abacus
function electronAt(u: number): Point3 {
  if (u < RUN) {
    const x = L - 10 - (L - 10 - 50) * (u / RUN);
    return [x, Y_EC, band(EC, x) + RIDE];
  }
  const v = smooth((u - RUN) / (1 - RUN));
  const x = 50 - 48 * v;
  return [x, Y_EC * (1 - v), band(EC, x) + RIDE + (EF - band(EC, x) - RIDE) * v];
}
function holeAt(u: number): Point3 {
  if (u < RUN) {
    const x = -L + 10 + (L - 10 - 50) * (u / RUN);
    return [x, Y_EV, band(EV, x) + RIDE];
  }
  const v = smooth((u - RUN) / (1 - RUN));
  const x = -50 + 48 * v;
  return [x, Y_EV * (1 - v), band(EV, x) + RIDE + (EF - band(EV, x) - RIDE) * v];
}
const LOOP = 5.2;
const STARTS = [0, 1.3, 2.6, 3.9];
const fade = (u: number) => Math.min(1, u / 0.1, (1 - u) / 0.12);
const r2 = (v: number) => Math.round(v * 100) / 100;
const pct = ([x, y]: k.Flat) => ({ left: `${r2((x / W) * 100)}%`, top: `${r2((y / H) * 100)}%` });

// The resting picture: carriers spread along their bars.
const REST_E = [100, 170, 240, 310].map((x) => at([x, Y_EC, band(EC, x) + RIDE]));
const REST_H = [-310, -240, -170, -100].map((x) => at([x, Y_EV, band(EV, x) + RIDE]));
const MEET = at([0, 0, EF]);

export function Pn() {
  const [paused, setPaused] = useState(false);
  const Lw = useL();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  const es = useRef<(SVGGElement | null)[]>([]);
  const hs = useRef<(SVGGElement | null)[]>([]);
  const flash = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (paused || !inView) return;
    let frame = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = (now - t0) / 1000;
      let glow = 0;
      STARTS.forEach((s, i) => {
        const u = ((t + s) % LOOP) / LOOP;
        const place = (g: SVGGElement | null, p: Point3) => {
          if (!g) return;
          const [x, y] = at(p);
          g.setAttribute("transform", `translate(${r2(x)} ${r2(y)})`);
          g.style.opacity = `${r2(fade(u))}`;
        };
        place(es.current[i], electronAt(u));
        place(hs.current[i], holeAt(u));
        glow = Math.max(glow, u > 0.93 ? (u - 0.93) / 0.07 : 0, u < 0.08 ? 1 - u / 0.08 : 0);
      });
      if (flash.current) flash.current.style.opacity = `${r2(glow * 0.8)}`;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [paused, inView]);

  const bead = (kind: "e" | "h") => <circle className={`pn-bead pn-bead-${kind}`} r={3.2} />;
  return (
    <div ref={root} className="pn iso cz" data-paused={paused}>
      <svg className="iso-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={Lw({ ko: "p-n 접합의 에너지 밴드 모형", en: "A bench model of a p-n junction's energy bands", zh: "p-n 结能带的台架模型" })}>
        <path className="iso-halo" d={ART.halo} />
        {ART.feet.map((p, i) => <Solid key={i} paths={p} tone="lo" />)}
        {ART.halves.map((p, i) => <Solid key={i} paths={p} tone="mid" />)}
        <Line d={ART.grooves} tone="faint" />
        <Dots points={ART.screws} size={0.6} tone="mid" />
        <Solid paths={ART.blocks[0]} tone="mid" />
        {ART.ecPosts.map((p, i) => <g key={i}><Solid paths={p[0]} tone="lo" /><Solid paths={p[1]} tone="mid" /></g>)}
        <Solid paths={ART.ec} tone="hi" />
        {/* Unmounted while paused, so the animation really stops rather than running unseen. */}
        {!paused && <g>{STARTS.map((_, i) => <g key={i} ref={(n) => { es.current[i] = n; }} style={{ opacity: 0 }}>{bead("e")}</g>)}</g>}
        <path className="iso-line pn-wire" d={ART.wire} />
        {ART.wireEnds.map(([x, y], i) => <circle key={i} className="iso-wire-end pn-wire-end" cx={r2(x)} cy={r2(y)} r={1.6} />)}
        {ART.evPosts.map((p, i) => <g key={i}><Solid paths={p[0]} tone="lo" /><Solid paths={p[1]} tone="mid" /></g>)}
        <Solid paths={ART.ev} tone="hi" />
        {!paused && <g>{STARTS.map((_, i) => <g key={i} ref={(n) => { hs.current[i] = n; }} style={{ opacity: 0 }}>{bead("h")}</g>)}</g>}
        {!paused && <circle ref={flash} className="pn-flash" cx={r2(MEET[0])} cy={r2(MEET[1])} r={7} style={{ opacity: 0 }} />}
        <Solid paths={ART.blocks[1]} tone="mid" />
        <Dots points={ART.blockScrews} size={0.6} tone="mid" />
        {paused && (
          <g>
            {REST_E.map(([x, y], i) => <g key={`e${i}`} transform={`translate(${r2(x)} ${r2(y)})`}>{bead("e")}</g>)}
            {REST_H.map(([x, y], i) => <g key={`h${i}`} transform={`translate(${r2(x)} ${r2(y)})`}>{bead("h")}</g>)}
          </g>
        )}
      </svg>
      {/* Level names, as HTML so they keep their size when the strip is narrow. */}
      <span className="pn-name" style={pct(at([-L + 4, Y_EC, EC.p + 4]))} aria-hidden="true">E<sub>C</sub></span>
      <span className="pn-name" style={{ ...pct(at([-L + 4, Y_EV, EV.p - BAR_H - 1])), transform: "none" }} aria-hidden="true">E<sub>V</sub></span>
      <span className="pn-name pn-name-f" style={{ ...pct(at([L - 4, 0, EF + 3])), transform: "translate(-100%, -100%)" }} aria-hidden="true">E<sub>F</sub></span>
      <button type="button" className="pn-pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)} aria-label={Lw({ ko: "움직임 멈추기", en: "Pause the motion", zh: "暂停动画" })}>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
        </svg>
      </button>
    </div>
  );
}
