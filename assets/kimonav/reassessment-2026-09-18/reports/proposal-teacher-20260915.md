> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/proposal-teacher-20260915/REPORT.md`; SHA-256: `49b7ab77de87d10a2c2ac9439f512a6a9273fdc15f8bdf4e2b4960e09bb340c0`.

# Proposal-conditioned navigation-teacher training

Both arms trained for 1,048,576 control transitions from the same initial braking policy. The aware arm receives the frozen tracker code and reference-phase features; the matched blind arm receives zeros in those slots. Both use the same post-action, anticipatory and episode-peak task objective.

| Controller | Native | Physical quality | Full task + quality | Full STOP | Median STOP peak | Mean maximum path error |
|---|---:|---:|---:|---:|---:|---:|
| zero | 6/6 | 5/6 | 0/6 | 0/6 | 0.1678 m/s | 0.2042 m |
| prior | 6/6 | 5/6 | 1/6 | 1/6 | 0.1472 m/s | 0.2007 m |
| blind | 6/6 | 6/6 | 1/6 | 1/6 | 0.1495 m/s | 0.1840 m |
| aware | 6/6 | 6/6 | 1/6 | 2/6 | 0.1450 m/s | 0.1843 m |

Predeclared continuation gate: **False**. Limited reference-initialized teacher gate (6/6): **False**.

Continuous summaries use full-duration episodes; binary counts include every attempt. The paired differences below use common full-duration attempts. Fresh execution seeds are not held-out task designs.

| Aware minus control | Common full attempts | Mean maximum-path change | Median STOP-peak change |
|---|---:|---:|---:|
| zero | 6 | -0.0199 m | -0.0186 m/s |
| prior | 6 | -0.0164 m | -0.0056 m/s |
| blind | 6 | 0.0004 m | -0.0045 m/s |

## Integrity and limits

- The zero-correction wrapper reproduced the earlier frozen-tracker execution exactly. The first training rollout was exactly matched across the two arms, and all four controllers started each evaluation from identical measured states.
- Teacher/decoder parameters remained frozen. Cached proposals give one query per executed action plus one unused final training batch. Every terminal physical state was scored before automatic reset; deadline and cache accounting were checked.
- Mean rollout-state KL stayed within 0.02 using rollback of parameters and Adam state. Rewards are training surrogates; original 0.20 m path, 0.10 m/s STOP and physical-quality gates are unchanged.
- This is one training seed and two familiar straight-walk programs with native reference resets. It does not establish ordinary-standing, unseen-task, text, obstacle or hardware navigation.
- The reward uses episodic peak memory; this first actor/critic input does not explicitly expose those maxima. Value estimation therefore approximates returns with partial history. This is shared by both arms and remains a potential improvement, not an explanation established by this comparison.
- One preliminary configuration launch failed before physical execution because the native reward configuration rejects arbitrary new term names. Its artifact is retained; state capture now wraps an existing term without changing its native reward value.

Locked plan (local experiment artifact) · All results and training receipts (local experiment artifact) · Initial evaluation-state checks (local experiment artifact)

No failed full task is admitted as a successful navigation demonstration. Any future student collection must carry explicit qualification and deployment-information masks.

## Checkpoints, figures and next design

Proposal-aware checkpoint (local experiment artifact) · Blind checkpoint (local experiment artifact)

Evaluation figure (local experiment artifact) · Training figure (local experiment artifact) · Network feedback diagnostic (local experiment artifact)

Source snapshot and test receipt (local experiment artifact) · Completion audit (local experiment artifact)

The research update (local experiment artifact) explains the implementation, measured failure modes, reproducibility and the next progress/braking-control experiment.
