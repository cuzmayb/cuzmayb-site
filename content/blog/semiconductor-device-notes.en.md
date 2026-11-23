---
title: Why a MOS C-V curve sometimes shifts and sometimes stretches out
date: 2026-11-19
view: Personal study
keyword: 반도체 소자
summary: Fixed charge in the oxide shifts the C-V curve in parallel, and interface states stretch the curve out. Flash uses the former on purpose.
tags: [MOS, C-V, Interface traps, Flash]
---

## Conclusion first

If the C-V curve shifts sideways with its shape unchanged, it is due to fixed charge in the oxide; if the slope stretches out and becomes gentler, it is due to Si-SiO₂ interface states. Flash uses the former phenomenon for storage.

## Baseline

V_fb = Φ_ms − Q_ox/C_ox, 1/C_g = 1/C_ox + 1/C_si. The value changes depending on the state of the Si side.

| Region (p-type) | C_g |
|---|---|
| Accumulation | C_ox |
| Depletion | Decreases |
| High-frequency inversion | Stays at C_min |
| Low-frequency inversion | Recovers to C_ox |

## Parallel shift: fixed charge

The SiO_x formed near the interface during oxidation is oxygen-deficient and carries positive charge. When such charge is present, the whole curve shifts by ΔV = −Q_ox/C_ox. Positive charge moves it toward negative voltage, negative charge toward positive voltage. Because the charge is fixed, the shape stays the same.

## Stretch-out: interface states

Dangling bonds at the interface create levels inside the bandgap. At V_g < 0, empty states look like positive charge and push toward −V; at V_g > 0, they fill up, become negative charge, and push toward +V. Since the direction is opposite depending on voltage, the curve stretches out. Dangling bond density goes (100) < (110) < (111), which is why (100) wafers are used.

## Flash creates the shift on purpose

When electrons are put into the floating gate, the C-V curve shifts in the positive direction by the same principle as oxide trapped charge, and the threshold rises by ΔV_T. At a read voltage between the two states, current flows in the erased state and does not flow in the written state. ΔV_T has to be large for the two to be clearly separated.

The neatest part of this unit for me was that defects and memory operation are tied together by the single relation ΔV = −Q_ox/C_ox.
