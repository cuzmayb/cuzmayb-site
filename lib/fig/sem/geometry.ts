import * as k from "@/lib/iso/iso-kit";
import type { Plan, Plane, Point3 } from "@/lib/iso/iso-kit";
import {
  BASE, BASE_H, C, CH, COLS, DET, DET_HEAD_H, DET_HEAD_Z, DIE, DIE_TOP, DUST, FOOT_H, MON, MON_H, MON_Z, P, PAD, PAD_H, PX,
  ROOF, ROOF_H, ROOF_TOP, ROOF_Z, ROWS, SCAN_X0, SCAN_Y0, SILL_H, STUB_TOP, TIP_Z, WALL, WALL_Z,
} from "./view";

// Every static path of the SEM figure, computed once on the server.
const slab = (plan: Plan, z: number, h: number, steps = 4, bevel = 0.6) => k.slabOf(plan, z, h, P, steps, bevel);
const cyl = (x: number, y: number, r: number, z: number, h: number, bevel = 0) => k.cylinder(x, y, r, z, h, P, Math.max(20, Math.round(r * 3.2)), bevel);
const byDepth = (points: Plane[]) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const screws = (plan: Plan, inset: number, z: number) => k.pointsAt(k.corners(plan, inset).map(([x, y]) => [x, y, z] as Point3), P);
const join = k.joinPaths;

// ---- Bench plate on four feet, with a label plate and a ruler strip ----
const LABEL: Plan = { x: -162, y: 55, w: 46, d: 13, r: 1 };
const STRIP: Plan = { x: -104, y: 62, w: 120, d: 6, r: 1 };
const ticks = k.topTicks(STRIP.x + 4, STRIP.x + STRIP.w - 4, 4, 5, STRIP.y + 0.4, 0.6, [2, 3.6], P);
export const BASE_ART = {
  halo: k.haloOf(BASE, -BASE_H, BASE_H, P),
  feet: byDepth(k.corners(BASE, 20)).map(([x, y]) => [cyl(x, y, 7, -BASE_H - FOOT_H, 1.6), cyl(x, y, 5.4, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6)]),
  slab: k.slabOf(BASE, -BASE_H, BASE_H, P, 8, 1.6),
  groove: k.planOutline(k.insetPlan(BASE, 5), 0, P),
  screwRings: join(k.corners(BASE, 11).map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16))),
  screws: screws(BASE, 11, 0),
  label: k.slabOf(LABEL, 0, 0.8, P, 3),
  labelLine: k.planOutline(k.insetPlan(LABEL, 1.6), 0.8, P, 3),
  labelRules: join([
    k.lineOnTop([LABEL.x + 5, LABEL.y + 4.2], [LABEL.x + 30, LABEL.y + 4.2], 0.8, P),
    k.lineOnTop([LABEL.x + 5, LABEL.y + 6.6], [LABEL.x + 38, LABEL.y + 6.6], 0.8, P),
    k.lineOnTop([LABEL.x + 5, LABEL.y + 9], [LABEL.x + 22, LABEL.y + 9], 0.8, P),
  ]),
  labelScrews: k.pointsAt([[LABEL.x + 2.6, LABEL.y + LABEL.d / 2, 0.8], [LABEL.x + LABEL.w - 2.6, LABEL.y + LABEL.d / 2, 0.8]], P),
  strip: k.slabOf(STRIP, 0, 0.6, P, 3),
  minor: ticks.minor,
  major: ticks.major,
};

// ---- Turbo pump at the left, with a short duct into the chamber wall ----
const PUMP: Plane = [-148, 14];
const DUCT: Plan = { x: -137, y: 6, w: 17, d: 16, r: 1 };
export const PUMP_ART = {
  flange: cyl(PUMP[0], PUMP[1], 17, 0, 4, 0.5),
  body: cyl(PUMP[0], PUMP[1], 14, 4, 40),
  ribs: k.knurl(PUMP[0], PUMP[1], 14, 9, 39, 44, P),
  seams: join([k.sideArc(PUMP[0], PUMP[1], 14, 9, P, 32), k.sideArc(PUMP[0], PUMP[1], 14, 39, P, 32)]),
  top: cyl(PUMP[0], PUMP[1], 16, 44, 4, 0.5),
  topBolts: k.pointsAt(Array.from({ length: 10 }, (_, n) => [PUMP[0] + 13.4 * Math.cos((n / 10) * Math.PI * 2), PUMP[1] + 13.4 * Math.sin((n / 10) * Math.PI * 2), 48] as Point3), P),
  cap: cyl(PUMP[0], PUMP[1], 9, 48, 6, 0.5),
  capRing: k.ring(PUMP[0], PUMP[1], 5.5, 54, P, 24),
  duct: slab(DUCT, 26, 14, 3, 0.5),
  collar: slab({ x: -127, y: 4, w: 3, d: 20, r: 0.6 }, 24, 18, 2, 0.4),
};

