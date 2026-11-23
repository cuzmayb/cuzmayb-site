---
title: Face-centered cubic (FCC) structure
group: Crystal structure
summary: A cube with an atom at each of its eight corners and at the center of each of its six faces. One of the densest ways to stack atoms.
tags: [Crystal structure, FCC]
---

## In one sentence

Face-centered cubic (FCC) is a crystal structure with atoms at the **8 corners and the centers of the 6 faces** of a cubic unit cell.

<figure class="fig">
<svg viewBox="0 0 330 240" role="img" aria-label="FCC unit cell. Eight corner atoms and six face-center atoms">
<g fill="none" stroke="currentColor" stroke-width="1.5">
<path d="M130 155H270M130 155V15M60 200L130 155" stroke-dasharray="4 4" opacity="0.55"/>
<path d="M60 200H200V60H60ZM200 200L270 155V15L200 60M60 60L130 15H270"/>
</g>
<g fill="var(--accent)">
<circle cx="130" cy="130" r="10"/><circle cx="200" cy="85" r="10"/><circle cx="95" cy="107.5" r="10"/><circle cx="235" cy="107.5" r="10"/><circle cx="165" cy="37.5" r="10"/><circle cx="165" cy="177.5" r="10"/>
</g>
<g fill="currentColor">
<circle cx="60" cy="200" r="10"/><circle cx="200" cy="200" r="10"/><circle cx="200" cy="60" r="10"/><circle cx="60" cy="60" r="10"/><circle cx="130" cy="155" r="10"/><circle cx="270" cy="155" r="10"/><circle cx="270" cy="15" r="10"/><circle cx="130" cy="15" r="10"/>
</g>
<text x="130" y="228" font-size="13" text-anchor="middle" fill="currentColor">a</text>
</svg>
<figcaption>FCC unit cell. Navy marks corner atoms, red marks face-center atoms. Atoms are drawn smaller than scale so the cell is easier to read.</figcaption>
</figure>

## The numbers

| Quantity | Value | Where it comes from |
|---|---|---|
| Atoms per unit cell | 4 | 8 corners × 1/8 + 6 faces × 1/2 |
| Coordination number (nearest neighbours) | 12 | Each atom is surrounded by 12 others at the same distance |
| Lattice constant vs. atomic radius | a = 2√2 r | Atoms touch along the face diagonal: √2 a = 4r |
| Packing fraction (share of volume filled by atoms) | 0.74 | Worked out below |

## Why the packing fraction is 0.74

There are 4 atoms in the unit cell, so the atoms fill 4 × (4/3)πr³. The cell volume is a³, and since a = 2√2 r, a³ = 16√2 r³.

Packing fraction = (16/3)πr³ ÷ 16√2 r³ = π / (3√2) ≈ **0.74**

This is the highest value you can reach by stacking equal spheres. Body-centered cubic (BCC) reaches 0.68.

## How it is stacked

The most densely packed planes in FCC are the {111} planes. Treat one such plane as a layer, and FCC is layers stacked in the order **ABCABC**: the third layer sits in a different position from the first.

Hexagonal close-packed (HCP) stacks the same layers as **ABAB**. The packing fraction is the same 0.74; only the stacking order differs.

## What properties follow

- **It deforms instead of breaking.** There are 12 combinations of easy slip plane ({111}) and direction (⟨110⟩), so under load the metal deforms rather than fractures. This is why copper and aluminium are so ductile.
- **FCC metals:** Cu, Al, Ni, Ag, Au, Pt. Iron is FCC (γ-Fe) only between 912 °C and 1394 °C.

## In my project

In [TGV copper filling](/en/projects/tgv-copper-filling) we laid a nickel seed layer on glass and electroplated copper on top. Nickel and copper are both FCC, with close lattice constants of 3.523 Å and 3.615 Å, and I used that as the argument that the interface between the two layers is stable.

## In semiconductors

Silicon has the diamond structure: an FCC lattice with two atoms placed at each lattice point. Its lattice constant is 5.431 Å and its packing fraction is 0.34, so the same FCC lattice can leave very different amounts of empty space depending on how the atoms are placed on it. Copper, which fills interconnects and through vias (TSV, TGV), is an FCC metal. Its room-temperature resistivity is about 1.7 µΩ·cm, lower than aluminium's roughly 2.7 µΩ·cm, which is why interconnects moved from aluminium to copper. Vias are filled by electroplating, as in [TGV copper filling](/en/projects/tgv-copper-filling). How much of the plated copper's close-packed {111} plane shows at the surface is something later bonding and reliability work checks.

## Check yourself

1. Why does the unit cell hold 4 atoms and not 14?
2. Can you derive a = 2√2 r from the figure?
3. FCC and HCP have the same packing fraction. What is different?
