> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/navigation-bfm-reference-20260915/REPORT.md`; SHA-256: `c82da5571d580fafbd3ff489e0570228a8d72a9a2e4686a43f108bd0163ca423`.

# Navigation BFM: reference prediction experiment

Implemented and trained the frozen-encoder reference student, masked-current-frame curriculum, privileged CVAE posterior/public prior, and a paired initial-velocity ablation. Existing KimoNav motions and scenes are reused.

## Public evaluation and teacher control

| Arm | Full native duration | Timed events | Entire timed task | Mean duration fraction |
|---|---:|---:|---:|---:|
| teacher | 8/8 | 37/64 | 0/8 | 100.0% |
| direct | 0/8 | 1/64 | 0/8 | 10.7% |
| reference | 0/8 | 0/64 | 0/8 | 8.0% |
| masked | 0/8 | 2/64 | 0/8 | 7.9% |
| cvae | 0/8 | 0/64 | 0/8 | 13.5% |
| init_zero | 0/8 | 0/64 | 0/8 | 7.2% |
| init_measured | 0/8 | 0/64 | 0/8 | 6.3% |

These are four internal-development motions × two execution seeds, with one training seed. Native completion and strict original-clock waypoint success are different outcomes. Reference resets and imitation terminations remain active; termination is not automatically a diagnosed fall.

## Privileged diagnostics

| Arm | Full native duration | Mean duration fraction | Interpretation |
|---|---:|---:|---|
| oracle_reference | 4/4 | 100.0% | Original full reference through frozen encoder/FSQ/decoder |
| dense_masked | 2/4 | 65.3% | Current frame64 supplied; nine future frames predicted |
| posterior_cvae | 0/4 | 12.3% | Full reference available only to the training posterior |

The oracle bridge exactly reproduced all 1096 teacher decisions across four complete trajectories: public states, positions, motor codes and actions all match. Diagnostic runs are excluded from public-policy success.

## Fitting results

| Arm | Trainable parameters | Updates | Public development action MSE | Fit loop seconds |
|---|---:|---:|---:|---:|
| direct | 525,376 | 4,000 | 0.031096 | 13.86 |
| reference | 496,512 | 4,000 | 0.048043 | 16.01 |
| masked | 496,512 | 4,000 | 0.042381 | 16.63 |
| cvae | 607,360 | 4,000 | 0.042209 | 22.59 |
| init_zero | 496,512 | 2,000 | 0.063769 | 7.01 |
| init_measured | 496,512 | 2,000 | 0.063826 | 7.30 |

Main arms share initial state tensors, sampled rows, update budget and reference auxiliary supervision. Trainable parameter counts differ, and CVAE performs an additional posterior forward/loss. Fit-loop time excludes preparation, parity checks and simulator evaluation. Development MSE uses the common recorded zero-init profile; velocity conclusions use the paired native experiment.

The velocity pair shares its initial checkpoint, 3,913 fresh teacher decisions, labels and sampled rows. Only tick0 body XY velocity differs; later inputs use the same causal estimator. Both receive the same fresh-data fine-tuning, so the paired comparison isolates initial-velocity input from this common adaptation.

## What the posterior learned

On 3,138 development decisions, public prior action MSE was 0.042209, posterior MSE 0.042097, and shuffled-reference posterior MSE 0.042228. Prior and posterior produced identical motor codes on 75.6% of decisions. Mean KL was 0.1638. This fit uses privileged motion weakly; it does not establish a general limit of CVAEs. See LATENT_AUDIT.json (local experiment artifact).

## Validation and limitations

- 29 tests passed: typed public boundaries, masking, reference packing, rotation columns, frozen-motor gradient flow, posterior/prior separation, original clocks, split isolation, velocity pairing and retry indexing.
- Teacher encoder weights independently match the original checkpoint exactly. Original teacher, registry, text bindings and both earlier source manifests remain unchanged.
- Public native inference made zero teacher-actor calls and zero privileged-reference reads. Initial physical-state hashes match within every motion/seed group, including the velocity pair.
- Two of 28,034 original reference checks cross one FSQ bin in batch128 GPU GEMM; both reproduce the saved code exactly at native batch1. Labels are unchanged, strict checks remain, and the aborted pre-training audit is preserved.
- 5 setup failures are retained separately; none produced public rollout data. Recorder output isolation reproduced a 33-decision control exactly. Trial-index key repair changed bookkeeping only; the previous index is retained.
- 81 native runs completed at the process level: 12 fresh teacher collections, 56 teacher/public evaluations, 12 privileged diagnostics and one isolation repeat. Early policy terminations remain unsuccessful outcomes within those runs.
- Each of the 68 evaluation runs has a QUALITY_DIAGNOSTIC.json with post/pre-physics pose alignment, nonfoot forces and a contact-conditioned ankle-speed proxy. These unequal-duration prefixes are not full-task safety comparisons.
- The mask curriculum is offline on recorded trajectories; new student-driven collection at each mask level was not performed. This is a SONIC adaptation experiment, not a full online BFM or BFM-Zero reproduction.
- Ideal simulator pose and initial velocity are explicit. No hardware estimator, new scenes, obstacle-navigation claim, or new STOP/hold supervision is introduced.

## Next research decision

The exact oracle match verifies the frozen motor path. Current-frame hints enabled 2/4 completions, while the learned privileged posterior enabled 0/4 and every public arm completed 0/8. The next comparisons test reference corrections anchored to measurable joint state, and posterior reconstruction warm-up before prior transfer. Follow with actual online mask curriculum and fresh student-state queries, comparing matched total training budgets. These are proposed experiments, not additional trained models. See the concrete follow-up plan (local experiment artifact).

Method inspiration: [BFM IV-C–E](https://arxiv.org/html/2509.13780v1). See implementation and protocol (local experiment artifact), fixed plan (local experiment artifact), raw results (local experiment artifact), and the six checkpoints under fit/*/student.pt.
