---
title: "Still Cool, a refrigerator that cools without electricity: 2025 SMART Competition"
name: "Still Cool"
date: 2025-07-01
period: "2025.05 – 2025.07"
team: "Team of 3"
role: "Team leader"
result: "Incentive Prize"
summary: For off-grid areas of sub-Saharan Africa, we designed a pot-in-pot cooler that cools by evaporation alone and uses solar power only for its water-supply controller. We calculated its 30-year total cost at about 1/9 of an electric refrigerator's.
tags: [Cooling, Thermodynamics, Evaporative cooling, Appropriate technology]
findings:
  - We set the condition as running without electricity, so cooling uses evaporation alone and solar power drives only the water-supply controller
  - "Tanks raised 50 cm off the ground feed water without a pump, and the soil layer holds 4.5 L, about 3 days at 1.5 L per day"
  - "Build cost $75/unit, 30-year total cost $135 (electric refrigerator $1,256), zero power for cooling"
  - "Limit: this is a design with no prototype and no measured cooling performance, and the 30-year costs rest on the assumptions in the application"
---

## Problem

The International 2025 S.M.A.R.T. Competition is run by the Academic Society for Appropriate Technology, and the 2025 edition was held in Arusha, Tanzania. Our team, GNX, had three members from materials science and chemical engineering, interactive media design, and data science. I was the team leader.

The problem was refrigeration in off-grid areas of sub-Saharan Africa. Our application stated that more than 600 million people lack reliable electricity, more than 300 million face water scarcity, and rural areas lose up to 40% of harvested crops. A refrigerator that needs electricity and piped water cannot be placed there.

## Decisions and why

### The condition was running without electricity

We decided to use no electricity for cooling. Water fills the soil between an inner and an outer clay pot, and the heat taken by evaporation from the outer wall cools the inside. This is the pot-in-pot structure. Electricity goes only to the water-supply controller and comes from a solar panel.

### Tanks raised 50 cm so water flows without a pump

Rainwater is caught on a 5 m wide tarpaulin tilted at 5° (a 0.44 m drop). It passes through a PET bottle filled with cloth and gravel and collects in two 40 L tanks. The tanks are connected in series and sit on a frame 50 cm above the ground, so gravity alone carries the water through a valve to the pot. We estimated collection with V = A·R·C (runoff coefficient C about 0.8) at roughly 20 L per hour in the rainy season.

![Diagram of the storage unit: two 40 L tanks connected in series on a frame, feeding the pot through a valve](/images/stillcool-storage-gravity-feed.webp "Storage and gravity feed. Two 40 L tanks in series sit on a frame and feed the pot through a valve. Competition presentation slide (made by the team).")

### How many days the soil layer holds water

How long the cooler lasts when the supply stops depends on the water held in the soil layer. We calculated soil volume as V = π·h·(R_o² − R_i²) and water mass as M = θ·V·ρ.

| Item | Value |
|---|---|
| Soil layer thickness (assumed) | 3 cm |
| Soil volume | 15.0 L |
| Dry bulk density | 1,600 kg/m³ |
| Soil mass | 24.0 kg |
| Moisture content (by weight) | 18.75% |
| Water held | 4.5 L |

At 1.5 L per day, that lasts about 3 days.

### Water-supply control that chooses within a daily limit

We designed the controller so that an LSTM predicts the next soil moisture value from past temperature, humidity, and soil moisture, and a DQN takes that value and chooses how much water to release at each step: 0, 50, 100, or 150 mL. The daily total cannot exceed 1,500 mL. The parts are low-power components such as an ESP32, a moisture sensor, a relay, a solar panel, and a battery, and the whole controller fits within $30.

### Reading the weak points of earlier designs in their structure

The application compared two earlier designs. The double clay pot patented in 1990 by Mohammed Bah Abba gave little consideration to structural optimization or material performance. The Mitticool refrigerator uses evaporative cooling, but it needs a continuous supply of tap water and its glass front compromises insulation.

So Still Cool takes its water from rain, narrows the inner pot to help convection, and uses a coated clay lid to reduce heat exchange. The cover is cotton or jute and the partitions are bamboo, materials available locally.

### Costs compared over 30 years

On initial cost alone the gap is small, $75 against $200. This product differs more in what it costs to use than in what it costs to buy, so we set the comparison period to 30 years and added electricity and maintenance.

## Results

On 1 July 2025 we received the **Incentive Prize**.

| | Still Cool | Electric refrigerator |
|---|---|---|
| Initial cost | $75 | $200 |
| Electricity (30 years) | None | $756 |
| Maintenance (30 years) | $60 | $300 |
| **30-year total** | **$135** | **$1,256** |

![Table of initial, electricity, and maintenance costs for Still Cool and an electric refrigerator, with 30-year totals of 135 and 1,256 dollars](/images/stillcool-30yr-cost.webp "30-year cost comparison. The gap in initial cost is small and widens with electricity. Competition presentation slide (made by the team).")

- The 30-year total is about 1/9 of the electric refrigerator's. The difference is $1,121, and the application text states it as savings of about $1,000 per household.
- The $75 build cost adds up rainwater collection $10, tanks and frame $15, smart control $30, local materials $10, and solar and electronics $10.
- Cooling uses zero electricity. Electricity and water supply costs were set at $0.

## Limits and next steps

- There is no prototype and no measured cooling performance. We have no measurement of how far the inside temperature drops, and every figure above is a design calculation.
- The water-supply control is a design only. There is no training data and no result for the LSTM or the DQN.
- The detailed parts tables do not add up to the summary table ($75). Rainwater collection parts total $8.60 (summary $10). Storage totals $36 with tanks $20, frame $5, tubing $5, and valve $6 (summary $15). The $30 controller already includes a $12.50 solar panel, while the summary lists solar and electronics separately at $10. The cost table needs to be rebuilt.
- The 30-year costs rest on the assumptions in the application: for the electric refrigerator, $200 up front, $2.1 per month for electricity, and $10 per year for maintenance, and for Still Cool, $2 per year for maintenance. The application cites no external source for these assumptions or for the 600 million, 300 million, and 40% figures.
- The next steps written in the application are as follows. Units are first distributed free of charge through international organizations and sponsors. A local supply chain then lowers the cost, and the pot and internal materials are matched to each region's climate and material properties. The technology extends to adjacent uses such as fermented food storage.
