import * as React from "react";
import { Dots, Line, Solid } from "@/lib/iso/react/draw";
import { BASE_ART, CHAMBER_ART, COLUMN_ART, DESK_ART, DET_ART, MON_ART, POLE_ART, PUMP_ART, STAGE_ART } from "./geometry";
import { SemLive } from "./live";

// Static parts as element props for the live component, which places them in painter's order.
const BASE = (
  <g key="base">
    <path className="iso-halo" d={BASE_ART.halo} />
    {BASE_ART.feet.map((parts, i) => (
      <g key={i}>
        <Solid paths={parts[0]} tone="lo" />
        <Solid paths={parts[1]} tone="mid" />
      </g>
    ))}
    <Solid paths={BASE_ART.slab} tone="mid" />
    <Line d={BASE_ART.groove} tone="faint" />
    <Line d={BASE_ART.screwRings} tone="lo" />
    <Dots points={BASE_ART.screws} size={0.5} tone="mid" />
    <Solid paths={BASE_ART.label} tone="lo" crease="none" />
    <Line d={BASE_ART.labelLine} tone="faint" />
    <Line d={BASE_ART.labelRules} tone="lo" free />
    <Dots points={BASE_ART.labelScrews} size={0.45} tone="mid" />
    <Solid paths={BASE_ART.strip} tone="lo" crease="none" />
    <Line d={BASE_ART.minor} tone="lo" />
    <Line d={BASE_ART.major} tone="mid" />
  </g>
);

const PUMP = (
  <g key="pump">
    <Solid paths={PUMP_ART.flange} tone="lo" />
    <Solid paths={PUMP_ART.body} tone="mid" inner={<Line d={PUMP_ART.seams} tone="faint" />} />
    <Line d={PUMP_ART.ribs} tone="faint" />
    <Solid paths={PUMP_ART.top} tone="mid" />
    <Dots points={PUMP_ART.topBolts} size={0.45} tone="mid" />
    <Solid paths={PUMP_ART.cap} tone="mid" />
    <Line d={PUMP_ART.capRing} tone="lo" />
    <Solid paths={PUMP_ART.duct} tone="mid" />
    <Solid paths={PUMP_ART.collar} tone="mid" />
  </g>
);

const CHAMBER_BACK = (
  <g key="chamber-back">
    <Solid paths={CHAMBER_ART.floor} tone="lo" />
    <Line d={CHAMBER_ART.floorGrid} tone="faint" />
    <Solid paths={CHAMBER_ART.back} tone="mid" />
    <Solid paths={CHAMBER_ART.left} tone="mid" />
    <Line d={CHAMBER_ART.ports} tone="lo" />
  </g>
);

const DETECTOR = (
  <g key="detector">
    <Solid paths={DET_ART.foot} tone="lo" />
    <Solid paths={DET_ART.post} tone="mid" />
  </g>
);

const DET_HEAD = (
  <g key="det-head">
    <Solid paths={DET_ART.head} tone="hi" inner={<Line d={DET_ART.cageSeams} tone="faint" />} />
    <Line d={DET_ART.cage} tone="lo" />
    <Line d={DET_ART.window} tone="lo" />
  </g>
);

const STAGE = (
  <g key="stage">
    <Solid paths={STAGE_ART.base} tone="mid" />
    <Dots points={STAGE_ART.baseScrews} size={0.45} tone="mid" />
    {STAGE_ART.xRails.map((p, i) => <Solid key={i} paths={p} tone="mid" crease="none" />)}
    <Solid paths={STAGE_ART.x} tone="mid" />
    <Dots points={STAGE_ART.xScrews} size={0.45} tone="mid" />
    {STAGE_ART.yRails.map((p, i) => <Solid key={i} paths={p} tone="mid" crease="none" />)}
    <Solid paths={STAGE_ART.y} tone="mid" />
    <Dots points={STAGE_ART.yScrews} size={0.45} tone="mid" />
    <Solid paths={STAGE_ART.stubFoot} tone="mid" />
    <Solid paths={STAGE_ART.stub} tone="mid" />
    <Solid paths={STAGE_ART.die} tone="hi" />
    <Line d={STAGE_ART.scan} tone="lo" dotted />
    <Solid paths={STAGE_ART.pad} tone="hi" />
    <Solid paths={STAGE_ART.dust} tone="hi" crease="none" />
  </g>
);

