# Execution evidence is already part of the comparison set

Targeted primary-method reread, 20 September 2026. This is not a reproduction or an exhaustive novelty search.

TANGO's PET pipeline executes edited references through SONIC and filters failed or colliding trajectories. Its training targets remain the accepted references rather than realized trajectories. This is a direct precedent for execution-based data qualification, distinct from runtime acceptance of an unfamiliar task. [TANGO, §3.2 and Track appendix](https://arxiv.org/html/2609.09158v1).

PASSAGE keeps a perceptive tracker frozen during planner-side refinement using executed rollouts. Its tracker also receives geometry. This provides a direct comparator for addressing the gap between planned and realized motion; matching only the planner interface would miss an important execution-resource difference. [PASSAGE, §III-B2 and §III-C2](https://arxiv.org/html/2609.18732v1).

For KimoNav, recording successes in a finite ledger or checking execution is therefore insufficient as a novelty claim. The current diagnostic asks the narrower question of whether existing rules reject useful fixed capability. Any later execution-conditioned acceptance model must improve complete-task coverage on separate requests, against geometry, conservative fixed controls and matched motor capability. A calibrated bound or learned predictor is a candidate design, not an established contribution or a safety guarantee.
