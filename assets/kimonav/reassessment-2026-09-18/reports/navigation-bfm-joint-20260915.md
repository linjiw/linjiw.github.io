> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/navigation-bfm-joint-20260915/REPORT.md`; SHA-256: `b6c769bb2863de7eab974483942376dcb220fe00fff9eff6d871e188c5dae7b6`.

# Joint-state correction and staged reconstruction: results

Completed five fixed-budget fits (20,000 optimizer updates total) and 64 native runs. This is a one-training-seed internal-development pilot; reserved20 remain untouched. Teacher weights are unchanged.

## Public execution

| Arm | Full duration | Mean duration fraction | Timed task | Offline action MSE |
|---|---:|---:|---:|---:|
| teacher | 8/8 | 1.000 | 1/8 | — |
| mean | 0/8 | 0.045 | 0/8 | 0.09956 |
| measured | 0/8 | 0.080 | 0/8 | 0.05307 |
| joint | 0/8 | 0.093 | 0/8 | 0.04569 |
| staged | 0/8 | 0.128 | 0/8 | 0.04645 |
| deterministic | 0/8 | 0.096 | 0/8 | 0.04709 |

## Privileged diagnostics

| Arm | Full duration | Mean duration fraction |
|---|---:|---:|
| oracle_reference | 4/4 | 1.000 |
| posterior_joint | 0/4 | 0.286 |
| posterior_staged | 1/4 | 0.345 |
| posterior_deterministic | 0/4 | 0.200 |

## Posterior intervention

All 3,138 development decisions receive a reference from a different motion, while public state stays fixed. Public prior codes remain exactly unchanged. Training log adjacent-row rolls are a weaker local check; this is the cross-motion audit.

| Arm | Correct posterior action MSE | Different-motion action MSE | Changed code fraction |
|---|---:|---:|---:|
| joint | 0.03942 | 0.22200 | 1.000 |
| staged | 0.03432 | 0.32509 | 1.000 |
| deterministic | 0.03367 | 0.32307 | 1.000 |

## What this establishes

1. Measured-state parameterization reduces offline public action MSE by 46.7% in the matched comparison. Mean captured duration is 0.045 for mean-based prediction and 0.080 for measured corrections. Full completion remains the primary outcome. Future dq MSE increases from 1.427 to 2.160; this is not a uniform reconstruction improvement.
2. Staged CVAE reduces posterior action MSE by 12.9% versus joint training, and its reconstruction is preserved exactly through transfer. Privileged native completion is 1/4 versus 0/4 for joint training. This tests privileged reconstruction, not public navigation success.
3. Public prior action MSE is 0.04645 for staged CVAE, 0.04569 for joint training and 0.04709 for staged deterministic training. Public full-duration completions are 0/8, 0/8 and 0/8 respectively. These small pilot results do not establish a stochastic-model advantage.
4. The teacher and exact-reference bridge remain the control benchmark. Failures in predicted-reference execution identify an integration/training problem; they do not negate the established tracking capability of the teacher.

## Next discriminating experiment

Collect fresh fit-only states driven by the current measured/joint/staged public models. Query the frozen tracking teacher at those exact pre-action states, recording original-clock reference, motor code and action. Preserve explicit no-takeover public runs and paired phase-matched replay controls. Existing old-student query data alone does not cover these new models' state distributions.
Before transferring again, test posterior reconstruction on these fresh states. Keep correct/different-motion interventions and full posterior native execution as diagnostics. If reconstruction fails, train that mechanism with more fit-only state coverage and a predeclared budget before treating its latent as a good target. Compare a longer reconstruction warmup against matched total-budget joint and deterministic controls; do not tune on these four development executions.
Then test public-prior training through the fixed motion decoder with the new labels, followed by an actual online mask curriculum. Keep measured velocity initialization separate. Expand to feasible timed waypoint/turn/hold commands and then command changes only after stable public control. New timing programs must be fixed before each evaluation, with a teacher feasibility baseline; retain the current strict scores unchanged. Existing KimoNav obstacle observations and text labels remain the downstream integration, with separate environment and language-control tests.

## Verification and limits

- Sensor audit: 83 historical motions / 26,559 shifted decisions, plus 5,114 directly captured pre-action decisions across native runs, including reset. Native class order differs from YAML order; calibration error remains in public q.
- All current arms use identical initial parameters, normalization and sampled row schedule. Staged models have 2,000 reconstruction and 2,000 prior updates; joint training evaluates both losses throughout. Optimizer budget is equal; FLOPs and prior exposures are not.
- Warmup and final staged posteriors produce identical references and codes on all development inputs. Transfer freezes posterior and reference decoder. Frozen original teacher encoder weights match exactly.
- Oracle reference reproduces 1,096 teacher decisions exactly across four complete motion trials, including actions and physical states.
- Matched initial public features, physical joints, pelvis state and calibration offsets; public teacher calls, reference reads and takeovers are zero. Twenty targeted tests passed.
- Existing flat floor, reference-state initialization and original imitation termination remain. A termination is not a diagnosed fall. Strict timed-task success is distinct from full motion duration. No obstacle-avoidance, language-control or hardware success is established.
- Prefix quality diagnostics (contact force, ankle contact-speed proxy, action magnitude, pelvis height) are stored per run and in SUMMARY.json. Unequal prefix lengths do not establish full-task safety or sole slip.
- A common explicit latent bottleneck and larger reconstruction weight differ from the earlier architecture. The five current arms are the matched comparison; across-study differences cannot isolate a single change.
- Native failed attempts: 1. Previous study source manifests are unchanged.



## Reproduce

Use the IsaacLab environment Python with `PYTHONPATH=knav/src:.codex/sonic-execution-model-history-v1` from the repository root. Prepare a fresh study directory, fit each declared arm, run the panel, run the latent audit and summarize. Existing artifact directories are retained and must not be overwritten.

- `knav/scripts/prepare_navigation_joint.py --study <fresh-directory>`
- `knav/scripts/train_navigation_joint.py --study <directory> --arm <mean|measured|joint|staged|deterministic>`
- `knav/scripts/run_navigation_joint_panel.py --study <directory> --workers 2`
- `knav/scripts/audit_navigation_joint_latent.py --study <directory>`
- `knav/scripts/verify_navigation_joint.py --study <directory>`
- `knav/scripts/summarize_navigation_joint.py --study <directory>`

BFM context: [masked online distillation and CVAE](https://arxiv.org/abs/2509.13780), [BFM-Zero](https://github.com/LeCAR-Lab/BFM-Zero), [Scaling BFM](https://arxiv.org/abs/2607.15163). This pilot tests our teacher integration, not a complete reproduction.
