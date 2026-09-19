# Public choice improves; clearance capability remains limited

The improved fixed lowering can now be selected from the public goal, known map and measured standing state. The repaired selector completes both original-beam requests, versus one for the old geometry/cost selector. Lowering the beam by 20 mm causes both requests to fail even with the strong fixed reference. This establishes a narrow integration result and a concrete execution limit, not robust navigation.

## The original registered panel is preserved

The first panel contains **18 requests: 15 task executions and three rejections before task action**. The absolute initial-joint check rejected all three requests of seed 96167. Rejections count against request completion. They are neither falls nor successful safe stops.

| Request | Old geometry selector | Original evidence selector | Fixed lowered |
|---|---:|---:|---:|
| Clear | 2/2 | 1/2; 1 rejected | 2/2 |
| Original beam | 1/2 | 1/2; 1 rejected | 2/2 |
| Beam −20 mm | 0/2 | 0/2; 1 rejected | 0/2 |

The original evidence selector has one paired gain and two paired regressions against the old selector across six requests: it rescues the retained difficult beam case but incorrectly rejects executable clear and original-beam requests at the new seed. Conditional success on admitted requests would hide that loss of coverage. [Original protocol](/assets/kimonav/selection-2026-09-19/original-PROTOCOL.md), [all original outcomes](/assets/kimonav/selection-2026-09-19/original-AUDIT.json), [original analysis](/assets/kimonav/selection-2026-09-19/original-ANALYSIS.json).

## Fix the state definition, then verify separately

The unchanged simulator calibration event adds uniform ±0.01 rad offsets to the default joint pose and updates the action offset. The robot starts exactly at that configured pose. An absolute comparison to one seed differs by up to 0.01865 rad at seed 96167; it also rejects two previously successful calibration seeds. The error was in representing the standing-start condition, not evidence that those starts cannot execute the task.

A separately registered version compares measured joint angles with the configured default standing pose, retaining the 1e-5 rad numerical tolerance. It bounds differences between configured defaults by 0.020001 rad, derived from the unchanged ±0.01 event. Motor, candidate motions, prior success records, ranking, geometry threshold and task score stay fixed. Robot configuration metadata is an explicit input to this check.

**Three new executions** verify the repaired interface on seed 96167. These are now familiar, post-result requests. The retained seed contributes three earlier executions whose admission result and unchanged ranking match the repaired rule; those are reused evidence, not new trials. All three new reference/token/action histories match their existing selected fixed/nominal executor exactly. [Repair protocol](/assets/kimonav/selection-2026-09-19/PROTOCOL.md), [calibration and reuse checks](/assets/kimonav/selection-2026-09-19/PREFLIGHT.json), [new execution audit](/assets/kimonav/selection-2026-09-19/AUDIT.json).

| Request | Old selector | Repaired selector | Fixed lowered | Evidence for repaired selector |
|---|---:|---:|---:|---|
| Clear | 2/2 | 2/2 | 2/2 | 1 new + 1 retained |
| Original beam | 1/2 | 2/2 | 2/2 | 1 new + 1 retained |
| Beam −20 mm | 0/2 | 0/2 | 0/2 | 1 new + 1 retained |

![Task outcomes and sampled reference clearance](/assets/kimonav/selection-2026-09-19/capability-outcomes.png)

## Geometry changes the choice, but a passing screen is insufficient

At the same start and goal, clear space selects nominal; a beam selects lowered after the prior-evidence filter. The old selector chooses local duck at both beam heights. The new choice reproduces the improved fixed executor; it adds no online reference correction.

Lowering only the beam Z coordinate preserves its XY position, orientation and dimensions, the physical floor, start, goal and motor. Both references still pass the 20 mm screen: local duck has about 24.4 mm sampled separation and lowered about 29.4 mm. Yet every lower-beam execution collides with the torso. These are false admissions by the geometric/execution-evidence screen. A sampled reference envelope and original-height successes do not qualify actual motion at a new clearance.

