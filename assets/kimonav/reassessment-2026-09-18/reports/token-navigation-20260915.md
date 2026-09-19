> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/token-navigation-20260915/REPORT.md`; SHA-256: `c049f84e50cdc34e6d099fef333210c3170ad391cff77cc6184cf07bf1b490ad`.

# KimoNav timed-token navigation distillation

Implemented and ran on 2026-09-15. Existing teacher executions and flat floor only; no new scenes.

## Outcome

Continuous timed-goal tokens reduce offline action error. This pilot does **not** establish an improvement in successful timed navigation; use the raw native counts below. Auxiliary future-motion supervision is a measured ablation, not an assumed benefit.

## Offline student development results

| Updates | Flat action MSE | Token action MSE | Token + motion action MSE | Token vs flat |
|---|---:|---:|---:|---:|
| 1200_updates | 0.019330 | 0.018202 | 0.019240 | 5.8% lower |
| 6000_updates_adaptive | 0.018651 | 0.016792 | 0.017068 | 10.0% lower |

## Native closed-loop results

| Fit / panel | Arm | Full native duration | Timed events passed | Entire timed task | Mean captured fraction | Capped deadline error |
|---|---|---:|---:|---:|---:|---:|
| 1200_updates | teacher | 8/8 | 41/64 | 2/8 | 100.0% | 0.129 m |
| 1200_updates | flat | 0/8 | 3/64 | 0/8 | 15.4% | 1.840 m |
| 1200_updates | token | 0/8 | 4/64 | 0/8 | 15.5% | 1.799 m |
| 1200_updates | token_motion | 0/8 | 1/64 | 0/8 | 8.8% | 2.000 m |
| 6000_updates_adaptive | teacher | 4/4 | 19/32 | 0/4 | 100.0% | 0.146 m |
| 6000_updates_adaptive | flat | 0/4 | 3/32 | 0/4 | 13.1% | 1.881 m |
| 6000_updates_adaptive | token | 0/4 | 2/32 | 0/4 | 12.5% | 1.821 m |
| 6000_updates_adaptive | token_motion | 0/4 | 1/32 | 0/4 | 10.2% | 1.942 m |

Deadline error clips each available error at 2 m and assigns 2 m to missing deadlines. It is a diagnostic with a declared penalty, not a physical accuracy estimate for unobserved states. Every raw missing value is retained in SUMMARY.json.



## What was integrated

- Existing repaired84 registry, stable text IDs, verified same-decision teacher collection, sparse timed-goal contract, original clock, and frozen SONIC decoder.
- Eight continuously projected public goal tokens; history-to-goal cross-attention; complete code64 output and native action29 decoding.
- Training-only supervision from four future executed-geometry tokens and 10×64 native reference frames. Missing executed futures are masked.
- Native single-robot callback with a teacher-forward guard for students, recorded causal observations, locked commands, and a scorer that never relabels test outcomes.

## Validation and interpretation

83 completed source executions supplied 26,642 decisions. Whole-motion split: 71 fit / 12 internal development; failed source00690 excluded from complete hindsight labels. All reserved20 remain untouched. Every arm used equal-motion sampling and identical minibatch schedules; normalization used fit rows only. Token and token_motion share architecture and initial weights. Flat has 336,576 parameters; token variants have 487,008, so the flat comparison includes a capacity change.

18 targeted tests passed: rigid-frame invariance, causal velocity, future suffix masks, training/runtime packing, clock shifts, token order/masks, and auxiliary-gradient routing, plus the existing public timed interfaces. Runtime-vs-dataset feature parity over 249 sampled decisions had max absolute error 1.20e-7 or below. Teacher decoder parity on all prepared rows stayed below 6.68e-6. Every native clip/seed group has identical initial public-state hashes, all process exits succeeded, and independent re-scoring matched saved results. Student actor calls to the teacher were zero. Original teacher checkpoint is unchanged.

The 6,000-update run is an explicitly adaptive development follow-up to early terminations and decreasing offline loss. It uses the same data and training seed, with one new physics seed. It is not an untouched final benchmark. The 1,200-update native panel has two seeds; the extension has one. Their between-panel differences do not isolate training duration. The four motions, and repeated seeds within them, are not 48 independent tasks.

The teacher continues to supply valid motion-tracking supervision. Fresh teacher executions can miss ±60 ms hindsight first-arrival windows and 0.15 m source-specific waypoints; this measures that strict derived command task. It does not invalidate the original tracking teacher. Source hindsight self-consistency is never counted as held-out navigation success.

Native imitation terminations and reference initial poses are retained. A termination is not automatically a diagnosed fall. Physical contact/quality success and arbitrary standing starts have not been established. Text labels remain linked metadata; no language model, obstacle scene generation, CVAE, discrete motion vocabulary or BFM-Zero training was added.

## Next discriminating experiment

Keep the tracking teacher and use its actions on student-driven training states, with a matched phase-replay control, to test whether covariate shift causes the closed-loop gap. Fixed public commands must remain aligned with the reference queried by the teacher. Add paired executions with genuinely different reference timings to teach deadline response; simply changing the deadline label while retaining the same action would supply contradictory supervision. Compare a privileged posterior/public prior BFM model against this deterministic baseline after these data checks.

See implementation and experiment design (local experiment artifact), raw results (local experiment artifact), data bindings (local experiment artifact), base audit (local experiment artifact), and longer-fit audit (local experiment artifact). Checkpoints live in each arm directory and longer-fit/arm/student.pt. The original seed92330 teacher smoke is outside the fixed panel; its audit-field correction is documented separately.
