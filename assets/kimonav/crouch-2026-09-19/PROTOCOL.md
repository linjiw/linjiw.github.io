# Coupled crouch versus full-foot IK: matched excursion budget

Register before new native task execution. All requests and both comparison seeds are already inspected development conditions. One source ancestry (00976), one corridor, no training or hardware.

## Question and prior diagnosis

The strongest fixed IK-lowered reference passes clear and original-beam tasks at seeds 96162/96167 but fails both when the beam is 20 mm lower. Before those contacts, the actual pelvis is 61–108 mm above the reference and approximately 151–154 mm farther along the corridor; knee flexion remains below the reference. These are descriptive paired diagnostics, not a causal isolation of height, phase or contact.

Does a simple hip/knee/ankle coupled edit, given the same per-frame maximum joint-change budget as the existing IK edit, preserve its task capability or improve lower-clearance traversal? This tests a credible simpler reference construction before attributing benefit to full-foot pose constraints or adding online correction. Null or worse results remain informative.

## Frozen construction

Start from the original local-duck source. At each 30 Hz frame, let the budget be the maximum absolute joint change made by the already frozen IK-lowered source at that same frame. Add hip pitch −0.5 × budget, knee +1 × budget and ankle pitch −0.5 × budget to both legs. Keep all other joints, root XY and root orientation unchanged. Apply a common scalar reduction only if needed to preserve physical joint limits and the same 0.03 rad interior/non-worsening rule used in the IK construction.

Translate root Z to retain the original lowest enclosing foot point's height, using the existing native foot proxy geometry and MuJoCo kinematics. This does not preserve both full foot poses, support, foot slip or balance. No hand/waist change, phase change, controller update or extra scene information is introduced.

Prepared source: all frame budgets are achieved without clipping; peak joint addition 0.243520832 rad, maximum added frame step 0.073998228 rad, peak source root lowering 48.158 mm versus IK 48.108 mm. Maximum enclosing foot-corner displacement is 36.700 mm. These are kinematic measurements, not execution outcomes. Root Z is not directly actuated by the 640D native reference. Retain the same 1 s standing transition and unchanged 50 Hz native packing/clock.

## Execution and exact reuse

Six new first attempts: `fixed_coupled` × clear/original beam/beam lowered 20 mm × seeds 96162 and 96167. Compare with the six existing `fixed_lowered` executions of the capability-selection panel; bind all raw arrays, task/config/entry/command receipts and the prior audit before launch. The new bank contains the prior four candidates unchanged plus coupled; compare all four old native library arrays exactly and verify paired initial states/dynamics. No existing control is counted as a new attempt.

Preserve the same teacher checkpoint, original goal, scene bytes/floor, standing reset/calibration events, task score and 500-tick/10 s deadline. Success still requires full passage, the required duck event, upright recovery, a fresh 50-tick stationary hold in the 0.5 m goal region, no forbidden environmental contact and no fall. Record every new outcome, including failures. No scientific tuning or physical retries; at most one preserved infrastructure repair retry per case.

Reconstruct new scores from body/contact traces and new references from the independently loaded native bank and actual pre-action orientation. Replay tokens/actions at batch one. Audit source-level coupling/budget/limits and native resampling effects separately. Report paired gains/regressions, complete-task counts, time conditional on success, contact body/time and all acquisition costs. Joint/reference/root tracking errors are diagnostics, not replacement task scores.

## Interpretation and decision

The comparison matches the available joint-change budget and retains almost identical peak source lowering, but it is a reference-construction package comparison. Foot trajectory, joint distribution and resulting dynamics differ; equal task scores do not prove equivalence, and a gain would not isolate a single geometric feature.

If the simpler construction retains original-height success, full-foot IK is not necessary for those particular successes. If both still fail the lower beam, do not claim an execution-envelope repair. Use actual-motion/phase/support diagnosis to choose the next bounded intervention, or record the capability gap. If the coupled construction succeeds where IK fails, keep it as a stronger fixed candidate and qualify any public selection in a separate version. No new primitive is admitted into the public execution ledger by this fixed-reference experiment.
