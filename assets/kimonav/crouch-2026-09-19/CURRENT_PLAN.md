# A usable whole-body navigation interface

Updated 19 September 2026 after the registered coupled-crouch comparison. This is the current plan. Individual registered protocols and their original outcomes remain unchanged.

**Keep the downstream goal:** give a humanoid a destination and observations, let it coordinate route, torso, arms, pelvis, feet and speed through clutter, then arrive and remain stable. “Dexterous traversal” here means coordinated body motion. Finger manipulation, moving furniture and hand-supported climbing require additional contact capabilities and are later branches.

The immediate question is now concrete: **what execution evidence must accompany a proposed motion before the system accepts it for the current body state and clearance?** Initial geometry-based selection is implemented; passing reference geometry alone still admits motions that physically collide. This is a candidate research question, not an established novelty claim. The existing [literature assessment](/kimonav/literature/) already rules out presenting planner–tracker layering or a whole-body reference interface alone as new.

## What changed our decision

The corrected public selector completes 2/2 clear and 2/2 original-beam requests, but 0/2 when the beam is lowered by 20 mm. Its separate standing-profile verification uses three new and three retained executions; the original 18-request panel and its three admission rejections remain intact. Both lower-beam references pass the unchanged geometric screen and then physically collide. [Public selection evidence](/kimonav/selection/).

The next registered experiment has now tested the simpler rival proposed in the previous plan. Six new fixed coupled-crouch executions were paired with six reused full-foot IK controls, at the same per-frame source joint-change budget. Both constructions complete 2/2 clear and 2/2 original-beam tasks and fail both lower-beam tasks. There are no paired task gains or regressions. The successful coupled reference does not preserve both full foot poses, but it still borrows the IK-derived excursion schedule. This does not establish an end-to-end IK-free planner, and the small panel does not prove equivalence. [Complete comparison, interpolation caveat and physical diagnostics](/kimonav/crouch/).

The coupled candidate remains a fixed-reference control; it has not been admitted to the public execution ledger. Source lowering is almost identical across constructions, but both actual bodies remain about 108 mm above their references immediately before the retained-seed collision. The next question is about executable motor capability and timing, before more reference complexity. The current bank still lacks a qualified lower-clearance alternative or detour. These failures do not establish physical impossibility.

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

## Next experiment: test motor capability before adding another planner mechanism

The paired physical diagnosis and matched-excursion simple-reference comparison are complete. Preserve these results and the current public baseline. The next proposed study is **six alternate-motor executions**: one fixed IK-lowered reference × clear/original beam/beam lowered 20 mm × the two familiar seeds 96162 and 96167, compared with the six retained current-motor controls. This is a proposed budget, not a registered or executed result. It asks whether the selected tracker, rather than reference-construction sophistication, limits useful task coverage.

1. **Check compatibility before registration.** Inspect the original SONIC and current scene checkpoint, native 640D reference/64D token/930D proprioception/29D action schemas, joint order, normalization, configured gains/action scaling, reset dynamics and reference history. Check that each checkpoint is loaded in the execution path and verify its own codec; equal dimensions alone are insufficient. If equivalent simulator conditions cannot be established, document the mismatch before revising the comparison.
2. **Freeze and run the bounded motor comparison.** Use the same fixed bank reference, original task deadline, clean relative orientation and complete-task/contact score. Bind prior raw controls, and check paired entry/dynamics after each new start. Do not change reference amplitude, phase, margin or success criteria at the same time. Count all task failures and infrastructure attempts. A different checkpoint is a controller-package change; do not credit it to planning or an individual learned component.
3. **Let complete-task results choose the branch.** If the alternate motor gains lower-beam completion without losing clear/original-beam capability, keep it as a stronger fixed baseline and qualify its own execution envelope separately. If it regresses, retain the current motor. If both fail, use the observed knee/root realization and progress mismatch to register one bounded posture-timing intervention. Compare with the same retained fixed control and physical joint/support constraints; do not jump gait phase based only on a nearest-progress diagnostic. The earlier sustained-duck experiment already failed to rescue its difficult seed, so extra duration alone is not a new hypothesis.
4. **Test useful admission once a viable alternative exists.** Freeze a small clearance/initial-state panel before outcomes. Compare an execution-informed screen with the unchanged reference-only screen, using the same candidate bank and motor. Separate calibration from envelope-testing conditions. Measure complete tasks over all requests, false admissions, rejected requests that a matched executor can solve, contact type and acquisition cost. Rejecting every request is not useful coverage. A changed motor or reference requires new evidence; neither can inherit old qualifications automatically.
5. **Add online replacement only for a demonstrated need.** First qualify a continuation from an actual deviated body state. Then compare measured-state replanning against the strongest fixed candidate, preserving committed frames, motor history, elapsed task time and explicit support uncertainty. A successful new fixed candidate or a better initial choice does not demonstrate feedback correction. Stopping/fallback must be qualified as an executable behavior.

No student scaling is justified by the current panel. Freeze each follow-up protocol before execution, including runtime information, source access and the complete score. One source with more seed repeats cannot become a generalization result. Keep tracking, complete navigation and body-contact scoreboards distinct.

## Broader validation after this gate

- Add independent source ancestries and scene families, including narrow lateral passages and combined height/width constraints. Include a supported alternate route so the system can prefer an ordinary detour when that solves the task.
- Qualify new initial poses, speeds and disturbances. Keep configured calibration offsets separate from actual body deviations; do not erase a moving-start mismatch through coordinate normalization.
- Replace known geometry with timestamped partial observations while holding task, planner and motor fixed. Test occlusion, pose error, latency and dropout. Unknown space and stale observations must remain explicit, and sensing must change physical decisions appropriately.
- Then evaluate longer routes, destination changes and stopping precision, followed by grounded language. New terrain support, permitted hand contact and hardware each require separate execution evidence.

The prior goal-only/student branch remains a bounded comparison. Lower imitation error alone does not earn promotion. Preserve repaired84 training membership, reserved20/excluded16 separation and stable motion–text identities. Do not mix the adjacent program's distinct resets, reference clocks or distance-extension results into this clearance study.

## Reading and evidence priorities

Review literature when it changes a specific decision: execution-aware whole-body planning, state/calibration representations, tracking-error bounds, uncertain clearance and observation latency. Compare task definitions, tracker strength, runtime information and collision scoring before attributing a gain to a new interface. TANGO, PASSAGE and the reviewed tracker work remain direct comparators; reading their methods is not reproducing them.

The next convincing contribution needs a concrete mechanism that improves useful complete-task coverage over these strengthened simple controls on independent conditions. The website's schematic shows the intended connections; measured experiment figures and their source records carry the evidence.
