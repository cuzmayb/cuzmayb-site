---
title: "GPU-HBM liquid cooling: thermal and signal integrity co-analysis"
name: "HBM channel SI"
date: 2026-10-17
period: "2026.04 – present"
team: "HBM team"
role: "Team lead · SI model definition and HFSS analysis"
summary: A study that uses HFSS to quantify how much the interposer signal lines degrade when a cooling channel is placed in the gap between GPU and HBM. I defined and cross-checked the analysis model and solved the baseline without water. The comparison with and without water is in progress.
tags: [HBM, Signal integrity, HFSS, Packaging]
result: "HFSS baseline done, comparison with and without water in progress"
status: In progress
findings:
  - "Model: the measured quantity is ΔS21, the difference with and without water. The channel sits on the 0.2 mm ledge of the HBM base die, which fixes the distance from signal line to water at 95 µm"
  - "Cross-check: parsed the STEP file, compared the dimensions of 22 bodies with the spec, and fixed 3 geometry errors"
  - "HFSS baseline (no water): at 20 GHz S21 is −11.37 dB for the stripline and −14.65 dB for the microstrip. The low-frequency end matches a hand calculation of DC resistance"
  - "The team's thermal analysis (Fluent, half-package model): HBM PHY peak temperature 3.5 to 7.2 K lower at 5 to 10 mL/min per channel. Mesh independence has not been checked"
  - "Limitation: the comparison with water (ΔS21) has not been solved in HFSS yet"
---

## Problem

Running water through the gap between chips removes heat right next to the heat source. But water has a high permittivity (static value 78.4). The team's question was how much the loss of the GPU-HBM signal lines underneath changes when cooling water takes the place of the usual material near them.

Someone else on the team handles the thermal analysis. My part is the signal side. I use HFSS to find how much the signal lines in the interposer redistribution layers (RDL) degrade because of the cooling water.

## Decisions and why

### Measure the difference with and without water, in place of absolute loss

I defined the measured quantity as ΔS21 = S21(with water) − S21(without water). In the case without water, the channel slot is filled with molding compound (EMC). TSVs, bumps and the package substrate never touch the water, so they enter both cases equally and drop out of the difference. That let me cut the analysis domain down to one channel and the 5 signal lines under it.

### The channel sits on the ledge of the HBM base die

Reading dimensions directly from the team's 3D geometry file, I found that the HBM base die (11.0 mm) is 0.2 mm wider on every side than the DRAM stack above it (10.6 mm). I put the channel on that ledge. Replacing all the molding compound in the gap with water would likely cause warpage, so the starting point was limited to the ledge.

With that choice, the distance between signal line and water is no longer a free variable. Below the ledge are a 40 µm µbump layer, 5 µm of base-die wiring and 50 µm of base-die silicon, which fixes it at 95 µm. The channel cross-section is 0.2 × 0.68 mm.

![Side-section schematic of the analysis model](/images/hbm-channel-side-section.webp "Side section of the analysis model. From the left: GPU die, molding compound (EMC), water, DRAM stack. The water floor is 95 µm above the top of the wiring layers. Cropped from the research model schematic drawn on 2026-08-13 (labels in Korean). Units µm, vertical axis scaled by segment.")

### Leave out the channel wall to get the worst case

I first assumed a 50 µm polymer wall and then removed it. Without a wall the water comes as close to the signal lines as it can (from 145 µm to 95 µm). If the effect is small here, it is smaller in a structure with a wall. It also removes one undecided variable, the wall material.

### Put signal lines on two layers to get a control

Signal lines with the same dimensions go on M1 (a microstrip, open on top) and M3 (a stripline enclosed between ground layers). Width 2 µm, spacing 4 µm, thickness 1 µm, length 3000 µm. The field of the water does not reach M3, so ΔS21 on M3 should be close to 0. If it is not, the mesh or the boundary conditions are wrong. I decided not to trust the other results until this check passes.

![Enlarged schematic of the interposer wiring layers](/images/hbm-channel-rdl-stack.webp "Enlarged view of the interposer wiring layers (RDL). From the top: M1 signal (exposed), M2 ground, M3 signal (shielded), M4 ground. Cropped from the same schematic (2026-08-13, labels in Korean).")

### Model water with a frequency-dependent permittivity

