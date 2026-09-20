# A usable whole-body navigation interface

Updated 20 September 2026 after the registered original-motor public integration. Historical protocols, failures and decisions remain preserved.

**The downstream goal remains:** a destination and observations should produce coordinated route, torso/arm/pelvis posture, feet and speed through clutter, followed by arrival and stable hold. Dexterous traversal means coordinated body motion here. Finger manipulation, furniture movement and hand-supported climbing need additional contact capabilities.

The immediate question is now **how to accept useful, executable requests beyond the few conditions already demonstrated**. A body reference that fits does not guarantee tracking success; a rule that rejects everything unfamiliar does not solve navigation. Planner–tracker layering and whole-body reference interfaces already have direct precedents. The [literature assessment](/kimonav/literature/) does not establish novelty for this outline.

## The public connection is now tested

The registered **six public-interface executions are complete**: two clear, two original-beam and two beam-minus-20-mm requests. The interface selects nominal motion in clear space and local duck for both beam heights. All six complete the original passage/recovery/goal/hold task. Their selected fixed controls also pass all six. [Every outcome and execution audit](/kimonav/public-motor/).

The new ledger uses 14 existing original-motor qualification executions, including the six selected fixed pairs. Old evidence is not counted as new data. The original SONIC weights use the SAME scene evaluation configuration; weights, bank, clock, measured entry, recorded dynamics and actuator gains are checked. Unmeasured sustained and nominal obstacle conditions remain unqualified.

Geometry-only and evidence-filtered choice tie on all six requests. The result verifies the connection to a stronger simple baseline; it does not demonstrate a better admission mechanism. The old public system's lower-beam 0/2 result belongs to its different motor and remains historical. [Older public study](/kimonav/selection/), [motor comparison](/kimonav/motor/), [simple-reference qualification](/kimonav/simple-reference/).

The current executable public domain is intentionally finite: one bound destination and three known-map task contexts from a declared standing profile, one inspected motion ancestry/corridor and two familiar seeds. A changed goal, hold or unmeasured intermediate beam height is rejected before task actions. These software rejections are neither task successes nor demonstrated safe stopping. There is no continuous safety guarantee, general destination coverage, online replacement, native-camera input or hardware result.

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

## Next experiment: distinct clearance requests

Propose **twelve new fixed-reference executions**: three previously untested beam offsets (−10, −30 and −50 mm relative to the original beam) × two execution seeds unused in this clearance series × local duck versus IK lowered. Confirm seed prior-access records before registration. This budget and these offsets are proposed, not registered or executed. They are development probes on the same ancestry/corridor, not independent scene-family generalization.

The −10 mm condition tests an unmeasured point between earlier successes; −30 and −50 mm increase the challenge. Keep destination, original 10 s deadline, score, motor/common configuration, bank, floor, obstacle width/orientation and standing protocol unchanged. Fresh seeds require validation of the declared standing state and actual dynamics paired within the new panel, not equality to a different seed's old record.

1. **Freeze requests, rules and budget before outcomes.** Retain the existing 20 mm reference-geometry margin. Register both fixed candidates on all six requests even when the public gate rejects them; those are explicit capability probes, not public admissions. A rejection is not evidence of physical impossibility. No amplitude, phase, gain, deadline or scoring adjustment from new outcomes.
2. **Measure the available fixed alternatives.** Record every complete task, contact, fall, timeout and conditional completion time. Compare local duck and lowered within each request. The best of these measured fixed alternatives is a retrospective solvability reference, not a deployable oracle or evidence that all possible motions were searched.
3. **Audit frozen admission decisions separately.** Evaluate the existing geometry-only rule and strict finite-context ledger on the requested maps before looking at outcomes. The strict ledger is expected to reject all unseen contexts; report its coverage loss explicitly. These shadow decisions add no simulator executions and do not establish physical safe stopping. Use measured selected-candidate outcomes where available; mark a choice without a corresponding fixed execution as unknown.
4. **Count useful coverage.** Report complete tasks over all requests, admitted-but-failed requests and requests rejected despite a successful measured fixed alternative. Preserve candidates rejected by the geometry margin. Do not claim a new admission method beats a conservative baseline merely by relaxing its contract after observing results.

If the simple local duck still covers the entire panel, retain it and move to independent sources and combined height/width constraints instead of extending the height grid indefinitely. If lowering adds tasks, it has a demonstrated conditional role. If both fail a request, record the tested capability gap; do not call every possible traversal impossible.

Only after this diagnostic should a concrete execution-informed acceptance mechanism be specified, with a simple competitor and a separate evaluation panel. Once the new outcomes inform a model or threshold, they become calibration data. They cannot also serve as untouched evidence for that fitted mechanism.

## Subsequent research gates

- Test actual entry deviations and moving starts separately. The current bank assumes initial alignment; do not normalize a physical displacement away to fit the old profile. Qualify a continuation with persistent time, support conditions and action history before online replacement.
- Add independent motion ancestries and scene families, including lateral constrictions and combined height/width limits. Include a supported detour so ordinary routing can compete with contortion.
- Replace exact geometry with timestamped partial observations while holding task and motor fixed. Test occlusion, localization error, latency and dropout. Unknown space must remain explicit, and changed observations must lead to appropriate executable decisions.
- Extend destinations, route lengths, goal changes and stopping precision, then grounded language. New support terrain, permitted hand contact and hardware each need their own evidence.

Student scaling remains deferred. Lower imitation error is insufficient without useful complete-task coverage. Preserve repaired 84 training membership, reserved 20 / excluded 16 separation and stable motion–text identities. Do not mix the adjacent program's different terrain/reset/task conditions into this panel.

## Reading and contribution priorities

Read to decide a mechanism: execution-aware whole-body planning, tracking-error bounds, support-state representations, uncertain clearance and observation latency. Match tracker strength, information, task definitions and collision scoring before crediting a planner. TANGO, PASSAGE and the reviewed tracker work remain direct comparators; reading methods is not reproducing them.

The next contribution needs useful complete-task coverage beyond the strengthened simple controls on separate conditions. Finite-context contract enforcement is now implemented, but its caution alone is not that contribution. The website's schematic explains intended connections; measured figures and source-bound audits support the actual results.
