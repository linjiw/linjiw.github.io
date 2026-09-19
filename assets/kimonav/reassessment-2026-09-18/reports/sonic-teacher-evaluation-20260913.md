> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/sonic-teacher-evaluation-20260913/REPORT.md`; SHA-256: `3261a5a9e4de0a612ace9330396b4f7c122c1251d23241729ed5cae68a901c7a`.

# Repaired SONIC teacher: training, evaluation, and policy video

Training completed 3,000/3,000 PPO iterations with 2,048 environments and 84 repaired v1.1 motions, totaling 147,456,000 environment transitions. Worker exited successfully after 9,161.98 seconds (2 h 32 min 42 s). Final checkpoint: `../sonic-teacher-repaired-2048env-3000iter-20260913/run/model_step_003000.pt`.

## Training metrics

Comparing the first 100 with the last 100 logged iterations:

| Metric | First 100 mean | Last 100 mean |
|---|---:|---:|
| Training reward | 26.572 | 26.593 |
| Relative body-position error | 5.34 cm | 3.86 cm |
| Anchor-position error | 45.67 cm | 40.57 cm |
| Joint-position error | 0.1325 rad | 0.1300 rad |
| Logged time-out termination metric | 0.8362 | 0.9724 |

These are stochastic training logs, not separate evaluation or navigation success. See `training_curves.png` and `training_metrics.json`. The native logger's “Total episodes” field is not used as a count of independent completed episodes.

## Matched deterministic evaluation

One native Isaac Lab evaluation pass per checkpoint, 104 environments, seed 91370: 84 repaired training clips plus all 20 reserved clips, identified by exact stable IDs. The combined pool is for evaluation only. Original SONIC and final fine-tuned checkpoint use matching configuration, motion payloads, initialization/termination rules and native deterministic `act_inference`. Native ImEvalCallback performs sequential per-motion assignment and records first-episode completion and motion-tracking metrics. Model weights load strictly. Two evaluation processes exited 0; no evaluation retries. This is a one-seed development comparison, not a multi-seed generalization estimate.

| Metric | Original SONIC | Fine-tuned teacher |
|---|---:|---:|
| Training motion completion | 82/84 (97.6%) | 83/84 (98.8%) |
| Reserved motion completion, all 20 | 20/20 (100%) | 16/20 (80%) |
| Reserved offline-qualified subset | 15/15 | 15/15 |
| Training mean per-clip relative body error | 28.22 mm | 24.78 mm |
| Reserved mean per-clip relative body error | 31.06 mm | 30.19 mm |
| Training mean per-clip horizontal root error | 0.227 m | 0.144 m |
| Reserved mean per-clip horizontal root error | 0.500 m | 0.366 m |

Error rows are equal-weight means of native per-motion metrics over the evaluator's recorded duration; failed motions are truncated, so reduced errors cannot cancel a completion regression. Raw global-frame body errors and per-clip diagnostics remain in `EVALUATION_SUMMARY.json` and each worker's `metrics_eval.json`.

Training rescue: `00053` (tight-circle walking). Remaining training failure: `00690`. No training completion regressions in this one pass.

Reserved completion regressions: `00555`, `00024`, `00566`, `00321`. All four are in the audit's five unresolved reserved clips. They remain counted; their label does not justify dropping the regressions. This supports improved development tracking precision but not unconditional teacher superiority.

Native motion completion is not precise navigation success. The diagnostic 0.5 m horizontal-root guard was crossed by 14/84 trained-policy training clips and 10/20 reserved clips (original: 24/84 and 12/20). This guard is reported separately and does not change the native completion criterion. No doors, stairs, obstacles, or timed navigation goals were introduced.

## Video

`teacher_policy_rollouts.mp4` shows three clips selected by ID before evaluation results were inspected: training `00107` (walk/pause), training `00974` (sidestep right), reserved `00537` (original caption shown onscreen). All three completed in the evaluated policy run. They are examples, not a balanced performance summary.

Left panel: repaired reference, kinematic. Right panel: actual states recorded from the fine-tuned policy executing in Isaac Lab physics. Both are rendered using MuJoCo forward kinematics for presentation; the renderer does not run replacement physics. Camera follows the repaired reference. 50 Hz captures are displayed at 25 fps, retaining original timing and text correspondence. G1 joint order is mapped by joint name. Recorded body positions agree with render forward kinematics within 0.003 mm on checked frames. `VIDEO_MANIFEST.json` records source trajectory/checkpoint/video hashes and exact clip IDs. Video duration is approximately 17.5 seconds.

Implementation: `knav/scripts/summarize_repaired_teacher_training.py`, `knav/scripts/render_repaired_teacher_policy.py`, and `knav/src/knav/training/teacher_evaluation.py`. The evaluator entry point received the same consumed-Hydra-argument fix already applied to training; the callback only adds explicit trajectory flushing before native exit.