// ---- Chamber: floor, back and left walls, roof; the corner post and sills stay when the panels are off ----
const BACK: Plan = { x: CH.x, y: CH.y, w: CH.w, d: WALL, r: 1 };
const LEFT: Plan = { x: CH.x, y: CH.y + WALL, w: WALL, d: CH.d - WALL, r: 1 };
const FRONT_SILL: Plan = { x: CH.x + WALL, y: CH.y + CH.d - WALL, w: CH.w - WALL * 2, d: WALL, r: 1 };
const RIGHT_SILL: Plan = { x: CH.x + CH.w - WALL, y: CH.y + WALL, w: WALL, d: CH.d - WALL * 2, r: 1 };
const wallH = ROOF_Z - WALL_Z;
const along = (from: number, to: number, n: number) => Array.from({ length: n }, (_, i) => from + ((to - from) * (i + 0.5)) / n);
export const CHAMBER_ART = {
  floor: k.slabOf(CH, 0, WALL_Z, P, 3, 0.8),
  floorGrid: join(along(CH.x + WALL + 6, CH.x + CH.w - WALL - 6, 9).map((x) => k.lineOnTop([x, CH.y + WALL], [x, CH.y + CH.d - WALL], WALL_Z, P))),
  back: slab(BACK, WALL_Z, wallH, 2, 0.5),
  left: slab(LEFT, WALL_Z, wallH, 2, 0.5),
  // Feedthrough flanges on the two inside faces: a ring and a bore, the way ports look on a real chamber wall.
  ports: join([
    k.sideRing([-86, CH.y + WALL + 0.1, 58], 8, "y", P, 28),
    k.sideRing([-86, CH.y + WALL + 0.1, 58], 5, "y", P, 24),
    k.sideRing([-6, CH.y + WALL + 0.1, 30], 6, "y", P, 24),
    k.sideRing([CH.x + WALL + 0.1, 26, 52], 7, "x", P, 28),
    k.sideRing([CH.x + WALL + 0.1, 26, 52], 4.4, "x", P, 24),
  ]),
  frontSill: slab(FRONT_SILL, WALL_Z, SILL_H, 2, 0.5),
  rightSill: slab(RIGHT_SILL, WALL_Z, SILL_H, 2, 0.5),
  sillBolts: k.pointsAt([
    ...along(FRONT_SILL.x + 4, FRONT_SILL.x + FRONT_SILL.w - 4, 8).map((x) => [x, FRONT_SILL.y + WALL / 2, WALL_Z + SILL_H] as Point3),
    ...along(RIGHT_SILL.y + 4, RIGHT_SILL.y + RIGHT_SILL.d - 4, 6).map((y) => [RIGHT_SILL.x + WALL / 2, y, WALL_Z + SILL_H] as Point3),
  ], P),
  roof: k.slabOf(ROOF, ROOF_Z, ROOF_H, P, 3, 1.2),
  roofSeam: k.sideSeam(ROOF, ROOF_Z + 3, P, 3),
  roofGroove: k.planOutline(k.insetPlan(ROOF, 4), ROOF_TOP, P, 3),
  roofScrewRings: join(k.corners(ROOF, 8).map(([x, y]) => k.ring(x, y, 2, ROOF_TOP, P, 16))),
  roofScrews: screws(ROOF, 8, ROOF_TOP),
  // The cut walls end at the roof line; their exposed tops carry a row of lid bolts.
  wallBolts: k.pointsAt([
    ...along(ROOF.x + ROOF.w + 4, CH.x + CH.w - 4, 4).map((x) => [x, CH.y + WALL / 2, ROOF_Z] as Point3),
    ...along(ROOF.y + ROOF.d + 4, CH.y + CH.d - 4, 2).map((y) => [CH.x + WALL / 2, y, ROOF_Z] as Point3),
  ], P),
};

