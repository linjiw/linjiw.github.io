# M3q: bounded preview improves prediction, but the heading guard fails

6 September 2026. All **3,840 grid forecasts and 32 finite parameter selections**
are complete on the 192 previously qualified executions (24 contexts, four
families, eight candidates per context). Bounded preview improves the registered
primary composite by **19.41%**, but a small heading regression keeps its
promotion gate closed. No new physics or reserved-program execution occurred.

## What changed

M3p's unrestricted rate-change regression accumulated large free-rollout errors.
M3q instead takes a convex combination of predicted and reference rates at every
20 ms step. Five fixed decay constants and four fixed preview offsets define a
finite conventional response family. Horizontal velocity and yaw rate select
separate parameters using TRAIN families only. Prediction still starts at
2.04 s, rolls the original reference through the observation gap, and changes
the active preview at 2.08 s. No later measured state is injected.

The [prospective protocol](m3q-protocol.md) fixes the grid, equal
context weighting, family splits, channel objectives and guards. Thirty-two
parameter selections include 24 inner splits and eight outer models. The 3,840
grid forecasts support 1,152 inner and 384 outer forecast views; these are
reused offline predictions, not independent robot trials or gradient fits.

## Matched result

Primary error is averaged over observed states from 2.08 through 5.08 s and then
equally over candidates and contexts. Composite scales are .20 m, .15 m/s and
10° squared. Lower is better; this score does not replace navigation success.

| Predictor | Composite | Displacement RMSE (m) | Velocity RMSE (m/s) | Heading RMSE (°) |
|---|---:|---:|---:|---:|
| Reference following | .584500 | .098290 | .181044 | **2.349865** |
| Bounded, no preview | .556098 | .098855 | .175434 | 2.368755 |
| Bounded, preview | **.471037** | **.096166** | **.159156** | 2.368755 |

Preview reduces the primary composite by 19.41% versus reference and 15.30%
versus bounded no-preview. The improvement appears in both development banks:
.475016 original and .467059 fresh, versus reference .588346 and .580654.
Every outer preview selection chooses a .10 s horizontal decay with .10 s
preview. Yaw uses zero preview throughout: identity (zero decay) when holding
out pivot–walk–stop, and .04 s decay in the other three outer folds.

| Held-out family | Reference composite | Bounded preview composite |
|---|---:|---:|
| Pivot–walk–stop | .665457 | .465608 |
| Same-sign pair | .515045 | .457553 |
| Strafe–walk–stop | .661919 | .524397 |
| Walk–pivot–stop | .495579 | .436591 |

All rate bounds pass. The turning composite improves from .433781 to .260908;
STOP worsens slightly from .277461 to .282214, within its registered 10% guard.
However, heading MSE rises from .00168206 to .00170921 rad², or 1.61%, violating
the separate no-primary-channel-regression rule. The heading RMSE difference is
.01889°. **Its small size does not authorize relaxing the frozen rule.**
The no-preview arm also fails the 10% primary-improvement requirement.

All 192 candidates contribute observed primary targets: 28,820 of 28,992 states.
The two early endings and 172 missing suffix targets remain visible. Full
horizon/phase tables are in the [summary](response-evidence.json).
No missing physical trajectory is filled by predictions. These two banks are
already development evidence, not a new independent confirmation set.

## Verification and research decision

**256 tests pass** with Torch seed 0 and eight existing warnings. The recursive
implementation agrees with an independent exponential-convolution solution
within 2.49e-14 across all 3,840 grid forecasts. Identity reproduces the frozen
M3p reference control to the declared tolerance. Rate bounds, family isolation,
signed STOP/turn behavior, the observation gap and future-label poison tests
pass. A separate audit reconstructs persisted forecasts, all 32 selections and
the result tables. No fits, retries or physics are hidden behind the count.

M3q supports a narrower finding: bounded conventional dynamics improve offline
response prediction substantially compared with M3p's unrestricted regression.
It does **not** establish a useful compensated navigation controller. Replacing
the yaw channel with identity after inspecting the result would be an unregistered
new arm, so it is not promoted or simulated here.

As predeclared, neither gate passes, so close this root-delay compensation route
for now. The [M3r plan](next-research-plan.md) moves to the
remaining Fable hypothesis: tracker adaptation on generated navigation with
explicit motion-retention controls. Its first task is data/training-interface
qualification, not immediate fine-tuning. KimoNav's broad goal remains reliable
timed local navigation using motion priors, with physical success and motion
quality evaluated together.
