# KimoNav: completed braking and reserved confirmation

Updated 7 September 2026. Ongoing research, not a published controller result.

KimoNav asks whether timed metric whole-body programs can be executed reliably by
a frozen motion generator and tracker. Kimodo provides controllable offline motion
generation; the current execution loop uses ARDY for autoregressive G1 motion and
SONIC for physical tracking. Their integration is inherited capability. Our study
concerns the timed request contract, causal reference updates and measured failures.

## Completed experiments

The braking sweep compares a native 6/24 success baseline with 0.2, 0.4 and 0.6 s
terminal translation leads: 7/24, 7/24 and 6/24. None adds the registered two
successes. No lead is promoted. Only 20 changed references require new physics;
52 full-denominator slots reuse exact native references. Reference-dependent
initialization is a disclosed protocol deviation: reset procedure and seed match,
but regenerated first poses differ, limiting same-state causal attribution.

Reserved confirmation finishes 88 captures: 84 scored and four exact null controls.
Native/K1/minimum-jerk succeeds on 2/12, 3/12 and 4/12 at simulator seed 1701.
Native/minimum-jerk succeeds on 2/12 and 2/12 at seed 1702. Repeat candidates are
regenerated from that seed's own measured histories. All selected arc outcomes
fail; successes occur in reverse-pair programs. These are twelve related program
designs, not 24 independent samples from repeating two seeds.

Mean sliding improves with minimum jerk in both seeds. Individual sliding
regressions against native remain on four primary and three repeat programs.
Primary K1 has two early endings, retained as failures; its STOP diagnostics have
ten available programs. No operational fall is recorded. The hindsight oracle's
8/12 and uniform-four's expected 3.5/12 are diagnostic recorded-bank comparisons.
The result does not establish a consistent task-success improvement.

All source locks and process exits verify, together with 300 independent prefix
array checks and 132 full null-control array checks. No outcome-based rerun or
threshold change was used. The first supplementary reporter failed on unavailable
STOP speeds; a preserved, versioned reporting fix adds availability counts without
altering registered scores or physical outcomes. Across R-A/R-B, 108 new physical
captures were collected, including four null controls.

## What this changes

The supported paper is a diagnostic requested/generated/executed study. A reference
that passes task checks need not be dynamically feasible, and lower generated
jerk does not guarantee original-clock success or per-program quality preservation.
The twelve reserved programs have now been opened; any later method informed by
them needs a new protected confirmation set.

The native SONIC planner is the next practical comparison gap. Its pinned model
passes six CPU interface probes, but the 30 Hz planner clock, planned-context
update and explicit idle STOP still need a qualified benchmark bridge. A zero
walking-speed override is not a stop instruction. No planner physics is claimed.

Tracker adaptation and retention remain untested: G1-only loss/export, fixed
sampling and vectorized parity are not fully qualified. No new ranker, predictor
search or gradient training is launched from these confirmation outcomes.
Live deadlines, repeated feedback, hardware, torque/ZMP and broad generalization
remain outside the measured claims. The local manuscript is a draft, not a
conference submission.

## Evidence

- [Complete confirmation and paired results](confirmation-evidence.json)
- [Success and sliding figure](confirmation-success-and-sliding.svg)
- [Braking decision and caveat](braking-evidence.json)
- [Recorded physical-state video](timing-failure.mp4)
- [Video provenance](timing-failure-provenance.json)

Earlier development and reconstruction results remain available from the project
page. All public measurements are curated from source-bound local records.
