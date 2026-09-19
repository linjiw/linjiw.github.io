# Evidence review and research decisions

18 September 2026. Counts below retain their original denominators and experimental scopes. No aggregate across these studies is a new benchmark. Current headline values are extracted from the latest joint study's machine-readable summary; other entries are traced to the reports linked below.

## Current matched study

Four internal-development motions × two simulator seeds; one training seed. These motions were excluded from student fitting but were seen by the tracking teacher. Reference-state resets and imitation termination remain active.

| Arm | Full native duration | Complete timed task | Offline action MSE |
|---|---:|---:|---:|
| Tracking teacher | 8/8 | 1/8 | — |
| Mean reference | 0/8 | 0/8 | 0.09956 |
| Measured reference | 0/8 | 0/8 | 0.05307 |
| Joint CVAE | 0/8 | 0/8 | 0.04569 |
| Staged CVAE | 0/8 | 0/8 | 0.04645 |
| Staged deterministic | 0/8 | 0/8 | 0.04709 |

[Source: joint-state study](reports/navigation-bfm-joint-20260915.md). Its exact-reference oracle reproduces 1,096 teacher decisions across four complete trials. Staged posterior completion is 1/4; this is privileged assistance, not public navigation. The measured parameterization reduces offline action error by 46.7% relative to mean, but does not improve full completion. Current representations are usable research instruments; their downstream controller is not qualified.

## What preceded it

| Evidence | Observation | What it rules out / leaves open |
|---|---|---|
| [Repaired teacher](reports/sonic-teacher-evaluation-20260913.md) | Original/repaired: 82/84 vs 83/84 training completions; 20/20 vs 16/20 reserved completions on one matched seed | Fine-tuning is not uniformly superior. Failed motions have truncated errors; reduced error does not cancel a retention loss. No obstacle tasks were introduced. |
| [Full-current motor study](reports/motor-distillation-20260913.md) | Small full-current anticipatory panel: 21/24, matching teacher. Subsequent main motor: 9/20 reserved; exact-phase confirmation: 8/20; paired teacher: 15/20 | Low-level imitation can work with dense commands. This does not establish sparse-goal control or general retention. Different panels are not pooled. |
| [Text/goal pilot](reports/text-goal-navigation-20260913.md) | Two public students each fail all 24 fresh-seed evaluations after very limited qualified task data | Too little task coverage to isolate the preview mechanism. Failed residual teacher tasks do not disqualify all motion-tracking supervision. |
| [Stable task adapter](reports/task-adapter-stable-full-20260914.md) | All three arms complete 24/24 native duration; all have 0/24 task-and-quality success | Optimizer integrity and duration are distinct from task learning. |
| [Task margin study](reports/task-margin-pilot-20260914.md) | Margin arm: 0/24 task-and-quality; matched continuation control: 1/24 | No evidence to promote this reward package. |
| [Single-robot correction](reports/task-authority-single-20260915.md) | Early positive code correction improves STOP peaks in six pairs; no full qualification; some prefixes already fail the path | Control authority can exist without sufficient task capacity. Later corrections cannot erase past violations. |
| [Proposal-conditioned teacher](reports/proposal-teacher-20260915.md) | Aware and blind each achieve 1/6 task-and-quality; both complete 6/6 duration | Proposal features do not yet add demonstrated qualified capacity. |
| [Timed token student](reports/token-navigation-20260915.md) | About 10% lower token action MSE than flat at the longer fit; all 36 student runs terminate early | Offline error is a poor promotion criterion here. Model capacity differs in the flat comparison. |
| [Student-state DAgger](reports/navigation-bfm-dagger-20260915.md) | 1,392 queries; all student arms 0/8, teacher 8/8; nine newly retimed teacher motions complete | Stored query fitting did not solve closed-loop execution. Tempo data are feasible, but are not STOP/hold qualification. Seven of eight scheduled teacher-recovery diagnostics complete with assistance. |
| [Reference/mask/velocity study](reports/navigation-bfm-reference-20260915.md) | Six public arms each 0/8; full-reference oracle 4/4; current-frame hint 2/4; posterior 0/4 | Exact motor path works; hint helps narrowly; this trained posterior is not an adequate privileged target. Initial simulator velocity alone does not fix the problem. |

## Historical findings retained in the new interpretation

The [September 9 continuation](reports/continuation-2026-09-09.md) and [September 10 publication receipt](reports/publication-2026-09-10.md) document the live binary governor's 10/24 versus 8/24 result. This is a development implementation check at the two-reference union ceiling, with post-hoc design and paused simulation during decisions. It is not evidence for a general real-time navigation controller.

The [September 11 terminal-family result](reports/terminal-family-2026-09-11.md) finds global fixed and hindsight capacity tied at two qualified successes in fifteen available program/seed cells; eligibility and unavailable cells remain distinct. An adaptive selector has no demonstrated additional capacity in that allocation.

The historical synthesis (local historical record), paper ledger (local historical record) and Fable review (local historical record) describe representation controls, failed learned selectors, reference-response limitations and clock/provenance corrections. Their dated next-step recommendations have been overtaken by later experiments. Preserve them as evidence; use this revision for current priorities.

## Four consequential repairs to the argument

1. **Goal → evidence:** the website's flat-floor timing story does not test the requested cluttered traversal capability. Add an explicit whole-body geometry question and scene-conditioned baselines; retain old timing panels as history.
2. **Teacher → student:** an exact tracking action can be a good motor label without being a successful navigation transition. Keep motor supervision, task feasibility and scene interaction as separate qualifications. Train on student states only when the queried continuation is meaningful for that state and task.
3. **Representation → execution:** smaller MSE, changed codes and a better privileged posterior do not show autonomous capability. Promote on complete task-and-quality outcomes at matched observations and budgets.
4. **Split → claim:** recent “reserved20 untouched” statements mean unused in that specific student study. Earlier reports already evaluated these clips. Preserve exclusions from training and create a new final split for claims needing unseen data; never describe seed repeats as unseen tasks.

## Scope still unmeasured

Arbitrary standing starts; route/posture changes caused by obstacles; contact-free completion in clutter; sensor-based localization; visual policy input; asynchronous runtime under measured delay; long-route generalization; independently grounded language control; new support contacts; and hardware performance. None follows from the current token or teacher tracking results.

The recommendation is a reasoned research decision, not proof that a modular planner will win. The [new plan](README.md) specifies outcomes that would keep, simplify or replace it.
