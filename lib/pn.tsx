"use client";

import { useState } from "react";
import { useL } from "@/lib/use-lang";

// Energy band diagram of a p-n junction, as a strip under the first screen. The conduction band (upper line) and the
// valence band (lower line) step down from the p side to the n side; the dashed line is the Fermi level, flat at
// equilibrium. Electrons run along the conduction band from the right, holes along the valence band from the left,
// and they meet in the gap at the junction and vanish (recombination). Paused, it is the plain textbook diagram:
// carriers at rest and the three levels named. The carriers move by CSS keyframes (.pn-car in globals.css) that trace
// the two paths below; SVG's own animation elements (SMIL) were dropped because iOS Safari did not play them.
const EC = "M0 14H320C370 14 390 30 440 30H760";
const EV = "M0 42H320C370 42 390 58 440 58H760";
// Paths the keyframes pn-e and pn-h follow (kept here as the reference for those numbers):
//   electron  M748 25 H430 C405 25 392 30 381 36   along Ec, then down into the gap
//   hole      M12 47 H330 C355 47 368 42 379 36    along Ev, then up into the gap
const STARTS = [0, 1.3, 2.6, 3.9]; // seconds into the 5.2 s loop at which each carrier sets off

// A carrier is a near-zero-length round-capped stroke, so it stays a round dot of fixed size at any width.
// A hole is the same dot with a smaller background-coloured dot on top.
const dot = (kind: "e" | "h") => (
  <>
    <path className="pn-dot" d="M0 0h0.01" />
    {kind === "h" && <path className="pn-dot pn-hollow" d="M0 0h0.01" />}
  </>
);

// Outer group travels the path, inner group fades in at the start and out at the junction; both share the negative delay.
const mover = (kind: "e" | "h", t: number) => (
  <g key={kind + t} className={`pn-car pn-${kind}`} style={{ animationDelay: `${-t}s` }}>
    <g>{dot(kind)}</g>
  </g>
);

export function Pn() {
  const [paused, setPaused] = useState(false);
  const L = useL();
  return (
    <div className="pn" data-paused={paused}>
      <svg viewBox="0 0 760 72" role="img" aria-label={L({ ko: "p-n 접합의 에너지 밴드 그림", en: "Energy band diagram of a p-n junction", zh: "p-n 结的能带图" })}>
        <path className="pn-band" d={EC} />
        <path className="pn-band" d={EV} />
        <path className="pn-fermi" d="M0 36H760" />
        {/* Unmounted while paused, so the animation really stops rather than running unseen. */}
        {!paused && <g className="pn-move">{STARTS.map((t) => mover("e", t))}{STARTS.map((t) => mover("h", t))}</g>}
        {/* The carriers at rest: shown when paused, and instead of the moving ones when motion is reduced. */}
        <g className="pn-still">
          {[500, 570, 640, 710].map((x) => <g key={x} transform={`translate(${x} 25)`}>{dot("e")}</g>)}
          {[50, 120, 190, 260].map((x) => <g key={x} transform={`translate(${x} 47)`}>{dot("h")}</g>)}
          {/* Recombination at the junction: an electron on the conduction band drops straight down to a hole on the
              valence band. [x, Ec there, Ev there], read off the two band curves. */}
          {[[358.5, 17.5, 45.5], [401.5, 26.5, 54.5]].map(([x, ec, ev]) => (
            <g key={x}>
              <g transform={`translate(${x} ${ec - 5})`}>{dot("e")}</g>
              <path className="pn-arrow" d={`M${x} ${ec + 2}V${ev - 6}`} />
              <path className="pn-head" d={`M${x - 3.5} ${ev - 8}L${x} ${ev - 2}L${x + 3.5} ${ev - 8}Z`} />
              <g transform={`translate(${x} ${ev + 5})`}>{dot("h")}</g>
            </g>
          ))}
        </g>
      </svg>
      {/* Level names, as HTML so they keep their size when the strip is narrow. */}
      <span className="pn-name" style={{ left: 0, top: "19.4%" }} aria-hidden="true">E<sub>C</sub></span>
      <span className="pn-name" style={{ left: 0, top: "58.3%" }} aria-hidden="true">E<sub>V</sub></span>
      <span className="pn-name pn-name-f" style={{ right: 0, top: "50%" }} aria-hidden="true">E<sub>F</sub></span>
      <button type="button" className="pn-pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)} aria-label={L({ ko: "움직임 멈추기", en: "Pause the motion", zh: "暂停动画" })}>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
        </svg>
      </button>
    </div>
  );
}
