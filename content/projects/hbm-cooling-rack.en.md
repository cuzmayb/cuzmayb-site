---
title: Inter-die channel cooling module for GPU-HBM and a rack cooling system
name: "HBM cooling module"
date: 2026-10-27
period: "2026.10"
team: "3-person team"
role: "Team representative · 3D Design Contest"
result: "Contest result pending"
summary: I scaled the HBM inter-chip channel research up into a cooling module that plugs into a server and a closed cooling loop for a 72-GPU rack, designed in Fusion 360.
tags: [HBM, Cooling, Fusion 360, Generative Design]
findings:
  - Cools both the chip top surface and the inter-chip gap from a single inlet without a pump (by applying the jet slit pressure difference across both ends of the channel via feed tubes)
  - Designed a closed loop from module to facility water at rack level. 4 modules per tray, 72 GPUs per rack
  - Loads only from public standards and datasheets. Final cam lever load 534 N, safety factor 3.08
  - "Limitation: no flow or thermal analysis at design conditions and no physical prototype. The team did analyze a reduced reference model"
---

## Problem

I entered the 2026 3D Design Contest as part of a 3-person team. We did not make up a new topic and went with the [inter-chip channel research](/en/projects/gpu-hbm-channel-si) we were already doing. Until then, the idea of a channel in the gap between GPU and HBM existed only as a cross-section of one chip. The task was to make it read as equipment that plugs into a server.

![Section schematic of the research-stage analysis model that was the starting point](/images/hbm-channel-side-section.webp "Section of the research-stage analysis model that was the starting point (2026-08-13, labels in Korean). Water sits on the ledge of the HBM base die, between GPU and HBM. It was drawn for the signal analysis and is separate from the drawings of the contest entry.")

Two things had to be solved.

- Make water really flow through the inter-chip channel.
- Answer where the water goes after it leaves the module.

## Decisions and why

### Changed the category from energy to semiconductor equipment

At first the energy category looked attractive. Going that way would mean carrying a power-saving argument all the way through. The semiconductor equipment category connects directly to cooling an HBM package, so no extra linking argument was needed. Data-center power stayed as a single paragraph under expected effects.

### Send water into the channel with the pressure difference of the jet slit

With the inter-chip channel in parallel with the cold plate, the pressure difference was only 0.3 kPa and water did not enter the channel. I applied the pressure difference created by the jet slit across both ends of the channel through feed tubes. A single inlet cools the chip top surface and the gap together, with no pump.

### Drew the path of the water all the way to the rack

I drew a closed loop at rack level: module → tray header → blind-mate connector → rack manifold → CDU → facility water.

![Block diagram of the cooling loop from the module to facility water](/images/hbm-rack-loop.webp "Block diagram of the cooling loop. It shows only the six stages named in the text, with no dimensions or scale. Drawn new for this page, separately from the submission.")

### Settled on 4 modules per tray

It started at 2 per tray, and half of the drawer floor looked empty. Going to 4 brought the rack to 72 GPUs. I also considered 6 and rejected it, because in a 1U height that is a power density no real product has.

### Unified the wetted materials

To avoid galvanic corrosion, the wetted parts were unified to 316L, Cu and Ni, and aluminum was removed.

### Take loads only from public standards and datasheets

The first Generative Design results came out with safety factors from 8 to 277. That meant the assumed loads did not determine the shape, so I discarded them. After that, loads came only from public standards and datasheets (connector mating force, shipping shock, mounting pressure).

### Corrected the source of the connector mating force and recalculated the loads

The 110 N I had been using as the mating force of the blind-mate connector was the value for a different part number. The value in the datasheet was 135 N. The cam lever takes the mating force of 2 connectors, so its load changed with it. Later, going to 4 modules per tray moved the connector up a size and the load changed once more.

| Point in time | Mating force per connector | Cam lever load |
|---|---|---|
| At first (wrong source) | 110 N | 221 N |
| After correcting the source | 135 N | 270 N |
| After changing to 4 modules per tray | 267 N | 534 N |

Each time the load changed, I ran Generative Design again. The final cam lever has a safety factor of 3.08 at 534 N.

### Did not call a heavier part lightweight

The part that merged 4 brackets into one was 4.4 times heavier than before. In the description I wrote "consolidated 4 parts into 1 with a verified load path" in place of "lightweighting."

## Results

We submitted on 2026-10-27 and received confirmation of receipt. The result has not been announced.

| Item | What was done |
|---|---|
| Feeding the inter-chip channel | One inlet cools the chip top surface and the gap together, with no pump |
| Cooling loop | Closed loop from module to facility water. 4 modules per tray, 72 GPUs per rack |
| Wetted materials | 316L, Cu, Ni |
| Cam lever | Load 534 N, safety factor 3.08 |
| Merged part | 4 brackets into 1. Mass is 4.4 times the original |

### What I learned

- Every time a number was replaced by one with a source, the description changed too. I do not write sentences that differ from the facts.
- At one point the model had reached v24 while the description document was still at v4, and 6 numbers disagreed. It was the largest deduction in our own scoring. On the day the geometry changes, the numbers in the document change too.
- A one-character difference in a part number threw off the whole load calculation. For a datasheet value, check the part number in the original table.

## Limits and next steps

- No flow or thermal analysis at design conditions and no physical prototype. The team did analyze a reduced reference model.
- The result has not been announced, so the submitted model, renders and description are not shown on this page.
- If I did it again, I would read the submission requirements in the original text on day one and turn them into a checklist. Model versions and document versions would be tracked in one table. The thermal analysis at design conditions would be aligned with the team early.
