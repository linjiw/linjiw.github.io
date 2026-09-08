# From simulation diagnostic to real-world deployment

What exists after the September 2026 paper, what each real-world step needs, and
the measurement that would qualify it. Numbers come from the archived experiment
ledgers; the steps are ordered by dependency, not by ambition.

| Step | What exists now | What deployment needs | Qualifying measurement |
|---|---|---|---|
| 1. State estimation replaces simulator truth | The causal 48-frame history packet (root pose, joints, velocities, projected gravity, contact forces) is built from simulator state at 2.04 s | Onboard odometry or localization in the request frame, frame alignment, latency and noise characterization | Replay the archived packets with injected estimator noise and delay; success must survive the measured noise model |
| 2. Live generation deadline | Four candidate futures take 0.62–2.56 s per context (median 1.40 s) against a 2.08 s chunk; one candidate takes 0.21–0.88 s | Off-board ARDY at 25 Hz with measured arrival time; K reduced or generation started earlier in the chunk | End-to-end arrival latency per chunk, with late arrivals counted as failures |
| 3. Repeated feedback | One measured-history replacement per trial; later chunks use generated history | Replacement at every chunk boundary under real arrival times | Repeated-feedback trials on the development panel with the same evaluator |
| 4. Tracker adaptation with retention | An eight-fit navigation/retention recipe (F/N/R, matched interaction budget) is specified; three runtime prerequisites are unmet; a 512-motion retention pool is split 304/103/105 by source | G1-only training/export qualification, fixed practice allocation, 128-environment clock parity; then training and a new protected confirmation set | Executed success beside retained tracking at matched training cost |
| 5. Benchmark scale and seeds | 24 development plus 12 confirmation programs, two to three simulator seeds, one environment at about 32–47 s per capture | Multi-environment capture qualified against the one-environment replay contract; at least 60 programs and three seeds; disturbance and payload variants | Exact replay parity between one and N environments before any batched result is trusted |
| 6. Physical safety instrumentation | Fall proxy from root height and tilt; sliding from ankle-body speed under measured contact force | Joint torque and torque-limit accounting, ZMP or contact-wrench stability, sole-point slip | Torque and wrench logging in simulation first, then on hardware with a matched evaluator |
| 7. Hardware pipeline | SONIC ships with a deployment path for the G1; navigation additions (compiler, ARDY, selection) run off-board | A robot-side bridge that delivers 50 Hz references and returns the measured packet | Bench test with the robot suspended, then flat-ground programs from the confirmation families |

The order matters: steps 1 and 2 decide whether the closed loop can run at all on
a robot; step 4 is where measured adaptation would pay; step 6 is required before
any stability claim. None of these is part of the current paper's claims.