// ---- Everhart-Thornley detector: a post with a wire cage on top, its grid facing the sample ----
export const DET_ART = {
  foot: cyl(DET[0], DET[1], 7, WALL_Z, 3, 0.4),
  post: cyl(DET[0], DET[1], 3, WALL_Z + 3, DET_HEAD_Z - WALL_Z - 3),
  head: cyl(DET[0], DET[1], 7, DET_HEAD_Z, DET_HEAD_H, 0.5),
  cage: k.knurl(DET[0], DET[1], 7, DET_HEAD_Z + 2, DET_HEAD_Z + DET_HEAD_H - 2, 26, P),
  cageSeams: join([k.sideArc(DET[0], DET[1], 7, DET_HEAD_Z + 2, P, 24), k.sideArc(DET[0], DET[1], 7, DET_HEAD_Z + DET_HEAD_H - 2, P, 24)]),
  window: join([k.ring(DET[0], DET[1], 4.4, DET_HEAD_Z + DET_HEAD_H, P, 24), k.ring(DET[0], DET[1], 2.2, DET_HEAD_Z + DET_HEAD_H, P, 16)]),
};

// ---- Stage: base, X carriage on rails, Y carriage on rails, stub, and the die with its pad and one particle ----
const [cx, cy] = C;
const STAGE: Plan = { x: cx - 30, y: cy - 30, w: 60, d: 60, r: 2 };
const XC: Plan = { x: cx - 24, y: cy - 24, w: 48, d: 48, r: 2 };
const YC: Plan = { x: cx - 19, y: cy - 19, w: 38, d: 38, r: 2 };
const PAD_PLAN: Plan = { x: SCAN_X0 + PAD.i0 * PX, y: SCAN_Y0 + PAD.j0 * PX, w: (PAD.i1 - PAD.i0 + 1) * PX, d: (PAD.j1 - PAD.j0 + 1) * PX, r: 0.3 };
const SCAN: Plan = { x: SCAN_X0, y: SCAN_Y0, w: COLS * PX, d: ROWS * PX, r: 0 };
const z1 = WALL_Z + 6, z2 = z1 + 2.5, z3 = z2 + 4.5, z4 = z3 + 2.5, z5 = z4 + 4.5;
export const STAGE_ART = {
  base: slab(STAGE, WALL_Z, 6, 3, 0.8),
  baseScrews: screws(STAGE, 4, z1),
  xRails: [slab({ x: cx - 28, y: cy - 22, w: 56, d: 4, r: 0.8 }, z1, 2.5, 2, 0.3), slab({ x: cx - 28, y: cy + 18, w: 56, d: 4, r: 0.8 }, z1, 2.5, 2, 0.3)],
  x: slab(XC, z2, 4.5, 3, 0.6),
  xScrews: screws(XC, 3.5, z3),
  yRails: [slab({ x: cx - 17, y: cy - 22, w: 4, d: 44, r: 0.8 }, z3, 2.5, 2, 0.3), slab({ x: cx + 13, y: cy - 22, w: 4, d: 44, r: 0.8 }, z3, 2.5, 2, 0.3)],
  y: slab(YC, z4, 4.5, 3, 0.6),
  yScrews: screws(YC, 3, z5),
  stubFoot: cyl(cx, cy, 8, z5, 2, 0.4),
  stub: cyl(cx, cy, 4, z5 + 2, STUB_TOP - z5 - 2),
  die: slab(DIE, STUB_TOP, DIE_TOP - STUB_TOP, 2, 0.5),
  scan: k.planOutline(SCAN, DIE_TOP, P, 1),
  pad: slab(PAD_PLAN, DIE_TOP, PAD_H, 2, 0.3),
  dust: cyl(SCAN_X0 + (DUST.i + 0.5) * PX, SCAN_Y0 + (DUST.j + 0.5) * PX, 0.7, DIE_TOP, 1),
};

// ---- Pole piece under the roof: the end of the objective lens, where the beam comes out ----
export const POLE_ART = [cyl(cx, cy, 10, 68, ROOF_Z - 68, 0.4), cyl(cx, cy, 6, 63, 5), cyl(cx, cy, 3, TIP_Z, 3)];

