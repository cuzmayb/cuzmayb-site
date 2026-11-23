import type { Row } from "@/lib/resume";
import type { Tr } from "@/lib/t";

// Korean resume, written the way Korean hiring forms read: a short core-competency summary, then education with GPA and
// credits, language and licences, job-related training with the issuing body and hours, project experience with role and
// numbers in short noun-ending lines, awards and activities, and military service. Official Korean names and dates come
// from the vault note 「1a2 지원서 기본사항」 (checked against submitted forms). The English resume (lib/resume.ts) is a
// separate document written as a global CV. Left out on purpose, as in the English one: phone, date of birth, address.
const K = (s: string): Tr => ({ ko: s, en: s, zh: s });

export const nameKo = "정효준";
export const interestKo = "지원 직무 : 공정 엔지니어 (박막·식각·배선, 어드밴스드 패키징)";
export const personalKo = "병역 : 군필 (육군 병장 만기제대, 2022.01 - 2023.07)";

// Top third of the page: major and grades, hands-on experiment volume, the result the final report supports, and the
// analysis side. Numbers here are the ones the project pages can back with a source file.
export const summaryKo: string[] = [
  "재료화학공학 전공, 전체 평점 4.05/4.5 (반도체공정 A+, 원자수준박막공정개론 A)",
  "실험: TGV Cu 전해도금 28회 중 11회 직접 수행(1회 약 11시간), 단면 연마 후 광학현미경으로 void·박리 판정",
  "대표 결과: 초음파 40%부터 박리, −2.3 mA/cm²에서 void가 나는 것을 확인해 공정 창을 30%·−2.2 mA/cm²로 정하고 void 없이 충전 (12h → 11h)",
  "해석: Python 1D 열 모델로 HBM 본딩층 void 검출 한계 계산, ANSYS HFSS로 인터포저 신호선 S-파라미터 기준선 해석",
];

export const educationKo: Row[] = [
  { when: "2022.03 - 2027.02", title: K("한양대학교(ERICA) 재료화학공학과 졸업예정"), sub: K("전체 평점 4.05 / 4.5 · 131학점") },
  { when: "전공 이수과목", sub: K("반도체공정 A+, 원자수준박막공정개론 A, 고온반응속도론 A+, 재료과학1·2 A+, 유체역학론 A+, 반응공학 A, 캡스톤디자인1·2 A+") },
];

export const licenseKo: Row[] = [
  { when: "2026.02", title: K("OPIc 영어 Intermediate High (IH)"), sub: K("ACTFL") },
  { when: "2021.02", title: K("자동차운전면허 1종 보통") },
];

export const trainingKo: Row[] = [
  { when: "2025.12", title: K("FAB 공정 및 불량분석 엔지니어 양성과정 (40시간)"), sub: K("경기도 대학혁신플랫폼(성균관대) · 8대 공정, 불량분석 기법, SEM/TEM") },
  { when: "2026.07 - 2026.08", title: K("반도체 패키징·공정 온라인 과정 13개 (137시간)"), sub: K("한국기술교육대 온라인평생교육원(STEP) · 플립칩, 와이어본딩, 팬아웃, WLP, 이종접합, 패키지 공정") },
  { when: "2024.03 - 2025.12", title: K("반도체 소재 나노디그리 (금속 배선 소재, 기판 및 방열 소재)"), sub: K("S²PEIN 반도체 소재 공유대학") },
  { when: "2026.04", title: K("AMAT 현장실습 (4시간)"), sub: K("한국반도체산업협회(KSIA)") },
  { when: "2025.09 - 2025.12", title: K("이차전지 특성화 비교과 (DFT 시뮬레이션)"), sub: K("한양대 ERICA 이차전지 특성화대학 사업단") },
  { when: "2026.05 - 2026.07", title: K("AI 교육 2건 (42시간)"), sub: K("AI반도체 활용·응용 12시간(KAIT) · 생성형 AI와 AI 에이전트 개발 30시간(숭실대)") },
];

