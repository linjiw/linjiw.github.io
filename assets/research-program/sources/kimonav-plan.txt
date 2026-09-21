# A usable whole-body navigation interface

Updated 20 September 2026 after the registered distinct-clearance diagnostic. Historical protocols, failures and decisions remain preserved.

**The downstream goal remains:** a destination and observations should produce coordinated route, torso/arm/pelvis posture, feet and speed through clutter, followed by arrival and stable hold. Dexterous traversal means coordinated body motion here. Finger manipulation, furniture movement and hand-supported climbing need additional contact capabilities.

The immediate question is now **how to accept useful, executable requests beyond the few conditions already demonstrated**. A body reference that fits does not guarantee tracking success; a rule that rejects everything unfamiliar does not solve navigation. Planner–tracker layering and whole-body reference interfaces already have direct precedents. The [literature assessment](/kimonav/literature/) does not establish novelty for this outline.

## The new result separates rejection from capability

The **12 new fixed-reference executions are complete**. Local duck and IK lowered each succeed on 5/6 requests: 2/2 at beam −10 mm, 2/2 at −30 mm and 1/2 at −50 mm. There are no paired task gains or regressions from extra lowering. Both references contact the beam with seed 96171 at −50 mm; both succeed there with seed 96173. The one successful lowest-beam pair finishes 0.60 s sooner with lowering, without establishing a general speed advantage. [Every outcome and diagnostic](/kimonav/clearance/).

The unchanged geometry rule admits only the two −10-mm requests. Combining its pre-action shadow choices with measured fixed outcomes yields 2/6 complete-task coverage and three rejected requests with a successful measured alternative. The finite-context ledger rejects all six, including five with a measured success. These are retrospective shadow scores, not additional public rollouts or demonstrated safe stops. The best of the tested fixed alternatives is also 5/6, not a deployable oracle.

A reference-only margin can reject useful execution, while the same lowest beam can succeed or fail across randomized executions. The immediate problem is useful admission under execution variation. Neither accepting all requests nor rejecting everything unfamiliar answers it. These data do not establish a continuous safe interval or independent-source/scene generalization.

The existing public connection remains as previously tested: 6/6 familiar requests, nominal when clear and local duck at the original and −20-mm beams. Its exact finite ledger is unchanged; the new fixed results are not automatically admitted. One destination, three known-map task contexts and the standing profile remain the deployed development scope. The tracker uses current proprioception, but no online motion replacement, native-camera input or hardware capability is established. [Public integration](/kimonav/public-motor/).

Execution seeds 96171/96173 were unused in the recent clearance panels. A supplementary metadata audit found the same integers as historical optimizer seeds, with those older physical commands using 96161. Roles and prior-access limits are preserved in the result; the seed integers are not evidence of an untouched dataset.

## How the intended system connects

| Boundary | Input | Output and responsibility |
|---|---|---|
| User/upstream planner → task | Destination region; optional heading, route, deadline, hold and permitted contacts; eventually language | Accepted task with units, frame, masks and a persistent clock. The executable current profile is much narrower than this intended interface. |
| Sensors → state and scene estimate | Proprioception, calibration/configuration and timestamps; later depth, LiDAR or RGB | Body state, support, obstacles and overhead geometry, including unknown space and observation age. |
| Task + estimate → whole-body planner | Accepted task, actual state/history, geometry and motor capability | Proposed continuation with its execution conditions and unresolved limits; coordinate route, posture, feet and speed. |
| Planner → reference adapter | Versioned joint/velocity/orientation frames and clock | Correct native tracker input. Planned root motion is not a direct root-position actuator. |
| Motor → robot | Reference, measured proprioception and action history | Joint commands and physical motion; measure balance, contact and task completion. |
| Execution → supervisor | Progress, stability, contact, remaining time and observation quality | Completion, continued execution, new planning request or no supported continuation. Fallback motions require qualification. |

Today only initial library choice is connected. The tracker closes the proprioceptive control loop; the planner does not yet replace the motion during execution. The interface visualization distinguishes that current scope from the proposed continuation planner and future perception adapter.

## Next work: a concrete acceptance model and another source

Keep local duck as the simpler task-success baseline. Extra IK lowering adds no successful request here. Preserve both lowest-beam failures rather than replacing the motor, changing the deadline or tuning a new reference against those failures within this completed study.

