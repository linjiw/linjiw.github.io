> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/text-goal-navigation-20260913/REPORT.md`; SHA-256: `c7105a28369fb6196b6b0e748a32119875987b7d607c54bb2fa1040ce3ff70a3`.

# Text/goal navigation integration pilot — 2026-09-13

The public-program navigation pipeline is implemented and exercised in native simulation. The current motion teacher is not a reliable timed-task teacher: the unchanged proposal passed 0/16 fresh confirmation tasks. Only one complete 400-decision demonstration qualified for fitting. Both student arms failed their 24 fresh-seed executions despite low offline imitation loss.

| Stage | Native completed | Full task + quality |
|---|---:|---:|
| Baseline screening | 8/8 | 1/8 |
| Settle 0.2 s screening | 8/8 | 0/8 |
| Settle 0.4 s screening | 8/8 | 0/8 |
| Baseline confirmation | 15/16 | 0/16 |
| Teacher collection | 24/24 | 1/24 |
| Student with preview | 0/24 | 0/24 |
| Student without preview | 0/24 | 0/24 |

## What was implemented

- Controlled text → validated numeric program → original-clock public task features → student c64 → frozen SONIC decoder → native action. All eight instructions retain their authored paths and compiled deadlines; see `TEXT_GROUNDING_AUDIT.json`.
- Student input is processed proprioception H930, public task18, zero command-history64 and localization metadata4. Public preview contains requested points at 0.2/0.5 seconds, never future joint/reference motion. No text embedding or unrestricted language understanding is claimed.
- The initial localization baseline uses exact current simulator root pose and velocity. Native reference initial poses are used at reset. Reference tracking termination remains the native benchmark termination condition.
- Teacher labels are captured before physics on the same decision. Decoder action parity was exactly zero. Admission binds trajectory, label, lock and qualification hashes; failed prefixes are excluded.
- Student runs guard against teacher actor inference and record `PUBLIC_ACTOR_AUDIT.json`: no teacher takeovers or privileged actor-reference inputs.

## Data and experimental scope

The motor teacher and decoder remain the checkpoint trained on the registered repaired 84-clip pool. That registry and its full motion/text correspondence are unchanged. The eight historical timed-program proposals are a separate development population; they were not inserted into the repaired motor pool. Reserved 20-clip motor labels and sealed final36 tasks were not used.

The settling intervention blends the complete root/joint pose over 0.8 seconds, reaching a late-hold target 0.2 or 0.4 seconds before the original STOP boundary. It preserves reset and duration. Neither variant yielded a qualified task. Baseline was selected by the predeclared full-success count and failed both fresh confirmation seeds. No STOP, path, heading, contact or clock thresholds were relaxed.

Collection seed 91500 deliberately replays the known development success, program C; this is not independent validation. Seeds 91510/91511 supplied no admitted demonstrations. The one admitted program is forward → left strafe → forward → STOP. Every rejected attempt remains recorded. No unqualified frame was relabeled as successful.

## Student fitting and interpretation

Each direct-code arm received 2,000 Adam updates with batch 256, equal-program sampling, frozen decoder, and action MSE + 0.1 × post-FSQ code MSE. The only difference is public path preview. Both received the same seed and data; weights are under `direct-preview/student.pt` and `direct-no-preview/student.pt`.

- direct-preview: final sampled training action MSE 0.00000613; checkpoint `a3fd7ef775c3c479b51c72e3d2e1197bab663760a154af314729e337e81c27e0`.
- direct-no-preview: final sampled training action MSE 0.00000610; checkpoint `9a1329107081b366f4247ddc6619c6e235cb1cc68e19a908189dbecf3e539b72`.

These are training-batch losses, not physical performance. Both arms fail even the demonstrated program on fresh execution seeds. This single-program pilot cannot estimate the value of preview, assess general text/goal conditioning, or support a claim about BFM-style representation superiority.

## Next research decision

Prioritize an actual timed-task teacher before scaling navigation distillation: keep the repaired motion teacher and decoder frozen, train a bounded post-FSQ residual against original-clock path, heading, velocity and STOP costs, and qualify it on fresh development seeds with the same physical gates. Residual norm, contact, falls, and native tracking degradation must be reported alongside task outcomes. Zero-residual replay parity is the runtime prerequisite. Only after there is multi-program qualified coverage should structured navigation and same-state DAgger comparisons proceed. Residual PPO training has not been run in this pilot. The bounded follow-up design is `TASK_TEACHER_NEXT_PROTOCOL.json`.

Validation: 27 focused tests passed. `VALIDATION.json` records whole-demonstration fitting errors, checkpoint hashes, all 14 successful process exits and six public-actor audits. No native worker from this pilot remains active.

Reproduction: prepared run directories contain immutable locks, native configs, status/source hashes, trajectories, and `TASK_QUALIFICATION.json`. Plans are `PLAN.json`, `SELECTION.json`, and `NAVIGATION_PILOT_PLAN.json`. Use `prepare_navigation_execution.py`, `run_motor_native.py`, `score_timed_requalification.py`, and `train_navigation_student.py`; outputs are exclusive directories.