Water goes in as a Debye model (εs 78.4, ε∞ 5.2, τ 8.27 ps). At 20 GHz ε′ falls to about 40 and tanδ rises to about 0.9. A constant value of 78 would be wrong by a factor of 2 in ε′ at 20 GHz and would leave out the loss term.

### Check the geometry by numbers at every export

Some errors were invisible on screen. I parsed the STEP file, compared the bounding boxes of 22 bodies with the dimension table, and caught 3.

| Error | Cause | Why it matters |
|---|---|---|
| Signal-line pitch was 8 µm (spec 6 µm) | Wrong value in the pattern spacing parameter | The 6 µm pitch was derived from the number of routing tracks, so its basis is lost |
| DRAM stack shifted by 1 µm | The sketch used a typed number in place of the parameter | A 1 µm vacuum sliver appears right next to the water and enters the difference directly |
| Domain width of 42 µm in the array direction | The outer signal lines were not half a pitch from the walls | Repeating by periodic boundaries does not give a uniform array. Changed to 30 µm, which also cut the mesh by 30 % |

### Lumped ports failed, so I switched to wave ports

With 4 lumped ports the solve never got past the port stage. There were two causes. HFSS treats any unassigned outer face as a perfect conductor, and that shorted the signal lines to ground at the end faces. The port sheets were lying flat and touched only the edges of the conductors. I ruled out the silicon conductivity (same error when set to 0) and the ground boundaries (they checked out as normal). Changing the end faces to wave ports got past the port stage.

## Results

### Baseline without water (HFSS)

This was the first full solve from 0.01 GHz to 20 GHz. It converged in 11 passes with a final mesh of 18,362 tetrahedra.

| Frequency | S21, M3 (stripline) | S21, M1 (microstrip) |
|---|---|---|
| 0.01 GHz | −2.00 dB | −2.00 dB |
| 5 GHz | −7.89 dB | −10.33 dB |
| 10 GHz | −10.90 dB | −13.04 dB |
| 20 GHz | −11.37 dB | −14.65 dB |

- A copper line with a 2 × 1 µm cross-section and 3 mm length has a DC resistance of about 25 Ω. With 25 Ω in series between 50 Ω terminations, S21 is −1.9 dB, which matches the value at 0.01 GHz.
- M1 loses more than M3. M1 has no ground above it and is close to the lossy silicon die.
- This is one baseline. The case with water has not been solved yet, and the M3 check can only be done then.

### The team's thermal analysis (Fluent)

The thermal side was solved in Fluent by the teammate in charge of it. It is not my analysis, so I copy it here together with its conditions.

| Flow per channel | Drop in HBM PHY peak temperature |
|---|---|
| 5 mL/min | 3.5 to 5.9 K |
| 10 mL/min | 5.1 to 7.2 K |

- The model covers half of the package, and the range is over the positions of the HBM stacks.
- Adding the channel came with a shift in HBM position and a mesh change, so the numbers cannot be read as the effect of the channel alone.
- Mesh independence was not checked, and the 10 mL/min solution fell short of the convergence criterion.

## Limits and next steps

- There is no HFSS solve with water. So there is no ΔS21 value yet.
- For the baseline, the convergence criterion was relaxed from 0.02 to 0.04 (final value 0.0305) because of the student-license mesh limit, and the side walls were set as perfect conductors. Crosstalk values around −30 dB may be off by a few dB.
- The baseline run had the SiO2 permittivity entered as 6.5, which differs from the spec (4.1). This needs checking.
- The Debye values for water are for 25 °C. The inlet water in the thermal analysis is 45 °C, so values at operating temperature need a source.
- Next: solve the baseline and 6 spacing points (95, 105, 115, 145, 195, 295 µm) on a single geometry. The water region is pre-cut into 6 slabs and only the material changes. The difference is expected to be small, so redrawing the geometry for each case would mix that redraw into the result. This geometry (28 solids) was built on 2026-11-17 and checked by volume and face count. It has not been imported into HFSS yet.
- The target figure is a curve of ΔS21 against spacing with our structure (95 µm) marked on it. Earlier work (Janczyk 2017) reported that the change in loss saturates beyond 20 µm when the channel is below the transmission line. In our structure the water is above the signal lines, so that criterion cannot be used as is.
