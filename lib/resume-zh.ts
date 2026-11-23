import type { Row } from "@/lib/resume";
import type { Tr } from "@/lib/t";

// Chinese resume (中文简历), shown on /zh/resume. Chinese résumés read like the Korean one at the top (personal line,
// education first, separate sections for campus experience, awards and certificates, a short 自我评价 at the end) and like
// the English one in the body (short result-first bullets with numbers, one page). They also state the target role at
// the top (求职意向). Same facts as lib/resume.ts and lib/resume-ko.ts; photo, age and gender are left out on purpose.
const Z = (s: string): Tr => ({ ko: s, en: s, zh: s });

export const nameZh = "郑晓儁 (JUNG HYOJUN)";
export const intentZh = "求职意向：工艺工程师（Process Engineer；薄膜、刻蚀、布线、先进封装）";

export const educationZh: Row[] = [
  {
    when: "2022.03 - 2027.02",
    title: Z("汉阳大学（ERICA 校区）材料化学工程系 · 本科（预计 2027 年 2 月毕业）"),
    sub: Z("GPA 4.05 / 4.5 · 主修课程：半导体工艺 A+、原子级薄膜工艺概论 A、高温反应动力学 A+、材料科学 I/II A+、流体力学 A+、反应工程 A、毕业设计 I/II A+"),
  },
];

export const projectsZh: Row[] = [
  {
    when: "2025.09 - 2026.06",
    href: "/projects/tgv-copper-filling",
    title: Z("毕业设计：TGV 铜电镀工艺窗口确定与时间缩短"),
    sub: Z("材料化学工程系 毕业设计 · 3 人团队组长（实验设计、28 次电镀中亲自完成 11 次、负责最终报告）"),
    points: [
      Z("按超声功率 8 档（0 ~ 60%）、DC 电流密度 7 档（−1.0 ~ −2.3 mA/cm²）分组实验，按失效定工艺窗口：40% 起镀层剥离，−2.3 出现 void"),
      Z("超声 30%（36 W）、DC −2.2 mA/cm² 下无 void、无 seam 填充，电镀时间 12 h → 11 h（8.3%，最终报告）；样品为 400 µm 硼硅玻璃（通孔入口 100 µm、中部 55 µm），环氧镶嵌、#400 ~ #4000 研磨后用 70 倍光学显微镜判定截面"),
      Z("报告后的单独实验：超声按周期开关以降低发热，可用功率提高到 45%，电镀时间 8.1 h（实验记录原件未留存，未做截面确认）"),
    ],
  },
  {
    when: "2026.04 - 至今",
    href: "/projects/gpu-hbm-channel-si",
    title: Z("GPU-HBM 芯片间流道冷却：信号完整性分析"),
    sub: Z("电子工程学部 热可靠性实验室 · 3 人团队组长"),
    points: [
      Z("把测量量定义为有水与无水之差 ΔS21，整理 22 个实体的规格表，并对照 STEP 文件在求解前查出 3 处几何错误"),
      Z("诊断 Lumped Port 失败原因后改用 Wave Port，得到无水基准线：20 GHz 时 S21 −11.37 dB（M3）、−14.65 dB（M1）；有水比较进行中"),
      Z("团队热分析结果（Fluent，半模型）：每条流道 5 ~ 10 mL/min 时，HBM PHY 最高温度降低 3.5 ~ 7.2 K"),
    ],
  },
  {
    when: "2026.03 - 2026.06",
    href: "/projects/atomic-layer-process",
    title: Z("原子级薄膜工艺：ALD 台阶覆盖与 ALE 刻蚀波动（文献调研）"),
    sub: Z("专业课程项目 · ALD 个人、ALE 3 人"),
    points: [
      Z("ALD（个人）：以台阶覆盖比较深宽比 50:1 以上 TSV 的 PVD 与 ALD，从覆盖、产能、翘曲整理局限"),
      Z("ALE（3 人）：按 6 个标准比较每周期刻蚀量波动的 7 个原因与 8 种对策，本人负责设备与环境维度（随时间漂移、片内不均匀）；结论是无单一最优解，先用无需改设备的对策（腔体调理、OES 终点检测）"),
    ],
  },
  {
    when: "2026.09 - 2026.11",
    href: "/projects/hbm-void-thermal",
    title: Z("HBM 键合层空洞（void）无损热检测仿真"),
    sub: Z("个人项目 · Python"),
    points: [
      Z("实现 12 层堆叠的 1D RC 热模型，与解析解偏差在 1% 以内；编写从瞬态热响应 Zth(t) 定位空洞层的模板拟合"),
      Z("测量噪声 0.1% 时，面积 2.5% 的空洞起 12 层全部检出率达 90% 以上（合成数据）"),
      Z("各层键合导热系数离散 1% 时检测极限退到约 13%：与测量仪器相比，极限更多由良品离散性决定"),
    ],
  },
];

