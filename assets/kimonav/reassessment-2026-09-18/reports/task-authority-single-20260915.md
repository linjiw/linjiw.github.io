> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/task-authority-single-20260915/REPORT.md`; SHA-256: `5ea5d7c5f703210bf38c22b3aa357d759e4980c48a3f072712a9e5865b16fe18`.

# Single-robot teacher correction pilot

**Result:** early positive code correction reduced peak STOP speed in all six paired executions, but no tested controller qualified as a navigation teacher.

Paired descriptive finite probes on two historical straight-walk tasks. No holdout, ordinary-standing, language, scene, or student success claim.

| Correction | Lead | Qualified | STOP phase passes | Median STOP peak change | Median path change | Median slip change |
|---|---:|---:|---:|---:|---:|---:|
| timing_plus | 0.6 s | 0/6 | 0/6 | -0.0125 m/s | -0.0009 m | +0.0113 m/s |
| timing_plus | 0.2 s | 0/6 | 0/6 | +0.0000 m/s | +0.0000 m | +0.0000 m/s |
| timing_minus | 0.6 s | 0/6 | 0/6 | +0.0364 m/s | +0.0080 m | +0.0007 m/s |
| timing_minus | 0.2 s | 0/6 | 0/6 | +0.0000 m/s | +0.0000 m | +0.0000 m/s |
| code_plus | 0.6 s | 0/6 | 0/6 | -0.0211 m/s | -0.0022 m | -0.0043 m/s |
| code_plus | 0.2 s | 0/6 | 0/6 | -0.0022 m/s | +0.0000 m | -0.0001 m/s |
| code_minus | 0.6 s | 0/6 | 0/6 | +0.0415 m/s | +0.0174 m | +0.0214 m/s |
| code_minus | 0.2 s | 0/6 | 0/6 | -0.0015 m/s | +0.0076 m | +0.0002 m/s |

Neutral: 0/6 full task-and-quality passes; 0/6 STOP phase passes.

Late timing probes: 12/12 have exactly equal active-episode root states, actions, and motor codes to neutral. A small reference-input edit can be a quantized-code null; inspect the recorded reference change as well as the physical result.

The early positive code direction reduced STOP peak in 6/6 pairs (median 0.0211 m/s), and the opposite direction increased it in 6/6. Its branch foot-slip proxy decreased in 5/6 pairs. Early positive timing helped STOP peak in 5/6, but increased the slip proxy in 5/6. These are descriptive outcomes on two tasks, not a generalization claim.

All three slower-task neutral prefixes had already exceeded the 0.20 m timed-path tolerance before the earliest probe. A later STOP correction cannot recover full-task qualification for an already-failed prefix. The next teacher must control approach progress as well as braking.

Compute: 56 simulator launches, 14,000 teacher queries, 13,944 first-task active decisions; 0.445 summed simulator-process hours with up to two processes sharing the GPU. This is process wall time, not measured GPU utilization time.

Negative paired changes favor corrections for speed/path/slip; contact fractions and body height require physical interpretation. Both signs, both lead times and all failed attempts are retained. Neutral runs are reused at the same lead for each comparison; they are not additional independent samples.

All complete neutral repeats and all intervention prefixes passed exact equality including matched coverage. The original eight-robot attempts and recorder failure remain in the parent plan provenance; their invalid pairs are excluded from this single-robot result.

Full-task qualification retains the original dense timed-path and STOP evaluator. The new sparse command schema has separate tests and does not change these thresholds.

Raw paired results (local experiment artifact) · Branch metrics CSV (local experiment artifact) · Locked pilot scope (local experiment artifact)



Each dot is one design/seed pair. Both lead times and both signs are shown. Negative speed changes favor the correction; repeated dots at zero are exact physical nulls.



Median traces are descriptive summaries across three seeds. A median curve crossing the STOP threshold does not imply that any whole execution passes. Qualification uses every sample of each original episode.

Instrument repairs and excluded attempts (local experiment artifact) · Runtime source snapshot (local experiment artifact)
