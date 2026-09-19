> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/navigation-bfm-dagger-20260915/REPORT.md`; SHA-256: `2863acc962cc6a2294afe39acf4cb0d679a08e1cd9944f0bc28a93229570a7f8`.

# Navigation BFM: student-state distillation and timing data

Two-round DAgger/replay comparison using existing KimoNav motions, public timed goals, the frozen tracking teacher and the existing flat floor.

## Native evaluation

| Arm | Full duration | Timed events | Entire timed task | Mean captured fraction | Capped deadline error |
|---|---:|---:|---:|---:|---:|
| teacher | 8/8 | 35/64 | 1/8 | 100.0% | 0.163 m |
| initial | 0/8 | 1/64 | 0/8 | 9.6% | 1.912 m |
| replay | 0/8 | 0/64 | 0/8 | 9.8% | 1.940 m |
| dagger | 0/8 | 0/64 | 0/8 | 8.7% | 1.942 m |

DAgger minus matched replay: -1.05 percentage points in mean recorded duration fraction. Interpret this alongside the full-duration and timed-task counts, not as a standalone navigation-success claim. Missing deadlines retain null in raw results; capped error assigns them 2 m and clips observed errors at 2 m.

## Data acquisition and fits

| Round | New teacher queries | Cumulative admitted | DAgger query action MSE | Replay query action MSE | DAgger development MSE | Replay development MSE |
|---|---:|---:|---:|---:|---:|---:|
| 0 | 768 | 768 | 0.000874 | 0.191072 | 0.024000 | 0.017241 |
| 1 | 624 | 1392 | 0.001076 | 0.168843 | 0.029034 | 0.017371 |

Query-state error is a fitting diagnostic: DAgger has trained on these states. Development error uses the separate 12 student-development motions. Each arm received 4,000 updates per round, batch128, identical motion/role/tick schedules, the same architecture, and frozen normalization/decoder. Round0 starts from identical weights; round1 continues each arm from its own round0 result. Queries are unexecuted teacher tracking labels; the robot executes only student actions.

## Retimed teacher execution

| Motion | Tempo | Full native duration | Duration captured | Actual mean speed | Reference dq consistency |
|---|---:|---|---:|---:|---:|
| 00051 | 0.8x | True | 7.44 s | 0.679 m/s | 0.00e+00 |
| 00051 | 1.0x | True | 5.96 s | 0.854 m/s | 0.00e+00 |
| 00051 | 1.2x | True | 4.96 s | 1.028 m/s | 0.00e+00 |
| 00177 | 0.8x | True | 4.94 s | 0.703 m/s | 0.00e+00 |
| 00177 | 1.0x | True | 3.96 s | 0.855 m/s | 0.00e+00 |
| 00177 | 1.2x | True | 3.30 s | 1.043 m/s | 0.00e+00 |
| 00996 | 0.8x | True | 6.20 s | 0.676 m/s | 0.00e+00 |
| 00996 | 1.0x | True | 4.96 s | 0.879 m/s | 0.00e+00 |
| 00996 | 1.2x | True | 4.12 s | 1.073 m/s | 0.00e+00 |

Only source fps changes in derived pools; all non-fps geometry digests match. The native loader resamples at 50 Hz and recomputes velocities, and each tempo produces newly executed/query-labeled teacher actions. Actual pelvis velocity is now recorded. These samples were kept out of the DAgger comparison and have not been assigned new task-success/STOP labels or full physical-quality certification.

Measured initial speeds span 0.310–1.707 m/s. The existing student reports zero velocity at its first decision because its causal position-difference estimator has no earlier sample. Training and runtime agree on this convention; it loses information, but these probes do not establish it as the cause of student failure.

## Assisted teacher recovery diagnostic

| Motion | Switch time | Switch reached | Complete with assistance | Matching pre-switch states |
|---|---:|---|---|---:|
| 00123 | 0.20 s | True | True | 11 |
| 00123 | 0.40 s | True | True | 21 |
| 00697 | 0.20 s | True | True | 11 |
| 00697 | 0.40 s | True | True | 21 |
| 00611 | 0.20 s | True | True | 11 |
| 00611 | 0.40 s | True | True | 21 |
| 00373 | 0.20 s | True | True | 11 |
| 00373 | 0.40 s | False | False | 19 |

The unchanged teacher takes control after the declared student prefix. These are assisted diagnostic runs, never autonomous student successes or training data. Their states before the switch exactly match the corresponding initial-student evaluation. This separates teacher recovery capability from the student learning to reproduce those corrections.

Completion across all scheduled trials: 7/8; among trials reaching takeover: 7/7. 1 trial(s) terminated before the scheduled switch, so the teacher never took control. Both switch times were fixed before running this diagnostic; no successful-prefix selection was applied. The scorer marks every scheduled diagnostic as intervened to exclude it from autonomous-success accounting; actual assistance is determined by switch_reached and teacher_executed_steps.



## Audits and limits

- 1392 teacher queries across 24 fit-motion rollouts; one explicit paired purity control. Every queried teacher action passed same-state decoder parity.
- All 32 native evaluation trials have matching initial public-state hashes within clip/seed groups; fresh re-scoring agrees. Evaluation students never call the teacher.
- 23 targeted tests passed, including phase replay, split isolation, original-clock consistency, executed-action history, public token/clock invariants and masks.
- 2 failed infrastructure startups are retained separately. Reduced single-robot allocation capacities resolved contention; successful runs showed no capacity-overflow warnings. Solver/material/scene settings were preserved.
- Original teacher checkpoint, repaired registry, reserved20 data and prior experiment artifacts are unchanged. Queries come only from the declared 12 of 71 student-fit motions.
- One training seed, four development motions and two physics seeds constitute a development pilot. The teacher has seen the 12 internal-development motions. No broad generalization or real-robot claim follows.
- Reference-state resets and imitation terminations are retained. A native termination is not automatically a diagnosed fall. Teacher first-arrival scores on strict hindsight windows are distinct from tracking reliability.
- Replay matches training allocation and reference phase, but query data also introduce fresh reset/domain variation. A fresh teacher-driven-data control is needed to isolate that factor fully.

## Research direction

The next planned comparison tests a predicted-reference path through the original teacher encoder/FSQ against direct code prediction, then adds control-mask curriculum and a privileged posterior/public prior. Keep current-velocity initialization and a fresh teacher-data control as separate ablations. The timing probe supplies a verified mechanism for obtaining differently paced actions; next form paired timed-goal supervision from its actual executions. See the concrete next-stage architecture and experiment plan (local experiment artifact). These changes are not yet implemented or validated.

This implements the student-state query mechanism used in [BFM, IV-E](https://arxiv.org/html/2509.13780v1). CVAE and mask curriculum remain separate experiments; this is not a full BFM/BFM-Zero reproduction.

See design and reproduction instructions (local experiment artifact), fixed plan (local experiment artifact), raw results (local experiment artifact), and query-purity check (local experiment artifact). Four new checkpoints are under round-0/{replay,dagger}/student.pt and round-1/{replay,dagger}/student.pt.
