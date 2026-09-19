> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/task-margin-pilot-20260914/REPORT.md`; SHA-256: `fb896a0fb8d2566e283607aa29362c27af48f883feea9d85221b74586cf08588`.

# Task margin reward pilot

Both arms warm-started the same stable 2,000-update adapter and received 200 additional updates with fresh Adam states. The margin arm adds a path penalty above 0.10 m and starts the STOP penalty at 0.05 m/s. Evaluation retains 0.20 m and 0.10 m/s limits.

| Arm | Native | Physical quality | Full task + quality | Median STOP peak (m/s) |
|---|---:|---:|---:|---:|
| baseline | 23/24 | 15/24 | 0/24 | 0.1357 |
| control | 23/24 | 18/24 | 1/24 | 0.1692 |
| margin | 24/24 | 18/24 | 0/24 | 0.1561 |

Predeclared continuation gate: False. Margin promotion gate: False.

Paired continuous outcomes: {"n": 23, "mean_path_delta": 0.004660254530644297, "median_stop_delta": 0.003869675099849701}. Negative deltas favor the margin arm.

All attempts are retained. This tests one reward package on eight familiar development programs with one training seed and three fresh execution seeds. It does not establish text understanding, held-out-task generalization or scene traversal. No failed demonstrations are admitted. The repaired84 registry/text bindings are preserved; reserved20 and final36 are unused.

Optimizer integrity, fixed teacher binding, one teacher query per physics decision and exact decoder parity were checked. Pre-action shaping, discounting, terminal-state reward omission and decoder control authority remain separate hypotheses.
