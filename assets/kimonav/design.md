> Archived design, written before M2p fitting. Its original status is preserved; the completed outcome is in [the results report](results-report.md).

# Next proposal: token-local path conditioning under both fixed objectives

Written after M2o (the preceding fixed-noise-balance experiment), 2026-09-05.
Status: design only; no token-local heads fitted or scores collected.
Stop weight search on the current panel, as the M2o design required. Its
low-noise improvement is useful evidence, but the contact criterion and path
gate both fail. Keep raw and balanced objectives as explicit comparison arms;
do not promote either to demonstrated generated-navigation control.

## Bottleneck and smallest change

The current `StateFeatures` repeats one projected 136D whole-window path
vector at all 13 body-token positions, then appends two sinusoidal token-phase
coordinates. The head must infer which part of the path matters at each phase.
That is an observed interface property, not an established cause of failure.
M2o's phase-resolved TRAIN mean still beats its learned path input by 1.99%
turn joint MSE, so a useful representation must beat strong time controls.

Test a token-local path view: reshape the existing requested path into eight
17-field nodes and interpolate their geometric fields to each of the 13
four-frame token centers (frames 1.5, 5.5, ..., 49.5). Use the actual existing
node locations, rounded linspace(0,51,8). Interpolate position/speed/yaw rate
and remaining-time fields linearly; recover and unwrap angular fields before
interpolating and re-encoding sin/cos. Preserve the current local coordinate
conventions. Do not add realized body state, motion-seed IDs, program IDs,
or teacher residuals to the input.

Project each 17-field local node to 64 channels with a fixed seeded Gaussian
projection (seed 270914) after TRAIN-only normalization. Replace the repeated
64-channel global path block with this 64-channel local block; keep the
remaining body-state blocks zero and retain diffusion time and phase codes.
The head remains 78,592 parameters with the same active path width and norm
cap. This changes geometric scope and temporal alignment together, and may
lose useful whole-window context. A positive result would support this local
representation, not isolate alignment from every other representation choice.

## Comparison and budget

Retain the M2n/M2o data, folds, model seeds, targets and exact draw sequences.
Run both fixed decoded objectives: raw and the three M2o calibrated scale
sets. No additional weight choices are introduced. The already completed
whole-window path heads and optimized time-only heads are matched controls
under each objective; all cached scores remain labeled as cached.

Fit nine new local regression prefixes (three folds ×three seeds), initialized
from the same saved zero-readout states, for 1,000 updates each. Branch each
prefix into the two 500-update decoded refinements, resetting AdamW between
stages exactly as before. This gives nine new regression prefixes and 18 new
refinement endpoints: 9,000 +9,000 =18,000 new optimizer updates. A prefix shared
by two objectives is not two independent regression fits.

Evaluate all 1,020 held-out teachers and all strata. Alongside the new path
head, report its TRAIN-only phase/time template and within-fold/time shuffled
path control under each objective. A fixed six-token cyclic shift of the
local feature sequence, keeping head phase/time codes fixed, can be reported
as an additional evaluation diagnostic; it is not a matched training control
or a new gate. All 36 programs and all t=0/5/9 remain in the analysis.

## Preflight and decision

Before training, freeze the interpolation implementation, projection, TRAIN
normalizers, split/draw/source/runtime-buffer hashes and score grid. Test
constant straight paths, turn-sign preservation and wrapped-angle continuity;
poison held-out features to check normalization isolation. Require exact
zero-head and time-only path-mask recovery. Preserve the M2o runtime-buffer
correction and its strict cached-endpoint reproduction check.

For a representation improvement, require at least 5% turn joint-MSE gain
versus the paired whole-window path head under **each** fixed objective,
positive effects for all three seed means, and no lower turn contact accuracy
than the paired head or native. Reporting a win under only one objective is a
conditional result, not a cross-objective representation result.

For useful path conditioning under a named objective, additionally require
at least 5% turn joint-MSE gain over native, its optimized time-only control
and its own TRAIN time template; all three model seeds win over native and
time-only; the same at least 26/36 program means beat native, paired whole-
window path and optimized time-only; and at least 1% gain over shuffled path.
Report low-noise and nonturn regressions even if these primary criteria pass.
The balanced branch must retain M2o's nonnegative joint-MSE gain versus native
in every turn/nonturn timestep aggregate to support a claim that its repaired
noise-level behavior was retained. No contact-margin relaxation is introduced.

No branch is selected after outcomes to stand in for both objectives. A fail
would favor reassessing what correction is predictable from requested paths
before expanding capacity or launching another weight search. A pass still
needs new, uninspected trajectory programs and a separately specified adapted-
generation test; physical navigation and semantic transfer remain unmeasured.
