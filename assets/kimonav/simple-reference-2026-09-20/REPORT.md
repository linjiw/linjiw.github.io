# The stronger motor can use the simpler reference

20 September 2026 · completed, unpublished simulation study. **Eight new executions and six reused controls**, one inspected source ancestry (00976), one corridor and two familiar seeds. Original SONIC weights and the same scene evaluation configuration are fixed throughout.

The unmodified local-duck source completes **6/6** tasks: both clear, both original-beam and both beam-minus-20-mm cases. The retained IK-lowered controls also complete **6/6**. There are **zero paired task gains and zero regressions**. Nominal motion completes **2/2 clear-space tasks**; nominal obstacle tasks were not tested. [Registered protocol](/assets/kimonav/simple-reference-2026-09-20/PROTOCOL.md).

| Fixed reference | Clear | Original beam | Beam −20 mm |
|---|---|---|---|
| IK lowered · six reused controls | 2/2 | 2/2 | 2/2 |
| Local duck · six new executions | 2/2 | 2/2 | 2/2 |
| Nominal · two new clear executions | 2/2 | Not tested | Not tested |

![Complete tasks and measured pelvis trajectories under the two fixed references](/assets/kimonav/simple-reference-2026-09-20/simple-reference-outcomes.svg)

**Extra IK lowering is unnecessary for the successful executions observed here.** Retain local duck as the simpler supported fixed option for these conditions. This is a useful baseline correction, not proof of equivalent controllers, general traversal, or a new planning method. The previous motor comparison changed which tracker was used; this panel holds that stronger tracker fixed and changes its reference. [Previous motor comparison](/kimonav/motor/).

## Every paired result and the separate nominal check

| Scene / seed | IK lowered, reused | Local duck, new |
|---|---|---|
| Clear / 96162 | Complete, 7.52 s | Complete, 7.52 s |
| Original beam / 96162 | Complete, 7.52 s | Complete, 7.52 s |
| Beam −20 mm / 96162 | Complete, 7.52 s | Complete, 7.52 s |
| Clear / 96167 | Complete, 8.44 s | Complete, 8.44 s |
| Original beam / 96167 | Complete, 8.44 s | Complete, 8.44 s |
| Beam −20 mm / 96167 | Complete, 8.44 s | Complete, 8.44 s |

The paired successful runs finish at the same control tick in every pair. Equal task outcomes and times do not mean identical trajectories or actions; each executed reference is separately reconstructed in the audit. There is no demonstrated traversal-speed advantage or measured runtime saving from this comparison.

| Nominal qualification | New execution |
|---|---|
| Clear / 96162 | Complete, 7.50 s |
| Clear / 96167 | Complete, 8.46 s |

All eight new runs have **zero measured forbidden environmental contact force** and satisfy the original full task. That requires whole-body passage, ducking where requested, 15 upright recovery ticks followed by a fresh 50-tick stationary hold inside the 0.5 m three-dimensional destination region, speed at most 0.1 m/s, no forbidden contact above 1 N at any 200 Hz substep, and no pelvis-height fall, within the original 10 s deadline. Foot-floor support is allowed; self-contact absence is not qualified by this score.

## What was held fixed and what changed

All **55 loaded policy tensors** match the bound original checkpoint. Original weights sit beside an exact copy of the prior scene evaluation config: using the release's own defaults would change mass randomization. The 640D reference / 64D token / 930D history / 29D action interface, actual entry, recorded dynamics, **actuator stiffness and damping**, four native motion libraries, initial proprioception/history and first-physics Torch RNG match the corresponding original-motor lowered controls. [Preflight](/assets/kimonav/simple-reference-2026-09-20/PREFLIGHT.json), [raw audit](/assets/kimonav/simple-reference-2026-09-20/AUDIT.json).

The intervention is the selected bank member: `local_duck` or, in clear space only, `nominal`. No source edit, amplitude adjustment, phase shift, new motion generation, training, changed success threshold or physical retry occurred. The planner-owned 50 Hz clock, ten future samples spaced 100 ms apart and the 1 s standing transition are unchanged.

The new first-query gate validates the selected reference itself. It does not incorrectly require a changed reference to equal the lowered control. In these starts the first reference and first action do match because the shared standing transition covers that preview; subsequent references are audited against their own selected libraries and actual root orientation. This preserves a valid reference intervention without weakening the initial-state comparison.

The eight new executions contain **5 distinct full action histories**. Exact duplicates across layouts are listed in the [analysis](/assets/kimonav/simple-reference-2026-09-20/ANALYSIS.json). They remain eight simulator executions but do not supply eight independent sources, scenes, or learned policies. Matching the goal in three layouts with a fixed reference is not evidence that the robot used the scene to select it.

## What changes next

The public selector still uses the previous scene motor and its separate ledger; its earlier lower-beam result remains **0/2**. **No public integration ran in this panel.** The stronger motor cannot inherit the old motor's qualification records. [Public-interface history](/kimonav/selection/).

The next proposed check is **six public-interface executions** with the original motor: three layouts and two familiar seeds, using a new motor-specific ledger made from the completed fixed-reference evidence. Reuse the strongest fixed controls. Freeze the selection rule before execution, account for every rejected request, and require selection of an actually qualified primitive. This budget is proposed, not registered or executed.

Geometry-only and evidence-filtered selection may choose the same nominal/local-duck pair in these familiar cases. Such a tie would verify connection of the interface, not demonstrate a new admission mechanism. After that bounded integration check, move to distinct clearance and entry conditions, then independent motion sources and combined height/width constraints. A new mechanism must improve useful complete-task coverage over the strengthened simple controls; a narrower rejection rule alone does not establish progress.

The downstream goal remains destination and observations → coordinated route/posture/feet/speed → arrival and stable hold. Partial sensing, moving reference replacement, broader contact capabilities and hardware remain separate stages in the [connected research plan](/kimonav/plan/).

## Evidence and acquisition cost

- [Registered plan](/assets/kimonav/simple-reference-2026-09-20/PLAN.json), [protocol](/assets/kimonav/simple-reference-2026-09-20/PROTOCOL.md) and [six-control reuse bindings](/assets/kimonav/simple-reference-2026-09-20/REUSE.json). Reused controls are not counted as newly collected data.
- [Raw audit](/assets/kimonav/simple-reference-2026-09-20/AUDIT.json): all eight executions checked against their declared reference, actual state, force traces and unchanged full-task score.
- [Frozen codec replay](/assets/kimonav/simple-reference-2026-09-20/CODEC_AUDIT.json): all **3,192** new tokens and actions reproduce exactly. This is interface verification, not additional physics.
- **8 new native attempts**, **12,768 physics/contact substeps**, **290.887 s native wall time**; no physical retry or training update. The six reused controls contain **2,394** old control steps.
- [Focused tests](/assets/kimonav/simple-reference-2026-09-20/TEST_RESULTS.txt): **26 passed**. Contact diagnostics retain separate first-threshold-crossing and peak-force definitions.

No independent-source or scene generalization, observation robustness, public-selector improvement or hardware claim follows from this panel.
