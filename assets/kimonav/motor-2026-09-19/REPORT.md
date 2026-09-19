# Motor choice changes executable clearance

19 September 2026 · completed, unpublished simulation study. **Six new original-motor executions and six reused scene-motor controls.** One inspected source ancestry (00976), one corridor and two familiar development seeds. Both motors receive the same fixed IK-lowered reference under the same scene evaluation configuration. “Scene motor” denotes the tracking checkpoint used in the earlier scene studies; it does not mean a scene-conditioned policy is being trained here.

The original SONIC weights complete **6/6** tasks, including **2/2** with the beam lowered by 20 mm. The previously selected scene-study motor completes **4/6**, with **0/2** under the lower beam. There are **2 paired task gains and 0 regressions**. The difficult lower-clearance requests are executable with an existing motor and the same reference. This changes the fixed execution baseline; it does not establish a new planner, a repaired public selector or broad traversal robustness.

| Scene | Scene motor, reused | Original motor, new | Paired gains / regressions |
|---|---|---|---|
| Clear | 2/2 | 2/2 | 0 / 0 |
| Original beam | 2/2 | 2/2 | 0 / 0 |
| Beam −20 mm | 0/2 | 2/2 | 2 / 0 |

![Task outcomes and measured pelvis motion for both lower-beam seeds](/assets/kimonav/motor-2026-09-19/motor-outcomes.svg)

These are six simulator executions of scene tasks but only **two distinct complete action histories**, one per seed: each complete action array repeats across the three layouts while remaining contact-free with the original motor. The panel therefore cannot be treated as six independent demonstrations of generalization or scene-conditioned decision making.

## Why this is a matched motor comparison

Simply substituting the checkpoint path was insufficient. Native evaluation discovers `config.yaml` beside that path; the release and scene configs use different rigid-body mass randomization ranges, [0.8, 1.5] and [0.8, 2.5]. The new input bundle contains the original checkpoint bytes beside an exact copy of the **current scene config**, preserving its [0.8, 2.5] range. The [preflight](/assets/kimonav/motor-2026-09-19/PREFLIGHT.json) records both hashes and common configuration composition. Upstream weights and configurations are unchanged. This tests original weights under the current scene evaluation conditions, not the release's default evaluation package.

Before any task action, each new execution verifies all **55 loaded policy tensors** against the requested checkpoint, actor running normalization disabled, the 640D reference / 64D token / 930D proprioception-history / 29D action interface, and exact equality of actual entry and recorded dynamics with its old pair. Matched quantities include masses, centers of mass, material properties, default joint poses, action offsets and scales. Actuator gains use the same configuration and are additionally recorded in new runs; they were not separately measured in the old controls.

The four native library arrays, joint/body order, first reference, first proprioception/history and first-physics-step Torch RNG match exactly. Reading the additional verification data does not consume the control RNG. Native evaluation loads the policy state; optimizer and motion-library checkpoint state are not restored, and the training schedule is disabled. The existing 1 s standing transition, 50 Hz reference clock, 100 ms future spacing, observation corruption and ten-frame histories remain unchanged.

The G1 encoder and decoder both differ between checkpoints. The result therefore belongs to the **motor package**, not an isolated decoder or planning mechanism. After the first different action, each controller receives its own physically resulting observations and action history. Both use the same bank and transform its reference orientation relative to their actual body orientation; later encoder inputs are not expected to remain identical.

## Every paired task outcome

| Scene / seed | Scene motor, reused | Original motor, new |
|---|---|---|
| Clear / 96162 | Complete, 8.34 s | Complete, 7.52 s |
| Original beam / 96162 | Complete, 8.34 s | Complete, 7.52 s |
| Beam −20 mm / 96162 | Torso contact, 2.74 s | Complete, 7.52 s |
| Clear / 96167 | Complete, 8.32 s | Complete, 8.44 s |
| Original beam / 96167 | Complete, 8.32 s | Complete, 8.44 s |
| Beam −20 mm / 96167 | Torso contact, 2.86 s | Complete, 8.44 s |

Times are the ends of 20 ms control ticks. On the four pairs where both motors succeed, original weights finish 0.82 s earlier for seed 96162 and 0.12 s later for seed 96167. Thus the result is a task-coverage gain, not uniformly faster traversal. Every original-motor run has zero measured forbidden environmental contact force; final goal distances are 0.052829 m at seed 96162 and 0.173144 m at seed 96167.

