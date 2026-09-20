# A rejected request can still be executable

20 September 2026 · completed simulation development study. **Twelve new fixed-reference executions** cover six requests: three previously unmeasured beam offsets × two execution seeds × local duck or IK lowered. The original motor, common scene configuration, bank, goal, standing protocol, score and deadline remain fixed. [Registered protocol](/assets/kimonav/clearance-2026-09-20/PROTOCOL.md).

Both references complete **5/6** requests: 2/2 at −10 mm, 2/2 at −30 mm and 1/2 at −50 mm. IK lowering adds no task successes and causes no paired task regressions. These outcomes expose both unnecessary rejection and a remaining execution failure; they do not establish a continuous safe clearance interval.

| Fixed reference · all executions new | Beam −10 mm | Beam −30 mm | Beam −50 mm |
|---|---|---|---|
| Local duck | 2/2 | 2/2 | 1/2 |
| IK lowered | 2/2 | 2/2 | 1/2 |

![Fixed outcomes and separate shadow admission decisions](/assets/kimonav/clearance-2026-09-20/clearance-admission-outcomes.svg)

## Every physical pair

| Beam offset / execution seed | Local duck | IK lowered |
|---|---|---|
| −10 mm / 96171 | Complete, 8.42 s | Complete, 8.42 s |
| −30 mm / 96171 | Complete, 8.42 s | Complete, 8.42 s |
| −50 mm / 96171 | Torso contact, 2.94 s | Torso contact, 3.00 s |
| −10 mm / 96173 | Complete, 8.64 s | Complete, 8.64 s |
| −30 mm / 96173 | Complete, 8.64 s | Complete, 8.64 s |
| −50 mm / 96173 | Complete, 9.24 s | Complete, 8.64 s |

The failed pair first crosses the forbidden-contact threshold at **2.925 s** for local duck and **2.985 s** for IK lowered, both at the torso against the beam. The table reports control-stop times, which are later than those 200 Hz contact samples. Neither failure is a timeout or an imitation-termination event. At −50 mm the other seed succeeds with both references; IK lowering finishes 0.60 s earlier in that one successful pair. This is not evidence of a general speed advantage or equivalent controllers.

All ten successful executions have zero measured forbidden environmental contact force and satisfy the unchanged complete task: whole-body passage, required ducking, 15 upright recovery ticks followed by a fresh 50-tick hold inside the 0.5 m 3D goal region, speed ≤0.1 m/s, no forbidden force above 1 N at any 200 Hz substep, no pelvis-height fall, and the original 10 s deadline. Foot-floor support is allowed; self-contact absence is not established. No physical failure was retried.

## What the frozen rules would admit

The fixed probes deliberately run despite rejection. Before the first task action, each saves the unchanged geometry rule and the previous finite-context ledger's decisions. The geometry rule keeps its 20 mm sampled reference-separation margin. The finite ledger contains only the earlier clear/original-beam/−20-mm contexts and rejects every new context.

The table below combines these **pre-action shadow choices** with the corresponding measured fixed outcomes. It is not a new public-interface rollout. All selected candidates have a measured counterpart here, so there are no unknown selected outcomes.

| Frozen rule · six requests | Admitted | Complete-task coverage | Admitted but failed | Rejected with a successful measured alternative |
|---|---|---|---|---|
| Reference geometry | 2/6 | 2/6 | 0/2 admitted | 3/4 rejected |
| Finite-context ledger | 0/6 | 0/6 | No admissions | 5/6 rejected |

Geometry accepts local duck only at −10 mm. At −30 mm it rejects both successful requests. At −50 mm it rejects one request with a measured success and one on which both tested references fail. The ledger's lack of failed admissions follows from rejecting everything here; that alone is not a navigation improvement or calibrated safety evidence.

The best of the two measured fixed alternatives completes **5/6** requests, equal to either fixed reference's result. This is a retrospective solvability reference, not a deployable oracle or evidence that every possible motion was searched. Across the 12 candidate executions, **six successful executions were rejected by their reference-geometry screen**. That candidate-level count differs from the three rejected-but-measured-solvable requests.

## Why the geometry screen rejects useful capability

The reference minimum is below the fixed 20 mm margin at −30 mm and negative at −50 mm. Actual execution changes the swept body geometry, and the two execution seeds differ. The following exploratory diagnostics use the same conservative body proxies; minima occur at the torso.

