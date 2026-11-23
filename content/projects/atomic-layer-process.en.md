---
title: "Atomic-scale thin film processing: ALD that coats TSVs, and ALE whose etch rate drifts"
name: "ALD · ALE process review"
date: 2026-06-14
period: "2026.03 – 2026.06"
team: "Midterm solo · final team of 3"
role: "Midterm alone · final: equipment and environment part, document integration"
result: "7 causes × 8 remedies compared; no single best remedy"
summary: A semester on atomic layer deposition (ALD) and atomic layer etching (ALE). The midterm covered why TSVs need ALD, and the final covered why ALE's etch per cycle wavers. Both are literature reviews.
tags: [ALD, ALE, TSV, Packaging]
findings:
  - "Midterm (solo): compared PVD and ALD on a single axis, step coverage, and organised the limits of ALD for TSVs on three axes: coverage, throughput, warpage"
  - "Final (team of 3): split the causes of ALE etch-rate scatter into seven, compared eight remedies on six criteria, and showed in a table that no single remedy covers them all. My part was the equipment and environment axis (P4, P5)"
  - The answer is a short-, mid-, and long-term roadmap ordered by when each remedy can be adopted
  - "Limit: both assignments are reviews of papers and industry reports. All figures are literature values"
---

## Problem

Atomic-scale thin film processing is a fourth-year course that runs from vacuum, surfaces, and nucleation through CVD, ALD, etching and ALE, to area-selective deposition (ASD). There were two assignments and both are literature reviews. I wrote the midterm alone, and three of us wrote the final.

### Midterm: how to coat the inside of a deep TSV

As 2D scaling reached its limits, the way past the performance bottleneck moved to 2.5D and 3D heterogeneous packaging, with through-silicon vias (TSVs) at its centre. Recent TSVs have aspect ratios above 50:1. An insulating film and a copper diffusion barrier have to be coated all the way down this deep hole without defects.

### Final: why ALE's etch per cycle wavers

3D NAND at 300 layers and GAA structures demand etch control at the ångström level. ALE is used on the premise that cycle count equals etch depth, but in volume production the etch per cycle (EPC) wavers from cycle to cycle, wafer to wafer, and lot to lot.

The depth error accumulates as the product of the cycle count N and the per-cycle deviation ΔEPC. In a process with an EPC of about 1 Å/cycle, a 5% offset becomes about 0.5 nm after 100 cycles. The report set the production baseline at keeping etch-only variation within 1/3 of the total CD tolerance of that layer.

## Decisions and why

### Midterm (solo): one fixed axis of comparison, step coverage

I did it alone, from choosing the topic to research and references. The figures on the slides are cited from their sources.

- Instead of listing deposition methods, I compared PVD and ALD on step coverage alone. PVD's line-of-sight deposition closes the opening first and leaves voids. ALD's self-limiting reactions coat close to 100% deep inside the hole.
- I split the job of each film. Al₂O₃ insulates (breakdown field 17.0–24.5 MV/cm), and TiN and TaN block copper diffusion (5–25 nm).
- I organised the limits on three axes: coverage lost when precursor gas runs short deep in the via, ALD's low throughput, and warpage from thermal expansion mismatch.
- I matched remedies to those limits: area-selective ALD, where a SAM inhibitor blocks deposition on the dielectric surface and the film grows selectively on the metal pads only; low-temperature precursors for use at 150 °C or below; PEALD passivation that covers the copper surface with 10 nm of Ru against oxidation (for hybrid bonding); and low-k SiOC and SiCN liners.

### Final (team of 3): seven causes, and my axis was P4 and P5

I took the equipment and environment axis plus trend and paper research, and merged the three manuscripts into one format. Contribution was equal across the three.

| Axis | Causes |
|---|---|
| Process recipe | P1 incomplete modification saturation, P2 incomplete purge, P3 excess ion energy (leaving the process window) |
| Equipment and environment | P4 drift over time, P5 within-wafer non-uniformity |
| Surface and material | P6 differences in surface crystallinity, P7 by-product redeposition in high-aspect-ratio structures |

P4 is the slow change in EPC under the same recipe as chamber wall conditioning shifts, RF matching varies, and gas lines age. In fluorocarbon (FC) processes the cause is residual FC building up on the wall, and periodic O₂ plasma cleaning restores it.

