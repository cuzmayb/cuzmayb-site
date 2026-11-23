import type { Tr } from "@/lib/t";

// English CV (shown for en), based on the resume as submitted (Micron Taiwan, 2026-11-18, English). Facts and numbers follow
// the Korean resume (lib/resume-ko.ts) and the project pages under content/projects. Left out on purpose:
// phone, date of birth, home address, personal email, and the self-introduction written for one application.
// href links each item to the page on this site that tells the full story.
export type Row = { when: string | Tr; title?: Tr; sub?: Tr; points?: Tr[]; href?: string };

const E = (s: string): Tr => ({ ko: s, en: s, zh: s });

export const name = "HYOJUN JUNG";
export const interest = "Target role: Process Engineer (thin film, etch, interconnect, advanced packaging)";

export const education: Row[] = [
  {
    when: "Expected February 2027",
    title: E("Hanyang University ERICA, Bachelor, Materials Science and Chemical Engineering"),
    sub: E("GPA : 4.05 / 4.5"),
  },
  { when: "Relevant coursework", sub: E("Semiconductor Process (A+), Atomic-Level Thin Film Process (A), High-Temperature Reaction Kinetics (A+), Materials Science I & II (A+), Fluid Mechanics (A+), Reaction Engineering (A), Capstone Design I & II (A+)") },
];

export const language: Row[] = [
  { when: "Languages", title: E("Korean (native), English"), sub: E("OPIc Intermediate High (IH), Feb 2026") },
];

// Grouped the way process-engineering CVs on portfolio sites group them (fab processes, metrology, simulation and data),
// each item marked hands-on, coursework or training.
export const skills: Row[] = [
  { when: "Fab processes", sub: E("Cu electroplating, DC and pulse-reverse; electroless Ni seed; epoxy mounting and polishing (hands-on). CVD, ALD, dry etch and ALE mechanisms (coursework and projects)") },
  { when: "Metrology and characterization", sub: E("VersaSTAT 4 potentiostat with a three-electrode cell, cross-section optical microscopy, FT-IR (hands-on); SEM/TEM (training)") },
  { when: "Process optimization", sub: E("Split-condition experiments, process window set by failure mode, cause analysis of voids and delamination (capstone)") },
  { when: "Simulation and data", sub: E("Python (NumPy, pandas, scikit-learn), ANSYS HFSS, MATLAB, Polymath, DFT calculation, Excel (regression, residual analysis)") },
];

export const certification: Row[] = [
  { when: "Dec 2025", title: E("FAB Process and Failure Analysis Training, 40 h"), sub: E("8 major fab processes, FA methods, SEM/TEM (Sungkyunkwan University)") },
  { when: "Jul - Aug 2026", title: E("Semiconductor Packaging and Process Online Courses, 13 courses, 137 h"), sub: E("KOREATECH Online Lifelong Education Institute (STEP): flip chip, wire bonding, fan-out, WLP, heterogeneous bonding, package processes") },
  { when: "Mar 2024 - Dec 2025", title: E("Semiconductor Materials Nanodegree: metal interconnect materials, substrate and thermal materials"), sub: E("S²PEIN") },
  { when: "Apr 2026", title: E("Applied Materials (AMAT) Field Training, 4 h"), sub: E("KSIA") },
  { when: "Sep - Dec 2025", title: E("Materials DFT Simulation Training"), sub: E("Hanyang University ERICA") },
  { when: "May - Jul 2026", title: E("AI Training, 2 courses, 42 h"), sub: E("AI Semiconductor Utilization and Application, 12 h (KAIT); Generative AI and AI Agent Development, 30 h (Soongsil University)") },
];

