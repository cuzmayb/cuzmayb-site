import type { Tr } from "@/lib/t";

// GPU-HBM Mk1: the HBM team's research package model. Footprints (mm) and thicknesses (µm) below are read from the
// Fusion documents "(Pure)GPU-HBM Mk1 Assembly" v16 and "GPU_HBM_Water_Actual_Dim" v5 (the latter is drawn at 10x, so
// its values are divided by 10 here). The viewer redraws them as a schematic; it does not ship the CAD geometry.
export type LevelId = "all" | "pkg" | "hbm" | "gpu" | "ipo";
export type Tone = "die" | "diel" | "metal" | "ink" | "mold";
// What a part's faces show beyond flat colour: bump arrays, the TSV column and memory banks of a DRAM die (regions from
// the team's power map), the TSV column and PHY block of the base die, polished silicon, a machined metal lid.
export type Skin = "bumps" | "dram" | "base" | "si" | "lines" | "rdl" | "board" | "paste" | "glass" | "resin";
// `col` puts a box in a side-by-side stack of its own (the GPU and each HBM); boxes without one are shared plates under
// those stacks, `above` plates sit over them in that order, and a `wrap` box encloses them (the mold).
export type Box = { layer: number; t: number; w?: number; d?: number; x?: number; z?: number; float?: boolean; col?: string; above?: number; wrap?: boolean };
export type Part = {
  id: string;
  name: Tr;
  spec: string; // real dimensions, language-neutral
  group?: Tr; // heading in the part list
  far?: boolean; // not GPU, HBM or interposer: moves off into a row above or below as the package opens
  about: Tr;
  tone: Tone;
  skin?: Skin;
  w: number;
  d: number;
  boxes: Box[];
  into?: LevelId;
  href?: string;
};
// Signal and power paths, drawn as thin lines through the points in order. Two points on the same layer are joined along
// that layer's top face; two on different layers are joined vertically, from the top of the lower layer (-1 = the floor)
// to the bottom of the upper one. `c` is the centre of the part a point rides with when the view spreads sideways.
export type Pt = { x: number; z: number; layer: number; col?: string; c?: [number, number] };
export type Route = { kind: "sig" | "pwr"; pts: Pt[] };
export type Level = { id: LevelId; name: Tr; up?: LevelId; parts: Part[]; routes?: Route[] };

const HBM_AT = [-20.5, 20.5].flatMap((x) => [-11.7, 0, 11.7].map((z) => ({ x, z })));
const TRACE_X = [-12, -6, 0, 6, 12];
const dies = (first: number, t: (i: number) => number): Box[] => Array.from({ length: 12 }, (_, i) => ({ layer: first + 3 * i, t: t(i) }));

