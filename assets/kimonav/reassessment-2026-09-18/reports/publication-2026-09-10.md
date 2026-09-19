> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/RESEARCH_WEB_PUBLICATION_2026_09_10.md`; SHA-256: `6cd16059e298d91d474898e6ac5ed2c04ea38b08f2ab1f7b6eda01f92d0329d3`.

# KimoNav page rebuild — 10 September 2026

Published and live-verified: https://linjiw.github.io/kimonav/.
Commit `d4483d04ecb5df08ffd8669fdea2c9d7baa3f50b`.
Successful deployment: https://github.com/linjiw/linjiw.github.io/actions/runs/34519217536.

The page now introduces the work before the fold — what was built, that the robot is a
**simulated** Unitree G1 on flat ground, that no hardware has been run, and that this is
unpublished ongoing research. A new demo section leads with
`binary-rescue-demo-v0.2` (local experiment artifact), a side-by-side replay of
the two programs the binary governor rescues, rendered from hash-checked captures with `new_physics=0`.
Its caption carries the denominator (2 of 24, the only two whose outcome changed), 8/24 → 10/24 with no
regressions, the union ceiling, the post-hoc design disclosure, and that "live" is not real time —
physics was paused 11.30–18.13 s per decision.

The method section publishes the pipeline figure and three registered mechanism figures, states the
governor's decision rule in full, and separates the fixed 2.08 s continuation boundary from the later
governor decision at ticks 154–506 (3.08–10.12 s).

**Six claims were corrected before publishing**, each after adversarial review against the source:
the four result columns are now marked as different tiers of evidence; 10/24 is stated as the ceiling
any two-arm rule could reach; unconditional repair is noted to tie the governor at 7/24 on
task-and-quality; the 0.1804 rad joint-limit projection is reattributed from the repair operator to
frozen ARDY's own output; the anticipatory combination arm carries its counterexample (fresh right,
2703) and the finite-bank ceiling (draw 1704 already succeeds unrepaired at 0.0937 m/s); and the six
static-hold failures are reframed as **startup transients** — every peak falls at 0.02–0.38 s, four to
nine samples per capture, all six settling below 0.10 m/s from 0.16–0.44 s onward — not a tracker
floor. The earlier "no reference-side repair can cross it" inference was refuted by the page's own
table: 16/24 repaired arms pass the strict STOP check.

Verification: `check_execution_website_v7.cjs` (local experiment artifact) merges and
supersedes the continuation and v6 checkers, and retires three v6 assertions that no longer describe
the page. It recomputes every table cell from the served evidence JSON, byte-compares all 33 asset
links against source, verifies all 66 hashes in `provenance-2026-09-10.json`, plays all three videos,
asserts the hero's simulation language and the scope framing around 10/24, and confirms no horizontal
overflow at 390 and 320 px. Local run passes; eight live asset hashes match source bytes exactly and
every live content check passes. The deployed HTML is minified by the existing Actions pipeline, so it
is not byte-identical to the local build.

**Withheld deliberately.** `artifacts/method-figure-v0.1` was drawn and then **not published**:
adversarial review found it drew a measured-history return edge into the frozen generator that the
executed run does not have (`completed.json` `new_generation_calls = 0`; `replay_candidate_future.py`
records `online_generation: false`) and fused two different decision events. The 73 s submission video
stays unpublished pending the AI-assistance inventory and a deliberate de-anonymisation decision. Both
manuscripts remain local; `final36` was not opened.

Publication receipt (local experiment artifact)
· Status review (local experiment artifact) §12.
