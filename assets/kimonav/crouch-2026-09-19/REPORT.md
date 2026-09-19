# A simple crouch retains the measured capability—and the clearance failure

19 September 2026 · completed, unpublished simulation study. **Six new fixed-reference executions, compared with six reused fixed-IK controls.** One inspected motion ancestry (00976), one corridor, two familiar development seeds. This is a reference-construction comparison; the public selector and its execution ledger are unchanged.

The simpler coupled crouch completes every clear and original-beam task in this panel, just as the full-foot IK reference does. Both fail both requests with a 20 mm lower beam. There are **zero paired task gains and zero regressions**. These successful executions therefore do not require preserving both full foot poses in the edited reference. The coupled baseline still borrows the IK-derived excursion schedule; this is not an end-to-end IK-free planning result. These small counts do not establish equivalence or generalization, and neither construction resolves the lower-clearance failure.

| Scene | Full-foot IK, reused | Coupled crouch, new | Paired gains / regressions |
|---|---|---|---|
| Clear | 2/2 | 2/2 | 0 / 0 |
| Original beam | 2/2 | 2/2 | 0 / 0 |
| Beam −20 mm | 0/2 | 0/2 | 0 / 0 |

![Complete-task counts, matched source joint-change budget and measured pelvis motion](/assets/kimonav/crouch-2026-09-19/coupled-outcomes.svg)

The lines in the right panel are measured pelvis trajectories. The source budget in the middle panel is a different quantity. Crosses mark failed executions; geometric clearance predictions are not task success.

## What was compared

The [protocol](/assets/kimonav/crouch-2026-09-19/PROTOCOL.md), candidate, six cases, software snapshots and [raw-control reuse bindings](/assets/kimonav/crouch-2026-09-19/REUSE.json) were frozen before the new physical executions. Each pair keeps the same destination, beam geometry, floor, standing reset, calibration seed, 1 s entry transition, tracker checkpoint, reference clock and complete-task score. Initial body states and randomized dynamics match exactly. The four prior native motion libraries remain byte-for-byte equal as arrays after loading the expanded bank.

At each 30 Hz source frame, the coupled construction receives the maximum joint-angle change made by the already frozen IK construction. It adds hip pitch −0.5, knee +1 and ankle pitch −0.5 times this budget to both legs, and shifts source root height to preserve the lowest enclosing foot point. Other joints, root XY and root orientation remain unchanged. Physical joint limits are checked; this candidate needs no clipping. This is a simple rival to preserving both full foot poses, not a claim that foot support is irrelevant. It uses IK to define the matched budget before applying the simple edit; an independently specified budget has not been tested.

The peak added joint angle is **0.243521 rad** in both sources; peak additional source lowering is **48.158 mm** for coupled and **48.108 mm** for IK. Per-frame budgets match at the 30 Hz source. After native 50 Hz interpolation, the maximum budget difference is **0.001585 rad**, with coupled exceeding IK by that amount at one or more frames. Thus native inputs are not claimed to have an exactly equal framewise budget.

The coupled source preserves the lowest enclosing foot height to numerical precision but moves some foot corners by up to **36.700 mm**. Native interpolation introduces up to **0.925 mm** lowest-height discrepancy. Neither this construction nor a source contact label certifies balance, support or lack of foot slip. Root height in a reference is not a direct root-position actuator: the tracker receives joint/velocity/orientation references and actual proprioception.

## Every paired outcome

| Scene / seed | Full-foot IK, reused | Coupled crouch, new |
|---|---|---|
| Clear / 96162 | Complete, 8.34 s | Complete, 8.34 s |
| Original beam / 96162 | Complete, 8.34 s | Complete, 8.34 s |
| Beam −20 mm / 96162 | Torso contact, 2.74 s | Torso contact, 2.74 s |
| Clear / 96167 | Complete, 8.32 s | Complete, 8.32 s |
| Original beam / 96167 | Complete, 8.32 s | Complete, 8.32 s |
| Beam −20 mm / 96167 | Torso contact, 2.86 s | Torso contact, 2.86 s |

Times above are the end of the 20 ms control tick. At seed 96162, both lower-beam trials first register torso contact at **2.730 s**. At seed 96167, first contact is **2.855 s** for IK and **2.860 s** for coupled. All four successful pairs finish at the same control tick. A marginally later contact is still a failed task.

