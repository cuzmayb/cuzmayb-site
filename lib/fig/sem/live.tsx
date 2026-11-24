"use client";

import * as React from "react";
import { sideMatrix, segment } from "@/lib/iso/iso-kit";
import { IsoFigure } from "@/lib/iso/react/draw";
import { useInView, useLoop, useReadout, useStillness } from "@/lib/iso/react/live";
import { C, COLS, DET_AIM, HEIGHT, P, ROWS, SCREEN_CELL, SCREEN_FACE, SCREEN_TOP, SCREEN_X0, TIP_Z, WIDTH, at, brightness, pixelAt } from "./view";

// The raster: the beam rests DWELL seconds on each pixel, left to right, row by row, and the monitor lights the same
// cell with the signal the detector counted there. A full frame holds, fades, and starts again.
const DWELL = 0.08;
const TOTAL = COLS * ROWS;
const HOLD = 2.6;
const FADE = 0.7;
const FLIGHT = 0.55; // seconds a secondary electron takes on screen from the spot to the detector cage
const POOL = 10;
const TIP = at([C[0], C[1], TIP_Z]);
const AIM = at(DET_AIM);
const FACE = sideMatrix([SCREEN_X0, SCREEN_FACE], SCREEN_TOP, P, "left");
const SW = COLS * SCREEN_CELL;
const SH = ROWS * SCREEN_CELL;
const r2 = (v: number) => Math.round(v * 100) / 100;

const cellOf = (n: number) => [n % COLS, Math.floor(n / COLS)] as const;
const beamTo = (n: number) => {
  const [i, j] = cellOf(Math.min(n, TOTAL - 1));
  return pixelAt(i, j);
};
const CENTRE = beamTo(TOTAL / 2 + COLS / 2);

interface Flight { from: [number, number]; t: number; alpha: number }

interface Props {
  label: string;
  words: { pixel: string; paused: string };
  base: React.ReactNode;
  pump: React.ReactNode;
  chamberBack: React.ReactNode;
  detector: React.ReactNode;
  detHead: React.ReactNode;
  stage: React.ReactNode;
  pole: React.ReactNode;
  chamberFront: React.ReactNode;
  column: React.ReactNode;
  monitor: React.ReactNode;
  desk: React.ReactNode;
}