const BASE: Record<Exclude<LevelId, "all">, Level> = {
  pkg: {
    id: "pkg",
    name: { ko: "패키지", en: "Package", zh: "封装" },
    parts: [
      {
        id: "lid", tone: "mold", w: 65, d: 65, boxes: [{ layer: 6, t: 3000 }], spec: "65 × 65 mm · 3 mm",
        name: { ko: "리드", en: "Lid", zh: "盖板" },
        about: { ko: "칩을 덮는 금속 뚜껑. 열을 넓게 퍼뜨린다.", en: "The metal cover over the chips. It spreads their heat out.", zh: "盖在芯片上的金属盖，把热量扩散开。" },
      },
      {
        id: "tim", tone: "diel", w: 54, d: 34.8, boxes: [{ layer: 5, t: 200 }], spec: "54 × 34.8 mm · 200 µm",
        name: { ko: "열전달 물질 (TIM)", en: "Thermal interface material", zh: "导热界面材料 (TIM)" },
        about: { ko: "칩과 뚜껑 사이를 메워 열을 전하는 물질.", en: "A paste that carries heat from the chips to the cover.", zh: "填在芯片与盖板之间、负责传热的材料。" },
      },
      {
        id: "emc", tone: "mold", w: 54, d: 34.8, boxes: [{ layer: 4, t: 775 }], spec: "54 × 34.8 mm · 775 µm",
        name: { ko: "몰딩 수지 (EMC)", en: "Mold compound (EMC)", zh: "塑封料 (EMC)" },
        about: { ko: "칩 사이와 둘레를 채워 굳힌 수지.", en: "Resin that fills in around the chips and holds them.", zh: "填充并固定芯片四周的树脂。" },
      },
      {
        id: "gpu", skin: "si", tone: "die", w: 28, d: 34.4, boxes: [{ layer: 4, t: 775 }], spec: "28 × 34.4 mm · 775 µm",
        name: { ko: "GPU 다이", en: "GPU die", zh: "GPU 芯片" },
        about: { ko: "연산을 하는 칩.", en: "The chip that does the computing.", zh: "负责运算的芯片。" },
      },
      {
        id: "hbm", skin: "si", tone: "die", w: 11, d: 11, boxes: HBM_AT.map((p) => ({ layer: 4, t: 775, ...p })), spec: "11 × 11 mm · 775 µm · ×6",
        name: { ko: "HBM", en: "HBM", zh: "HBM" },
        about: { ko: "GPU 옆에 놓인 고속 메모리. 얇은 칩을 여러 장 쌓았다.", en: "Fast memory beside the GPU: many thin chips stacked up.", zh: "GPU 旁的高速存储器，由多片薄芯片堆叠而成。" },
      },
      {
        id: "ipo", skin: "si", tone: "die", w: 54, d: 34.8, boxes: [{ layer: 3, t: 100 }], spec: "54 × 34.8 mm · 100 µm", into: "ipo", href: "/projects/gpu-hbm-channel-si",
        name: { ko: "실리콘 인터포저", en: "Silicon interposer", zh: "硅中介层" },
        about: { ko: "GPU와 HBM을 함께 올리는 실리콘 판. 둘 사이의 신호가 이 위로 지나간다.", en: "The silicon plate that carries the GPU and the HBMs. Signals between them run across it.", zh: "承载 GPU 和 HBM 的硅板，两者之间的信号从上面走过。" },
      },
      {
        id: "pillar", skin: "bumps", tone: "ink", w: 54, d: 34.8, boxes: [{ layer: 2, t: 70 }], spec: "54 × 34.8 mm · 70 µm",
        name: { ko: "Cu 필러 범프", en: "Cu pillar bumps", zh: "铜柱凸块" },
        about: { ko: "인터포저와 기판을 잇는 구리 기둥들.", en: "Copper posts joining the interposer to the board below.", zh: "连接中介层与基板的铜柱。" },
      },
      {
        id: "lam", tone: "diel", w: 65, d: 65, boxes: [{ layer: 1, t: 300 }], spec: "65 × 65 mm · 300 µm",
        name: { ko: "기판", en: "Laminate", zh: "基板" },
        about: { ko: "패키지 바닥의 기판.", en: "The base board of the package.", zh: "封装底部的基板。" },
      },
      {
        id: "bga", skin: "bumps", tone: "ink", w: 65, d: 65, boxes: [{ layer: 0, t: 400 }], spec: "not in the model",
        name: { ko: "솔더 볼 (BGA)", en: "Solder balls (BGA)", zh: "焊球 (BGA)" },
        about: { ko: "패키지를 메인보드에 붙이는 땜납 볼.", en: "Solder balls that attach the package to the motherboard.", zh: "把封装焊到主板上的焊球。" },
      },
    ],
    routes: [
      // Signal: GPU edge -> down through its microbumps -> across the interposer wiring -> up into each HBM under its PHY.
      ...[-1, 1].flatMap((sx) => [-11.7, 0, 11.7].flatMap((hz) => [-2.5, 0, 2.5].map((dz): Route => {
        const c: [number, number] = [sx * 20.5, hz], z = hz + dz;
        return { kind: "sig", pts: [{ x: sx * 13, z, layer: 4 }, { x: sx * 13, z, layer: 3 }, { x: sx * 17.75, z, layer: 3, c }, { x: sx * 17.75, z, layer: 4, c }] };
      }))),
      // Power: up from the board through the solder balls, laminate, pillar bumps and interposer into the GPU ...
      ...[-7, 0, 7].flatMap((x) => [-9, 9].map((z): Route => ({ kind: "pwr", pts: [{ x, z, layer: 0 }, { x, z, layer: 4 }] }))),
      // ... and into each HBM.
      ...[-1, 1].flatMap((sx) => [-11.7, 0, 11.7].map((hz): Route => {
        const c: [number, number] = [sx * 20.5, hz], x = sx * 23.5;
        return { kind: "pwr", pts: [{ x, z: hz, layer: 0 }, { x, z: hz, layer: 3 }, { x, z: hz, layer: 3, c }, { x, z: hz, layer: 4, c }] };
      })),
    ],
  },
  hbm: {
    id: "hbm",
    up: "pkg",
    name: { ko: "HBM 적층", en: "HBM stack", zh: "HBM 堆叠" },
    parts: [
      {
        id: "dram", skin: "dram", tone: "die", w: 10.6, d: 10.6, boxes: dies(5, (i) => (i === 11 ? 169 : 41)), spec: "10.6 × 10.6 mm · 41 µm × 11, 169 µm × 1",
        name: { ko: "DRAM 다이", en: "DRAM dies", zh: "DRAM 芯片" },
        about: { ko: "기억 소자가 있는 다이 12장. 아래 11장은 41 µm로 얇게 갈았고, 맨 위 한 장만 169 µm로 두껍다.", en: "Twelve memory dies. The lower eleven are thinned to 41 µm; only the top one is thick, at 169 µm.", zh: "共 12 片存储芯片。下面 11 片减薄至 41 µm，只有最上面一片较厚，为 169 µm。" },
      },
      {
        id: "dbeol", skin: "lines", tone: "metal", w: 10.6, d: 10.6, boxes: dies(4, () => 3), spec: "3 µm × 12",
        name: { ko: "DRAM 배선층 (BEOL)", en: "DRAM wiring layer (BEOL)", zh: "DRAM 布线层 (BEOL)" },
        about: { ko: "각 DRAM 다이 아랫면의 금속 배선층.", en: "The metal wiring on the underside of each DRAM die.", zh: "每片 DRAM 芯片底面的金属布线层。" },
      },
      {
        id: "bond", tone: "ink", w: 10.6, d: 10.6, boxes: dies(3, () => 2), spec: "2 µm × 12", href: "/projects/hbm-void-thermal",
        name: { ko: "하이브리드 본딩층", en: "Hybrid bonding layer", zh: "混合键合层" },
        about: { ko: "다이와 다이를 범프 없이 맞붙인 층. 여기에 빈틈(void)이 생기면 위로 가는 열길이 막힌다.", en: "Where die meets die with no bumps in between. A void here blocks the heat path upward.", zh: "芯片之间不用凸块直接键合的层。此处若有空洞，向上的散热路径就会受阻。" },
      },
      {
        id: "base", skin: "base", tone: "die", w: 11, d: 11, boxes: [{ layer: 2, t: 50 }], spec: "11 × 11 mm · 50 µm",
        name: { ko: "베이스 다이", en: "Base die", zh: "基底芯片" },
        about: { ko: "맨 아래 로직 다이. DRAM보다 사방으로 0.2 mm 넓다. GPU와 신호를 주고받는 회로(PHY)와 TSV 영역이 있다.", en: "The logic die at the bottom, 0.2 mm wider than the DRAM dies on every side. It holds the PHY that talks to the GPU and the TSV region.", zh: "最底部的逻辑芯片，四周比 DRAM 宽 0.2 mm，包含与 GPU 通信的 PHY 电路和 TSV 区域。" },
      },
      {
        id: "bbeol", skin: "lines", tone: "metal", w: 11, d: 11, boxes: [{ layer: 1, t: 5 }], spec: "5 µm",
        name: { ko: "베이스 다이 배선층 (BEOL)", en: "Base die wiring layer (BEOL)", zh: "基底芯片布线层 (BEOL)" },
        about: { ko: "베이스 다이 아랫면의 금속 배선층.", en: "The metal wiring on the underside of the base die.", zh: "基底芯片底面的金属布线层。" },
      },
      {
        id: "ubump", skin: "bumps", tone: "ink", w: 11, d: 11, boxes: [{ layer: 0, t: 40 }], spec: "40 µm",
        name: { ko: "마이크로범프와 언더필", en: "Microbumps and underfill", zh: "微凸块与底部填充" },
        about: { ko: "HBM을 인터포저에 잇는 작은 땜납 접점과 그 사이를 메운 수지. 모델에서는 한 층으로 묶었다.", en: "The small solder joints that connect the HBM to the interposer, with the resin between them. One slab in the model.", zh: "将 HBM 连接到中介层的微小焊点及其间填充的树脂，模型中合为一层。" },
      },
    ],
    routes: [
      // Signal: in under the PHY -> along the base die to the TSV column -> straight up through every DRAM die.
      ...[-3, 0, 3].map((z): Route => ({ kind: "sig", pts: [{ x: -2.75, z, layer: -1 }, { x: -2.75, z, layer: 2 }, { x: 0, z, layer: 2 }, { x: 0, z, layer: 38 }] })),
      // Power also climbs the TSV column.
      ...[-1.5, 1.5].map((z): Route => ({ kind: "pwr", pts: [{ x: 0.7, z, layer: -1 }, { x: 0.7, z, layer: 38 }] })),
    ],
  },
  gpu: {
    id: "gpu",
    up: "pkg",
    name: { ko: "GPU 다이", en: "GPU die", zh: "GPU 芯片" },
    parts: [
      {
        id: "carrier", skin: "si", tone: "die", w: 28, d: 34.4, boxes: [{ layer: 5, t: 731.2 }], spec: "28 × 34.4 mm · 731 µm",
        name: { ko: "실리콘 캐리어", en: "Silicon carrier", zh: "硅载片" },
        about: { ko: "다이 두께의 대부분을 차지하는 실리콘. 얇은 회로층을 받쳐 준다.", en: "The silicon that makes up most of the die thickness and supports the thin circuit layers.", zh: "占芯片厚度绝大部分的硅，用来支撑很薄的电路层。" },
      },
      {
        id: "gbond", tone: "ink", w: 28, d: 34.4, boxes: [{ layer: 4, t: 0.5 }], spec: "0.5 µm",
        name: { ko: "캐리어 본딩층", en: "Carrier bonding layer", zh: "载片键合层" },
        about: { ko: "회로층을 실리콘 캐리어에 붙인 층.", en: "Bonds the circuit layers to the silicon carrier.", zh: "将电路层键合到硅载片上的层。" },
      },
      {
        id: "gbeol", skin: "lines", tone: "metal", w: 28, d: 34.4, boxes: [{ layer: 3, t: 1.4 }], spec: "1.4 µm",
        name: { ko: "신호 배선층 (BEOL)", en: "Signal wiring (BEOL)", zh: "信号布线层 (BEOL)" },
        about: { ko: "트랜지스터 사이를 잇는 금속 배선층.", en: "The metal wiring that connects the transistors.", zh: "连接晶体管的金属布线层。" },
      },
      {
        id: "feol", tone: "ink", w: 28, d: 34.4, boxes: [{ layer: 2, t: 0.2 }], spec: "0.2 µm",
        name: { ko: "트랜지스터 층 (FEOL)", en: "Transistor layer (FEOL)", zh: "晶体管层 (FEOL)" },
        about: { ko: "트랜지스터가 있는 층. 열이 실제로 나는 곳이다.", en: "Where the transistors are, and where the heat is actually generated.", zh: "晶体管所在的层，也是实际发热的地方。" },
      },
      {
        id: "bspdn", skin: "lines", tone: "metal", w: 28, d: 34.4, boxes: [{ layer: 1, t: 1.7 }], spec: "1.7 µm",
        name: { ko: "후면 전력 공급망 (BSPDN)", en: "Backside power delivery (BSPDN)", zh: "背面供电网络 (BSPDN)" },
        about: { ko: "트랜지스터 아래쪽에서 전력을 넣어 주는 배선층.", en: "The wiring that feeds power in from below the transistors.", zh: "从晶体管下方供电的布线层。" },
      },
      {
        id: "gubump", skin: "bumps", tone: "ink", w: 28, d: 34.4, boxes: [{ layer: 0, t: 40 }], spec: "40 µm",
        name: { ko: "마이크로범프", en: "Microbumps", zh: "微凸块" },
        about: { ko: "GPU를 인터포저에 잇는 접점 층.", en: "The joints that connect the GPU to the interposer.", zh: "将 GPU 连接到中介层的焊点层。" },
      },
    ],
  },
  ipo: {
    id: "ipo",
    up: "all",
    name: { ko: "인터포저 신호선", en: "Interposer signal lines", zh: "中介层信号线" },
    parts: [
      {
        id: "nitride", tone: "diel", w: 30, d: 22, boxes: [{ layer: 5, t: 1 }], spec: "1 µm",
        name: { ko: "질화막 (Si₃N₄)", en: "Nitride (Si₃N₄)", zh: "氮化硅 (Si₃N₄)" },
        about: { ko: "배선층 맨 위를 덮는 보호막.", en: "The passivation that caps the wiring layers.", zh: "覆盖在布线层最上方的保护膜。" },
      },
      {
        id: "sig", tone: "ink", w: 2, d: 22, boxes: [...TRACE_X.map((x) => ({ layer: 4, t: 1, x, float: true })), ...TRACE_X.map((x) => ({ layer: 2, t: 1, x, float: true }))], spec: "2 µm wide · 6 µm pitch · 1 µm", href: "/projects/gpu-hbm-channel-si",
        name: { ko: "신호선 (M1, M3)", en: "Signal lines (M1, M3)", zh: "信号线 (M1, M3)" },
        about: { ko: "GPU와 HBM 사이를 오가는 신호선. 두 층에 다섯 가닥씩 있다. 아래층(M3)은 위아래 접지면 사이에 낀 스트립라인이고, 위층(M1)은 아래에만 접지면이 있는 마이크로스트립이다.", en: "The lines that carry signals between the GPU and the HBM: five in each of two layers. The lower layer (M3) is a stripline between two ground planes; the upper layer (M1) is a microstrip with a ground plane only beneath it.", zh: "GPU 与 HBM 之间的信号线。两层各五条。下层 (M3) 夹在上下接地面之间，是带状线；上层 (M1) 只有下方有接地面，是微带线。" },
      },
      {
        id: "oxide", tone: "mold", w: 30, d: 22, boxes: [{ layer: 4, t: 2 }, { layer: 2, t: 3 }], spec: "2 µm, 3 µm",
        name: { ko: "산화막 (SiO₂)", en: "Oxide (SiO₂)", zh: "氧化硅 (SiO₂)" },
        about: { ko: "신호선을 감싸 서로 떼어 놓는 절연층.", en: "The insulator that surrounds the signal lines and keeps them apart.", zh: "包裹信号线并将其彼此隔开的绝缘层。" },
      },
      {
        id: "gnd", tone: "metal", w: 30, d: 22, boxes: [{ layer: 3, t: 1 }, { layer: 1, t: 1 }], spec: "1 µm × 2",
        name: { ko: "접지면 (M2, M4)", en: "Ground planes (M2, M4)", zh: "接地面 (M2, M4)" },
        about: { ko: "신호선 층 사이에 놓인 금속판. 신호가 새거나 옆 줄과 섞이는 것을 줄인다.", en: "Metal planes between the signal layers that keep the signal from leaking or coupling to its neighbours.", zh: "位于信号层之间的金属平面，减少信号泄漏和相邻线之间的串扰。" },
      },
      {
        id: "isi", skin: "si", tone: "die", w: 30, d: 22, boxes: [{ layer: 0, t: 95 }], spec: "95 µm",
        name: { ko: "인터포저 실리콘", en: "Interposer silicon", zh: "中介层硅" },
        about: { ko: "배선층을 받치는 실리콘 몸체. 여기서는 폭 30 µm만 잘라 그렸다.", en: "The silicon body under the wiring layers. Only a 30 µm wide strip is drawn here.", zh: "支撑布线层的硅本体，这里只画出宽 30 µm 的一段。" },
      },
    ],
  },
};

