---
title: Why ALD can coat the bottom of a deep TSV, and where that breaks down
date: 2026-11-19
view: Personal study
keyword: 박막 공정
summary: ALD's ability to coat high-aspect-ratio structures comes from the self-limiting reaction, and the conditions under which that premise collapses are also well defined.
tags: [ALD, TSV, Self-limiting, Step coverage]
---

## Conclusion first

ALD coats all the way inside a deep via because it is not a "grows as much as you feed it" process but a "stops once the surface is full" process. That only holds, though, when the precursor reaches the bottom and is cleanly cleared out every cycle.

## What self-limiting means

In CVD, film keeps building up as long as reactants arrive (irreversible, non-saturating). In ALD, strong chemisorption saturates the surface at a monolayer of precursor (irreversible, saturating). Growth per cycle is GPC = TML·(1 − e^(−k_a·p·t)), where TML is the saturated monolayer thickness. Increasing exposure adds nothing past saturation, so thickness is linear in the number of cycles.

## Why it suits deep vias

PVD relies on line-of-sight deposition, so pinch-off and voids form in deep vias. In ALD, the gas-phase precursor reacts with surface −OH through ligand exchange, and areas that are already saturated do not get any thicker. According to the material I summarized in my interim report, it achieves close to 100 % step coverage even inside 3D structures.

## Conditions where it breaks

| Condition | Result |
|---|---|
| Aspect ratio of 50:1 or more | Gas depletion, sharp increase in dose time |
| Insufficient purge | CVD reactions mix in, apparent growth rate rises |
| Temperature above the window | Precursor decomposition or desorption |
| PE-ALD | Radicals recombine on the way to the bottom, unsuitable for high aspect ratio |

Turning the plasma on only during the reactant step is also done to preserve self-limiting behavior.

## Connection to my project

TSV goes in the order of insulator/barrier (ALD) → seed (ALD) → Cu electroplating (bottom-up). The plating in my TGV copper electroplating capstone is the last step in this sequence, so I needed to know what premises the earlier steps are built on.
