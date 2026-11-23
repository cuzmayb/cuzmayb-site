---
title: Process time reduction of Cu via fill without defects
name: "TGV copper fill"
date: 2026-05-27
period: "2025.09 – 2026.06"
team: "3-person team"
role: "Team lead · Capstone design"
result: "Void-free fill, 12 → 11 h (8.1 h in a later solo run, cross-section not checked)"
summary: In copper electroplating of through-glass vias (TGVs), I added ultrasonic agitation and found a condition that fills without voids while cutting the plating time from 12 to 11 hours. I looked for the conditions that fill well together with the conditions where the plated layer peels, and set the process window from both.
cover: /images/tgv-om-cross-section.webp
coverCaption: "Optical micrograph of a TGV cross-section (DC −1.6 mA/cm², 30 % ultrasound; epoxy mounted and polished, scale bar 1000 µm). Copper is white; the dark band in the middle is the glass substrate. The rightmost via is empty in the middle."
tags: [TGV, Electroplating, Packaging, Process optimization]
findings:
  - 30 % ultrasonic power (36 W) is the most usable without delamination. The plated layer delaminates from 40 %; at 60 % the bath rises to about 45 °C and the seed peels
  - "30 % + DC −2.2 mA/cm² fills without voids or seams; −2.3 gives voids. Plating time 12 → 11 h (8.3 %). The 11 h is a plating time fixed in advance"
  - "Solo run after the report: pulsing the ultrasound on and off raised usable power from 30 to 45 % and gave 8.1 h. This rests on my own notes, the original run records are gone, and the cross-section was not checked for voids"
  - "Limitation: no control run at the same current without ultrasound"
---

## Problem

Filling a via with copper trades speed against quality. The existing low-current pulse-reverse (PPR) condition takes 12 hours or more per fill. Raising the current to save time passes the limiting current density, so the entrance closes first (pinch-off) and a void stays inside.

I traced both problems to one cause, the limiting current density. The hypothesis: microjets from ultrasonic cavitation break up the diffusion layer, which raises the ceiling on ion supply and allows a higher current at the same quality. Ultrasound-assisted plating has been reported mostly for through-silicon vias (TSVs). Seed adhesion on glass can differ from silicon, so it had to be checked separately on TGVs.

### Project overview

| Item | Detail |
|---|---|
| Period | 2025.09 – 2026.06 (plating runs 2026.01.28 – 04.04, solo follow-up 2026.06) |
| Role | Lead of a 3-person team. Proposed the topic, designed the experiments, owned the final report |
| Volume | Ran 11 of the 28 plating runs myself. One run plates for about 11 hours |
| Target | Fill within 8 hours (set by the advisor, 2025.12) |

### Sample and setup

| Item | Detail |
|---|---|
| Sample | Borosilicate glass BF33, 400 µm; laser-machined vias about 100 µm at the entrance → 55 µm at the middle; electroless Ni seed |
| Bath | 0.88 M CuSO₄·5H₂O, 0.54 M H₂SO₄, 20 ppm HCl, suppressor NTBC 40 ppm. 500 mL, room temperature |
| Electrodes | VersaSTAT 4, three electrodes. Two Pt counter electrodes on either side of the sample, Ag/AgCl reference |
| Ultrasound | Ultrasonic bath, 40 kHz, 120 W maximum. Power set in % (30 % = 36 W) |

![Plating cell: a white jig holding two platinum plates and the sample over a beaker of blue plating solution](/images/tgv-plating-cell.webp "Plating cell. The TGV sample is held by the black clip in the middle; the plates on the red clips are the platinum counter electrodes. The beaker holds 500 mL of copper sulfate bath. Cropped from a photo in the capstone presentation slides (2026.05).")

## Decisions and why

### How the decisions went

