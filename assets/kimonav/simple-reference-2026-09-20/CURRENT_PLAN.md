# A usable whole-body navigation interface

Updated 20 September 2026 after the registered simple-reference qualification. This is the current plan; historical protocols, failures and decisions remain preserved.

**The goal remains:** give a humanoid a destination and observations, let it coordinate route, torso, arms, pelvis, feet and speed through clutter, then arrive and remain stable. Dexterous traversal means coordinated body motion here. Finger manipulation, moving furniture and hand-supported climbing require additional contact capabilities.

The immediate question is **which proposed motions are executable under the current motor, body state and observed clearance, and what evidence should govern acceptance?** A reference that fits the scene can still fail under a particular tracker. This is a candidate research question. Planner–tracker layering and a whole-body reference interface already have direct precedents; the [literature assessment](/kimonav/literature/) does not establish novelty for this system outline.

## The latest evidence simplifies the baseline

The planned **eight new executions are complete**. Under the original SONIC weights and the same scene evaluation configuration, the existing local-duck reference completes 6/6 tasks: 2/2 clear, 2/2 original beam and 2/2 with the beam 20 mm lower. The six reused IK-lowered controls also complete 6/6, with identical paired completion ticks. Nominal motion completes its two clear-space tasks; nominal obstacle tasks were not tested. [Every result and its audit](/kimonav/simple-reference/).

Extra IK lowering is unnecessary for the observed successful executions in this panel. Retain local duck as the simpler supported fixed option, nominal as a qualified clear-space option in these conditions, and the IK controls as retained evidence. This does not establish equivalence, runtime savings or general traversal. There is one inspected source ancestry, one corridor and two familiar development seeds.

The preceding matched-motor study remains the explanation for revisiting reference complexity: original weights solved two lower-beam failures that persisted under the previously selected scene motor. Changing the saved evaluation configuration would confound that result, so the original weights continue to use the common scene configuration. [Motor comparison](/kimonav/motor/), [earlier reference-construction comparison](/kimonav/crouch/).

The public selector still uses the previous scene motor and ledger. Its published lower-beam result remains 0/2; no new public integration has run. Stronger fixed execution is not automatically stronger public navigation. [Public-interface history](/kimonav/selection/).

## How the final system connects

| Boundary | Input | Output and responsibility |
|---|---|---|
| User or upstream planner → task | Destination region; optional heading, route, deadline, hold and allowed-contact constraints; eventually language | Accepted task with units, coordinate frame, masks and a persistent clock. No hidden answer motion. |
| Sensors → state and scene estimate | Proprioception, robot calibration/configuration, timestamps; later depth, LiDAR or RGB | Body state and local support, obstacle and overhead geometry, including unknown space and observation age. |
| Task + estimate → whole-body planner | Accepted task, measured state/history, geometry and motor capabilities | Proposed continuation with its execution conditions and unresolved limitations. Coordinate route, posture, feet and speed here. |
| Planner → reference adapter | Versioned joints, velocities, orientations and reference clock | Correct native tracker input. Planned pelvis/root motion is not a direct root-position actuator. |
| Motor → robot | Reference plus actual proprioception and action history | Joint commands and physical motion; measure balance, contact and task execution. |
| Execution → supervisor | Actual progress, contact, stability, remaining time and observation quality | Completion, continued execution, a new planning request or no supported continuation. Stopping and fallback motions need their own qualification. |

Today the fixed controls use one G1 model, known geometry/localization, a nominal standing protocol and an independent motion bank. The older public interface makes one initial choice. There is no established moving replacement, general destination coverage, perception robustness or hardware result.

## Next bounded check: connect qualified motions to public requests

The proposed cap is **six new public-interface executions**: clear, original beam and beam −20 mm, each at the two familiar seeds. This is proposed, not registered or executed. Reuse the completed nominal clear and local-duck fixed controls, plus retained lowered controls; do not count them again as newly acquired data.

1. **Freeze a motor-specific ledger and profile.** Bind original checkpoint, common saved configuration, candidate hashes, reference clock, score and standing-entry conditions. Keep observed successes/failures and untested candidates explicit. The sustained candidate has no new original-motor qualification and must not inherit scene-motor results. Use the corrected separation of configured calibration offsets from actual deviations. Two beam heights do not qualify every height between them.
2. **Freeze the public rule before execution.** Use destination, known geometry and measured state to choose among qualified candidates with the existing simple geometry/posture-cost rule. No access to the current episode's eventual outcome or external answer reference. Verify map changes select nominal for clear space and a supported duck for the beams. Count every pre-action rejection; rejection is not a demonstrated safe stop.
3. **Audit the physical connection.** Preserve the existing complete-task score and 10 s deadline. Match entry, actual dynamics, gains, initial observations, motor history and clock to the fixed controls. Verify selected reference inputs and controller output, then measure the complete task. Equal public and fixed execution is a useful integration check, not an independent generalization result.
4. **Keep the simplest credible rival.** Geometry-only and evidence-filtered selection may choose the same nominal/local-duck options in these cases. If so, state the tie. A ledger that changes nothing has not demonstrated a better admission mechanism. Do not require a preferred architecture to win this familiar panel.

After this one integration check, move beyond this familiar pair. Do not repeatedly tune the same two seeds or add posture complexity without an unresolved failure that requires it.

## The next substantive research test

Freeze distinct clearance and initial-state conditions before their outcomes. Separate calibration evidence from the test panel; changing only a random seed does not create a new scene or source. Compare an execution-informed admission mechanism with the same reference-only geometry screen, bank and motor. Include the strongest fixed candidate available at matched information.

Measure complete tasks over **all requests**, false admissions, and solvable requests rejected. A rule that rejects difficult requests must account for the lost coverage. Discrete successes are evidence at those conditions, not a continuous safe envelope. Unsupported requests need an explicit status; a useful executable stop or detour requires separate evidence.

The mechanism must specify what execution conditions it carries with a motion—motor/configuration identity, start/support conditions, clearance uncertainty or measured tracking deviation—and which of those actually improve decisions. This question is motivated by the observed motor dependence. It has not yet been solved or shown novel. A fixed crouch succeeding everywhere in a small panel cannot establish the value of scene-dependent planning.

## Extend toward the intended downstream problem

- Add independent motion ancestries and scene families, narrow lateral passages and combined height/width constraints. Offer an alternate route when ordinary detouring is preferable to contortion.
- Qualify moving starts, disturbances and a continuation from an actual deviated body state before online replacement. Preserve action history, support uncertainty, committed motion and elapsed task time.
- Replace ideal geometry with timestamped partial observations while holding the task and motor fixed. Test occlusion, localization error, latency and dropout. Keep unknown space explicit and verify that changed observations lead to appropriate executable decisions.
- Then expand destinations, route lengths, goal changes and stopping precision, followed by grounded language. New terrain support, permitted hand contact and hardware each need separate evidence.

Student scaling remains deferred until a useful task interface and credible control baseline exist. Lower imitation error alone is insufficient. Preserve repaired84 training membership, reserved20/excluded16 separation and stable motion–text identities. Keep the adjacent program's different reset/terrain/task profiles separate.

## Reading and claim discipline

Read additional work to decide a concrete mechanism: execution-aware whole-body planning, tracking-error bounds, support-state representations, uncertain clearance and observation latency. Match tracker strength, available observations, task definitions and collision scoring before attributing gains to a planner. TANGO, PASSAGE and the reviewed tracker work remain comparators; reading their methods is not reproduction.

The next contribution needs improved useful task coverage over these strengthened simple controls on independent conditions. The website's interactive schematic explains intended connections; measured figures and linked raw audits carry the experimental evidence.
