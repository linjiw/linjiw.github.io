# Expanded motion comparisons

Five selected comparisons, 16.34 seconds total. The included clips use motion-only
titles; reproduction scripts label their panels LUCID, REFERENCE MOTION, or
filtered-error PI.

Folders: LUCID/, reference_motions/, filtered-error PI/, each subdivided by simulator.
comparisons/ contains individual three-panel videos and motion_highlights_expanded.mp4.

| Simulator | Motion | filtered-error PI fall confirmation | Clip ends | LUCID later fall |
|---|---|---:|---:|---:|
| mujoco | 01_walking | 2.94 s | 3.24 s | None within original 6 s |
| mujoco | 02_turning | 4.56 s | 4.86 s | None within original 6 s |
| mujoco | 04_side_stepping | 3.00 s | 3.30 s | 4.18 s |
| isaaclab | 03_squatting | 1.22 s | 1.44 s | 1.7 s |
| isaaclab | 04_side_stepping | 3.20 s | 3.50 s | 4.74 s |

The IsaacLab crouch-hold excerpt ends BEFORE the first scheduled push. It shows a
transient balance advantage under 40 ms added latency; it is not push recovery.
MuJoCo squatting is excluded: LUCID reaches the height-failure condition first.
IsaacLab turning is excluded: filtered-error PI stays above the height-failure threshold while
LUCID falls. IsaacLab walking has too little clearly upright post-failure time.

These are post-hoc excerpts selected for balance, not an overall superiority claim.
Some LUCID runs fall later in the full original recordings. Full six-second
source videos remain intact in ../videos. Selection/timings for all eight pairs
are recorded in selection_audit.json, including excluded comparisons.

Fall confirmation: pelvis below 60% of reference height for 5 consecutive frames
(0.10 s at 50 fps). Excerpts normally end 0.30 s after filtered-error PI confirms a fall.
At least 0.20 s of visible post-failure advantage is required. Cutoff is advanced
if LUCID pelvis drops below that threshold or body up-axis cosine drops below
0.70 (about 45.6 degrees tilt). The first failing LUCID frame is excluded.

Panel and folder identities are: left LUCID, middle shared reference, right
filtered-error PI. The reference is synchronized kinematic playback. Failure
red, reference cyan, impulse arrows, current push event and added 40 ms latency
remain visible. Arrows flash briefly to show instantaneous velocity impulses:
+1.50 m/s world X at 2 s, -1.50 m/s world Y at 4 s, 3x the baseline planar envelope.

IsaacLab uses recorded PhysX poses rendered with MuJoCo, not MuJoCo dynamics.
IsaacLab tracking annotations use recorded mean body-position error (MPJPE);
MuJoCo uses the original root-position error. They are distinct metrics.
Amber indicates the displayed tracking error exceeds 0.50 m, not a fall.

IsaacLab data and the earlier MuJoCo walking/turning poses were reused directly.
Two additional MuJoCo side-step pose captures exactly reproduce the stored original
telemetry/outcomes and were logged/verified online in 16726/lucid-sonic:
https://wandb.ai/16726/lucid-sonic/runs/highlight-20260917-fixed-04_side_stepping
https://wandb.ai/16726/lucid-sonic/runs/highlight-20260917-off-04_side_stepping
No new training or seed search. Numeric cutoff tests, duration checks, full decode
and sampled endpoint visual review are recorded alongside the files.
