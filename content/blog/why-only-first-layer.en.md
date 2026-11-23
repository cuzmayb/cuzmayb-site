---
title: Why does the structure function show only the first bonding layer of HBM
date: 2026-11-18
view: Personal study
keyword: Thermal
summary: A signal lacking information is different from an estimation method failing to extract it. Notes on a point that confused me in the HBM thermal detection research.
tags: [HBM, Thermal, Structure function]
---

## Observation

When I convert the transient thermal response Zth(t) of a 12-high HBM into a structure function, only the first bonding-layer boundary is sharp, and layers 2~12 are smeared. At first I thought "the signal has no information about the deep layers."

## What I checked

Converting the exact Foster network (values taken directly from the model) to Cauer brings all 12 layers back. Relative error 0.1 % or less. **The information is in the signal.**

The smearing happens in the step that estimates the time-constant spectrum from the sampled Zth. It happens even without noise.

## Why

In Zth seen from the junction, a single time constant (about 0.19 s) accounts for 85 % of the total thermal resistance. One layer is 7 % of the total. When 11 small poles of similar size sit next to one large pole, the estimation cannot separate them.

## So

- I dropped the approach of pinpointing location with the structure function. Even among good units, the curve wobbles after the first layer.
- Instead I switched to fitting the difference curve between defective and good units to per-layer templates.

Before concluding "it is not visible," first sort out whether the information is missing or the method for extracting it is weak.
