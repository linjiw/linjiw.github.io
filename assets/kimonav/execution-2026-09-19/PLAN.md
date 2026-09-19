# From motion tracking to dependable whole-body traversal

Research reassessment, 18 September 2026; execution follow-ups updated 19 September UTC. This is the current strategic plan; earlier protocols and results remain historical records. The initial review added no training, physics trials, or hardware runs. Subsequent, separately registered studies below contain flat-floor capability, startup/contact, 18-trial scene entry, 12-trial initial geometry selection and 12-trial fixed-duration comparison; incompatible success definitions are kept separate.

**Decision: keep the goal, change the order of work.** We want a humanoid to reach a requested place through clutter by choosing and coordinating its route, body shape, footholds, and pace from available observations. The goal remains useful. Our current evidence does not establish that repeatedly distilling sparse goals into SONIC motor codes is the best route to it. Make a scene-aware planner using an established tracker the main system baseline. Keep direct motor distillation as a bounded comparison, and promote it only for measured downstream benefit.

The clearest first question is: **can the robot choose a different executable whole-body continuation when the surrounding geometry changes, while still completing the same destination request?** Timing, language, and richer observations extend that question. They should not obscure it.

## Follow-up completed: execution capability

The user’s research guidance is saved and mapped to the [core-paper follow-up](/kimonav/literature/). The [first executable capability study](/kimonav/progress/#motor) registers separate reference-state and nominal-standing activation panels, with independent destination/hold/contact scoring. Accounting for both initialization profiles changes the earlier proposed 36 trials to 72 paired trials; these are development capability probes with supplied references, not autonomous navigation or scene-generalization experiments. The [completed result report](/kimonav/progress/#motor) and raw-data audit are now available. Reference-start arrival/hold is 18/18 for each motor; direct-standing results are 10/18 original and 12/18 repaired. Strict contact-inclusive qualification remains 0/72. Those results motivated startup transitions and contact-type validation; the completed continuation below now advances that gate. These results do not establish autonomous traversal.

The [completed startup/contact study](/kimonav/progress/#startup) adds a one-second reference transition and calibrated contact-partner sensors. In 72 corrected trials, arrival/hold improves from 10/18 to 18/18 for original SONIC and from 12/18 to 18/18 for the repaired controller, including under the old deadline. All 36 initial-state pairs match exactly. Strict all-nonfoot qualification remains 0/72, with wrist–hip self-contact directly detected. The study also preserves 12 calibration and 36 pilot trials separately.

The [completed scene-entry transfer](/kimonav/progress/#entry) now tests that bridge in the existing complete duck/recover/stop harness, with its separately frozen scene teacher and unchanged 10 s deadline. On one inspected development motion and three execution seeds, reference-state starts complete 3/3 beam trials, direct standing 1/3 and the standing bridge 2/3; all clear controls complete 3/3. Three failures are measured torso–beam contacts. All six standing-state/dynamics pairs match exactly. The bridge transfers conditionally but is not a robust traversal entry. Public phase requests and measured foot-contact exports are connected diagnostically; the executed continuation is still supplied. **The next main deliverable remains an executable public goal/map composer**, now focused on actual-state reference construction, clearance and moving seams as specified in the [next implementation gate](/kimonav/progress/#next). Do not expand student training before that gate.

**Latest implementation:** the [12-trial initial geometry-selection study](/kimonav/progress/#selection) now connects public map choice to actual native motor inputs. It chooses nominal in clear space and local duck under the unchanged beam. Results are 2/2 clear and 1/2 beam, matching fixed duck on the beam; fixed nominal is 0/2 beam. All 3,900 issued token/action pairs reproduce exactly, with four matched initial-state/dynamics groups. This is a one-source, one-corridor initial library selector, not online replanning. The retained failure shows measured root errors before contact despite positive nominal clearance. Support hypotheses preserve unknowns and are not moving-seam constraints. The [next step](/kimonav/progress/#next) is to qualify a stronger fixed candidate and then test execution-conditioned reference replacement. Further identical codec replays or student fitting are secondary.

**Latest physical decision:** the [12-trial fixed-duck duration comparison](/kimonav/progress/#duration) is complete. Local and sustained duck each finish 3/3 clear tasks and 2/3 beam tasks, failing on the same retained seed. Four overlapping local controls reproduce exactly; all 4,537 native outputs replay exactly. Longer lowering is not an observed success repair. Exploratory precontact analysis finds substantial realized root-height and knee-flexion errors, but does not isolate a single dynamic cause. The [next gate](/kimonav/progress/#next) is to construct and qualify support-compatible lowering from actual state, compare a fixed adjustment before crediting feedback, and then test online reference replacement. No further student fitting is justified by this result.

## What the review covers

The assessment traces the historical objective/prompt and execution studies through their synthesis and result records, the terminal-repair follow-ups, repaired-teacher evaluation, motor and task-adapter experiments, and the four completed September 15 navigation-student studies. It checks current public actor and reference-bridge code and recomputes the latest headline table from `SUMMARY.json`. It does not independently replay every historical capture or reproduce external methods. The [evidence review](/kimonav/evidence/) gives claim locations and limitations; the [literature review](/kimonav/literature/) records primary sources, inspected sections, and decisions. `SOURCE_MANIFEST.json` records the files supporting this revision. An inventory is not a claim that every archived file or cited paper has been read in full.

## The robot we ultimately want

Imagine asking: “Go to the far side of this room and wait there.” A chair blocks the direct route, a shelf constrains head height, and a doorway constrains shoulders and arms. The robot should choose a route, turn sideways or lower its body when useful, maintain balance, and arrive with a stable stop. If the gap is not traversable with its current capabilities or observations, it should choose another route, gather information, or report that it cannot proceed. A language model should not silently decide which collisions or missed deadlines are acceptable.

“Dexterous traversal” initially means coordinated torso, arm, pelvis, leg and foot motion that changes the body's swept volume. Finger dexterity, opening doors, pushing furniture, hand-supported climbing, and moving loads are a later contact-interaction branch. Those tasks change the required dynamics and supervision; they cannot be obtained by adding a contact token to a free-space tracker.

The first operating envelope is one G1 embodiment, static rigid indoor clutter, known floor support, and no deliberate non-foot obstacle contact. Begin with existing verified scene assets when the scene stage is implemented. This planning revision does not generate new scenes. Full stairs, new support contacts, dynamic obstacles, cross-robot transfer and hardware autonomy each need separate evidence.

### Inputs and outputs

| Boundary | Input | Output | Meaning |
|---|---|---|---|
| User / upstream autonomy → task interface | Destination region; optional heading, route constraints, arrival window, hold, posture or contact constraints; optional language | Accepted task with frame, units, masks, version and fixed clock | Specifies what must be achieved; does not prescribe every joint |
| Sensors → state and scene estimate | Joint encoders, IMU, executed-action history; later RGB, depth or LiDAR with calibration and timestamps | Estimated robot state plus observed free/occupied/unknown geometry, observation age and uncertainty | Specifies what is currently known; unavailable is distinct from zero |
| Task + estimates → local planner | Remaining obligations, progress, scene memory, motor capability envelope | Short whole-body motion proposal, predicted swept volume, support/contact mode, validity interval and feasibility status | Chooses how to make progress under current constraints |
| Proposal → motor adapter / tracker | Versioned reference fields with a declared frame, sample times, joint names and motor checkpoint | High-rate joint-position commands, with the existing actuator scaling and PD interface | Converts planned motion into feedback-controlled execution |
| Execution → task monitor | Measured state, contact/collision evidence, active command and original clock | Progress, completed events, remaining obligations, failure reason and replanning request | Measures the task against the actual robot |

The external output is both **physical motion and task status**. The planner's short reference is an intermediate output; a 64-dimensional SONIC code is an internal controller representation. A navigation token, a motion token, and a motor code are not interchangeable merely because each is a vector.

### A stable contract that can accept future vision

Use a semantic boundary, not a permanently fixed concatenated tensor. The existing `PublicSparseTimedObservation` remains the implemented baseline. A proposed `TraversalObservation-v1` adds separately typed state, task and scene packets. Each packet carries its own timestamp, frame transform, validity mask and provenance. New sensor encoders can populate this contract, but their accuracy and control effects must be evaluated; compatible tensor shape is not observation generalization.

The scene packet must represent support surfaces, lateral obstacles and overhead clearance. A single ground-height value cannot represent all three. Start with explicit 3D occupancy or a checked multi-layer geometry representation, with per-link proximity features available to the planner. Retain unknown-space indicators and an escape path to richer 3D geometry when layers discard relevant shape. RGB semantic features may identify a destination, but metric clearance needs a calibrated geometric estimate or a separately tested direct visual policy.

Keep the command anchor fixed when accepted. Transform observations into the current robot frame using the estimate valid at their acquisition time. Track drift, age and missing measurements. Replanning changes the proposed continuation, not already elapsed time or the accepted goal. A user command update creates a new version with an explicit effective time; it does not erase earlier failures in the previous task record.

`INTERFACE_CONTRACT.json` is a design specification, not an implemented runtime API. In particular, the current R640 encoder consumes ten physical frames of q29, dq29 and relative orientation6D after native packing. It does not automatically consume world-coordinate root targets, obstacle clearance or contact constraints. These belong to planner supervision, geometry checks and outer task feedback until a motor extension explicitly supports them.

## What we have actually learned

| Line of work | Supported finding | Consequence now |
|---|---|---|
| Typed objectives, frame/clock conversions, generated motion | Valuable contracts and diagnostics; better representations or reference errors did not reliably establish physical task success | Retain interfaces and scoring; stop using latent or reconstruction metrics as the main progress signal |
| Historical terminal repair | Small development rescues; later terminal-family capacity ties the best fixed setting with hindsight selection | Archive the governor as a diagnostic; an adaptive selector needs new evidence of useful headroom |
| Repaired SONIC teacher | Fine-tuning improves some tracking errors, but the matched reserved completion comparison is original 20/20 versus repaired 16/20 | Keep original SONIC as a motor baseline; freezing a checkpoint is an experimental control, not a permanent requirement |
| Full-current-command motor student | Small anticipatory panel matches teacher at 21/24; broader reserved retention remains weaker | Dense command execution is a reusable capability, not sparse-goal navigation |
| Task adapters | Optimizer repairs and better continuous measures did not qualify a reliable timed task teacher | Do not make residual-adapter success a prerequisite for learning from valid tracking trajectories |
| Token, DAgger, reference and joint-state students | Latest five public arms all complete 0/8; teacher completes 8/8 but only 1/8 strict timed tasks | Sparse-goal execution and command feasibility are separate unresolved issues |
| Exact reference bridge | Latest oracle reproduces 1,096 teacher decisions across four complete trials | The frozen reference path can work; this does not prove arbitrary predicted references are executable |

The latest paired mean/measured reference comparison reduces offline action MSE by 46.7%, yet both complete 0/8. Staged training improves one privileged posterior diagnostic to 1/4, while its public prior still completes 0/8. These are useful mechanism observations, not evidence that more of the same fitting is the most promising system strategy. The current results also do not prove sparse observations are inherently insufficient, that CVAEs cannot work, or that DAgger is ineffective in general.

**Split correction:** repaired84 remains the permitted motor-training universe, with 16 excluded original training clips. The 83 completed source executions give 71 student-fit and 12 internal-development motions. The teacher has seen those 12 motions. Reserved20 is excluded from recent student fitting but was evaluated in earlier teacher and motor studies. It is no longer a globally unseen final set. `final36` is a separate historical program set, not 36 unseen cluttered scenes; this review does not open it. A future confirmatory claim needs a new documented split and prior-access ledger.

## Is the idea still distinctive?

The broad destination is already an active research area. [TANGO](https://arxiv.org/html/2609.09158v1) and [PASSAGE](https://arxiv.org/html/2609.18732v1) are now essential comparators. Neither a planner–tracker hierarchy, whole-body geometric control, scene-conditioned reference generation, nor an extensible token interface is a defensible novelty claim by itself. See the literature matrix for the exact overlap and access scope.

Our proposed research question is narrower: **what task and geometric information must pass between perception, planning and execution for a reusable humanoid controller to preserve navigation intent under changes in clearance, commands and observation quality?** A useful first contribution could be an execution-tested interface or data method, but only if it beats a capable simpler baseline on those changes. A carefully measured failure boundary is also a valid outcome. We should not declare a new foundation model or invent an acronym before finding that evidence.

The strongest candidate mechanism is a short-horizon planner that explicitly conditions on whole-body clearance and keeps route, posture and timing adjustable while preserving the task. A learned viability score is optional: first compare measured geometry checks and a simple candidate/planner baseline. The case for learning is better held-out task completion or lower runtime cost, not the presence of another network.

## Two control paths, one task definition

**Main system path:** task + measured history + scene → local whole-body proposal → versioned native reference adapter → tracker → robot → measured feedback. Replan using the actual state. Kimodo/ARDY can propose or augment motion where supported; they are replaceable components, not the definition of the research goal. Current reference replay is a diagnostic baseline; an autonomous planner must choose references online without reading the answer trajectory.

**Compression comparison:** the same public inputs → student → predicted reference through the frozen encoder/FSQ, or motor code → decoder → robot. Train from useful planning/tracking supervision and student-state corrections. Compare this path only against a functioning main path with the same sensors, task and execution budget. Keeping an intermediate reference at runtime is acceptable if it is generated from current allowed inputs. “No reference supplied by an oracle” is the relevant autonomy boundary.

Training may use full scene geometry, future motion and privileged teacher information. Deployment may use only requested future goals and currently available observations/history. Known future commitments are legitimate inputs; future realized robot motion and hidden scene truth are not. Do not turn a failed navigation execution into a success label. Valid short tracking prefixes may still teach a motor, with their limited label meaning retained.

## Decisive work sequence

The original numerical budgets below are development sketches; the linked executed protocols supersede them where stated. Unexecuted later stages remain proposals, not results. Freeze exact programs, seeds, thresholds and analysis before execution. Use the existing flat floor and motions for the first two stages; reuse existing scene data at the geometry stage. Do not start another open-ended architecture search.

### 1. Establish a feasible task and a usable motor baseline

Compare original and repaired SONIC on the same fit-only motion/proposal subset, initial states and seeds. Separate reference-state tracking from ordinary standing-start execution. Include straight approach, turn, sidestep, braking and hold; keep every failure. Test motor retention as well as task completion. Track generated geometry, actual world displacement, non-foot contact, support/slip and reset/termination causes separately.

Before fitting a navigator, determine which commands a planner–tracker can repeatably complete. Use two task profiles: destination/region with a generous declared timeout, and optional scheduled commitments. Exact historical spacetime paths remain unchanged as diagnostics. For new operational tasks, choose arrival and hold tolerances from application requirements and fit/development repeatability, then freeze them before evaluation. A ±60 ms hindsight first-arrival window is a precision task, not a default definition of navigation. Never relax the old benchmark after seeing outcomes.

The original budget sketch was six command designs × three execution seeds × two motors, 36 trials. The executed first panel explicitly added the initialization axis (72 trials) and used six purposively selected fit references; it did not establish all the semantic command families listed above. The completed startup comparison then tested a one-second bridge in 72 corrected trials with separate calibration/pilot accounting. This establishes feasibility and losing subgroups, not broad generalization. If neither motor can execute the necessary reference from the intended starts, work on reference construction, transitions or motor adaptation before student compression. If the task is repeatedly infeasible, reject that command or propose an explicit new task version; do not manufacture labels for it.

### 2. Keep a bounded sparse-control comparison as a supporting branch

Choose up to three model seeds and a fixed collection/optimization budget before running. Compare (a) a public task-driven short-reference planner using the retained tracker, (b) the measured-reference student and (c) a simple direct-code baseline. Include a full-reference oracle only as a labeled diagnostic. Use fit-only short command families and fresh student-driven states; phase-match replay and include a fresh-seed teacher-driven-data control. Check posterior reconstruction before using its latent as a target. Record successful and failed prefixes and the exact actions actually executed.

Use a curriculum with whole command groups, including full episodes with the final sparse deployment profile. Dense hints and teacher takeovers are training devices with explicit labels; they never enter autonomous evaluation. Keep reference initialization and imitation termination results separate from an eventual navigation evaluator: deviation from an arbitrary demonstration is not inherently navigation failure, but physical instability and forbidden contact still are. Do not remove termination solely to inflate duration.

Development gate: a candidate must improve full task-and-quality completion over its matched baseline, not only prefix length or MSE. Expand beyond the repeatedly inspected four motions before calling the gain generalization. If only the planner–tracker works, proceed with it. If none works, localize failure by oracle reference, current-frame hints, representational error and command feasibility. Close the tested compression branch at the budget limit unless a new mechanism is identified.

### 3. Put body geometry at the center of the experiment

Use existing scene–motion pairs, including MTC where accessible and appropriately licensed, to build a small measured capability panel: sideways passage, overhead clearance, ground obstacle, and an over/under or offset-obstacle composition. Include open-space and detour-available controls. Do not infer a scene from the words “doorway” or “stairs” in repaired84 captions.

The decisive pairing keeps the destination and start fixed while changing one geometric constraint so the appropriate body continuation changes. Where possible, hold the root corridor similar while changing the required posture. Evaluate the entire robot's swept collision geometry; root path validity alone is insufficient. Ground-contact permissions must be distinguished from forbidden obstacle contact. Step-over is attempted only where foot and support execution is qualified; an unsupported motion is a coverage gap, not a model failure to hide.

Compare a tuned planar route + fixed-posture tracker, an explicit whole-body geometry planner, and the same learned candidate with geometry enabled, removed or mismatched. Include feasible alternate routes so a detour can succeed; a method need not use a spectacular body maneuver when an ordinary route is better. Match sensing and tracker capability. Add the closest released external traversal method after checking its task, inputs and dependencies; if unavailable, label an implementation as our reproduction rather than the authors' release.

Primary outcome: destination + required hold + no forbidden contact + no fall/intervention, over all attempts. Report components and per-body contact as well. A body-aware method earns its place by helping on geometry-dependent cases while retaining open-space behavior. If planar control matches it, simplify the method. If geometry changes do not change decisions appropriately, investigate data or observation use before scaling.

### 4. Connect perception without changing what success means

Hold task, planner and motor fixed while replacing privileged geometry with realistic partial depth/LiDAR estimates, then any RGB-based adapter. Explicitly vary occlusion, delay, calibration/pose error, sensor dropout and lighting where applicable. Keep observation quality, training data and compute matched when attributing an encoder improvement. Report known-free, occupied and unknown separately. Add active observation or replanning only when the information failure is measured.

A proposed abstain/slow/stop behavior must have its own tested motor support and stopping distance; “stop” is not automatically safe near an obstacle. The monitor may request a fallback, but this is not a formal safety guarantee. Evaluate progress and accepted-task coverage alongside collision rate, so rejecting everything cannot look like a useful controller. For feasibility predictions report false admissions, false rejections and calibration by geometry and observation condition.

Promotion requires useful completion and calibrated degradation under measured observation changes. A plug-compatible sensor encoder alone does not satisfy this stage. Report model inference, acquisition-to-activation delay, worst or high-percentile command age, overruns and the behavior during stale updates. Physics continues while the planner computes.

### 5. Test composition, timing, language and new contact capabilities

After stable geometric traversal, evaluate long routes, unseen combinations of familiar constraints, revised future goals and optional timing windows. A paired timing dataset requires differently paced executions and matching actions; changing a deadline while retaining the old action is not evidence of timing control. Separate uncontrolled gait style from task requirements.

Language initially maps to the same typed task and semantic destination. Test independently authored paraphrases, contradictory requests and one-field changes against their expected physical effect. Later end-to-end language control must beat this simpler grounding baseline. Finally, new terrain support, hand contact and manipulation require compatible scene-interaction data and a motor capable of those contacts; cross-embodiment requires robot-specific geometry and adapters. These are program extensions, not claims from this flat-ground study.

## Data that can teach the downstream decision

The indispensable record is `(accepted task, observed scene/history, robot state, selected continuation, executed action, resulting state/contact, outcome, provenance)`. Store proposed and executed motion separately. Give every source clip, task, scene, checkpoint, transformation and derived window a stable identity. Same-source windows, scene augmentations and repeated seeds are related samples, not new independent demonstrations.

Motion-first scene construction remains a useful optional data branch. Retain multiple compatible scenes per motion; geometry alone cannot recover the original reason for a maneuver. Compare against scene-first planning and existing scene-aligned data. Require executable alternatives under the same goal to test whether an obstacle actually explains the motion. Re-execute when added geometry changes contact or dynamics. Split by source motion group and scene family before augmentation; nearby scenes must not leak across train and test. Test-set commands are fixed before execution; hindsight relabeling is training only.

The present repaired pool is a motor resource, not a scene-navigation corpus. Preserve the repaired84/20/16 membership and motion-to-text bindings. Audit measured coverage of crouching, arm retraction, sidestepping, support changes and stable stopping before assuming any of those capabilities. A larger caption vocabulary does not increase physical coverage.

## How to judge progress

Use a compact capability matrix with separate axes: new task values; new scene layout/asset; new combination of body constraints; dynamics/disturbance; sensing/estimation; and embodiment. Hold out what the claim names. New simulator seeds alone establish neither new tasks nor new scenes. Report paired outcomes by independent task/scene groups, with seed repeats nested within them and model-seed variation separate. Choose a confirmatory sample size from a useful effect and observed variability after development; arbitrary pilot counts are not a power analysis.

Keep three scoreboards: motion tracking, navigation completion, and whole-body quality/interaction. Headline the conjunction required by the application, then expose its components, unavailable outcomes and every intervention. Do not pool incompatible historical panels into one success rate. Treat setup failures separately from actual policy attempts, preserve both, and keep denominator rules fixed.

The registered execution experiments now provide a limited motor baseline, typed contacts, an actual initial goal/map library selector and a concrete unresolved torso–beam failure. The next deliverable is **execution-conditioned reference construction and replacement**, with qualified moving seams, original task-clock preservation and complete approach/passage/recovery/stop scoring. Initial geometry selection now chooses executed references; online replanning remains pending. The existing sustained fixed continuation has now tied local duck and retained the failure. The next decision is whether a physically qualified posture adjustment and then actual-state replacement improve the difficult case while preserving complete-task successes; further student fitting depends on that evidence. The long-term goal stays stable while the method remains replaceable.

## Reading that should happen next

Prioritize operational questions: reproduce the task/action/sensing contracts of the nearest traversal papers; inspect their released implementation and availability; establish what their evaluation counts as collision-free success and how they handle delays and reference changes. Then study body-aware planning under uncertain observations and data efficiency relative to scene-aligned demonstrations. Broader generative-model surveys are secondary until they change a concrete design decision. A living comparison matrix should be updated before any novelty claim or larger training allocation.

The published page and its interactive system map distinguish implemented blocks, failed/unproven learned blocks and proposed extensions. The September 10 page is retained as an archive, so its experiments remain inspectable without defining the current research objective.

[Download this plan](/assets/kimonav/execution-2026-09-19/PLAN.md) · [Execution evidence and source receipts](/kimonav/progress/)
