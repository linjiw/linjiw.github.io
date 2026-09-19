> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/RESEARCH_CONTINUATION_2026_09_09.md`; SHA-256: `ae72eca46302e0ec2fc24e121086ffc68ba97a97e3091e05cc5a8279dee23f7f`.

# KimoNav research continuation — 9 September 2026

**New result:** the completed live binary governor reproduces the inspected
replay result: **10/24 complete tasks versus 8/24 current**, with two gains and
no losses. The next registered geometry experiment establishes an earlier-hold
mechanism but produces **zero nominally complete-task-admissible candidates**.
All robot execution is G1 simulation. This is development progress, not a
validated controller on new tasks or under real computation delay.

The updated paper (local experiment artifact) and source (local experiment artifact)
include both studies. The earlier same-day review (local experiment artifact)
and its published snapshot remain historical records.

## Completed live binary study

| Metric, all 24 allocated programs | Current | Repair always | Saved replay | Live binary |
| --- | ---: | ---: | ---: | ---: |
| Complete task | 8 | 8 | 10 | 10 |
| STOP speed with coverage | 12 | 16 | 14 | 14 |
| Complete STOP phase | 9 | 9 | 11 | 11 |
| Runtime quality | 14 | 11 | 14 | 14 |
| Task and runtime quality | 5 | 7 | 7 | 7 |

The original collection had two qualified captures and one interrupted start.
Its files are unchanged. The recovery protocol (local experiment artifact)
re-audits/reuses those two captures, permits one declared recovery for the
interrupted slot, and executes the 21 unstarted programs in the original order.
This adds **22 captures and 44 binary forecasts**, yielding 24 qualified captures and **25 attempt starts**
including the preserved interruption. No new integrity failure occurred.
The interruption's cause remains unknown; it is not a physical task failure.
In the original-first-attempt view, there are **10 successes, 23 available
outcomes and one unavailable outcome among 24 allocated programs**. The table's
complete-panel view uses the explicitly declared recovery.

The gains are right pivot–walk 10 s and right strafe–walk 3 s: +2/24, or
8.33 percentage points descriptively. The rule chooses two repairs and retains
current 22 times. It makes 24 fresh repair calls and 48 forecasts over the
completed panel, including the two reused captures' original calls. The
interrupted original attempt's partial construction is retained separately.
All 24 repair arrays, all 48 forecast arrays, and all 33 selected-counterfactual
first-episode arrays per program match the previously inspected records in
typed bytes. Every choice and task outcome matches replay. Both rescues use the
sequential projection branch; this does not demonstrate coupled-branch benefit.

**Interpretation:** fresh causal construction, nominal evaluation, selection
and delivery reproduce the inspected rule under the same simulator seed and
references. Exact equality supports implementation reproducibility; it does
not make these independent program or disturbance samples. The result is not
final-panel confirmation. Baselines are the archived paired captures, not new
baseline reruns or extra independent trials.

One actual early termination remains in the failure denominator, with STOP
unobserved. STOP is observed on 23 programs. No geometric fall occurs under the
frozen fall predicate. Two selected forecasts predict full-task admission
but fail in execution; two predict STOP-speed compliance but fail observed STOP.
These are separate overlapping error sets, not calibrated probabilities.
Preparation takes **11.30–18.13 s with physics paused**. Runtime quality remains
14/24; task-and-quality success rises 5/24 → 7/24.

Sources: closed capture ledger (local experiment artifact),
aggregate saved-output audit (local experiment artifact),
curated program data (local experiment artifact),
and paired figure (local experiment artifact).

## Registered reference-envelope experiment

The fixed protocol (local experiment artifact)
crosses reference priors 5/10/15 cm with settling requests 0.12/0.24/0.40 s on
left/right strafe–walk 5 s causal null histories. All **18 geometry attempts**
close before forecasting; **308 cold projection returns** are persisted.
Sixteen references pass geometry and rate checks. The two rejected right 15 cm
references fail transition contact projection, and retain whole-current fallback.
Executed position tolerance remains 20 cm; the original STOP clock stays fixed.

| Side / reference prior | Geometry admitted | Proposed hold times for settle 0.12 / 0.24 / 0.40 s | Full-task nominal admission |
| --- | ---: | --- | ---: |
| Left / 5 cm | 3/3 | 5.96 / 5.84 / 5.84 s | 0/3 |
| Left / 10 cm | 3/3 | 5.96 / 5.84 / 5.72 s | 0/3 |
| Left / 15 cm | 3/3 | 5.96 / 5.84 / 5.68 s | 0/3 |
| Right / 5 cm | 3/3 | 5.96 / 5.84 / 5.84 s | 0/3 |
| Right / 10 cm | 3/3 | 5.96 / 5.84 / 5.72 s | 0/3 |
| Right / 15 cm | 1/3 | 5.96 / 5.84* / 5.68* s | 0/1 |

*Rejected reference: proposed timing only, with no candidate forecast.*

With requested settling 0.40 s, the 5 cm prior delays the hold to 5.84 s,
0.24 s before STOP6.08. Relaxing it to 10 cm advances the hold to 5.72 s;
15 cm reaches the requested 5.68 s, although the right candidate is rejected.
The mechanism is therefore measured: the reference prior limits hold timing
in this grid. It does not by itself establish executable stopping support.

The first current model attempt stopped at the CPU actor's import-tree guard,
before producing a state. The forecast-only recovery (local experiment artifact)
uses the required unchanged nominal CPU package, all saved geometry, and no
new solver call. It completes **18 forecasts: 16 candidates plus two current
comparators**. The initial zero-state failure and original unattempted slots
remain preserved. The two rejected references remain no-forecast rows.

**None of the 16 candidate forecasts passes the complete task.** Four left
candidates predict STOP speed below 0.10 m/s but lose position and phase
requirements. The lowest STOP prediction, **0.043712 m/s**, accompanies
**0.326540 m maximum position error**, above the unchanged 0.20 m limit.
The closest right candidate predicts **0.100476 m/s** at 10 cm/0.40 s, still
failing strict STOP. No threshold is relaxed. These are nominal predictions;
this grid adds **zero robot-simulation captures** and no measured task rescue.

Sources: saved-output audit (local experiment artifact),
curated grid data (local experiment artifact),
and mechanism figure (local experiment artifact).

## Analysis and next work

1. **The binary implementation question is closed for this panel.** The live
   rule reproduces its replay gain. New program/seed variation is needed to
   test robustness, with margins calibrated separately from evaluation.
2. **Stopping and timed progress must be repaired jointly.** Wider reference
   bounds advance holds but can trade STOP speed for position failure. Do not
   promote the lowest-speed candidate from this grid. A next candidate study
   should preserve progress while changing braking timing or terminal motion,
   retain all proposals, and screen all original constraints before a matched
   live comparison. Predicted feasibility still needs execution validation.
3. **Prediction of intervention differences remains uncertain.** Keep the
   wrong-sign live pelvis result and rejected default-offset model. Use
   separately registered development variation to measure false admissions,
   STOP residuals, gains/losses and quality changes; do not tune on final36.
4. **Measure actual computation delay and repeated feedback.** Current binary
   preparation is 11–18 s paused for an event one second before STOP. Qualify
   continuing simulation, ready/activation ages, stale rejections and missed
   deadlines before claiming operational deadline-aware control.
5. **Freeze method, comparators, budgets and analysis before final36.** These
   reserved parameter-variation programs remain sealed. No final inputs or
   outcomes were opened in this continuation. Older consumed twelve-design
   confirmation is a separate study.
6. **Complete human author review.** The manuscript now separates the live
   development gain, wrong-sign bank transfer, negative offset calibration and
   geometry/timing tradeoff. Final claims, assistance history and submission
   requirements still need author review of the actual submission candidate.

## Verification and accounting

The recovery preflight passes64 tests and re-audits two saved captures. The
geometry preflight passes18 tests; CPU-package recovery passes3; aggregate
binary analysis passes8 after its documented source-only current-failure
branch correction; hold-timing audit tests pass4. These have different scopes
and are not independent research trials. Both final saved-output audits pass.
The binary audit recomputes task/quality/model scores and physical comparisons;
geometry/history/transaction verification was also performed inline per capture.
The grid audit independently checks saved cold returns, envelopes, limits,
rates, causal splices, model clocks and scores. Audits rerun no producer.

The artifact guide (local experiment artifact)
records paths, environment, source receipts, the failed attempts and audit
amendments. Figures and public exports derive from the closed audits. Neither
software tests nor matching source hashes establish hardware performance.