Success requires complete whole-body passage, the required duck event under a beam, 15 ticks of upright recovery and then a fresh 50-tick stationary hold within the 0.5 m three-dimensional goal region, speed at most 0.1 m/s, no forbidden environmental contact and no fall, all within the original 500 ticks / 10 s. Forbidden contact is measured at four physics substeps per control tick with the existing 1 N threshold. No imitation termination or mid-task reset is used. This scene score does not establish absence of the self-contact observed under earlier, separate scoring profiles.

## What the physical mismatch tells us

Before either first contact at the retained seed, at **2.72 s**, IK proposes a pelvis height of 0.628336 m and achieves 0.735854 m; coupled proposes 0.628347 m and achieves 0.736182 m. Both bodies remain about **108 mm above their respective reference**. At seed 96167 and 2.84 s, the corresponding height errors are 61.408 mm and 59.186 mm. There is no preceding forbidden contact in those samples. The mismatch precedes the collision rather than being measured only after impact.

The [prior diagnosis](/assets/kimonav/crouch-2026-09-19/PRIOR_DIAGNOSIS.json) also records progress and knee-flexion mismatch. The new coupled reference reduces the pre-contact progress lead relative to its IK pair but does not remove the contact. These are descriptive diagnostics; they do not isolate whether timing, joint tracking, support dynamics or their interaction causes the failure. Conservative body-proxy overlap is not a physical contact measurement or proof that the task is impossible.

## Decision and next experiment

Keep coupled crouch as a competitive **fixed-reference control**. The protocol's prospective “IK is not necessary” branch is interpreted narrowly as a statement about the edited foot poses, because the comparison still inherits its budget from IK. Do not attribute the earlier improvement uniquely to full-foot pose constraints, and do not promote a new public primitive or enlarge the admission envelope from these results. The corrected public selector remains [the separately audited prior system](/kimonav/selection/).

Before adding a more complex reference or feedback policy, audit the original SONIC and current scene tracker under the same native command schema, scaling, history and dynamics. If that compatibility check passes, register a bounded motor comparison on the same fixed motion and original/lower clearance, retaining clear-space controls. A motor change is a controller-package comparison, not an isolated planning gain. Historical tracking scores cannot qualify either motor for this task. If an alternate motor cannot supply useful task coverage, a separately registered posture-timing intervention is the next candidate; a progress offset alone does not justify changing gait phase online.

Only after an executable alternative exists should an execution-informed admission rule be tested for both useful coverage and false admissions. Broader scenes, sensing and online replacement remain subsequent gates. [Current connected research plan](/kimonav/plan/).

## Audit and acquisition cost

- [Raw trajectory, reference and scorer audit](/assets/kimonav/crouch-2026-09-19/AUDIT.json): all six new executions pass the audit; six prior controls remain hash-bound and separately counted.
- [Independent frozen codec replay](/assets/kimonav/crouch-2026-09-19/CODEC_AUDIT.json): all **1,946** newly issued tokens and actions reproduce exactly at batch size one. This is interface validation, not another physical experiment.
- [Analysis and per-pair diagnostics](/assets/kimonav/crouch-2026-09-19/ANALYSIS.json): six new native starts, **7,784** contact substeps, no physical retries, approximately **274.6 s** total native wall time and no training updates. The six reused controls contributed their already acquired 1,946 steps.
- [Tests](/assets/kimonav/crouch-2026-09-19/TEST_RESULTS.txt): **46 passed**, including coupling, name ordering, joint bounds, source-budget behavior and the retained interface/scoring checks.
- [Registered plan](/assets/kimonav/crouch-2026-09-19/PLAN.json), [source construction provenance](/assets/kimonav/crouch-2026-09-19/SOURCE_CONSTRUCTION.json) and [protocol](/assets/kimonav/crouch-2026-09-19/PROTOCOL.md). The provenance note explicitly records that its descriptive receipt was written after registration; the candidate and diagnostic arrays themselves existed and were bound before execution.

No hardware, perception robustness, independent source generalization, learned planner or safe stopping fallback is established here. More repeats of this source cannot substitute for independent traversal conditions.
