# KimoNav paper summary — 9 September 2026

**Active working title:** KimoNav: Deadline-Aware Reference Repair.
**Status:** incomplete method draft; all execution evidence is simulation.
The full draft remains local pending author review. No submission is claimed.

We test whether whole-body reference changes around a fixed SONIC tracker can
improve completion of a timed navigation request without moving its path,
relaxing its tolerances, or postponing STOP. The implementation combines
contact-consistent reference geometry, a nominal tracker-conditioned rollout,
and causal accounting of already consumed task errors.

The 24-program terminal-only comparison remains at 8/24 task successes, with
two gains and two losses. STOP-speed compliance improves from 12/24 to 16/24,
but full STOP phase stays at 9/24 and runtime quality drops from 14/24 to 11/24.
The two complete-task rescues use the sequential branch; they cannot be
attributed to the new coupled optimization branch.

A minimal-intervention rule selects 10/24 successes from these saved outcomes.
It was designed after inspecting the results: this is post-hoc development
replay with zero new captures. A live pilot of an expanded pelvis-reference
bank has 0/2 governor successes and 0/1 zero-control success on two programs.
The selected right offset predicts STOP 0.096005 m/s, but executes 0.158513 m/s;
the zero-offset control executes 0.150212 m/s. Its predicted benefit has the
wrong observed sign. Causal default-offset calibration fails to improve the
forecast overall and is not adopted.

Remaining work: reconcile the incomplete 24-slot binary live collection,
validate prediction of repair effects on separate development variation,
qualify actual delayed execution, freeze the method/baselines, then evaluate
the 36 reserved parameter-variation programs. They are distinct from the
older consumed twelve-design confirmation panel.

The earlier diagnostic paper is retained as a separate contribution. Completing
its first-candidate repeat arms gives fixed / first / minimum-jerk counts of
2/3/4, 2/1/2 and 1/5/3 at simulator seeds 1701/1702/1703, each out of twelve.
Selection changes success by +1, +1, −2 versus first candidate.

No hardware reliability, real-time control, calibrated stopping guarantee,
broad generalization, or novelty of the upstream integration is claimed.
Human authors must review the scientific argument and complete the factual
AI-assistance inventory before preparing a submission candidate.

[Results, analysis and remaining work](progress-2026-09-09.md) ·
[Program-level evidence and source hashes](progress-2026-09-09.json)