The fixed lowered control fails at both seeds as well. A selector cannot choose a successful traversal from the tested fixed alternatives here. No detour, deeper executable motion, moving replacement or verified fallback was supplied. Failure of this bank does not prove the robot or task physically infeasible.

## Recorded executions

| Layout / seed | Old selector | Repaired evidence selector | Fixed lowered |
|---|---|---|---|
| Clear / 96162 | Complete, 8.34 s | Complete, 8.34 s | Complete, 8.34 s |
| Clear / 96167 | Complete, 8.32 s | Complete, 8.32 s | Complete, 8.32 s |
| Original beam / 96162 | Torso contact, 2.84 s | Complete, 8.34 s | Complete, 8.34 s |
| Original beam / 96167 | Complete, 8.32 s | Complete, 8.32 s | Complete, 8.32 s |
| Beam −20 mm / 96162 | Torso contact, 2.52 s | Torso contact, 2.74 s | Torso contact, 2.74 s |
| Beam −20 mm / 96167 | Torso contact, 2.80 s | Torso contact, 2.86 s | Torso contact, 2.86 s |

Times use 50 Hz control-step duration; contact substep times remain in the raw audit. The complete score still requires passage, the beam duck event, upright recovery, a fresh 50-tick hold inside the 0.5 m goal region, no forbidden environmental contact and no fall, within the original 500-tick deadline.

## Verification and costs

The original panel reconstructs **4,574 native reference/token/action outputs** and all 18 request outcomes, including three zero-action rejections. Six groups have identical measured initial states; dynamics match among executing controls. Four overlapping historical controls and all four native candidate arrays remain exact. The separate repair reconstructs **975 new outputs** and three matching-executor comparisons. **44 focused tests pass.** Outputs are correlated control samples, not independent trials. [Codec replay](/assets/kimonav/selection-2026-09-19/CODEC_AUDIT.json), [original codec replay](/assets/kimonav/selection-2026-09-19/original-CODEC_AUDIT.json), [tests](/assets/kimonav/selection-2026-09-19/TEST_RESULTS.txt).

Total acquisition: **18 task executions** (15 original + 3 repair), **three original rejected requests**, and one additional zero-task-action capture retry, for **22 native process starts**. The original rejection was preserved when adding structured rejection logging; a separate Python-bool serialization error was also repaired without changing scientific conditions. The original native processes used 507.9 s; the three follow-up processes used 59.0 s. No optimizer updates, hardware runs or task-execution retries occurred.

## Next decision

The broader goal remains a humanoid that accepts a destination and observation stream, coordinates route/body/support, and reaches and holds the accepted task. The immediate research question is narrower: what execution-valid information must accompany a proposed continuation before the system accepts it?

1. Freeze this repaired standing-profile baseline. Keep calibration metadata, actual pose, proposed motion and measured execution distinct in the interface. The corrected known-map choice is now tested; online replacement and perception are still separate work.
2. Diagnose the lower-beam collision against the successful original-height execution using the same motor and original clock. Compare actual body sweep, root progress and joint realization. Build a usable clearance envelope with both admissions and rejections, and retain a strong fixed-motion or supported detour control. Do not turn proxy overlap into contact truth or reject every difficult request to improve a conditional score.
3. Qualify an actually executable lower-clearance alternative before proposing a learned selector or moving seam as its repair. Keep the simpler coupled-posture edit as a rival to fixed-foot IK; the current experiment does not isolate why that construction helped.
4. Expand to independent starts, source ancestries and clutter families only after this gate. Replace known geometry with timestamped partial observations under the same task score later; unknown space, estimation error and stale observations must remain explicit.

These are development findings from one inspected source/corridor. New execution seeds are not scene generalization. The result neither establishes architectural novelty over the reviewed traversal literature nor validates hardware or sensor robustness.
