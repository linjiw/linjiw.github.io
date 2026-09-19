# A usable whole-body navigation interface

Updated 19 September 2026 after the registered matched-configuration motor comparison. This is the current plan. Individual registered protocols and their original outcomes remain unchanged.

**Keep the downstream goal:** give a humanoid a destination and observations, let it coordinate route, torso, arms, pelvis, feet and speed through clutter, then arrive and remain stable. “Dexterous traversal” here means coordinated body motion. Finger manipulation, moving furniture and hand-supported climbing require additional contact capabilities and are later branches.

The immediate question is now concrete: **what execution evidence must accompany a proposed motion before the system accepts it for the current body state and clearance?** Initial geometry-based selection is implemented; passing reference geometry alone still admits motions that physically collide. This is a candidate research question, not an established novelty claim. The existing [literature assessment](/kimonav/literature/) already rules out presenting planner–tracker layering or a whole-body reference interface alone as new.

## What changed our decision

The original SONIC weights now complete 6/6 fixed-reference tasks: 2/2 clear, 2/2 original beam and 2/2 at a 20 mm lower beam. The scene-motor controls are respectively 2/2, 2/2 and 0/2. Six new executions are paired with six retained controls, giving two gains and zero task regressions. The physical configuration, native reference bank, task clock, scoring, entry and initial observation/history are matched. The original weights use the current scene configuration, because the release's own saved configuration has different mass randomization. [Complete results and configuration audit](/kimonav/motor/).

This is a stronger existing motor executing the same fixed motion, not a new planner or learned navigation result. At the difficult seed's pre-contact time, reference pelvis-height error is +16.259 mm with original weights versus +107.518 mm with the scene motor. The full task also succeeds; a tracking diagnostic alone would not justify promotion. Six scene executions contain two distinct complete action histories, one per familiar seed, on one inspected ancestry and corridor.

The earlier coupled-crouch comparison remains informative within its scene-motor conditions: both constructions fail the lower beam, and the coupled edit still inherits an IK-derived budget. It did not demonstrate an end-to-end IK-free planner. The new result shows why motor selection must be reconsidered before adding reference complexity. The failed request was not physically impossible. [Reference-construction comparison](/kimonav/crouch/).

The previously audited public selector still uses the scene motor and reports 2/2 clear, 2/2 original beam and 0/2 lower beam. Its original rejections, separate standing-profile correction and motor-specific execution ledger remain unchanged. Public integration of the stronger motor has not run. [Public interface evidence](/kimonav/selection/).

## How the final system connects

| Boundary | Input | Output and responsibility |
|---|---|---|
| User / upstream planner → task | Destination region, optional heading/route/deadline/hold/contact constraints; eventually language | Accepted task with units, frame, masks and persistent clock. No hidden answer motion. |
| Sensors → state and scene estimate | Proprioception, robot calibration/configuration, timestamps; later depth/LiDAR/RGB | Body state and local support/obstacle/overhead geometry, including unknown space and observation age. |
| Task + estimate → whole-body planner | Accepted task, current state/history, geometry and available motor capabilities | A proposed continuation, its validity conditions and unresolved limitations. Route, posture, feet and speed are coordinated here. |
| Planner → motor adapter | Versioned joint/velocity/orientation reference and reference clock | Correct native tracker input. Proposed root motion is not a direct root-position actuator. |
| Motor → robot | Reference plus actual proprioception and action history | Joint commands and physical motion. Balance and contact execution must be measured. |
| Execution → task supervisor | Actual progress, contact, stability, remaining time and observation quality | Completion, continued execution, a new planning request, or no supported continuation. A stop/fallback needs its own qualification. |

Today: one G1 model, one inspected motion ancestry and corridor, known map/localization and nominal standing protocol. Two native trackers have now been compared; the public interface still uses the previously audited scene tracker. Reference packing uses ten future samples; the selected reference is generated from an independent bank. The public interface chooses once. Online moving replacement, broader geometry, sensing robustness and hardware are unestablished.

## Next experiment: qualify simpler references with the stronger motor

Retain original weights under the same common scene configuration as the strongest fixed control for this panel. Before attributing the new capability to extra reference lowering, test the unmodified local-duck source with those weights and qualify a nominal clear-space option.

