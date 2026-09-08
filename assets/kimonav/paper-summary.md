# KimoNav paper summary (working manuscript, September 2026)

**Working title.** Requested, generated, executed: diagnosing timed whole-body
navigation with frozen motion priors.

**Status.** Working manuscript prepared for a conference submission. The experiment
set that supports it is finite and complete; final formatting, anonymization and
submission review are manuscript tasks. No submission or acceptance is claimed, and
the manuscript itself is not distributed through this website.

## Question

When a timed metric navigation program (walk, pivot, arc, strafe, stop, each with a
deadline) is compiled into full-body motion by a frozen autoregressive motion
generator (ARDY) and tracked by a pretrained humanoid policy (SONIC) on a simulated
Unitree G1, which failures arise in the requested-to-reference mapping, which appear
during execution, and which small interventions improve original-clock success
without degrading movement quality?

## Contributions

1. **A requested/generated/executed benchmark.** 36 metric programs in six families
   (24 development, 12 held-out confirmation), original-clock scoring with explicit
   state, reference and action clocks, first-episode failure accounting, causal
   measured-history packets at 2.04 s and atomic reference replacement at 2.08 s.
2. **Error anatomy.** Across 192 candidate executions, 69 pass both reference and
   task checks, 49 fail the task despite a passing reference, 3 pass despite a
   reference defect, and 71 fail both. STOP dominates: 73 references and 109
   executions fail a STOP check. Reference defects and execution drift coexist.
3. **Selection headroom and its limits.** On fresh draws, K=1 succeeds on 9/24
   contexts, minimum generated joint jerk on 10/24 and a qualified hindsight oracle on
   13/24. Three learned selectors and two tracker-response predictors fail their
   registered promotion rules. No fresh pivot–walk–stop candidate succeeds.
4. **Prospective interventions on held-out programs.** A compiler braking lead
   (0.2/0.4/0.6 s) adds at most one success over 6/24 and is not promoted. On the
   twelve confirmation programs, native / measured-history K=1 / minimum jerk
   succeed on 2/12, 3/12, 4/12 at the primary simulator seed; the first repeat seed
   gives 2/12 and 2/12, and a second registered repeat seed gives 1/12 and 3/12. Three seeds,
   reported separately: a small, consistently signed direction, not a significant effect.
5. **A common-interface native-planner baseline.** SONIC's own planner, driven by the
   same requests through the same G1 pose-replay interface, succeeds on 0/24
   development programs versus 6/24 for ARDY; all 24 planner references already
   violate the request, so this bounds the interface, not the full native deployment.

## What the paper does not claim

Real-time control, hardware transfer, torque or ZMP feasibility, sole-point slip,
language-to-program on human text, novelty of the Kimodo/ARDY/SONIC integration, or
statistical significance on 12 or 24 related programs.

## Evidence on this site

- Confirmation results and paired changes: `confirmation-evidence.json`
- Braking sweep and initialization caveat: `braking-evidence.json`
- Candidate banks and selectors: `selection-evidence.json`
- Response predictors: `response-evidence.json`
- Planner comparison: `planner-evidence.json`, `planner-report.md`
- Source hashes and verification: `execution-provenance.json`
