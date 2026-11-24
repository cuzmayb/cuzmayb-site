import { Plate } from "@/lib/iso/react/draw";
import type { Lang } from "@/lib/t";
import { SemArt } from "./art";
import { COLS, ROWS } from "./view";
import "@/lib/iso/iso.css";
import "@/lib/iso/site.css";
import "./sem.css";

const TEXT = {
  ko: {
    title: "SEM",
    hint: "눌러서 멈춤",
    pixel: "10 kV · 픽셀",
    paused: "멈춤",
    keys: ["전자빔", "튀어나온 이차전자", "모니터의 한 칸 = 시료의 한 점"],
    caption: `패널을 떼어 낸 탁상형 SEM. 전자총에서 나온 빔이 집속 렌즈와 대물 렌즈를 지나 시료에 닿고, 주사 코일이 그 점을 ${COLS}×${ROWS} 칸으로 한 줄씩 옮긴다. 점마다 튀어나온 이차전자를 뒤쪽 검출기가 세고, 모니터는 같은 칸을 그 세기만큼 밝힌다. 패드 가장자리와 먼지 한 톨이 밝게 나오는 것은 모서리와 돌출부에서 이차전자가 더 많이 빠져나오기 때문이다. 크기와 속도는 보기 쉽게 바꿨다.`,
    label: "SEM 모식도. 위에서부터 전자총, 집속 렌즈, 주사 코일, 대물 렌즈가 진공 챔버 위에 서 있고, 챔버 안에 스테이지와 시료, 뒤쪽에 이차전자 검출기가 있다. 빨간 전자빔이 시료를 한 칸씩 훑고, 옆의 모니터에 같은 순서로 영상이 채워진다. 누르면 멈춘다.",
  },
  en: {
    title: "SEM",
    hint: "Press to pause",
    pixel: "10 kV · pixel",
    paused: "Paused",
    keys: ["Electron beam", "Secondary electrons", "One cell on screen = one point on the sample"],
    caption: `A benchtop SEM with its panels off. The beam from the gun passes the condenser and objective lenses and lands on the sample, and the scan coils step that point across a ${COLS}×${ROWS} grid, row by row. The detector at the back counts the secondary electrons from each point, and the monitor lights the same cell by that count. The pad edges and one speck of dust come out bright because more secondary electrons escape from edges and bumps. Sizes and speed are changed for reading.`,
    label: "SEM schematic. From the top, the electron gun, condenser lens, scan coils and objective lens stand on a vacuum chamber; inside are the stage and sample, with a secondary-electron detector at the back. A red beam steps across the sample cell by cell and the monitor beside it fills in the same order. Press to pause.",
  },
  zh: {
    title: "SEM",
    hint: "点击暂停",
    pixel: "10 kV · 像素",
    paused: "已暂停",
    keys: ["电子束", "二次电子", "屏幕一格 = 样品上一点"],
    caption: `拆下面板的台式 SEM。电子枪发出的电子束经聚光镜和物镜落到样品上，扫描线圈把这个点按 ${COLS}×${ROWS} 的格子逐行移动。后方的探测器计数每个点逸出的二次电子，显示器按这个计数点亮同一格。焊盘边缘和一粒灰尘显得更亮，是因为边角和凸起处逸出的二次电子更多。尺寸和速度为便于观看有所调整。`,
    label: "SEM 示意图。自上而下，电子枪、聚光镜、扫描线圈和物镜立在真空腔上；腔内有样品台和样品，后方是二次电子探测器。红色电子束逐格扫过样品，旁边的显示器按同样顺序填满图像。点击暂停。",
  },
} satisfies Record<Lang, unknown>;

export function SemFigure({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <div className="iso cz">
      <Plate
        fig="Fig 1"
        title={t.title}
        hint={t.hint}
        readout={`${t.pixel} 0/${COLS * ROWS}`}
        keys={[
          { mark: "red", label: t.keys[0] },
          { mark: "dotted", label: t.keys[1] },
          { mark: "flat", label: t.keys[2] },
        ]}
        caption={t.caption}
      >
        <SemArt label={t.label} words={{ pixel: t.pixel, paused: t.paused }} />
      </Plate>
    </div>
  );
}
