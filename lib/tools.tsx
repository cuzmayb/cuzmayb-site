import { T, type Tr } from "@/lib/t";

// Three levels, shown as a 3-segment meter (reference: 주요 도구 / 활용 가능 / 사용 경험).
type Level = 1 | 2 | 3;
const LEVEL: Record<Level, Tr> = {
  3: { ko: "주요 도구", en: "Daily driver", zh: "主要工具" },
  2: { ko: "활용 가능", en: "Comfortable", zh: "能熟练使用" },
  1: { ko: "사용 경험", en: "Have used", zh: "用过" },
};

// Levels follow evidence in the vault (code, reports, models). TODO(owner): adjust to your own judgement.
// Six cards, two per row (one on phones), paired so each row holds a similar number of tools.
const GROUPS: { name: Tr; tools: { name: string | Tr; level: Level }[] }[] = [
  {
    name: { ko: "계산·코드", en: "Computation", zh: "计算·代码" },
    tools: [
      { name: "Python", level: 3 },
      { name: "NumPy · SciPy", level: 3 },
      { name: "pandas", level: 2 },
      { name: "scikit-learn", level: 2 },
      { name: "mpmath", level: 2 },
      { name: "LangChain · LangGraph", level: 1 },
    ],
  },
  {
    name: { ko: "해석·설계", en: "Simulation & design", zh: "仿真·设计" },
    tools: [
      { name: "Fusion 360", level: 2 },
      { name: "ANSYS HFSS", level: 2 },
      { name: "MATLAB", level: 2 },
      { name: "Polymath", level: 2 },
      { name: "ANSYS Thermal", level: 1 },
      { name: "DFT", level: 1 },
    ],
  },
  {
    name: { ko: "AI", en: "AI", zh: "AI" },
    tools: [
      { name: "Claude", level: 3 },
      { name: "Claude Code", level: 3 },
      { name: "ChatGPT", level: 3 },
      { name: "Gemini", level: 2 },
      { name: "Ollama", level: 2 },
      { name: "Hermes Agent", level: 2 },
      { name: "Mausbot", level: 2 },
    ],
  },
  {
    name: { ko: "문서·기록", en: "Documents & notes", zh: "文档·记录" },
    tools: [
      { name: "Notion", level: 3 },
      { name: "Obsidian", level: 3 },
      { name: "Markdown", level: 3 },
      { name: "Excel", level: 3 },
      { name: "PowerPoint", level: 3 },
      { name: "Git · GitHub", level: 1 },
    ],
  },
  {
    name: { ko: "공정 실습", en: "Process work", zh: "工艺实操" },
    tools: [
      { name: { ko: "전해도금", en: "Electroplating", zh: "电镀" }, level: 2 },
      { name: "Cross section", level: 2 },
      { name: "Polishing", level: 2 },
    ],
  },
  {
    name: { ko: "분석 장비", en: "Analysis", zh: "分析设备" },
    tools: [
      { name: { ko: "광학현미경(OM)", en: "Optical microscope", zh: "光学显微镜" }, level: 2 },
      { name: "FT-IR", level: 1 },
      { name: "XRD", level: 1 },
      { name: "SEM · TEM", level: 1 },
    ],
  },
];

function Meter({ level }: { level: Level }) {
  return (
    <span className="meter" aria-hidden="true">
      {[1, 2, 3].map((i) => <span key={i} data-on={i <= level} />)}
    </span>
  );
}

// Every card stays open (owner's choice 2026-11-19): the tools are read at a glance, not dug for.
export function Tools() {
  return (
    <section className="tools">
      <h2 className="tools-title"><T ko="사용하는 도구" en="Tools I use" zh="使用的工具" /></h2>
      <p className="tools-lead">
        <T ko="지금 작업에서 쓰는 정도를 세 단계로 나눴습니다." en="Three levels, by how I actually use them now." zh="按当前实际使用程度分为三级。" />
      </p>
      <div className="tools-legend">
        {([3, 2, 1] as Level[]).map((l) => <span key={l}><Meter level={l} /><T {...LEVEL[l]} /></span>)}
      </div>
      <div className="tools-groups">
        {GROUPS.map((g, i) => (
          <div key={i} className="tools-card">
            <h3 className="tools-name"><T {...g.name} /></h3>
            <ul className="tools-list">
                {g.tools.map((t) => (
                  <li key={typeof t.name === "string" ? t.name : t.name.ko}>
                    <span className="tools-tool">{typeof t.name === "string" ? t.name : <T {...t.name} />}</span>
                    <span className="tools-level"><Meter level={t.level} /><T {...LEVEL[t.level]} /></span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
