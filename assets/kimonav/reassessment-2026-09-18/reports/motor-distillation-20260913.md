> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/motor-distillation-20260913/REPORT.md`; SHA-256: `a3b845f99c4bcef9166dc6e320437aa33df2a82c56540aad6cae1bb7e582a0bc`.

# Repaired-data teacher–student distillation: first executed study

September 13, 2026. Implementation, offline fitting, native Isaac Lab evaluation and one bounded student-state acquisition round completed.

The anticipatory motor can retain almost all training motions after DAgger. Reserved performance remains below the teacher, and no timed-navigation demonstration passed the full task contract. These are full-current-command motor policies, not reference-free navigation policies.

## Native motor results

| Candidate | Train completions /84 (execution seeds) | Reserved /20 |
|---|---|---|
| teacher | 83 | 15 |
| warm-direct | 61 | 6 |
| warm-anticipatory | 59 | 3 |
| replay | 59, 60, 60 | 3 |
| dagger | 83, 83, 82 | 9 |
| phase-replay | 57, 56, 51 | 2 |
| phase-dagger | 83, 84, 83 | 8 |

Warm-fit and teacher training evaluation use seed 91400. Replay/DAgger and phase controls use 91400, 91402, 91403; reserved evaluation uses 91401 throughout. Each candidate is one trained checkpoint. No teacher takeovers occur in evaluation.

The eight-motion pilot gave teacher 21/24, direct code 18/24, anticipatory 21/24, repeated-current-reference 0/24 across three execution seeds. Full-pool warm fitting exposed a gap the small pilot did not reveal.

## Acquisition and controls

| Collection | Environment attempts | Usable decisions | Physics transitions |
|---|---:|---:|---:|
| pilot-collection | 16 | 4709 | 5584 |
| full-collection | 84 | 26866 | 44016 |
| dagger-collection | 160 | 44413 | 83840 |

All acquired motion IDs are in the repaired 84-clip training registry. Stable clip IDs bind the original text, constraints, navigation/traversal metadata and repair diagnostics. Reserved clips are never included in fitting, normalization or teacher-query collection. Failed prefixes and unexecuted teacher queries remain explicitly different data roles.

The collector checks every decision: native current physical frame equals the 114D command extension, and the frozen decoder reconstructs the captured teacher action. Both maximum absolute errors were zero in every collection. Offline parity at a different batch size stays within the declared 2e-4 tolerance. Teacher querying occurs once on the actually driven state before physics. There is no second FSQ pass or extra action scaling.

Both warm-fit arms use 2,000 updates, batch 256, identical data and equal-motion sampling. The first DAgger/replay comparison uses another 2,000 updates from the same anticipatory warm start; DAgger mixes 50% nominal and 50% queried decisions within each motion. Acquisition is 83,840 transitions, below the 96,000 allocated ceiling and original 100,000 proposal; all teacher actions remain unexecuted during this student-driven collection.

The subsequent phase control also uses matched motion, role and exact tick schedules. Both arms exclude two query ticks beyond the available nominal prefix of motion 00690. The replay arm substitutes nominal state/labels at the same selected tick and fits zero query rows. Identical schedule SHA256: `d3cf4ab92118272f50dfa3f7dcb75c400640247c1f54cf63307b10d13a21ccc2`. This follow-up was defined after inspecting the first comparison; all fixed checkpoint results are retained.

The architectural comparison does not isolate network size, forecast loss or frozen-encoder structure as the sole cause. Reduced training-batch action loss does not establish closed-loop retention. Root/body metrics in RESULTS.json are censored by failure and must be read with completion counts.

## Timed navigation qualification

| Program | Native completion | Maximum STOP speed (m/s) | Runtime quality | Full task + quality |
|---|---|---:|---|---|
| A | True | 0.147 | False | False |
| B | True | 0.217 | True | False |
| C | True | 0.181 | False | False |
| D | True | 0.115 | False | False |
| E | True | 0.123 | False | False |
| F | True | 0.164 | False | False |
| G | True | 0.121 | True | False |
| H | True | 0.157 | True | False |

These are the eight existing centered timed-program diagnostic references, separate from the repaired motion training pool. Original start frames and compiled clocks are retained. All exceed the strict STOP speed <0.10 m/s somewhere in the hold; several also miss path/endpoint requirements. Three pass runtime quality, but zero pass task AND quality. No navigation imitation labels or trained navigation weights are claimed.

A recording audit found that native direct-action evaluation left the trajectory recorder's latent buffer at zero. The callback now publishes the actual executed decoder code before physics. Requalification was rerun with corrected capture, and nested metrics were cropped to the same original task interval as the physical scorer. Initial invalid quality receipts remain preserved; `timed-requalification-capturefix-91390/TASK_QUALIFICATION.json` is authoritative.

The controlled-language grounding implementation records actual compiler timing. For 0.5 m at 0.25 m/s followed by a 1 s STOP, the existing trapezoidal profile and frame rounding yield arrival 2.2 s and end 3.2 s. An explicit incompatible deadline is rejected, never silently extended.

## Implementation and artifacts

Code is in `knav/src/knav/training/`: reference_layout.py, motor_student.py, teacher_student_collector.py, timed_navigation_student.py, timed_program_grounding.py and task_capture.py. Scripts prepare/run/fit/evaluate each bounded stage, preserve locks and process exits, and summarize results. Existing v1 task-qualified loading remains unchanged. The v2 motor loader checks repaired split bindings, file hashes, current-frame layout, decision clocks and previous executed actions.

Main DAgger checkpoint: `dagger-anticipatory/student.pt`. Exact-phase confirmation: `phase-dagger/student.pt`. Each checkpoint requires the hash-bound repaired teacher encoder/decoder contract and a full current 114D motor command. They are not standalone text/goal policies.

Figures: completion_comparison.png and training_action_mse.png. Detailed per-clip paired outcomes, failed IDs and tracking errors: RESULTS.json and each metrics_eval.json. Run locks retain checkpoint, pool and motion/text-index hashes.

## Next research step

Retain both motor comparators while improving reserved retention with training-only acquisition. For navigation, obtain physically qualified original-clock braking/hold and continuation examples with the new teacher before fitting the public timed-program adapters. Their typed input boundary and grounding are implemented; qualified teaching data and navigation training remain outstanding. Broader free-form text, scene sensing, traversal and masked-CVAE experiments remain later stages. Final36 was not accessed.

## Validation and video

49 focused tests passed. All 39 native runs exited zero (about 19.7 minutes cumulative simulator-process wall time). Eight fits completed 16,000 optimizer updates in total across all candidates. The teacher checkpoint, frozen encoders and both repaired pools are unchanged; see VALIDATION.json. No GPU compute process remained after completion.

Teacher–student comparison video (local experiment artifact): 16 seconds, 1280×720, two illustrative training motions plus the known failure 00690. It renders actual Isaac Lab captures with MuJoCo forward kinematics, without new physics. Failed poses are held after native termination. Body-position rendering parity was within 2.42 micrometers. This video is illustrative, not a randomly sampled performance estimate.