| Offset / reference | Reference minimum (mm) | Measured minimum, seed 96171 (mm) | Measured minimum, seed 96173 (mm) |
|---|---|---|---|
| −10 / local duck | 34.41 | 29.85 | 48.81 |
| −10 / IK lowered | 39.41 | 35.22 | 49.59 |
| −30 / local duck | 14.41 | 9.85 | 28.81 |
| −30 / IK lowered | 19.41 | 15.22 | 29.59 |
| −50 / local duck | −5.59 | −4.32 | 8.93 |
| −50 / IK lowered | −0.59 | −4.78 | 9.59 |

These are sampled enclosing-box separations along obstacle face normals, not exact mesh distances. Negative values indicate a possible proxy overlap, not proof of contact. Measured poses are recorded at 50 Hz; the independently scored contact forces are sampled at 200 Hz. The observed contacts establish failure for the two failed runs. Positive sampled separation alone is not a continuous safety certificate. [Full diagnostics and actual contact events](/assets/kimonav/clearance-2026-09-20/ANALYSIS.json).

The result motivates comparing a **simple calibrated margin** with an execution-conditioned body envelope. It does not yet favor the more complex model. Fitting either approach using these outcomes makes this panel calibration data; a separate panel must evaluate the fitted rule. Lowering a margin after observing the successes is not an independent improvement result.

## What changes next

The earlier public interface remains qualified only on its three familiar task contexts. These fixed probes do not automatically enlarge its ledger or demonstrate public execution on the new heights. [Completed public integration](/kimonav/public-motor/).

Keep local duck as the simpler task-success baseline; extra IK lowering adds no task coverage here. Preserve the seed-sensitive −50-mm failure. The next bounded work is to specify simple margin and realized-envelope comparators, then make the bank interface accept another source without hardcoded clip names. A readiness inspection found source 00265, but it was historically evaluated and needs qualification under the current motor and standing protocol. It is not an untouched test source. [Source readiness](/assets/kimonav/clearance-2026-09-20/NEXT_SOURCE_READINESS.json), [current connected plan](/kimonav/plan/).

The targeted reread of TANGO and PASSAGE also confirms that execution-based data filtering and refinement through a tracker already have direct precedents. A finite success ledger is not sufficient novelty. [Method implications and primary sources](/assets/kimonav/clearance-2026-09-20/LITERATURE_NOTE.md).

## Prior access, matching and verification

There is one motion ancestry/corridor, three new beam heights and two execution seeds, not independent scene-family generalization. The 12 executions contain **10 distinct full action histories**. Exact duplicates remain listed in the analysis.

**Seed-role clarification.** The original case-sensitive search inspected 171 metadata files. A supplementary search found the integers 96171/96173 in older student-run names. The corresponding plan and all 16 matching native commands show that those were optimizer seeds, while physical execution used 96161. No earlier exact native execution use of 96171/96173 was found in the inspected records. This distinction supersedes an intermediate progress note that did not yet separate the two roles. No seeds or outcomes were replaced. [Original search](/assets/kimonav/clearance-2026-09-20/SEED_ACCESS.json), [supplement](/assets/kimonav/clearance-2026-09-20/SEED_ACCESS_SUPPLEMENT.json), [clarification](/assets/kimonav/clearance-2026-09-20/SEED_SCOPE_CORRECTION.md).

- [Raw audit](/assets/kimonav/clearance-2026-09-20/AUDIT.json): all 12 complete task/contact/reference reconstructions pass; all six pairs match actual entry, recorded dynamics, actuator gains, native libraries, first proprioception/history and first-physics RNG. Each reference is checked against its own selected motion. All 55 loaded policy tensors match the bound motor.
- [Frozen codec replay](/assets/kimonav/clearance-2026-09-20/CODEC_AUDIT.json): all **4,603** issued tokens/actions reproduce exactly. This adds no physics.
- **12 new native attempts**, **18,412 physics/contact substeps**, **444.668 s native wall time**; zero reused physical controls, training updates or physical retries. Two rules evaluated across six requests produce 12 distinct shadow-rule evaluations and zero additional physics attempts.
- [Focused tests](/assets/kimonav/clearance-2026-09-20/TEST_RESULTS.txt): **45 passed**. Unknown selected outcomes, rejected requests and successful alternatives have separate accounting.
- [Registered plan](/assets/kimonav/clearance-2026-09-20/PLAN.json), [preflight](/assets/kimonav/clearance-2026-09-20/PREFLIGHT.json) and 303 frozen runtime files preserve the comparison. Adjacent research modules execute from frozen snapshots, not concurrent working-tree edits.

The navigation goal remains useful. This increment identifies a concrete gap between available fixed capability and accepted requests, alongside a real capability failure. It does not yet resolve that gap with a new generalizable method.
