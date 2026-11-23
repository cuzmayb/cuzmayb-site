---
title: Predicting ionic conductivity of unseen solid electrolytes from composition alone
name: "Materials AI hackathon"
team: "Team GLfusion"
role: "Modeling · validation"
result: "Qualifier private rank 10 / 34, advanced to the final"
summary: In a materials AI hackathon qualifier, I predicted ionic conductivity from chemical formula and measurement temperature and reached the final at 10th on Private. I recorded in numbers how post-processing tuned on the Public score cost us on Private.
coverCaption: "Public and Private scores of our 20 submissions. Both axes are flipped, so up and right is better."
tags: [Materials AI, Solid electrolytes, Machine learning, Python]
findings:
  - "None of the test materials appear in training. Random-split validation (0.37) was far off; only element-combination validation (0.976) matched Public (1.0074)"
  - "Final submission: Public 0.8807, Private 1.2412. That was 10th of 34 on the Private leaderboard, and on Nov 20 we were told we had advanced to the final"
  - "Post-processing chosen on Public lowered Public by 0.047 but raised Private by 0.026. Without it we would have sat at 4th (1.2156)"
  - "Limits: the final (Nov 26 – 27) has not been held yet, and we never received a confirmed rank after code verification. Why Public and Private differ so much is an inference"
---

## Problem

The task came from the online qualifier of a materials-research-data AI hackathon (hosted by the National Research Foundation of Korea and KRICT, run on DACON). Given a solid electrolyte's formula, constituent elements and atomic fractions, mobile ion and measurement temperature, predict its ionic conductivity (S/m).

| Item | Value |
|---|---|
| Training data | 6,762 rows, 782 materials |
| Test data | 2,898 rows, 370 materials |
| Metric | Log10 MAE, with a 1e-12 S/m floor on truth and prediction. Lower is better |
| Ranking | Private half of the test set only. The Public half is for reference |
| Window | 2026-11-16 10:00 – 11-17 18:00, 10 submissions a day |
| Teams | 35. About 10 go on to the final |
| Banned | External data, external APIs, using test inputs for training or statistics |

A score of 1.0 means predictions are off by a factor of 10 on average.

Each material appears as several rows that differ only in temperature (about 8 per material), and **none of the 370 test materials are in the training set.** Within a material, temperature dependence is an Arrhenius straight line and easy: fitting a line to each of the 770 training materials with 4 or more rows leaves a median error of 0.023. So the task comes down to guessing the conductivity level of a material never seen before.

## Decisions and why

### Validation split first

Before the model, I fixed how an improvement would be judged. The same model, three splits:

| Validation split | Score | Against real Public |
|---|---|---|
| Random rows | 0.37 | far too optimistic |
| By formula | 0.70 | still optimistic |
| By element combination (family) | 0.976 | close to Public 1.0074 |

