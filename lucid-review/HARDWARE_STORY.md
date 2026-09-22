# LUCID presentation — revision 13

A 2:59 submission film with a 15-second six-shot opening. The complete 2:53 physical take starts at film time zero, concurrently with the highlights, and plays continuously at 1×. This overlap makes the complete recording compatible with the 180-second limit. During the hardware chapter the same recording expands without restarting; afterward it returns to the right panel.

The story moves from deployment disturbances to the training dilemma, learned command–execution feedback, six-channel randomization, held-out stress testing, physical evidence, and the lightweight deployment path. The concise right panel contains the robot, playback timer, delay condition, and active contact labels. Production notes remain in provenance metadata.

## Evidence conditions

- Physical continuous take: LUCID, looped turning, randomized 0–60 ms added command delay. Original source 00:57–03:50; 173 seconds without internal cuts, repeats, or speed changes. Face-only blur remains. Manual forces are not measured; arrows indicate approximate camera-view directions.
- Opening: six selected 2.25-second excerpts plus a 1.5-second transition. Edited highlights are labeled; they are not presented as a continuous sequence. The separate, complete take is already running alongside them.
- Physical manuscript benchmark: fixed +40 ms added FIFO delay, four motions, 60 trials per method. LUCID 38/60 versus filtered-error PI 23/60; +25.0 percentage points, paired 95% CI [11.8, 38.2] pp. These counts are independent of the displayed continuous recording.
- Simulation aggregate: nominal dynamics under unseen +60 ms added delay after training up to +40 ms. Completion 73.8% versus 52.1%, a 21.7 percentage-point gain.
- Selected simulation footage: +40 ms, scheduled velocity impulses. LUCID left, reference center, filtered-error PI right. It is not fixed-DR versus no-DR, and it does not depict the +60 ms aggregate condition.
- Parallel evaluation: frozen-policy replay, 1,024 environments, no training update shown. Policy training uses 4,096 environments.
- Onboard: policy and low-level controller. The temporal encoder and curriculum scheduler are training components. No unsupported claim about eliminating all observation-history buffers.

## Accepted feedback

Deployment comes first; method arithmetic is shortened to the meaningful information flow and six channels. Evidence conditions remain separate. The finale emphasizes the onboard path, with the robot-lettering scene retained. No baseline hardware failure scene or unobserved trial has been invented.
