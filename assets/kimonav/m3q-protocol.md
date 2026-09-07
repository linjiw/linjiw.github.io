# M3q: bounded root-rate response, finite identification protocol

6 September 2026. Registered before M3q parameter evaluation. Reuse all 192
qualified M3p captures, 24 contexts / four families / eight candidates per
context. Twelve reserved programs stay sealed. Zero new generation or physics.

## Dynamics and fixed search

Predict world horizontal velocity and yaw rate with
`u_next = rho*u + (1-rho)*u_reference(t + preview)`, where
`rho = exp(-.02/tau)` for tau>0 and rho=0 for tau=0. Integrate planar position
and yaw by trapezoidal integration, starting from the qualified measured 2.04 s
state. All later states are predicted. Preview uses the already qualified
active command packet, including original-reference preview before 2.08 s and
terminal clamping. Position feedback, fitted biases and gain changes are absent.

Decay constants are exactly **[0, .04, .10, .20, .40] seconds**. Preview offsets
are exactly **[0, .10, .20, .30] seconds** (indices 0–3 of SONIC's ten samples).
The no-preview arm uses offset zero; the preview arm uses all four offsets.
Horizontal velocity shares a decay/offset for both world axes; yaw rate selects
its own pair. This yields 25 possible paired models without preview and 400
with preview. Identity is tau=0, offset=0 for both channels. No data-dependent
grid expansion, unconstrained regressor, or final all-data identification.

For 0≤rho<1 each next rate is a convex combination of the previous rate and
known commanded rate. Induction bounds every rate component by the min/max of
its initialization and all consumed commands. The horizontal speed norm is
bounded by their maximum norm. This is a predictor-rate bound, not a bound on
integrated position or a proof of robot stability. Verify bounds numerically
with 1e-9 tolerance, and identity parity with M3p to 1e-10.

## Selection and exact accounting

The fixed search is separable: position/velocity errors depend only on the
horizontal pair, while heading errors depend only on the yaw pair. Evaluate
all 20 single-pair six-state forecasts on all 192 input packets exactly once:
**3,840 unique grid forecasts**. Assemble mixed-pair forecasts by their columns;
this is mathematically equivalent to searching all paired combinations.

Two arms × four outer families × (three inner TRAIN/validation splits + one
outer TRAIN fit) = **32 finite parameter selections**, not 32 gradient fits.
Each inner selection uses two families, validates on the third, and never sees
the outer family's labels. The outer selection uses the other three families.
The inner results diagnose transfer; they do not tune another hyperparameter.
All eight candidates and all times of a context stay together. There are 1,152
inner validation forecast views and 384 outer forecast views; these reuse the
grid and are not independent robot attempts. Break exact selection ties by
smaller preview offset, then smaller decay constant.

Use the same M3p primary interval, observed targets, metric scales and equal
context/candidate weights. Select horizontal parameters using displacement
MSE/.20² + velocity MSE/.15², and yaw parameters using wrapped heading
MSE/(10°)². Their sum divided by three is the registered composite. No
normalization learns from validation. Preserve all censored suffixes and the
irrecoverable pivot prefix. Report both banks, all families, turning, STOP,
whole continuation, and .2/.5/1/2/3/5/10 s endpoints with observed/requested
denominators. Compare with the four frozen M3p predictors.

Each bounded arm has a separately declared useful-prediction gate: ≥10% lower
primary composite than reference following, no increase in any primary channel
MSE, no >10% composite regression in any held-out family or turning/STOP, and
all rate bounds satisfied. Preview's additional value requires ≥5% reduction
versus bounded no-preview. A gate pass supports only offline predictive utility;
select the lowest-primary-composite passing arm for a future physics protocol.
If neither passes, close this root-delay compensation hypothesis and move to
tracker adaptation/retention qualification, as specified by the M3q plan.

## Verification

Require a zero-exit full test suite before parameter evaluation. Freeze protocol,
code and prior delivery hashes. Tests cover analytic constant/STOP responses,
both turn signs, rate bounds, split isolation, separable selection, observation
gap and identity parity. Independently reproduce all 20 trajectories using
the closed-form exponential response (not the recursive implementation), all
32 selections from TRAIN rows, every selected forecast and all result summaries.
Poisoning future labels leaves forecasts unchanged. Preserve failures and stop
on source drift. Publication may summarize these development results with their
denominators, but cannot report improved executed navigation without new physics.