P5 is EPC differing by position on the wafer at the same moment. The largest factor is the substrate temperature distribution: controlling CD below 1 nm requires keeping the within-wafer temperature variation within about 1 K. The wall state also changes the radical recombination probability, so it acts on both P4 and P5.

![Conceptual graph of EPC rising as more wafers are processed and returning to its starting value at the O₂ plasma cleans after 30 and 60 wafers](/images/ale-epc-drift-conditioning.webp "EPC drifting as FC builds up on the chamber wall and recovering at periodic O₂ plasma cleans. Figure from the final report (made by the team of 3), a conceptual sketch with no measured data.")

### Separating the same failure into α and β

Synergy, S = [EPC − (α + β)] / EPC, shows how close self-limiting is to ideal. α is the amount etched by the modification step alone, and β is the amount etched by the removal step alone. From the literature: Si 90%, Ge 66% (excess α), a-C 97%, SiO₂ 80% (excess β). The symptom is the same wavering etch rate, yet the dominant factor is the modification side (α) for Ge and the removal side (β) for SiO₂.

### Eight remedies set against six criteria and seven causes

| Code | Remedy |
|---|---|
| S1a | Widening the process window |
| S1b | Precursor molecular design |
| S2 | Chamber conditioning |
| S3a | OES endpoint detection |
| S3b | ML endpoint detection with R2R control |
| S4a | Thermal ALE |
| S4b | Cryo ALE |
| S4c | Quasi-ALE |

The six criteria are effect, throughput, cost, integration with existing processes, technology readiness (TRL), and the cause each remedy targets. We then filled in a table of which remedy reaches which cause. ● means the remedy removes or suppresses the cause directly, ○ means it eases the cause indirectly, and - means it is unrelated.

| Cause | S1a | S1b | S2 | S3a | S3b | S4a | S4b | S4c |
|---|---|---|---|---|---|---|---|---|
| P1 incomplete modification saturation | ● | ● | - | ○ | ○ | ○ | ○ | ○ |
| P2 incomplete purge | ○ | ● | ○ | ○ | ○ | ● | ○ | ○ |
| P3 excess ion energy | ● | ○ | - | ● | ○ | ● | ○ | ● |
| P4 drift over time | - | - | ● | ● | ● | ○ | ○ | ○ |
| P5 within-wafer non-uniformity | ○ | - | ○ | ○ | ● | ○ | ○ | ○ |
| P6 surface crystallinity | ○ | ● | - | - | - | ● | ○ | ● |
| P7 high-aspect-ratio redeposition | - | - | ○ | ○ | ○ | ○ | ● | ○ |

## Results

- No remedy has a column filled entirely with ●. No remedy covered all seven causes directly by itself, and none led on all six criteria.
- Effect and throughput conflict structurally. Efforts to stabilise self-limiting cut throughput.
- So we gave no single answer and reordered the remedies by when they can be adopted.

| Horizon | Remedies | What it takes |
|---|---|---|
| Short term (0–1 year) | Chamber conditioning, OES endpoint detection, widening the process window | Applies now, no new hardware |
| Mid term (1–3 years) | ML endpoint detection with R2R control, precursor molecular design | Software and chemistry investment |
| Long term (3+ years) | Thermal ALE, cryo ALE, quasi-ALE | New chambers and process integration |

![Roadmap with the eight remedies as horizontal bars across the short term of 0 to 1 year, the mid term of 1 to 3 years, and the long term of 3 years or more](/images/ale-roadmap.webp "Roadmap ordering the eight remedies by when they can be adopted. Bars are placed by maturity. Figure from the final report (made by the team of 3), a conceptual sketch with no measured data.")

## Limits and next steps

- Both assignments are reviews of papers and industry reports. There are no experiments of my own, and all figures are literature values.
- The high, medium, and low grades in the comparison table are qualitative ratings the team assigned from literature values.
- Some limits remain even with every remedy applied. For Si the etch threshold is about 15 eV and the sputtering threshold about 20 eV, which leaves a process window margin of only about 5 eV. The ion yield of the removal step is about 0.1, so throughput is low. ML control is at the stage of a model trained on 240 simulation runs. Redeposition in high-aspect-ratio structures (P7) is unsolved.
- The research directions the report set next are the accuracy of ML endpoint detection and the robustness of R2R control, physical models that calculate the process window in advance, a chamber digital twin, and generalising the chemistry to new materials.
- This assignment looked at coating a through-via through the literature. Filling one was covered by experiment in [TGV copper filling](/en/projects/tgv-copper-filling).
