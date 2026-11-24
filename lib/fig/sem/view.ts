import { boxCorners, fitProjection, iso, type Flat, type Plan, type Point3 } from "@/lib/iso/iso-kit";

// A benchtop SEM with its chamber panels off: the column stands on the chamber roof, the stage and sample sit inside,
// a secondary-electron detector stands at the back, and a small monitor beside it builds the picture one pixel at a time.
// World units are about 1 px; x and y on the bench, z up. The viewer is toward +x +y.
export const WIDTH = 600;
export const HEIGHT = 430;

export const BASE: Plan = { x: -172, y: -78, w: 304, d: 152, r: 9 };
export const BASE_H = 10;
export const FOOT_H = 5;

// Chamber: floor plate, two walls at the back, a roof, and the sills and corner post that stay when the panels come off.
export const CH: Plan = { x: -120, y: -50, w: 140, d: 100, r: 2 };
export const WALL = 6;
export const FLOOR_Z = 0;
export const FLOOR_H = 4;
export const WALL_Z = FLOOR_Z + FLOOR_H;
export const ROOF_Z = 76;
export const ROOF_H = 8;
export const ROOF_TOP = ROOF_Z + ROOF_H;
export const SILL_H = 8;

// The roof is cut away in front of and to the right of the column, so the beam, sample and detector show.
export const ROOF: Plan = { x: CH.x, y: CH.y, w: 96, d: 76, r: 2 };

// The column axis.
export const C: [number, number] = [-50, 0];
export const TIP_Z = 60; // pole-piece tip, where the beam leaves the column

// Stage stack under the column.
export const STAGE_Z = WALL_Z;
export const STUB_TOP = 32;
export const DIE: Plan = { x: C[0] - 15, y: C[1] - 15, w: 30, d: 30, r: 1.2 };
export const DIE_TOP = STUB_TOP + 3;
export const PAD_H = 1.6;

// Raster: COLS x ROWS pixels, PX world units each, centred on the column axis.
export const COLS = 16;
export const ROWS = 12;
export const PX = 1.5;
export const SCAN_X0 = C[0] - (COLS * PX) / 2;
export const SCAN_Y0 = C[1] - (ROWS * PX) / 2;
// The raised pad on the die, in pixel indices (inclusive), and one particle.
export const PAD = { i0: 4, i1: 11, j0: 2, j1: 9 };
export const DUST = { i: 13, j: 9 };

// Everhart-Thornley detector at the front left of the chamber, where the cutaway shows it.
export const DET: [number, number] = [-98, 20];
export const DET_HEAD_Z = 38;
export const DET_HEAD_H = 14;
export const DET_AIM: Point3 = [DET[0], DET[1], DET_HEAD_Z + DET_HEAD_H / 2];

// Monitor at the back right, its screen on the face toward +y.
export const MON: Plan = { x: 42, y: -70, w: 74, d: 40, r: 3 };
export const MON_Z = 6;
export const MON_H = 56;
export const SCREEN_CELL = 3;
export const SCREEN_X0 = MON.x + (MON.w - COLS * SCREEN_CELL) / 2;
export const SCREEN_TOP = MON_Z + MON_H - 9;
export const SCREEN_FACE = MON.y + MON.d;

export const P = fitProjection(
  [...boxCorners(BASE, -BASE_H - FOOT_H, 0), [C[0], C[1], 206], ...boxCorners(MON, 0, MON_Z + MON_H)],
  WIDTH,
  HEIGHT,
  { pad: 30, azimuth: 42 },
);

export const at = (point: Point3): Flat => iso(point, P);

// Where pixel (i, j) lies on the die, and how bright its secondary-electron signal is (0..1).
// Edges and the particle read brighter than flat faces: more of the interaction volume reaches a free surface there.
export const pixelAt = (i: number, j: number): Point3 => {
  const onPad = i >= PAD.i0 && i <= PAD.i1 && j >= PAD.j0 && j <= PAD.j1;
  return [SCAN_X0 + (i + 0.5) * PX, SCAN_Y0 + (j + 0.5) * PX, DIE_TOP + (onPad ? PAD_H : 0)];
};

export function brightness(i: number, j: number) {
  const onPad = i >= PAD.i0 && i <= PAD.i1 && j >= PAD.j0 && j <= PAD.j1;
  const edge = onPad && (i === PAD.i0 || i === PAD.i1 || j === PAD.j0 || j === PAD.j1);
  const d = Math.hypot(i - DUST.i, j - DUST.j);
  const grain = (((i * 73 + j * 151) % 17) / 17 - 0.5) * 0.08;
  if (d < 0.5) return 0.95;
  if (d < 1.5) return 0.55 + grain;
  if (edge) return 0.92 + grain / 2;
  if (onPad) return 0.42 + grain;
  return 0.2 + grain;
}
