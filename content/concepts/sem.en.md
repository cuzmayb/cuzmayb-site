---
title: Scanning electron microscope (SEM)
group: Measurement tools
summary: A microscope that sweeps a finely focused electron beam across the sample one point at a time and builds an image by counting the electrons that come back out.
tags: [Measurement tools, SEM]
---

## In one sentence

A scanning electron microscope (SEM) builds an image by **scanning an electron beam across the sample surface point by point and turning the signal strength at each point into brightness**.

<div data-fig="sem"></div>

## How it works

1. **Make electrons.** The electron gun emits electrons and accelerates them, usually at 1 to 30 kV.
2. **Focus them.** Lenses made of electromagnets squeeze the beam down to a few nm across.
3. **Sweep.** The scan coils move the beam step by step, sweeping the surface line by line.
4. **Count.** Electrons come out of the spot the beam hits, and the detector measures how many.
5. **Draw.** The signal strength at each point is plotted as brightness at the same spot on the screen.

An optical microscope focuses light through lenses to form the whole image at once. An SEM measures each point separately and **assembles** the picture.

## What it measures

When the beam hits the sample, several signals come out together. What you see depends on which signal you collect.

| Signal | Where it comes from | What it shows |
|---|---|---|
| Secondary electrons (SE) | A few nm below the surface. Low energy (50 eV or less) | Surface topography. Edges and protrusions look bright |
| Backscattered electrons (BSE) | Deeper. Beam electrons bounce back almost unchanged | Differences in atomic number. Heavier elements look bright |
| Characteristic X-rays | Deepest | Which elements are present (EDS analysis) |

## Why it sees more than an optical microscope

The smallest spacing a microscope can resolve is tied to the wavelength it uses. Visible light is 400 to 700 nm, so an optical microscope cannot separate two points closer than about 200 nm. Accelerated electrons have a far shorter wavelength, so an SEM resolves down to a few nm.

Its depth of focus is also large, so rough surfaces look three-dimensional.

## Catches in practice

- **It needs a vacuum.** In air, electrons scatter off gas molecules.
- **Non-conducting samples charge up.** The image smears or flares bright. The fix is a thin coat of gold, platinum or carbon, or a lower accelerating voltage.
- **It only sees the surface.** To see inside you have to cut a cross-section. The instrument that sends electrons **through** a thin sample to see inside is the transmission electron microscope (TEM).

## In my project

I have used an SEM in training, but not in a project. In [TGV copper filling](/en/projects/tgv-copper-filling) I only looked at cross-sections under an optical microscope at 70×. So I could not check small voids or grain sizes that an optical microscope cannot resolve. A cross-section under an SEM would have filled that gap.

## In semiconductors

In a fab, SEM is used in two ways. One is the CD-SEM, which measures pattern linewidths looking straight down, usually at a low accelerating voltage of 1 kV or less to limit resist damage and charging. The other is cross-sectional SEM: the sample is cut to check whether copper has filled a through via with no gaps, and whether a bump or bonding interface has voids. Voids smaller than the resolution limit of an optical microscope (about 200 nm) show up when viewed this way. This is the gap left in [TGV copper filling](/en/projects/tgv-copper-filling), where I looked at cross-sections under an optical microscope only. Finding bonding-layer voids without cutting is a separate question, which I looked at in [HBM void inspection](/en/projects/hbm-void-thermal).

## Check yourself

1. What does brightness in an SEM image measure?
2. How do secondary electron and backscattered electron images differ?
3. Why is the image ruined if you put an insulating sample in as it is?
4. What is the main difference between an SEM and a TEM?