export const campusZh: Row[] = [
  {
    when: "2026.11",
    href: "/projects/materials-ai-hackathon",
    title: Z("材料 AI 黑客马拉松 预赛 Private 第 10 名 / 34 队，晋级决赛"),
    sub: Z("韩国研究财团、韩国化学研究院承办 · GLfusion 队（模型开发与验证）"),
    points: [Z("预测未见固态电解质的离子电导率：按元素组合划分验证（随机划分 0.37，实际 1.01），ExtraTrees·kNN，Private Log10 MAE 1.2412")],
  },
  {
    when: "2024.09 - 2024.12",
    title: Z("留学生互助项目（한밀레）导师 · 汉阳大学 ERICA 国际处"),
    points: [Z("辅导来自台湾和中国大陆的 2 名留学生约 12 周，组织自行策划的 5 种交流活动")],
  },
];

export const awardsZh: Row[] = [
  {
    when: "2025.07",
    href: "/projects/smart-still-cool",
    title: Z("International 2025 S.M.A.R.T. Competition 激励奖（Incentive Prize）"),
    sub: Z("适用技术学会 · GNX 队 3 人 队长"),
    points: [Z("设计制冷不耗电的蒸发冷藏方案「Still Cool」（仅供水控制用太阳能）：建造成本 $75，30 年总成本 $135（电冰箱假设 $1,256）")],
  },
];

// 专业技能 split the way Chinese semiconductor résumé templates split it (工艺 / 表征 / 仿真与数据), each item marked
// 实操 (hands-on), 课程项目 or 培训; certificates and training are a separate 证书 section.
export const skillsZh: Row[] = [
  { when: "工艺", sub: Z("铜电镀 DC 与脉冲反向、化学镀 Ni 种子层、环氧镶嵌与抛光（实操）；CVD、ALD、干法刻蚀与 ALE 机理（课程项目）") },
  { when: "表征", sub: Z("VersaSTAT 4 电化学工作站与三电极体系、截面光学显微镜、FT-IR（实操）；SEM/TEM（培训）") },
  { when: "工艺优化", sub: Z("分组条件实验、按失效模式确定工艺窗口、void 与剥离的原因分析（毕业设计）") },
  { when: "仿真与数据", sub: Z("Python（NumPy、pandas、scikit-learn）、ANSYS HFSS、MATLAB、DFT 计算、Excel 回归与残差分析") },
  { when: "语言", sub: Z("韩语（母语）、英语（OPIc IH，2026.02）") },
];

export const certZh: Row[] = [
  { when: "2025.12", title: Z("FAB 工艺与失效分析工程师培训（40 小时）"), sub: Z("京畿道大学创新平台（成均馆大学）· 八大工艺、失效分析、SEM/TEM") },
  { when: "2026.04", title: Z("AMAT 现场实训（4 小时）· 韩国半导体产业协会（KSIA）") },
  { when: "2024.03 - 2025.12", title: Z("半导体材料纳米学位（金属布线材料、基板与散热材料）"), sub: Z("S²PEIN 半导体材料共享大学") },
];

export const selfZh: string[] = [
  "毕业设计中亲自完成 28 次 TGV 铜电镀中的 11 次，以截面判定 void 与剥离；另用 Python 热模型和 ANSYS HFSS 做过仿真分析。",
];

export const personalZh = "兵役：韩国陆军服役期满（兵长，2022.01 - 2023.07）";