| Where it stuck | Question | Decision | Result |
|---|---|---|---|
| Low current takes 12 h; higher current leaves voids | Why do speed and quality collide? | The cause is the limiting current density. Ultrasonic microjets break the diffusion layer and raise the ceiling | Topic set to ultrasonic agitation |
| A month on the additive (MTT) setup, runs would not work | Change the ultrasound or the additive? | Ultrasound is the one variable this study cannot drop. Change the additive rather than add more pretreatment | Switched to NTBC, 40 ppm |
| 50 % filled less than 25 % | Is it temperature or ultrasound? | Look at temperature separately with a bath heated to 45 °C without ultrasound and a 0 % control | Delamination from 40 %, about 45 °C at 60 % → ceiling 30 % (36 W) |
| PPR has too many moving variables | What to fix, what to move? | Switch to DC and sweep only the current density | −2.2 mA/cm² void-free, −2.3 void → ceiling −2.2 |
| Two ceilings on two axes | Where do they meet? | Draw the improving and the breaking conditions together and report the window | 12 → 11 h (8.3 %), void-free · in the report |
| Report done, cause still open | Is the real limit the peak power? | Treated accumulated heating, more than peak power, as what breaks the interface. Pulse the ultrasound to lower the heating | 30 → 45 %, 8.1 h · my own notes, cross-section not checked |

### Found the ceiling on ultrasonic power first

With PPR fixed (forward −0.806 / reverse +1.61 mA/cm²), I changed only the ultrasonic power: 0, 10, 20, 25, 30, 40, 50 and 60 %. Keeping the current condition unchanged was the way to see at which power the plated layer starts to peel. Each run was 11 loops of about one hour, about 11 hours.

### Looked at temperature and ultrasound separately

In the early runs 50 % filled less than 25 %. Raising the power also raises the bath temperature, so this result alone could not name the cause. Before moving to the next power I ran two more conditions.

- A 0 % control with mechanical stirring only, no ultrasound
- A bath heated to 45 °C with no ultrasound

I also measured the bath temperature at each power. It was 24.9 °C after 7 hours at 20 %, 25.9 °C after 4 hours at 30 %, and 28.9 °C after 7 hours at 40 %. In the report, the bath stayed below 40 °C at 40 % and 50 %, so delamination there was attributed to cavitation impact more than heat. At 60 % the average temperature rose to about 45 °C, and the report read that case as impact and heat acting together.

![TGV cross-section from a bath heated to 45 °C without ultrasound. Five vias filled to different degrees](/images/tgv-om-heated-45c-no-sonic.webp "TGV cross-section from the PPR condition with the bath heated to 45 °C and no ultrasound. The vias are filled to different degrees and the rightmost via is broken in the middle. The copper layer on the lower surface is also interrupted in places. Epoxy mounted and polished, optical microscope, scale bar 500 µm, taken in February 2026.")

### Reduced PPR to DC

In PPR the forward and reverse currents, the pulse time and the rest time all move together, which makes it hard to isolate the effect of current density. I fixed the ultrasonic power at 30 % (36 W), switched the waveform to DC, and raised only the current density from −1.0 to −2.3 mA/cm². The plating time was fixed at about 11 hours.

### Pretreatment and reading the cross-sections

- The sample sat in the bath for 15 minutes before any current, so that copper ions and the additive spread into the vias and trapped bubbles left.
- For the high-power conditions I also used annealed samples to improve seed adhesion. Delamination at 40 % and above still occurred.
- Plated samples were mounted in epoxy, ground with #400 to #4000 paper, and read under an optical microscope (Hirox MXB-10C) with a 70× lens.

### What I fixed in how the lab ran

- Found and corrected an additive concentration error: 40 ppm had been written as 40×10⁻⁶ g/L (it is 4×10⁻² g/L, a factor of 1000).
- Reset the mounting recipe: epoxy resin 25 g : hardener 3 g, 5 minutes of stirring, vacuum degassing at 0.8 bar.
- The potentiostat (VersaSTAT 4) once ended a run for no reason about 9 minutes after the start, so I added a check of the run for 5 to 10 minutes after starting.
- Built a Notion schedule so three people could split the day-long runs into morning and afternoon shifts.

## Results

### Ultrasonic power (PPR fixed, about 11 hours)