![Bar chart of one model's validation score under three splits. Random rows 0.370, by formula 0.699, by element combination 0.976, with the real Public score 1.0074 drawn as a dashed line](/images/hackathon-validation-splits.webp "Validation score of the single round-1 model under three splits, and that model's real Public score. Values are copied from the round-1 training log, the round log and the submission score record.")

The reason is how the test set is built. Only 16.9 % of test rows have an element combination that appears in training. Splitting the training data by formula makes that share 75.8 %, an easier validation than the real test; splitting by element combination makes it 0 %. So I split so that a family never straddles training and validation. Every later decision used this split only. It moves by about 0.02 with the split seed, so smaller differences did not count as improvements.

Baselines: a single median gives 1.28; temperature and mobile ion alone give 1.21. What composition can add is the 0.2 – 0.3 below that.

### Model

- **Target**: log10(conductivity), transformed back for submission.
- **101 features**: element fractions, temperature and 1000/T, mobile ion, anion group, 9 process cue words from formula notes (ball milled, annealed, and so on), and a 16-dimensional openly licensed element embedding (MEGNet).
- **Prediction**: ExtraTrees and kNN (k=5) blended by distance to training compositions, plus a per-family Arrhenius slope correction over 14 structure families. Rows far from any training composition get SVR mixed in at 0.2.
- **Also in the final file**: 139 training rows far off their own material's line removed, an oxide-only model mixed half and half on oxide rows, and a flat correction on 5 chemical subsets. The correction sizes come from residuals of cross-validation inside the training data.

Boosted trees were left out. On family-level validation with the round-1 features, ExtraTrees scored 0.974, CatBoost 1.052 and LightGBM 1.073, and the best blend with ExtraTrees was 0.993, worse than ExtraTrees alone.

### Grouping test rows was dropped

Grouping test rows of the same formula (its temperature range, a per-material straight-line fit) improved Public a lot. A file built that way (v9_b) scored Public 0.8373. I judged that it broke the rule that test inputs are used for prediction only, kept it out of the final candidates, and submitted grouped files three times only to see their Public score.

On the morning of Nov 17 the organizers answered a question another participant had posted on the competition board: each test row must be predicted independently. After reading that answer I closed every grouping method. v9_b later turned out to score Private 1.1776, a 2nd-place spot, but it could not be chosen.

### Reproducibility and row independence were checked

Deleting the model and retraining gives a byte-identical submission. Unpacking only the submitted code in a fresh environment differs by at most 7.0e-13 in log10. Feeding test rows reversed, in random thirds or one at a time gives the same predictions.

### Post-processing was set from the Public score

The same board answer said that tuning post-processing parameters on the Public score was allowed. I split the test rows into 7 chemical-family chunks and submitted files that shifted one chunk by +0.3 in log10, to read which way Public wanted each chunk to move.

The final file raises three chunks as a result: part of the sulfides (291 rows) by +0.46, part of the halides (185 rows) by +0.80, and one chunk of everything else (246 rows) by +0.55. The answer also said that estimating or recovering the test labels was forbidden, so the chunks stayed at chemical-family level and were never cut down to materials or rows.

The results below show that this decision was wrong.

## Results

### Qualifier ranking

| Submission | Public | Private | Private spot |
|---|---|---|---|
| v1 baseline | 1.0074 | 1.2388 | 9th |
| v10 (best Private within rules) | 0.9412 | 1.2066 | 4th |
| v10a | 0.9273 | 1.2156 | 4th |
| **Final (v12 + post-processing chosen on Public)** | **0.8807** | **1.2412** | **10th / 34** |

"Private spot" is where that file would have ranked among the other 33 teams had it been the final one. Of the 35 teams entered, 34 appeared on the Private leaderboard.

Over two days Public went from 1.0074 down to 0.8807, yet the final file was 0.0024 worse on Private than the first-day baseline. The gap was 0.0020 to 9th place and 0.0024 to 11th.

After the qualifier we sent the code and model file by email, and on 2026-11-20 we were told we had advanced to the final. Ten teams advanced. We did not receive a confirmed rank after code verification.

### Public said almost nothing about Private

| Change | Base file | Public change | Private change |
|---|---|---|---|
| v10a → final (three chunk shifts chosen on Public) | v10a | −0.0466 | **+0.0256** |
| All sulfides +0.3 | v10a | −0.0069 | +0.0214 |
| All halides +0.3 | v10a | −0.0093 | +0.0187 |
| Garnet, NASICON, LLTO +0.3 | p2_b (note) | +0.0189 | −0.0194 |

(Note) p2_b is v12 with only the partial sulfide and partial halide shifts applied. Its base differs from the two rows above, so the sizes are not directly comparable; only the sign is read.

![Scatter plot of 7 probe files that each shift one chunk, with Public change on the horizontal axis and Private change on the vertical axis. All sulfides and all halides sit at the upper left; garnet, NASICON and LLTO sit at the lower right](/images/hackathon-probe-public-private.webp "Public change and Private change of the 7 probe files that shift one chunk by +0.3 in log10. Red points are chunks where the two changes have opposite signs and both exceed 0.005; open circles are the two points based on file p2_b. Values are computed from the score record of our 20 submissions compiled after the qualifier closed.")

Chunks Public said to raise got worse on Private; the chunk Public said to leave alone improved by the same amount. The sign flipped.

The whole leaderboard agreed. The Public and Private rank correlation (Spearman) across 34 teams was 0.155. In that calculation our own Public value is the 0.8373 shown on the leaderboard (the score of v9_b, which we did not choose), and the final file's 0.8807 was not used. Across our own 20 submissions the correlation was −0.002. Every team got 0.20 – 0.48 worse on Private. A random row split would hardly do that, so the two halves were probably split by material or family (inference).

### Where validation was right

The large change that family-level validation approved on all 5 seeds (v6 → v9: label cleanup and an oxide-only model) survived on Private, at about 40 % of its validation size. For v10a → v10, validation said better and Public said worse; Private sided with validation.

## Limits and next steps

### Limits

- There is no result from the final yet. It is scheduled for 2026-11-26 – 11-27 at KRICT in Daejeon, and this page is written as of Nov 23.
- We did not receive a confirmed qualifier rank after code verification. The 10th place is the rank on the Private leaderboard right after the qualifier closed.
- Why Public and Private differ is an inference; the split method was not published.
- v12 was never submitted on its own, so the final file's +0.0256 cannot be split into model change and post-processing. The single-chunk files still show the shift direction was a loss.
- What the 1st-place team (1.1300) did is unknown.

### Next steps

The final uses the same task with more training data and a new test set, scored 50 points for model performance and 50 for the presentation. The changes below come from the decision that went wrong in the qualifier.

- The final file is chosen on validation alone. Public is used only to check the submission format and catch accidents. Tuning post-processing on Public was within the rules, but it fit half of the test set and lost that much on the other half.
- When validation points the same way on every seed, I follow validation even if Public says the opposite. Dropping v10 because of Public was the case that went the other way.
- No daily submissions go to probing. Of the last day's 10 submissions, 9 were probes and their result.