export function SemLive(props: Props) {
  const { label, words } = props;
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const still = useStillness();
  const [paused, setPaused] = React.useState(false);
  const beam = React.useRef<SVGPathElement>(null);
  const spot = React.useRef<SVGCircleElement>(null);
  const head = React.useRef<SVGGElement>(null);
  const cells = React.useRef<(SVGRectElement | null)[]>([]);
  const dots = React.useRef<(SVGCircleElement | null)[]>([]);
  const run = React.useRef({ t: 0, shown: 0, flights: [] as Flight[], next: 0, glow: 0 });

  const aim = React.useCallback((n: number) => {
    const p = beamTo(n);
    beam.current?.setAttribute("d", segment([C[0], C[1], TIP_Z], p, P));
    const [x, y] = at(p);
    spot.current?.setAttribute("cx", `${r2(x)}`);
    spot.current?.setAttribute("cy", `${r2(y)}`);
  }, []);

  const tick = (dt: number) => {
    const s = run.current;
    s.t += dt;
    const scanning = s.t < TOTAL * DWELL;
    const n = Math.min(TOTAL, Math.floor(s.t / DWELL) + 1);
    while (s.shown < n) {
      const [i, j] = cellOf(s.shown);
      const b = brightness(i, j);
      cells.current[s.shown]?.setAttribute("fill-opacity", `${r2(b)}`);
      s.flights[s.next] = { from: at(pixelAt(i, j)), t: 0, alpha: 0.3 + 0.7 * b };
      s.next = (s.next + 1) % POOL;
      s.shown++;
    }
    if (scanning) aim(s.shown - 1);
    say(`${words.pixel} ${s.shown}/${TOTAL}`);

    // Electrons in flight, and the cage lighting while bright ones land.
    s.glow = Math.max(0, s.glow - dt * 4);
    s.flights.forEach((f, k) => {
      const node = dots.current[k];
      if (!f || !node) return;
      f.t += dt / FLIGHT;
      if (f.t >= 1) {
        if (f.t - dt / FLIGHT < 1) s.glow = Math.max(s.glow, f.alpha > 0.8 ? 1 : 0.4);
        node.style.opacity = "0";
        return;
      }
      const u = f.t;
      const mx = (f.from[0] + AIM[0]) / 2;
      const my = Math.min(f.from[1], AIM[1]) - 26;
      const x = (1 - u) * (1 - u) * f.from[0] + 2 * (1 - u) * u * mx + u * u * AIM[0];
      const y = (1 - u) * (1 - u) * f.from[1] + 2 * (1 - u) * u * my + u * u * AIM[1];
      node.setAttribute("cx", `${r2(x)}`);
      node.setAttribute("cy", `${r2(y)}`);
      node.style.opacity = `${r2(f.alpha * Math.min(1, u * 6, (1 - u) * 6))}`;
    });
    const solid = head.current?.querySelector(".iso-solid");
    if (solid) s.glow > 0.5 ? solid.setAttribute("data-lit", "") : solid.removeAttribute("data-lit");

    // Frame done: hold, fade the screen, start over.
    const end = TOTAL * DWELL;
    if (s.t > end + HOLD) {
      const k = Math.min(1, (s.t - end - HOLD) / FADE);
      cells.current.forEach((c, m) => {
        const [i, j] = cellOf(m);
        c?.setAttribute("fill-opacity", `${r2(brightness(i, j) * (1 - k))}`);
      });
      if (k >= 1) Object.assign(s, { t: 0, shown: 0 });
    }
    return true;
  };

  const going = inView && !paused && !still;
  useLoop(tick, going);

  // Reduced motion: the finished picture, the beam resting at the centre.
  React.useEffect(() => {
    if (!still) return;
    cells.current.forEach((c, m) => {
      const [i, j] = cellOf(m);
      c?.setAttribute("fill-opacity", `${r2(brightness(i, j))}`);
    });
    dots.current.forEach((d) => d && (d.style.opacity = "0"));
    aim(TOTAL / 2 + COLS / 2);
    say(`${words.pixel} ${TOTAL}/${TOTAL}`);
  }, [still, aim, say, words.pixel]);

  React.useEffect(() => {
    if (paused) say(words.paused);
  }, [paused, say, words.paused]);

  const flip = () => setPaused((p) => !p);
  const rest = at(CENTRE);

  return (
    <div
      ref={anchor}
      className="sem-stage"
      role="button"
      tabIndex={0}
      aria-pressed={paused}
      aria-label={label}
      onClick={flip}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          flip();
        }
      }}
    >
      <IsoFigure width={WIDTH} height={HEIGHT} label={label}>
        {props.base}
        {props.pump}
        {props.chamberBack}
        {props.detector}
        <g ref={head}>{props.detHead}</g>
        {props.stage}
        <path ref={beam} className="iso-line sem-beam" d={segment([C[0], C[1], TIP_Z], CENTRE, P)} />
        <circle ref={spot} className="sem-spot" cx={r2(rest[0])} cy={r2(rest[1])} r={1.5} />
        <g className="sem-electrons">
          {Array.from({ length: POOL }, (_, k) => (
            <circle key={k} ref={(n) => { dots.current[k] = n; }} r={1} cx={r2(TIP[0])} cy={r2(TIP[1])} style={{ opacity: 0 }} />
          ))}
        </g>
        {props.pole}
        {props.chamberFront}
        {props.column}
        {props.monitor}
        <g transform={FACE}>
          <rect className="sem-bezel" x={-3} y={-3} width={SW + 6} height={SH + 6} rx={1.2} />
          <rect className="sem-screen" x={0} y={0} width={SW} height={SH} />
          {Array.from({ length: TOTAL }, (_, m) => {
            const [i, j] = cellOf(m);
            return <rect key={m} ref={(n) => { cells.current[m] = n; }} className="sem-cell" x={i * SCREEN_CELL} y={j * SCREEN_CELL} width={SCREEN_CELL} height={SCREEN_CELL} fillOpacity={0} />;
          })}
          <circle className="sem-led" cx={SW + 1} cy={SH + 6.5} r={0.9} data-on={going ? "" : undefined} />
        </g>
        {props.desk}
      </IsoFigure>
    </div>
  );
}