export const projectsKo: Row[] = [
  {
    when: "2025.09 - 2026.06",
    href: "/projects/tgv-copper-filling",
    title: K("캡스톤디자인: TGV Cu 전해도금 공정 창 설정과 시간 단축"),
    sub: K("재료화학공학과 캡스톤디자인 · 3인 팀 팀장 (실험 설계, 도금 28회 중 11회 수행, 최종 보고서 총괄)"),
    points: [
      K("초음파 출력 8수준과 DC 전류밀도 7수준으로 나눠 실험, 실패 조건으로 공정 창 정의: 40%부터 도금층 박리, −2.3 mA/cm²에서 void"),
      K("초음파 30%(36 W)·DC −2.2 mA/cm²에서 void·seam 없이 충전, 도금 시간 12h → 11h (8.3%, 최종 보고서)"),
      K("시편: 붕규산 유리 400 µm, 비아 입구 100 µm·중앙 55 µm. 에폭시 몰딩, #400 ~ #4000 연마 후 광학현미경 70배로 단면 판정"),
      K("보고서 이후 단독 실험: 초음파를 켜고 끄는 방식으로 발열을 낮춰 출력 45%, 8.1h까지 단축 (단면 검증 전)"),
    ],
  },
  {
    when: "2026.04 - 진행 중",
    href: "/projects/gpu-hbm-channel-si",
    title: K("GPU-HBM 칩 사이 수로 냉각: 신호무결성 해석"),
    sub: K("전자공학부 연구실 프로젝트 · 3인 팀 팀장"),
    points: [
      K("측정량을 물 유무에 따른 ΔS21로 정의하고, 22개 바디의 물성·좌표를 표로 정리해 HFSS 모델 사양을 확정"),
      K("STEP 파일을 사양표와 대조해 해석 전 형상 오류 3건 발견 (배선 피치 8 µm vs 사양 6 µm, 적층 1 µm 어긋남, 주기 경계 불성립)"),
      K("Lumped Port 실패 원인을 진단해 Wave Port로 전환, 물 없는 기준선 확보: 20 GHz에서 S21 −11.37 dB(M3), −14.65 dB(M1). 물 유무 비교는 진행 중"),
      K("팀 열해석 결과(Fluent, 절반 모델): 수로당 5 ~ 10 mL/min에서 HBM PHY 최고온도 3.5 ~ 7.2 K 저감"),
    ],
  },
  {
    when: "2026.09 - 2026.11",
    href: "/projects/hbm-void-thermal",
    title: K("HBM 본딩층 void 비파괴 열 검사 시뮬레이션"),
    sub: K("개인 프로젝트 · Python"),
    points: [
      K("12단 스택의 1D RC 열 모델을 구현하고 해석해와 1% 안으로 검증, 과도 열응답 Zth(t)에서 void 층을 찾는 템플릿 피팅 작성"),
      K("측정 노이즈 0.1%에서 면적 2.5% void부터 12층 모두 90% 이상 검출 (합성 데이터)"),
      K("층별 본딩 열전도도가 1%만 흩어져도 검출 한계가 약 13%로 후퇴: 한계를 정하는 것은 계측기보다 양품 산포"),
    ],
  },
  {
    when: "2026.03 - 2026.06",
    href: "/projects/atomic-layer-process",
    title: K("원자수준박막공정: ALD 단차피복과 ALE 식각 산포 (문헌 조사)"),
    sub: K("전공 수업 프로젝트 · ALD 개인, ALE 3인"),
    points: [
      K("ALD(개인): 종횡비 50:1 이상 TSV에서 PVD·ALD를 단차피복 한 축으로 비교, 한계를 피복성·생산성·휨으로 정리"),
      K("ALE(3인): 사이클당 식각량 산포 원인 7개와 해결책 8개를 6개 기준으로 비교, 본인은 장비·환경 축(시간에 따른 drift, 면내 불균일) 담당"),
      K("결론: 단일 최적해 없음. 장비 변경 없는 대책(챔버 컨디셔닝, OES 종말점 검출)을 먼저, 이후 APC·R2R 제어"),
    ],
  },
];

export const activitiesKo: Row[] = [
  {
    when: "2025.05 - 2025.07",
    href: "/projects/smart-still-cool",
    title: K("2025 국제 SMART 지속가능기술 경진대회 Incentive Prize"),
    sub: K("적정기술학회 · 팀 GNX 3인 팀 리더"),
    points: [K("냉각에 전력을 쓰지 않는 증발 냉장 설계 「Still Cool」: 구축비 $75, 30년 총비용 $135 (전기냉장고 가정 $1,256)")],
  },
  {
    when: "2026.11",
    href: "/projects/materials-ai-hackathon",
    title: K("소재 AI 해커톤 예선 10위 / 34팀, 본선 진출"),
    sub: K("한국연구재단·한국화학연구원 주관 · 팀 GLfusion (모델 개발·검증)"),
    points: [K("처음 보는 고체전해질의 이온전도도 예측: 원소 조합 단위 검증을 설계해 무작위 분할(0.37)과 실제(1.01)의 차이를 확인, ExtraTrees·kNN 모델로 Private Log10 MAE 1.2412")],
  },
  {
    when: "2024.09 - 2024.12",
    title: K("한밀레 유학생 멘토링 멘토"),
    sub: K("한양대 ERICA 국제처"),
    points: [K("대만·중국 유학생 2명을 약 12주 멘토링, 직접 기획한 교류 프로그램 5종 운영")],
  },
  { when: "2025.03 - 2025.12", title: K("HERC 러닝 크루 조장"), sub: K("한양대 ERICA"), points: [K("매주 정기 러닝과 조별 인터벌 훈련 진행")] },
];

// Split into equipment / process / tools, each marked with where the skill comes from (실습 사용 / 수업·프로젝트 / 교육 이수),
// as Korean semiconductor hiring guides advise; nothing is listed that was not used.
export const skillsKo: Row[] = [
  { when: "장비", sub: K("전위계 VersaSTAT 4·3전극 셀, 초음파 교반기 (실습 사용) · 광학현미경 단면 분석, FT-IR (실습 사용) · SEM/TEM (교육 이수)") },
  { when: "공정", sub: K("Cu 전해도금 DC·펄스 역전류, 무전해 Ni 시드, 에폭시 몰딩·연마 (실습 사용) · CVD·ALD 증착, 건식 식각·ALE 메커니즘 (수업·프로젝트)") },
  { when: "공정 최적화", sub: K("DOE 분할 실험, 실패 모드로 공정 창 정의, void·박리 원인 분석 (캡스톤)") },
  { when: "도구", sub: K("Python (NumPy, pandas, scikit-learn), Excel 회귀·잔차 분석, ANSYS HFSS, MATLAB, DFT 계산") },
];