const POLE = (
  <g key="pole">
    {POLE_ART.map((p, i) => <Solid key={i} paths={p} tone="mid" />)}
  </g>
);

const CHAMBER_FRONT = (
  <g key="chamber-front">
    <Solid paths={CHAMBER_ART.frontSill} tone="mid" />
    <Solid paths={CHAMBER_ART.rightSill} tone="mid" />
    <Dots points={CHAMBER_ART.sillBolts} size={0.45} tone="mid" />
    <Solid paths={CHAMBER_ART.roof} tone="mid" inner={<Line d={CHAMBER_ART.roofSeam} tone="faint" />} />
    <Line d={CHAMBER_ART.roofGroove} tone="faint" />
    <Line d={CHAMBER_ART.roofScrewRings} tone="lo" />
    <Dots points={CHAMBER_ART.roofScrews} size={0.5} tone="mid" />
    <Dots points={CHAMBER_ART.wallBolts} size={0.45} tone="mid" />
  </g>
);

const C = COLUMN_ART;
const COLUMN = (
  <g key="column">
    <Solid paths={C.boss} tone="mid" />
    <Solid paths={C.objective} tone="mid" inner={<Line d={C.objectiveSeam} tone="faint" />} />
    <Dots points={C.objectiveBolts} size={0.45} tone="mid" />
    <Solid paths={C.neck1} tone="mid" />
    <Solid paths={C.scan} tone="mid" inner={<Line d={C.scanSeams} tone="faint" />} />
    <Line d={C.scanRibs} tone="faint" />
    <Solid paths={C.neck2} tone="mid" />
    <Solid paths={C.condenser} tone="mid" inner={<Line d={C.condenserSeam} tone="faint" />} />
    <Dots points={C.condenserBolts} size={0.45} tone="mid" />
    <Solid paths={C.tube} tone="mid" />
    <Solid paths={C.gunFlange} tone="mid" />
    <Dots points={C.gunBolts} size={0.45} tone="mid" />
    <Solid paths={C.gun} tone="mid" inner={<Line d={C.gunSeam} tone="faint" />} />
    <Solid paths={C.cap} tone="mid" />
    <Solid paths={C.hv} tone="mid" />
    <Solid paths={C.hvCap} tone="mid" />
    <Line d={C.hvRing} tone="lo" />
  </g>
);

const MONITOR = (
  <g key="monitor">
    <Solid paths={MON_ART.stand} tone="lo" />
    <Solid paths={MON_ART.case} tone="mid" inner={<Line d={MON_ART.seam} tone="faint" />} />
    <Line d={MON_ART.vents} tone="lo" />
    <Dots points={MON_ART.screws} size={0.45} tone="mid" />
  </g>
);

const DESK = (
  <g key="desk">
    <Solid paths={DESK_ART.desk} tone="mid" />
    <Line d={DESK_ART.groove} tone="faint" />
    <Dots points={DESK_ART.screws} size={0.45} tone="mid" />
    <Line d={DESK_ART.rules} tone="lo" free />
    {DESK_ART.knobs.map((n, i) => (
      <g key={i}>
        <Line d={n.ring} tone="faint" />
        <Solid paths={n.body} tone="mid" />
        <Line d={n.knurl} tone="lo" />
        <Line d={n.pointer} tone="hi" free="end" />
      </g>
    ))}
    <Solid paths={DESK_ART.toggle} tone="mid" />
    <Solid paths={DESK_ART.lever} tone="mid" />
  </g>
);

export function SemArt({ label, words }: { label: string; words: { pixel: string; paused: string } }) {
  return (
    <SemLive
      label={label}
      words={words}
      base={BASE}
      pump={PUMP}
      chamberBack={CHAMBER_BACK}
      detector={DETECTOR}
      detHead={DET_HEAD}
      stage={STAGE}
      pole={POLE}
      chamberFront={CHAMBER_FRONT}
      column={COLUMN}
      monitor={MONITOR}
      desk={DESK}
    />
  );
}