The proposed cap is **eight new executions**: original motor + fixed local duck × clear/original beam/beam −20 mm × seeds 96162 and 96167 (six), plus original motor + fixed nominal × clear × the same two seeds (two). Compare local duck with the six original-motor fixed-IK executions acquired in the completed motor study. This is a proposed budget, not a registered or executed panel. Do not count the reused controls again as new data.

1. **Freeze the stronger execution interface.** Preserve the original checkpoint bytes, common scene configuration, 640D reference / 64D token / 930D history / 29D action contract, entry transition, clock and complete-task score. Reuse the model-identity, first-query and actual-dynamics gates. Keep source motions unchanged; new outcomes may not tune amplitude, phase or thresholds.
2. **Test the simple reference and ordinary clear-space option.** If local duck retains the lower-beam gains, keep it as the simpler supported option; this would narrow the need for extra posture construction in these conditions. If it loses tasks, retain the IK-lowered control for those requests. Nominal clear-space failures remain failures and preclude assuming a cheap nominal option is qualified. Report every outcome, conditional completion time, body contact and first-versus-peak contact timing. Extra seed repeats do not establish independent-source generalization.
3. **Integrate public choice with a separate motor-specific ledger.** Use only primitives that qualify under the selected motor. Before execution, freeze the ledger and request-to-candidate rules; do not silently transplant the scene-motor ledger. Test actual public requests against the strongest fixed candidates with identical goal, map, initial state and deadline. A fixed crouch that succeeds in all three layouts does not itself show geometry-conditioned choice. Include the nominal option only if its clear-space behavior has been established.
4. **Measure useful admission on separate conditions.** Freeze a clearance/initial-state panel distinct from the familiar calibration cases, and compare execution-informed admission against the same reference-only geometry screen at the same motor and bank. Count complete tasks over every request, false admissions and solvable requests rejected. Do not claim a continuous safe envelope from discrete successes. No supported continuation must remain explicit; an executable stop, detour or fallback requires its own qualification.
5. **Add online replacement for an actual unresolved need.** Qualify a continuation from a measured deviated state before testing replanning. Preserve action history, committed frames, elapsed task time and support uncertainty, and compare with the strongest fixed control. A posture-timing repair is no longer the immediate response to these two lower-beam failures: an existing motor already solves them.

The mechanism question is becoming more specific: what motor-dependent execution conditions must a planner carry with its proposed body motion, and how should observation uncertainty change the accepted continuation? The current evidence motivates that question but does not prove novelty or a general solution. Student scaling remains deferred until the chosen interface and useful task coverage are established.

## Broader validation after this gate

- Add independent source ancestries and scene families, including narrow lateral passages and combined height/width constraints. Include a supported alternate route so the system can prefer an ordinary detour when that solves the task.
- Qualify new initial poses, speeds and disturbances. Keep configured calibration offsets separate from actual body deviations; do not erase a moving-start mismatch through coordinate normalization.
- Replace known geometry with timestamped partial observations while holding task, planner and motor fixed. Test occlusion, pose error, latency and dropout. Unknown space and stale observations must remain explicit, and sensing must change physical decisions appropriately.
- Then evaluate longer routes, destination changes and stopping precision, followed by grounded language. New terrain support, permitted hand contact and hardware each require separate execution evidence.

The prior goal-only/student branch remains a bounded comparison. Lower imitation error alone does not earn promotion. Preserve repaired84 training membership, reserved20/excluded16 separation and stable motion–text identities. Do not mix the adjacent program's distinct resets, reference clocks or distance-extension results into this clearance study.

## Reading and evidence priorities

Review literature when it changes a specific decision: execution-aware whole-body planning, state/calibration representations, tracking-error bounds, uncertain clearance and observation latency. Compare task definitions, tracker strength, runtime information and collision scoring before attributing a gain to a new interface. TANGO, PASSAGE and the reviewed tracker work remain direct comparators; reading their methods is not reproducing them.

The next convincing contribution needs a concrete mechanism that improves useful complete-task coverage over these strengthened simple controls on independent conditions. The website's schematic shows the intended connections; measured experiment figures and their source records carry the evidence.
