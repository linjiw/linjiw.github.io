# LUCID — filming script

90 seconds · 1920×1080 · 30 fps. Captions are embedded; narration text is also supplied as SRT.

| Time | Scene | Camera / visual action | Message |
|---|---|---|---|
| 00–08 s | A world of possibilities. | High oblique orbit above 1,024 full-mesh humanoids; delay bars and push arrows. | 1,024 simulated humanoids. Diverse motions. Different perturbations. |
| 08–18 s | When execution falls behind. | Continuous dolly from the population to one failing robot; reference ghost remains visible. | Move from the population to one struggling robot. |
| 18–28 s | Listen to the motion. | Match cut to blue issued-command and amber measured-position histories; show FIFO and PD path. | Issued commands and measured positions form separate causal histories. |
| 28–38 s | A shared language for movement. | Offline denoising strip feeds a frozen shared encoder; two vectors expose cosine discrepancy. | One frozen temporal encoder compares both histories in latent space. |
| 38–51 s | The teacher paces the challenge. | Population histogram and p90 flow into proportional/integral teacher; animate the bounded next intensity. | A bounded PI controller chooses the next shared DR intensity. |
| 51–62 s | New ranges. A new training block. | Cut back to the simulation field; one scalar moves six illustrative parameter groups together. | Hold intensity fixed within the block; preserve each sampling clock. |
| 62–70 s | Protect learning when returns fall. | Two low-return blocks light in sequence; show multiplicative backoff and integral reset. | Two consecutive low-return blocks trigger a separate backoff. |
| 70–78 s | Practice. Observe. Adapt. | Return to a wide training illustration, with student → observer → teacher loop; dissolve to deployment path. | Repeat the feedback loop as the student learns. |
| 78–84 s | From adaptive practice to robustness. | Three clean paper-colored typographic result cards; sources remain visible. | Selected results reported in the supplied manuscript. |
| 84–90 s | LUCID | Camera lifts above 1,024 full-mesh humanoids arranged as LUCID; title and closing line. | Latent-Understanding Curriculum for Informed Domain Randomization |

## Narration / captions

- 0.7–4.0 s: Robust movement begins with the right challenge.
- 4.0–8.0 s: Many motions. Many randomized worlds. One learning student.
- 8.2–12.7 s: A disturbance exposes a mismatch between command and execution.
- 12.7–18.0 s: Zoom in: a visible failure is a reason to inspect the signal.
- 18.3–23.0 s: Collect issued joint targets and measured joint positions separately.
- 23.0–28.0 s: Use 25 samples at 50 Hz. Keep windows inside one episode.
- 28.2–32.7 s: A temporal encoder learns motion structure through offline denoising.
- 32.7–38.0 s: Freeze its weights. Compare command and execution in the same latent space.
- 38.2–43.5 s: Aggregate valid-window discrepancies with a block-level 90th percentile.
- 43.5–47.5 s: The proportional term reacts; the integral term remembers.
- 47.5–51.0 s: A bounded update sets the next training block’s shared intensity.
- 51.2–56.7 s: The same intensity scales delay, dynamics, pushes, and observation noise.
- 56.7–62.0 s: Channels keep their own sampling clocks. Delay changes in 5 ms ticks.
- 62.2–66.4 s: After warm-up, two low-return blocks activate independent protection.
- 66.4–70.0 s: Reduce intensity by 30 percent and reset the integral state.
- 70.2–74.0 s: Train the student. Observe execution. Adjust the next challenge.
- 74.0–78.0 s: At deployment, keep the trained policy and low-level controller.
- 78.2–84.0 s: The manuscript reports gains in full-range and unseen-delay completion.
- 84.3–89.7 s: LUCID. Pace the challenge. Let capability grow.

## Method fidelity

- The learned student is the motion policy. The “teacher” is a bounded PI curriculum controller, not an LLM or another learned agent.
- The encoder compares **issued command** and **measured execution** windows, not the reference ghost. The reference ghost explains the task only.
- The frozen encoder is pretrained offline by denoising reference windows. Its decoder is not used for curriculum feedback.
- History: H=25, stride 1, 50 Hz, 0.48 s endpoint span, no reset crossing. Latent dimension 32; normalized cosine discrepancy.
- Scheduler uses p90 over valid windows, r=0.145, kP=0.8, kI=0.15, alpha=0.04, integral clamp ±0.8, intensity clamp [0,1].
- The illustrated numerical example starts at lambda=0.520, gap=0.232, I(previous)=-0.35; Eq. 10 gives exactly lambda(next)=0.496.
- The later positive-feedback example uses gap=0.060, I(previous)=0 and lambda=0.3472, giving lambda(next)=0.3695 (displayed to three decimals as 0.369). It illustrates increasing the challenge when discrepancy is below target.
- After warm-up, two consecutive returns below 0.65 of nominal trigger lambda(next)=0.70 lambda and I=0. This overrides the PI proposal.
- Sampling clocks are preserved; the delay ceiling is floor(8 lambda) × 5 ms. The manuscript uses two 24-step PPO rollouts per block across 4,096 environments. The cinematic field displays 1,024 robots for visual continuity with the previous movie.
- Deployment keeps only policy and low-level control.

## Provenance and illustration boundaries

The source is the user-supplied ICRA27_LUCID_ICRA_finalpass.pdf, especially Fig. 1, Eqs. 4–11, Table I, Table III and Table VII. Purple #7654a1, blue #347caa and orange #c67832 were sampled from Fig. 2, then lightened for contrast in the dark film.

Push magnitude is labeled as a velocity change (Δv in m/s), matching the captured disturbance; it is not a force in newtons. Actuator delay is the maximum across the selected robot’s five actuator groups.

Robot poses, native failure colors, delay bars and push arrows in the opening/close-up are replayed from the earlier 1,024-environment IsaacLab capture (2026-09-17). That source was a frozen-policy evaluation, not a LUCID training run. MuJoCo supplies the rendering geometry. It is illustrative B-roll for this manuscript, not its reported experiment.

The close-up reference is a representative aligned source motion. The animated command/execution histories, latent vectors, histogram and controller inputs are diagrammatic examples; they are not inferred measurements from the displayed robots. The later training montage is staged, and letter formation changes display positions only. No new learning or research evaluation is performed.

The paper describes a 23-active-joint setup; the reused visual G1 asset and source recording have 29 articulated joints. This is a presentation asset, not a reproduction of the paper’s implementation. Result cards quote the supplied manuscript; this production did not independently verify those experiments. Earlier fixed-DR/no-DR names are not burned into the film.

This script can be used as a storyboard, narration brief and editing specification. Each sequence is exported as a separate editable clip after the master render.
