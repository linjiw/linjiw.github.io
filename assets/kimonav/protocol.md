# M2p execution contract: token-local path representation

Frozen before fitting, 2026-09-05. Execute the [token-local design](design.md).
The tested contribution is a path representation aligned to 13 generated
four-frame token centers, with unchanged 78,592-parameter heads and 64 active
path channels. Geometric scope and temporal alignment both change; results
cannot isolate these two effects. This is exploratory offline development.

Interpolate all 17 fields from the eight actual rounded path-node frame
positions to centers 1.5+4j. For the two sin/cos pairs, use atan2, unwrap with
adjacent differences in [-pi,pi], interpolate angles, then restore sin/cos.
Normalize raw local fields and projected channels using only fold TRAIN
teachers with inverse-source-window weights divided by 13 over token phases.
Use the existing standard-deviation floor 1e-4 and fixed projection seed 270914.
No learned feature parameters or new information are introduced.

Use all three augmented folds, seeds 17/29/43, and exact saved M2n initial
states and draws. Nine 1,000-update regression prefixes branch into raw and
fixed M2o-balanced 500-update refinements. All optimizer settings, targets,
clipping and final-endpoint rules remain unchanged: 18,000 new updates total.
No objective or checkpoint is selected after outcomes.

The standalone preflight checks all three TRAIN normalizers with held-out
poisoning, exact zero-head recovery and nonzero gradients for both input masks.
It replays the existing global fold0/seed17/raw 500-update refinement and all
312 scores, requiring parameter and score errors <=1e-7. Restore M2o's recorded
CUDA-refreshed diffusion buffers and require them and backbone parameters to
remain unchanged. Save prepared files and hashes before any fitting. The
full run must verify the completed preflight and exact feature normalization.

Four new score modes per objective are local path, TRAIN time template,
within-fold/time shuffled path, and six-token cyclically shifted local path
features (phase/time codes unshifted). This yields 24,480 new rows, including
9,216 requested-turn rows, plus 30,600 cached rows from M2n/M2o and 2,040 cached
native/oracle references. Every new teacher is held out once under each seed
and mode; retain all 36 programs, three noise levels, flags and failures.

Apply the design's representation gate under each objective and its useful-
path gate separately. Cross-objective representation success requires both
representation gates. Report balanced noise retention separately across all
six stratum/timestep aggregates. The phase-shift probe is diagnostic only.
Require complete score grids, finite metrics, source disjointness, unchanged
parameters/buffers, and all 18 recovery checks (54 baseline/zero/disabled
executions; these do not evaluate adapted-generation quality). No physical
navigation or semantic-transfer claim follows.
