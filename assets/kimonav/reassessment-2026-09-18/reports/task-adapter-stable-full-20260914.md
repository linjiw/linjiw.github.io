> **Historical evidence extract.** Original study record; its proposed next steps may be superseded. See the [18 September reassessment](/kimonav/plan/) for the current plan. Source: `knav/artifacts/task-adapter-stable-full-20260914/REPORT.md`; SHA-256: `127e9e16b5d55542996bfe3b51b3107c94e341c947a26a081809219d7db47cbd`.

# Stable task-adapter full-budget comparison

The repaired optimizer completed 2,000 updates, 128 environments and 6,144,000 transitions. The original legacy checkpoint uses the same training seed and budget. Rewards, reference pool, frozen teacher/decoder, task clocks and acceptance thresholds are unchanged. This compares optimizer packages; critic capacity and effective actor step sizes differ.

| Arm | Native completed | Physical quality | Full task + quality |
|---|---:|---:|---:|
| zero | 24/24 | 16/24 | 0/24 |
| legacy | 24/24 | 13/24 | 0/24 |
| stable_v2 | 24/24 | 19/24 | 0/24 |

Repaired optimizer promotion gate passed: False.

Fresh evaluation seeds are 91830/91831/91832 on the same eight historical development programs. The final update was fixed in advance. These are not held-out tasks or evidence of unrestricted text, obstacle or traversal generalization. The repaired84 motor registry/text bindings are unchanged; reserved20 and final36 are unused.

All original-clock task and physical-quality checks are required before demonstration admission. SUMMARY.json retains every program outcome, STOP metrics, hashes and optimization counters. A failed promotion gate does not justify relabeling failures as successful navigation supervision.
