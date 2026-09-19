# From a geometry choice to an executable body motion

Updated 19 September 2026 UTC · ongoing, unpublished simulation research.

**Public geometry now selects the motion that reaches the native motor, but the retained torso–beam failure remains unresolved.** The latest experiment tested whether a longer fixed duck was enough. Both local and sustained duck completed 3/3 clear tasks and 2/3 beam tasks. This supports investigating actual posture realization before adding online reference replacement or more student training.

The goal remains destination-driven whole-body traversal, with future perception and command extensions. Current scene evidence covers one inspected development motion, related library variants and one known corridor. It does not establish new-scene generalization, robust perception, contact-assisted dexterity or hardware navigation. Repeated seeds and exact historical controls are related samples.

<h2 id="duration">Latest: extending the duck does not rescue the hard case</h2>

Twelve first attempts compare two fixed candidates × clear/beam × three execution seeds. Two seeds were already inspected; one is fresh. The tracker, nominal standing start, entry transition, clean native orientation input, geometry, destination, original 10 s clock and complete task scorer are shared. There were no simulator process retries. [Protocol registered before execution](/assets/kimonav/execution-2026-09-19/duration-protocol.md).

| Layout / seed | Local duck | Sustained duck |
| --- | --- | --- |
| Clear / 96162 | Complete, 8.34 s | Complete, 8.34 s |
| Clear / 96164 | Complete, 8.48 s | Complete, 8.36 s |
| Clear / 96165 | Complete, 8.78 s | Complete, 8.32 s |
| Beam / 96162 | Torso contact, 2.84 s | Torso contact, 2.88 s |
| Beam / 96164 | Complete, 8.50 s | Complete, 8.36 s |
| Beam / 96165 | Complete, 8.78 s | Complete, 8.76 s |

![Complete-task counts and actual versus planned pelvis height](/assets/kimonav/execution-2026-09-19/duration-outcomes.svg)

At a shared precontact query (2.70 s), the difficult seed's pelvis is 81.4 mm higher than planned with local duck and 78.8 mm higher with sustained duck. Knee flexion also falls short. This query and the static FK substitutions are exploratory, chosen after outcomes. Successful seeds also have appreciable state errors; these values are not a validated collision threshold or proof of one failure cause. Root pose, joint motion and foot support are physically coupled.

All six paired initial states/dynamics match. Four overlapping local-duck histories reproduce exactly. All 4,537 native token/action pairs replay with zero error, and 29 focused checks pass. These checks establish recorded execution consistency; they do not add independent physical trials. See the [task/contact audit](/assets/kimonav/execution-2026-09-19/duration-audit.json), [codec audit](/assets/kimonav/execution-2026-09-19/duration-codec-audit.json), [exploratory analysis](/assets/kimonav/execution-2026-09-19/duration-analysis.json) and [tests](/assets/kimonav/execution-2026-09-19/duration-tests.txt).

<h2 id="selection">Implemented: map choice changes executed motor inputs</h2>

The preceding 12-trial study compares fixed nominal, fixed local duck and an initial public map selector on two execution seeds. All methods complete 2/2 clear tasks. On the beam, fixed nominal is 0/2; fixed duck and public selection are each 1/2. Public selection chooses nominal in clear space and duck with the beam, and exactly reproduces its selected fixed control's inputs and actions. All four failed trials make torso–beam contact. This is a working initial library selection, without moving seams or online replanning. It establishes no advantage over fixed duck on beam success.

![Initial selection outcomes and retained execution error](/assets/kimonav/execution-2026-09-19/selection-outcomes.svg)

The source bank contains three related variants of source 00976. Native q/dq/relative-orientation frames reach the frozen encoder/decoder; they do not directly command world-root translation or support constraints. The [selection audit](/assets/kimonav/execution-2026-09-19/selection-audit.json) records all cases and four exact initial-state/dynamics groups. The [codec audit](/assets/kimonav/execution-2026-09-19/selection-codec-audit.json) reproduces all 3,900 outputs. A post-hoc translated-envelope alarm warned on both a failed and a successful execution; it is not a qualified admission or stopping policy.

<h2 id="entry">Earlier: startup transfers conditionally to the beam</h2>

Eighteen supplied-reference trials compare source-state, direct standing and a one-second standing transition on three seeds in the existing clear/beam harness. Each mode is 3/3 clear; beam results are respectively 3/3, 1/3 and 2/3. All three failures are torso–beam contacts. Six standing initial-state/dynamics pairs match. These trials use the separately frozen scene teacher and the earlier native reference orientation convention. They are not a one-factor comparison with the later clean-orientation selector. [Full entry audit](/assets/kimonav/execution-2026-09-19/entry-audit.json).

<h2 id="motor">Earlier: motor/task feasibility</h2>

The flat-floor supplied-reference panel separates reference-state and ordinary standing starts, with original and repaired trackers. It establishes that initialization and task feasibility must be tested independently of student fitting. The September 15 student results on the home page remain historical and unchanged; they are not the latest scene results.

<h2 id="startup">Earlier: startup and contact qualification</h2>

The corrected standing-transition study improves arrival/hold, but strict all-nonfoot qualification still fails because wrist–hip self-contact is measured. This historical contact definition is broader than the later scene environment-contact scorer. Passing the beam task does not retrospectively clear the self-contact finding. Calibration, pilot and corrected runs remain separately recorded in the local research archive.

<h2 id="contract">One task, explicit inputs and outputs</h2>

| Connection | Present implementation | Missing evidence / extension |
| --- | --- | --- |
| User → task | Fixed destination, original clock and complete passage/recovery/hold scoring | New commands, wider task families and language grounding |
| Observations → planner | Exact known geometry, measured initial body and a fixed candidate library | Partial/noisy observations, calibrated unknown space and current-state continuation construction |
| Planner → tracker | Chosen native q/dq/orientation reference; actual proprioception and action history | Qualified moving seams, execution-conditioned clearance and planned support |
| Tracker → robot | Physical simulator actions and complete task/contact records | Reliable realization of requested lowering across conditions |
| Robot → next decision | Recorded actual body/contact feedback and diagnostic state estimates | Feedback that changes the continuation and improves the full task |

The broad planner–tracker architecture already has close literature precedents. The contribution must be a specific mechanism with a matched downstream advantage, not the interface diagram itself. [Literature and overlap](/kimonav/literature/).

<h2 id="next">Next: qualify the required physical effect</h2>

1. Construct one lowering continuation from measured state with explicit foot-support assumptions. Root/body targets remain planner constraints; the current motor receives q/dq/orientation.
2. Verify that the support interval, joint/velocity continuity and recovery are executable. Unknown future support must remain unknown. A warning cannot invoke an untested safe-stop action.
3. Compare a fixed posture adjustment before attributing a gain to feedback. Only then test measured-state reference replacement while preserving committed frames, motor history and the original task clock.
4. Freeze the next bounded protocol before physics. Retain the difficult case, matched clear controls, unchanged success definition and fresh execution seeds. Promote complete-task gains; lower pose error alone is insufficient.

This next panel is proposed, not registered or run. New student fitting, perception extensions and broader generalization claims depend on this execution gate. The long-term goal stays stable while the specific method remains replaceable.

[Current research plan](/kimonav/plan/) · [Source receipts](/assets/kimonav/execution-2026-09-19/PROVENANCE.json) · [Download this progress record](/assets/kimonav/execution-2026-09-19/PROGRESS.md)
