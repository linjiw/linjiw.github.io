# Original motor versus scene motor at matched clearance

Register before any new task execution. Six new original-SONIC-weight attempts,
paired with six existing scene-motor attempts; all are inspected development
conditions (source 00976, the same corridor and seeds 96162 / 96167).

## Question and intervention

The current scene motor with the fixed IK-lowered reference completes both clear
and original-beam tasks but fails both tasks when the beam is 20 mm lower. The
simple coupled reference has the same complete-task outcomes. Does the original
motor improve complete-task coverage when reference, task, observations and
simulation conditions are held fixed?

Only the policy checkpoint changes. The G1 encoder and decoder both differ, so
this is a motor-package comparison, not an isolated planning or decoder effect.
Use the original release checkpoint bytes in a separate local input directory
beside an exact copy of the CURRENT scene evaluation config. The unmodified
release config has a different mass randomization range; a direct checkpoint-path
substitution would confound weights with dynamics. This common-config test is
not a reproduction of the release's default evaluation package.

The current scene config retains the [0.8, 2.5] mass multiplier range, actual
reset/calibration events, joint/action order, gains/scaling, observation corruption
and ten-frame histories. Actor running normalization is off. Native evaluation
loads policy state, not optimizer or motion-library checkpoint state; training
schedule application remains disabled. Bind code/config/checkpoint hashes.

## Matched panel and execution gate

Six new first attempts: original motor × clear / original beam / beam −20 mm ×
seeds 96162 and 96167. All use the same fixed `lowered` candidate and existing
four-candidate bank; selection mode remains fixed. Bind all six old controls'
raw states, force traces, references, commands, configurations and prior audit.
Old controls are not new physical attempts.

Before the first task action of each new run, require exact equality between
loaded policy tensors and the requested checkpoint; verify 640D reference,
64D token, 930D proprioception/history and 29D action dimensions. Match the
actual entry, recorded masses/COM/materials/default joint poses/action offsets
and scales and all four native libraries to the paired old control. Require
identical first reference and proprioception/history. Additional actuator arrays
are recorded. Instrumentation must preserve the Torch RNG. A mismatch aborts
before task action and is an infrastructure/comparison failure, not a physical
task result. Do not silently relax matching to obtain a favorable result.

Keep the 1 s standing prefix, planner-owned 50 Hz reference clock, ten future
samples at 100 ms offsets, clean measured-relative orientation, original scene,
floor, destination and original 500-tick / 10 s deadline. No amplitude/phase
change, obstacle-margin change, online replacement, student update or hardware.

## Outcome and accounting

Retain the existing full duck/recover/stop scorer: whole-body passage, duck when
required, 15 ticks of upright recovery, then a fresh 50-tick stationary hold in
the 0.5 m 3D destination region, speed at most 0.1 m/s, no forbidden environmental
contact over 1 N at any 200 Hz substep and no pelvis-height fall. No imitation
termination or hidden reset. This profile does not qualify self-contact absence.

Report paired gains/regressions, every complete-task result, success-conditioned
completion time, failure category/body, raw first threshold-crossing contact time,
and acquisition cost. Distinguish first contact from the maximum force within
the terminal control tick; an old peak-force timestamp must not be relabeled as
first contact. Reconstruct both from preserved raw traces when comparing them.

Replay each new token/action with its own frozen codec. Source geometry, planned
support and tracking errors remain diagnostics; task success is the primary
outcome. No physical retry/tuning; at most one preserved infrastructure-repair
retry per affected case. Abort the sequential launch on infrastructure failure.
No run is omitted because its outcome is unfavorable.

## Decision

If original weights add lower-beam completion without losing the easier paired
tasks, retain them as a stronger fixed comparison and separately qualify their
execution envelope. If they regress, retain the scene motor. If both fail the
lower beam, the reference-timing/realization question remains; register a separate
bounded intervention before changing it. No checkpoint can inherit the public
capability ledger automatically. Six familiar conditions do not establish
equivalence, independent-source generalization, sensing robustness or hardware.