The unchanged complete-task score requires whole-body passage, ducking when required, 15 ticks of upright recovery and then a fresh 50-tick stationary hold inside the 0.5 m three-dimensional goal region, speed at most 0.1 m/s, no forbidden environmental contact above 1 N at any 200 Hz substep and no pelvis-height fall, within the original 500-tick / 10 s deadline. No imitation termination, hidden reset, extra reference lowering or changed collision threshold was introduced. This scene score does not qualify absence of self-contact under the earlier separate scoring profiles.

## The physical realization differs before the collision

At **2.72 s** in the lower-beam task of seed 96162, both banks propose a pelvis height of 0.628336 m. The scene motor achieves 0.735854 m, an error of **+107.518 mm**; the original motor achieves 0.644595 m, an error of **+16.259 mm**. Neither has prior forbidden contact at that time. At seed 96167 and 2.84 s, the height errors are **+61.408 mm** for the scene motor and **−23.985 mm** for the original motor.

Progress and joint realization also differ; the [analysis](/assets/kimonav/motor-2026-09-19/ANALYSIS.json) retains those diagnostics. These observations are consistent with stronger realization of the existing reference in this task. They do not isolate height tracking from timing, support dynamics or another learned motor behavior. A plotted reference root height is not a direct root-position actuator, and a smaller tracking error alone is not the success criterion.

## Contact-time correction

An audit helper in the earlier studies selected the maximum-force sample inside the terminal control tick. Some prose called that the first contact. The new [timing correction](/assets/kimonav/motor-2026-09-19/CONTACT_TIMING_CORRECTION.json) separately computes the earliest strict 1 N threshold crossing and the peak from preserved raw forces. At seed 96167, the old fixed-IK lower-beam first contact is **2.850 s**, while its peak is **2.855 s**. The coupled reference's first contact remains 2.860 s; both seed-96162 first contacts remain 2.730 s. The new original-motor cases have no forbidden contact.

No success/failure, deadline, control-step count or prior pre-contact diagnosis changes. Original raw records and audit outputs remain intact; the corrected event definitions are used in this report and current analysis.

## Decision: strengthen the control before expanding the method

Retain original weights with the current fixed lowered reference as the stronger execution control for these familiar tasks. The [public selector](/kimonav/selection/) still uses its separately audited scene-motor ledger; its reported lower-beam completion remains 0/2. A motor change cannot inherit that ledger, and no public integration ran here.

The next proposed bounded panel first asks whether the extra reference lowering remains useful with the stronger motor: **six original-motor local-duck executions** across these three layouts and two seeds, plus **two original-motor nominal clear-space controls**. Reuse the six original-motor IK-lowered controls from this study. This eight-execution budget is proposed, not registered or executed. It separates the need for additional posture construction from the prior motor limitation and qualifies an ordinary clear-space option before a new public selector is assembled.

Then register public integration with a motor-specific capability ledger and compare against the strongest fixed candidates. Preserve all rejected requests and test a separate clearance/initial-state panel before claiming an execution envelope. An explicit posture-timing repair is no longer the immediate priority for these two lower-beam failures: an existing motor already solves them. Broader sources, routes, partial observations, moving replacement and hardware remain later, distinct questions. [Current connected research plan](/kimonav/plan/).

## Evidence and acquisition cost

- [Registered protocol](/assets/kimonav/motor-2026-09-19/PROTOCOL.md), [plan](/assets/kimonav/motor-2026-09-19/PLAN.json), [configuration preflight](/assets/kimonav/motor-2026-09-19/PREFLIGHT.json) and [six-control reuse bindings](/assets/kimonav/motor-2026-09-19/REUSE.json).
- [Full raw-state/reference/contact/task audit](/assets/kimonav/motor-2026-09-19/AUDIT.json): six valid matched pairs; model identity and initial-query checks passed before task actions.
- [Frozen codec replay](/assets/kimonav/motor-2026-09-19/CODEC_AUDIT.json): all **2,394** new tokens and actions reproduce exactly. This is interface verification, not additional physical evidence.
- [Complete analysis](/assets/kimonav/motor-2026-09-19/ANALYSIS.json): **6** new native starts, **9,576** physics/contact substeps, **329.735 s** native wall time, no process failure, retry or training update. Six reused controls contribute **1,946** old steps, separately counted.
- [Focused tests](/assets/kimonav/motor-2026-09-19/TEST_RESULTS.txt): **48 passed**, including regression tests distinguishing first contact from peak force.

The original motor remains pretrained; this is not a new learned method or evidence that the local repair was universally harmful. No independent source/scene generalization, perception robustness, public request adaptation or hardware result is established by this panel.
