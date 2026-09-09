# KimoNav: completed research continuation — 9 September 2026

The live binary governor reproduces **10/24 complete tasks versus 8/24 current**,
with two gains and no losses on the same inspected development programs.
The next registered reference-envelope grid admits 16 of 18 geometric repairs,
but **none of their forecasts admits the complete task**. All robot execution
is G1 simulation. Final36 remains sealed.

## Live binary implementation check

| Metric, all 24 allocated programs | Current | Repair always | Replay | Live binary |
| --- | ---: | ---: | ---: | ---: |
| Complete task | 8 | 8 | 10 | 10 |
| STOP speed with coverage | 12 | 16 | 14 | 14 |
| Complete STOP phase | 9 | 9 | 11 | 11 |
| Runtime quality | 14 | 11 | 14 | 14 |
| Task and runtime quality | 5 | 7 | 7 | 7 |

The completed panel has two reused captures and 22 new captures, including
one separately declared recovery of the interrupted original slot. All 25
attempt starts remain recorded. The original-first-attempt view retains ten
successes, 23 available outcomes and one unavailable outcome among 24 allocated
programs; the table uses the recovery-completed panel. The interruption's cause
is unknown. One actual early termination is a separate task failure with
unobserved STOP; 23 programs have observed STOP.

The gains are right pivot–walk 10 s and right strafe–walk 3 s: +8.33 percentage
points descriptively. The rule selects two repairs and retains current 22 times.
Every choice and outcome matches replay. All 24 fresh repair returns, all 48
forecast arrays, and all 33 selected-counterfactual first-episode arrays per
program reproduce the inspected records. Both rescues use the sequential branch.
This establishes live implementation reproducibility at the same simulator
seed, not new-program or disturbance robustness.

Two selected forecasts predict complete-task admission despite actual failure;
two predict STOP compliance despite observed STOP failure. Prediction remains
uncalibrated. Preparation takes 11.30–18.13 s with physics paused.

[Audited program data and source identities](/assets/kimonav/binary-live-2026-09-09.json),
[recovery protocol](/assets/kimonav/binary-live-recovery-protocol.md),
[paired figure](/assets/kimonav/binary_live_results.pdf).

## Reference-envelope mechanism

All 18 geometry attempts and308 cold projection returns are retained. Sixteen
references pass geometry/rate checks; two right 15 cm references fail transition
contact projection. The executed tolerance stays 20 cm and STOP stays strictly
below 0.10 m/s throughout its original interval.

For requested settling 0.40 s, the 5 cm prior delays hold until 5.84 s, versus
5.72 s at 10 cm and5.68 s at 15 cm. The right 15 cm proposal is rejected.
Thus the prior limits hold timing in this grid. Earlier holds do not establish
complete-task support.

Eighteen completed forecasts cover 16 admitted candidates and two current
comparators. An initial current attempt stopped at a CPU-package identity
check with zero predicted states; a separately registered forecast-only
recovery reused all geometry without another solver call. That failure and
the original unattempted records remain preserved.

None of the 16 candidate forecasts passes the full task. Four left candidates
predict compliant STOP speed while failing position/phase requirements. The
lowest STOP forecast is 0.043712 m/s with 0.326540 m maximum position error.
The closest right forecast is 0.100476 m/s, still failing strict STOP. The grid
adds no robot-simulation captures and no measured rescue.

[Complete grid data](/assets/kimonav/reference-envelope-2026-09-09.json),
[protocol](/assets/kimonav/reference-envelope-protocol.md),
[forecast recovery](/assets/kimonav/envelope-forecast-recovery-protocol.md),
[mechanism figure](/assets/kimonav/reference_envelope_results.pdf).

## What remains

Repair braking and timed progress jointly; validate intervention-effect
predictions on separately registered development variation; then test actual
computation delay, stale updates and repeated feedback while simulation runs.
Freeze method, comparators, compute budgets and analysis before final36.
The wrong-sign pelvis pilot and negative default-offset model remain separate
negative evidence. No candidate from this grid is promoted as a successful
full-task repair.

Both saved-output audits pass. They recompute task/model scores and inspect
physical arrays, saved projections, limits, splices and clocks without rerunning
producers. Software tests and source hashes do not establish hardware reliability.
The [working-paper summary](/assets/kimonav/paper-summary.md) is updated; the
full manuscript stays local for author review. See the [remaining-work plan](/assets/kimonav/deployment-roadmap.md).