// ---- Column on the roof, from the objective lens up to the gun and its high-voltage connector ----
const bolts = (r: number, n: number, z: number) => k.pointsAt(Array.from({ length: n }, (_, i) => [cx + r * Math.cos(((i + 0.5) / n) * Math.PI * 2), cy + r * Math.sin(((i + 0.5) / n) * Math.PI * 2), z] as Point3), P);
export const COLUMN_ART = {
  boss: cyl(cx, cy, 24, ROOF_TOP, 3, 0.6),
  objective: cyl(cx, cy, 21, ROOF_TOP + 3, 20, 0.8),
  objectiveSeam: k.sideArc(cx, cy, 21, ROOF_TOP + 13, P, 40),
  objectiveBolts: bolts(18, 8, ROOF_TOP + 23),
  neck1: cyl(cx, cy, 12, ROOF_TOP + 23, 3),
  scan: cyl(cx, cy, 14, ROOF_TOP + 26, 14, 0.5),
  scanRibs: k.knurl(cx, cy, 14, ROOF_TOP + 28, ROOF_TOP + 38, 36, P),
  scanSeams: join([k.sideArc(cx, cy, 14, ROOF_TOP + 28, P, 32), k.sideArc(cx, cy, 14, ROOF_TOP + 38, P, 32)]),
  neck2: cyl(cx, cy, 10, ROOF_TOP + 40, 3),
  condenser: cyl(cx, cy, 18, ROOF_TOP + 43, 16, 0.7),
  condenserSeam: k.sideArc(cx, cy, 18, ROOF_TOP + 51, P, 36),
  condenserBolts: bolts(15.4, 8, ROOF_TOP + 59),
  tube: cyl(cx, cy, 10, ROOF_TOP + 59, 17),
  gunFlange: cyl(cx, cy, 16, ROOF_TOP + 76, 4, 0.5),
  gunBolts: bolts(13.6, 8, ROOF_TOP + 80),
  gun: cyl(cx, cy, 13, ROOF_TOP + 80, 22, 0.6),
  gunSeam: k.sideArc(cx, cy, 13, ROOF_TOP + 91, P, 32),
  cap: cyl(cx, cy, 9, ROOF_TOP + 102, 4, 0.4),
  hv: cyl(cx, cy, 4.5, ROOF_TOP + 106, 10),
  hvCap: cyl(cx, cy, 6, ROOF_TOP + 116, 4, 0.4),
  hvRing: k.ring(cx, cy, 2.6, ROOF_TOP + 120, P, 16),
};

// ---- Monitor on a stand, with vents on top; the screen is drawn live in the face plane ----
const STAND: Plan = { x: MON.x + 22, y: MON.y + 10, w: 30, d: 20, r: 2 };
const vents = Array.from({ length: 6 }, (_, i): Plan => ({ x: MON.x + 12 + i * 9, y: MON.y + 8, w: 4, d: 24, r: 1.6 }));
export const MON_ART = {
  stand: slab(STAND, 0, MON_Z, 3, 0.5),
  case: k.slabOf(MON, MON_Z, MON_H, P, 4, 1),
  seam: k.sideSeam(MON, MON_Z + 4, P, 4),
  vents: join(vents.map((plan) => k.planOutline(plan, MON_Z + MON_H, P, 3))),
  screws: screws(MON, 4, MON_Z + MON_H),
};

// ---- Control desk in front of the monitor: two knurled knobs (accelerating voltage, scan speed), a toggle and a label ----
const DESK: Plan = { x: 46, y: -20, w: 68, d: 26, r: 2 };
const knob = (x: number, y: number, turn: number) => ({
  body: cyl(x, y, 5, DESK_TOP, 5, 0.4),
  knurl: k.knurl(x, y, 5, DESK_TOP + 0.6, DESK_TOP + 4.4, 30, P),
  pointer: k.lineOnTop([x, y], [x + 3.6 * Math.cos(turn), y + 3.6 * Math.sin(turn)], DESK_TOP + 5, P),
  ring: k.ring(x, y, 7, DESK_TOP, P, 28),
});
const DESK_TOP = 7;
export const DESK_ART = {
  desk: slab(DESK, 0, DESK_TOP, 3, 0.8),
  groove: k.planOutline(k.insetPlan(DESK, 3), DESK_TOP, P, 3),
  knobs: [knob(60, -9, -0.6), knob(78, -9, 1.9)],
  toggle: slab({ x: 93, y: -12, w: 8, d: 6, r: 1 }, DESK_TOP, 2, 2, 0.3),
  lever: slab({ x: 96, y: -14, w: 2, d: 3, r: 0.6 }, DESK_TOP + 2, 4, 2, 0.2),
  screws: screws(DESK, 3, DESK_TOP),
  rules: join([k.lineOnTop([56, 0], [66, 0], DESK_TOP, P), k.lineOnTop([74, 0], [86, 0], DESK_TOP, P), k.lineOnTop([92, 0], [100, 0], DESK_TOP, P)]),
};