// The one scene the viewer opens on: the whole package. As it spreads, everything that is not GPU, HBM or interposer
// moves away; spread further and the GPU and the six HBMs open into their own layers. Built from the levels above.
const pk = (id: string) => BASE.pkg.parts.find((p) => p.id === id)!;
const GROUP = {
  pkg: { ko: "패키지", en: "Package", zh: "封装" },
  gpu: { ko: "로직 다이 (GPU)", en: "Logic die (GPU)", zh: "逻辑芯片 (GPU)" },
  hbm: { ko: "HBM", en: "HBM", zh: "HBM" },
  ipo: { ko: "그 아래", en: "Underneath", zh: "下方" },
};
const far = (id: string, box: Partial<Box>, skin?: Skin): Part => ({ ...pk(id), ...(skin ? { skin } : {}), far: true, group: GROUP.pkg, boxes: [{ layer: 0, t: pk(id).boxes[0].t, ...box }] });
const all: Level = {
  id: "all",
  name: { ko: "GPU-HBM 패키지", en: "GPU-HBM package", zh: "GPU-HBM 封装" },
  // Kept coarse on purpose: three layers for the GPU, base die plus twelve DRAM dies for each HBM. The wiring and
  // bonding films between them are folded into their neighbours, which keeps the scene light and readable.
  parts: [
    far("lid", { above: 2 }, "glass"), far("tim", { above: 1 }, "paste"), far("emc", { wrap: true }, "resin"),
    far("lam", { layer: 1 }, "board"), far("pillar", { layer: 2 }), far("bga", { layer: 0 }),
    {
      id: "gsi", skin: "si", tone: "die", w: 28, d: 34.4, group: GROUP.gpu, spec: "731 µm", boxes: [{ layer: 2, t: 731, col: "g" }],
      name: { ko: "실리콘", en: "Silicon", zh: "硅" },
      about: { ko: "칩의 몸체인 실리콘.", en: "The silicon body of the chip.", zh: "芯片的硅本体。" },
    },
    {
      id: "gckt", skin: "lines", tone: "ink", w: 28, d: 34.4, group: GROUP.gpu, spec: "about 4 µm", boxes: [{ layer: 1, t: 4, col: "g" }],
      name: { ko: "회로층", en: "Circuit layer", zh: "电路层" },
      about: { ko: "트랜지스터가 있는 얇은 층. 연산이 일어나고 열이 난다.", en: "The thin layer of transistors, where the computing happens and the heat comes from.", zh: "晶体管所在的薄层，运算在此进行，热量也由此产生。" },
    },
    {
      id: "gbump", skin: "bumps", tone: "ink", w: 28, d: 34.4, group: GROUP.gpu, spec: "40 µm", boxes: [{ layer: 0, t: 40, col: "g" }],
      name: { ko: "마이크로범프", en: "Microbumps", zh: "微凸块" },
      about: { ko: "GPU와 인터포저를 잇는 작은 접점들.", en: "Tiny joints between the GPU and the interposer.", zh: "连接 GPU 与中介层的微小焊点。" },
    },
    {
      id: "hdram", skin: "dram", tone: "die", w: 10.6, d: 10.6, group: GROUP.hbm, spec: "12 dies", href: "/projects/hbm-void-thermal",
      boxes: HBM_AT.flatMap((at, i) => Array.from({ length: 12 }, (_, j) => ({ layer: 2 + j, t: j === 11 ? 174 : 46, col: `h${i}`, ...at }))),
      name: { ko: "DRAM 다이 12장", en: "Twelve DRAM dies", zh: "12 片 DRAM 芯片" },
      about: { ko: "데이터를 저장하는 칩 12장. 가운데 점들이 위아래를 잇는 통로다.", en: "Twelve chips that store data. The dots down the middle are the paths linking them.", zh: "12 片存储数据的芯片，中间的点是上下贯通的通道。" },
    },
    {
      id: "hbase", skin: "base", tone: "die", w: 11, d: 11, group: GROUP.hbm, spec: "55 µm", boxes: HBM_AT.map((at, i) => ({ layer: 1, t: 55, col: `h${i}`, ...at })),
      name: { ko: "베이스 다이", en: "Base die", zh: "基底芯片" },
      about: { ko: "맨 아래 칩. GPU에서 온 신호를 위쪽 메모리로 올려 보낸다.", en: "The bottom chip. It passes signals from the GPU up to the memory above.", zh: "最底部的芯片，把来自 GPU 的信号送往上方的存储芯片。" },
    },
    {
      id: "hbump", skin: "bumps", tone: "ink", w: 11, d: 11, group: GROUP.hbm, spec: "40 µm", boxes: HBM_AT.map((at, i) => ({ layer: 0, t: 40, col: `h${i}`, ...at })),
      name: { ko: "마이크로범프", en: "Microbumps", zh: "微凸块" },
      about: { ko: "HBM과 인터포저를 잇는 작은 접점들.", en: "Tiny joints between the HBM and the interposer.", zh: "连接 HBM 与中介层的微小焊点。" },
    },
    { ...pk("ipo"), skin: "rdl", group: GROUP.ipo, boxes: [{ layer: 3, t: 100 }] },
  ],
  routes: HBM_AT.flatMap(({ x, z }, i): Route[] => {
    const sx = Math.sign(x), col = `h${i}`, c: [number, number] = [x, z], f = z + (z < 0 ? -5.4 : 5.4);
    return [
      // Signal: from the GPU's circuit layer down through its bumps, across the interposer wiring, up under the HBM's
      // PHY, along the base die to the TSV column, then up through every DRAM die. One line per HBM, drawn on an outer
      // face of the stack so the climb stays visible.
      { kind: "sig", pts: [
        { x: sx * 13.5, z: f, col: "g", layer: 1 }, { x: sx * 13.5, z: f, layer: 3 }, { x: x - sx * 2.75, z: f, layer: 3, c },
        { x: x - sx * 2.75, z: f, col, layer: 1, c }, { x, z: f, col, layer: 1, c }, { x, z: f, col, layer: 13, c },
      ] },
      // Power: in from below the interposer, then up the HBM's TSV column.
      { kind: "pwr", pts: [{ x: x + sx * 0.9, z: f, layer: -1, c }, { x: x + sx * 0.9, z: f, col, layer: 13, c }] },
    ];
  }).concat(
    // Power into the GPU's circuit layer.
    [-8, 8].flatMap((x) => [-17.6, 17.6].map((z): Route => ({ kind: "pwr", pts: [{ x, z, layer: -1 }, { x, z, col: "g", layer: 1 }] }))),
  ),
};

export const LEVELS: Record<LevelId, Level> = { ...BASE, all };
