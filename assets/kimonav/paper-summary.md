# KimoNav: deadline-aware reference repair — working-paper summary

Updated after the 9 September 2026 research continuation. Ongoing simulation
research, not a published or submitted paper. The full manuscript remains local
pending human author review.

The question is whether bounded reference repair around a frozen humanoid
tracker can improve a complete timed task without resetting its past errors
or stopping deadline. The method combines whole-body geometry, a nominal
execution forecast and original-clock task budgets.

The completed live binary governor reproduces 10/24 task successes versus 8/24
current, with two gains and no losses. Its 24 captures include two reused
captures and 22 new captures, with one declared recovery. All original attempts
remain. Choices, reference/forecast arrays and selected physical first-episode
arrays reproduce the inspected replay under the same seed. This is a live
implementation check, not validation on new programs.

The next 18-proposal reference-envelope study admits 16 geometry/rate-valid
repairs and predicts no complete-task success. Wider priors advance stopping
holds, but four left STOP-speed passes lose position. The closest right STOP
forecast remains above the strict threshold. A zero-state model import failure
is preserved, and its forecast-only recovery reuses all geometry. No new robot
execution is added by that grid.

The paper retains the separate wrong-sign live pelvis prediction and negative
causal default-offset calibration. Binary preparation takes 11.30–18.13 s with
simulation paused. Actual delay handling, prediction transfer and sealed-final36
evaluation remain unfinished. Hardware, calibrated guarantees and real-time
operation are not established.

[Results, analysis and sources](/assets/kimonav/continuation-2026-09-09.md).
OpenAI Codex assisted with research code, experimental execution, analysis,
figures and substantive drafting. Human authors remain responsible for the
scientific argument, citations, full assistance inventory and final submission.