export const projects: Row[] = [
  {
    when: "Sep 2025 - Jun 2026",
    href: "/projects/tgv-copper-filling",
    title: E("Capstone Project: Process Window and Plating Time Reduction in TGV Cu Electroplating"),
    sub: E("Hanyang University ERICA | Ansan, South Korea | Team Leader (3 members): experiment design, 11 of 28 plating runs, final report"),
    points: [
      E("Split the runs into 8 ultrasonic power levels (0 to 60%) and 7 DC current densities (−1.0 to −2.3 mA/cm²) and set the process window by failure mode: the plated layer delaminated from 40%, voids appeared at −2.3 mA/cm²."),
      E("Filled vias with no voids or seams at 30% ultrasound (36 W), DC −2.2 mA/cm²; plating time 12 h to 11 h (8.3%, final report)."),
      E("Judged via cross-sections in 400 µm glass (100 µm entrance, 55 µm middle) by 70× optical microscopy after #400 to #4000 grinding."),
      E("Continued alone after the report: pulsed the ultrasound on and off to lower heating and reached 45% power and 8.1 h (original run records gone, cross-section not checked)."),
    ],
  },
  {
    when: "Mar 2026 - Jun 2026",
    href: "/projects/atomic-layer-process",
    title: E("ALD and ALE Process Study: Step Coverage and Etch Variation (Literature Review)"),
    sub: E("Hanyang University ERICA | Ansan, South Korea | Course Projects (ALD individual, ALE team of 3)"),
    points: [
      E("ALD (individual): compared PVD and ALD on step coverage for TSVs above 50:1 aspect ratio; ALD limits: coverage, throughput, warpage."),
      E("ALE (team of 3): compared 7 causes of etch-per-cycle variation and 8 remedies on 6 criteria; I covered the equipment and environment axis (drift over time, within-wafer non-uniformity)."),
      E("Conclusion: no single best remedy; no-new-hardware measures first (chamber conditioning, OES endpoint detection), then APC and R2R."),
    ],
  },
  {
    when: "Apr 2026 - present",
    href: "/projects/gpu-hbm-channel-si",
    title: E("GPU-HBM Cooling Channel Between Chips: Signal Integrity Analysis"),
    sub: E("Hanyang University ERICA, Thermal Reliability Lab | Team Leader (3 members)"),
    points: [
      E("Defined the measured quantity as ΔS21 with and without water; fixed the HFSS model spec in a 22-body property and coordinate table."),
      E("Checked each STEP export against the table and found 3 geometry errors before solving (trace pitch 8 µm vs 6 µm spec, a 1 µm stack offset, a periodic boundary that did not hold)."),
      E("Diagnosed the Lumped Port failure, switched to Wave Ports and solved the no-water baseline: S21 at 20 GHz of −11.37 dB (M3) and −14.65 dB (M1). The comparison with water is in progress."),
      E("Team thermal result (Fluent, half model): HBM PHY peak temperature 3.5 to 7.2 K lower at 5 to 10 mL/min per channel."),
    ],
  },
  {
    when: "Sep 2026 - Nov 2026",
    href: "/projects/hbm-void-thermal",
    title: E("HBM Bonding-Layer Voids: Non-Destructive Thermal Inspection Simulation"),
    sub: E("Individual Project | Python"),
    points: [
      E("Built a 1D RC thermal model of a 12-high stack, verified it against the analytical solution within 1%, and wrote a template fit that finds the void layer from the transient thermal response Zth(t)."),
      E("Detected voids of 2.5% area and larger over 90% of the time in all 12 layers at 0.1% measurement noise (synthetic data)."),
      E("Found that a 1% spread in per-layer bonding conductivity moves the detection limit back to about 13%, so the spread among good units limits detection more than the instrument does."),
    ],
  },
];

export const activities: Row[] = [
  {
    when: "May 2025 - Jul 2025",
    href: "/projects/smart-still-cool",
    title: E("Incentive Prize, International 2025 S.M.A.R.T. Competition"),
    sub: E("Academic Society for Appropriate Technology | Team GNX (3 members) | Team Leader"),
    points: [E('Designed "Still Cool", an evaporative cooler that uses no power for cooling (solar power runs only the water-supply controller): build cost $75, 30-year total cost $135, against $1,256 assumed for an electric refrigerator.')],
  },
  {
    when: "Nov 2026",
    href: "/projects/materials-ai-hackathon",
    title: E("Qualifier Rank 10 / 34 (Private), Advanced to the Final, Materials AI Hackathon"),
    sub: E("Team GLfusion (modeling and validation) | Organized by NRF Korea and KRICT"),
    points: [E("Predicted the ionic conductivity of unseen solid electrolytes: designed validation split by element combination (random split 0.37 vs 1.01 on the real test) and reached Private Log10 MAE 1.2412 with an ExtraTrees and kNN model.")],
  },
  {
    when: "Sep 2024 - Dec 2024",
    title: E("Mentor, Hanmile International Student Mentoring"),
    sub: E("Hanyang University ERICA, Office of International Affairs"),
    points: [E("Mentored two international students from Taiwan and China for about 12 weeks and ran five exchange programs that I planned myself.")],
  },
  {
    when: "Mar 2025 - Dec 2025",
    title: E("Group Leader, HERC Running Crew"),
    sub: E("Hanyang University ERICA"),
    points: [E("Led weekly runs and interval training for my group.")],
  },
];

export const military: Row[] = [
  { when: "Jan 2022 - Jul 2023", title: E("Discharged from Republic of Korea Army (Sergeant)") },
];