| Power | Result |
|---|---|
| 0 % (mechanical stirring control) | Filled fairly completely |
| 10 to 30 % (12 to 36 W) | Filled with no voids and no seed delamination. Less filled near the upper entrance |
| 40 % (48 W) | Part of the plated layer delaminated, fill incomplete |
| 50 % (60 W) | More severe delamination |
| 60 % (72 W) | Seed delaminated and almost nothing plated. Bath averaged about 45 °C |

The highest power usable without delamination was 30 % (36 W).

![TGV cross-section plated at 20 % ultrasound. Five hourglass-shaped vias filled with copper](/images/tgv-om-ppr-sonic-20.webp "TGV cross-section from the PPR condition at 20 % ultrasound (24 W). Copper is white and the dark rectangles are glass. The vias are filled, the upper entrances are left as shallow dips, and at one via copper has grown above the surface. Epoxy mounted and polished, optical microscope, scale bar 500 µm, taken in February 2026.")

### DC current density (ultrasound fixed at 30 %, about 11 hours)

| Current density (mA/cm²) | Result |
|---|---|
| −1.0, −1.2 | No voids. Deposition too slow, fill incomplete |
| −1.6 | One side nearly full, the other less filled. Over-plating on the surface where it filled first |
| −2.0 | Less unfilled area. No voids |
| −2.2 | Mostly complete fill. No voids or seams. Over-plating on the top and bottom surfaces |
| −2.3 | Voids |

### Plating time

- At 30 % ultrasound (36 W) and DC −2.2 mA/cm² the vias filled without voids or seams. Against the existing 12-hour condition this is 11 hours, an 8.3 % cut.
- The 11 hours is a plating time fixed in advance for every condition. I did not measure the hour at which the vias became full. The report reads the surface over-plating at −2.2 as deposition continuing after the fill was complete.
- By the report's numbers, the 8-hour target was not reached.
- Finding the power where delamination starts (40 %) together with the current density where voids appear (−2.3) set the upper boundary of the process window.

### Solo run after the report (2026.06)

This is work I continued alone after the report was in. Treating accumulated heating, more than peak power, as what breaks the interface, I pulsed the ultrasound on and off on a cycle. The ultrasonic bath shut itself off every 99 minutes and someone had to switch it back on each time, so I gave that button to a finger bot. By my own notes, usable power went from 30 % to 45 % and the plating time became 8.1 hours (32.5 % against 12 hours).

The original records of these runs are gone and this rests on my own notes; the cross-section was not checked for voids. Pulsing lowers the average heating and the time under cavitation together, so I could not tell which of the two produced the effect.

## Limits and next steps

### Limits

- I did not run a DC control at the same current (−2.2 mA/cm²) without ultrasound. In PPR the 0 % control filled as well. These experiments alone cannot say that the absence of voids at high current came from the ultrasound.
- There is no run that holds temperature fixed and raises only the ultrasound. What I ran stops at the 45 °C bath without ultrasound and the 0 % control. How much impact and heat each contributed to delamination at high power is not separated.
- The time saving compares fixed plating times. The moment the fill finished was not measured.
- Cross-sections were read only with a 70× optical lens. Smaller voids and grain size were not checked, and fill ratio was not measured as a number.
- Some conditions are labelled differently in the report and in the run log. The report's 60 % condition (about 45 °C) appears in the log as 75 % (44 °C), and the log has no 60 % run. The 40 % condition the report lists under PPR is DC −0.806 mA/cm² in the log. The report's −2.3 mA/cm² is not in the log, which has −2.4. The values on this page follow the final report.
- The anneal condition is written differently across my records, so I give no temperature or time.
- For the June solo run, the original records are gone and this rests on my own notes; the cross-section was not checked for voids.

### Next steps

1. Run the control first: DC −2.2 mA/cm² without ultrasound.
2. Stop plating at set times on separate samples to measure when the fill finishes.
3. Repeat the pulsed-ultrasound run and keep the on and off times, the bath temperature and cross-section photos.
4. Continue the items listed in the report: seed adhesion that survives high power, frequency and transducer placement, and the limiting current density under PPR.
