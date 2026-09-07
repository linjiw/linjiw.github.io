# KimoNav: native planner through the common G1 interface

Ongoing research, 7 September 2026. Physics simulation; no hardware claim.

Exactly 24 registered planner references and 24 physical-simulation captures were
completed with no retry or tuning. ARDY fixed succeeds on 6/24;
native planner pose replay succeeds on 0/24. Mean measured sliding
is 0.122511 and 0.123101, respectively.
All captures were rescored from their recorded first episodes, with source hashes
and simulator seed checked. Full metrics and availability are in
[planner-evidence.json](planner-evidence.json).

The command-only baseline uses requested velocity tangent, facing and speed at
10 Hz, a 0.04 s activation lead and an eight-frame pose blend. Zero speed uses idle.
Native 30 Hz output is resampled to 50 Hz using the pinned C++ interpolation rule;
six independent C++ comparisons and 1,944 request-command checks pass. The common
motion library derives velocities from poses. Native deployment separately blends
velocity channels; the deliberately shifted-overlap audit finds differences up to
3.17 rad/s. We do not claim parity with the complete native C++ system, its trigger
logic, feedback or live arrival timing.

ARDY receives explicit root constraints while this planner receives instantaneous
commands; there is no target-position correction or waypoint override. The same
reset procedure and seed do not guarantee the same initial state because resets
use each reference. Thus the result concerns these two implemented pipelines,
not intrinsic planner superiority, tracker quality in isolation or independent
confirmation. We do not alter this baseline after seeing its results.

0/24 planner references pass the kinematic request checks.
Execution includes 0 early endings and 0 operational
falls. The failed-check breakdown, success gains/losses, projection and collection
cost remain visible in the data. Partial episodes are failures; descriptive metric
availability is explicit. No gradients or new retention claims were introduced.

The preceding braking and two-seed confirmation outcomes remain unchanged.
Tracker adaptation remains deferred pending training/export, fixed-sampling and
runtime qualification. Full native deployment validation is also separate future
work. The manuscript's present contribution is failure diagnosis under timed
navigation, rather than demonstrated reliable control.

Source result SHA-256: 2982db5d61e072f60fe536af922a1810bfa514c958f0e62bd741d93825ab8b2d

Native interface documentation:
https://nvlabs.github.io/GR00T-WholeBodyControl/references/planner_onnx.html