The next mechanism must predict what this motor can execute from allowed task/state information. **Compare the simplest plausible alternatives before fitting a large model:**

1. **Reference geometry with a calibrated scalar margin.** Tune one declared margin on calibration data, with an explicit admission/failure tradeoff and fixed tuning budget. This is a strong simple rival: at −30 mm, reference clearance is positive but below the current 20 mm margin.
2. **A measured execution-envelope baseline.** Build body-specific swept bounds from prior executions under the bound motor, reference, standing entry and timing. Include observed variation and failed prefixes. Do not substitute the new request's future realized trajectory into its prediction. A lookup over calibration traces is a useful baseline, not generalization by itself.
3. **State-conditioned execution variation only if needed.** Add an uncertainty-aware prediction conditioned on measured initial state and, later, observed history. Native seed labels, privileged randomized masses, hidden scene truth and the future outcome are not deployment inputs. Distinguish evidence of conservative coverage from a formal guarantee.

This is a proposed comparator design, not an implemented or validated admission method. The current 12 outcomes are available for diagnosis/calibration, and cannot simultaneously be untouched evaluation data for a rule designed after seeing them. Freeze the chosen features, calibration set, uncertainty treatment, thresholds, compute and public inputs before a separate evaluation panel. Report all-request task coverage, admitted failures, rejected requests with a successful measured alternative, unmeasured choices and acquisition cost. Keep task definitions, motor and information matched.

**The next bounded implementation task is to remove the bank's source-name assumption and qualify a second motion source.** A read-only readiness audit found that the runtime strips a literal `00976_bank_` prefix. Replace that with explicit versioned bank metadata and stable source/variant IDs in a separate change, while verifying the old bank's behavior. Do not relabel copies of 00976 as independent sources.

Source 00265 is available with nominal and duck variants, but was already inspected and has 32 earlier evaluation rows under different conditions. It is a candidate for additional-source capability, not a globally unseen test. Its standing transition, native reference layout, goal and complete clear/beam task must be qualified under the current motor before inclusion. Do not inherit old success claims or transfer a 00976 execution envelope to it without evidence. [Readiness record](/assets/kimonav/clearance-2026-09-20/NEXT_SOURCE_READINESS.json).

After source qualification, preregister separate requests with combined height/width or changed obstacle placement, and actual entry variation where supported. Include strong fixed choices and a supported detour when one is available. A detour cannot be treated as a baseline that exists before its motion/control is qualified. Do not continue a height-only grid indefinitely or present source qualification as an admission-model win.

## Subsequent research gates

- Test actual entry deviations and moving starts separately. The current bank assumes initial alignment; do not normalize a physical displacement away to fit the old profile. Qualify a continuation with persistent time, support conditions and action history before online replacement.
- Add independent motion ancestries and scene families, including lateral constrictions and combined height/width limits. Include a supported detour so ordinary routing can compete with contortion.
- Replace exact geometry with timestamped partial observations while holding task and motor fixed. Test occlusion, localization error, latency and dropout. Unknown space must remain explicit, and changed observations must lead to appropriate executable decisions.
- Extend destinations, route lengths, goal changes and stopping precision, then grounded language. New support terrain, permitted hand contact and hardware each need their own evidence.

Student scaling remains deferred. Lower imitation error is insufficient without useful complete-task coverage. Preserve repaired 84 training membership, reserved 20 / excluded 16 separation and stable motion–text identities. Do not mix the adjacent program's different terrain/reset/task conditions into this panel.

## Reading and contribution priorities

The targeted method reread reinforces the need for a narrower mechanism: execution-based filtering already appears in TANGO, while PASSAGE refines a planner through a frozen perceptive tracker. These are direct precedents, not methods reproduced here. [Primary-source note](/assets/kimonav/clearance-2026-09-20/LITERATURE_NOTE.md).

The candidate contribution is useful, transferable acceptance of whole-body requests under execution and observation variation, with honest capability gaps. It must improve complete-task coverage over calibrated geometry and strong fixed controls on separate conditions. The present result exposes the problem; it does not claim a solved acceptance mechanism. Future perception must preserve task, frame, timing and unknown-space meanings across the same boundaries.
