# A usable whole-body navigation interface

Updated 19 September 2026 after the capability-selection and standing-profile studies. This is the current plan. Individual registered protocols and their original outcomes remain unchanged.

**Keep the downstream goal:** give a humanoid a destination and observations, let it coordinate route, torso, arms, pelvis, feet and speed through clutter, then arrive and remain stable. “Dexterous traversal” here means coordinated body motion. Finger manipulation, moving furniture and hand-supported climbing require additional contact capabilities and are later branches.

The immediate question is now concrete: **what execution evidence must accompany a proposed motion before the system accepts it for the current body state and clearance?** Initial geometry-based selection is implemented; passing reference geometry alone still admits motions that physically collide. This is a candidate research question, not an established novelty claim. The existing [literature assessment](/kimonav/literature/) already rules out presenting planner–tracker layering or a whole-body reference interface alone as new.

## What changed our decision

The original public evidence-filter panel contains 18 requests, with 15 physical task executions and three rejections before action. The strict absolute-joint admission rule incorrectly excluded the new seed and two already successful calibration seeds. We retained those failures and separately verified a standing-profile correction on three familiar requests.

The corrected interface check uses three new and three retained executions: 2/2 clear and 2/2 original beam, but 0/2 when the beam is lowered by 20 mm. The old geometry selector is respectively 2/2, 1/2 and 0/2; the strong fixed lowered reference is 2/2, 2/2 and 0/2. Public selection inherits the stronger fixed capability on the original beam. Both lower-beam candidates pass the unchanged geometric screen, yet the motor collides. [Complete results, original rejections and repair provenance](/kimonav/selection/).

This does not justify student scaling, a claim of robust traversal, or adding a complex feedback planner merely to rename the failure. We need an executable alternative and a useful admission envelope. The current bank has no detour or deeper-clearance option qualified for this failing request. Its failure does not establish physical impossibility.

## How the final system connects

| Boundary | Input | Output and responsibility |
|---|---|---|
| User / upstream planner → task | Destination region, optional heading/route/deadline/hold/contact constraints; eventually language | Accepted task with units, frame, masks and persistent clock. No hidden answer motion. |
| Sensors → state and scene estimate | Proprioception, robot calibration/configuration, timestamps; later depth/LiDAR/RGB | Body state and local support/obstacle/overhead geometry, including unknown space and observation age. |
| Task + estimate → whole-body planner | Accepted task, current state/history, geometry and available motor capabilities | A proposed continuation, its validity conditions and unresolved limitations. Route, posture, feet and speed are coordinated here. |
| Planner → motor adapter | Versioned joint/velocity/orientation reference and reference clock | Correct native tracker input. Proposed root motion is not a direct root-position actuator. |
| Motor → robot | Reference plus actual proprioception and action history | Joint commands and physical motion. Balance and contact execution must be measured. |
| Execution → task supervisor | Actual progress, contact, stability, remaining time and observation quality | Completion, continued execution, a new planning request, or no supported continuation. A stop/fallback needs its own qualification. |

Today: one G1 model, one inspected motion ancestry and corridor, known map/localization, nominal standing protocol and a fixed native tracker. Reference packing uses ten future samples; the selected reference is generated from an independent bank. The public interface chooses once. Online moving replacement, broader geometry, sensing robustness and hardware are unestablished.

## Next experiment: explain and address the lower-clearance failure

1. **Freeze the corrected baseline and diagnose the paired collision.** Compare successful original-height and failed lower-height executions with identical motor, reset protocol, floor, XY layout, goal and deadline. Inspect actual body sweep, root progress, joint realization and first contact. Use the force record for collision truth; a conservative box overlap is a diagnostic.
2. **Qualify an executable alternative.** Compare the retained strongest fixed motion with one physically motivated posture/reference construction. Keep a simpler coupled hip/knee/ankle edit as a rival to fixed-foot IK. Match declared excursion or achieved source lowering when testing that mechanism. Preserve joint/support constraints and stop conditions; report if the bank lacks a viable motion.
3. **Test admission and useful coverage together.** Before new outcomes, freeze a small clearance/initial-state panel and a simple execution-informed screen alongside the reference-only geometric screen. Separate calibration conditions from the conditions testing the envelope. Count task completion over every request, false admissions, rejected requests that a matched executor can solve, contact type and acquisition cost. A rule that rejects everything is not a useful navigation interface.
4. **Add online replacement only for a demonstrated need.** If an available continuation can recover from actual deviations, compare a measured-state replacement against the same strong fixed candidate. Preserve committed frames, motor history, elapsed task time and explicit support uncertainty. A longer reference or a better choice is not evidence for feedback correction.

A frozen follow-up protocol must name the candidate, actual comparison, information available to each arm and complete-task score before execution. One source with more seed repeats cannot become a generalization result. Preserve all attempts and maintain separate tracking, complete navigation and body-contact scoreboards.

## Broader validation after this gate

- Add independent source ancestries and scene families, including narrow lateral passages and combined height/width constraints. Include a supported alternate route so the system can prefer an ordinary detour when that solves the task.
- Qualify new initial poses, speeds and disturbances. Keep configured calibration offsets separate from actual body deviations; do not erase a moving-start mismatch through coordinate normalization.
- Replace known geometry with timestamped partial observations while holding task, planner and motor fixed. Test occlusion, pose error, latency and dropout. Unknown space and stale observations must remain explicit, and sensing must change physical decisions appropriately.
- Then evaluate longer routes, destination changes and stopping precision, followed by grounded language. New terrain support, permitted hand contact and hardware each require separate execution evidence.

The prior goal-only/student branch remains a bounded comparison. Lower imitation error alone does not earn promotion. Preserve repaired84 training membership, reserved20/excluded16 separation and stable motion–text identities. Do not mix the adjacent program's distinct resets, reference clocks or distance-extension results into this clearance study.

## Reading and evidence priorities

Review literature when it changes a specific decision: execution-aware whole-body planning, state/calibration representations, tracking-error bounds, uncertain clearance and observation latency. Compare task definitions, tracker strength, runtime information and collision scoring before attributing a gain to a new interface. TANGO, PASSAGE and the reviewed tracker work remain direct comparators; reading their methods is not reproducing them.

The next convincing contribution needs a concrete mechanism that improves useful complete-task coverage over these strengthened simple controls on independent conditions. The website's schematic shows the intended connections; measured experiment figures and their source records carry the evidence.
