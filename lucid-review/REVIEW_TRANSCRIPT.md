# LUCID presentation — revision 13

A 2:59 submission film with a 15-second six-shot opening. The complete 2:53 physical take starts at film time zero, concurrently with the highlights, and plays continuously at 1×. This overlap makes the complete recording compatible with the 180-second limit. During the hardware chapter the same recording expands without restarting; afterward it returns to the right panel.

The story moves from deployment disturbances to the training dilemma, learned command–execution feedback, six-channel randomization, held-out stress testing, physical evidence, and the lightweight deployment path. The concise right panel contains the robot, playback timer, delay condition, and active contact labels. Production notes remain in provenance metadata.

## 0:00–0:15 · One policy. Repeated real-world disturbances.

**Narration:** Hand pushes. Foot pushes. Downward pressure. LUCID repeats a turning motion under added randomized delay. The full, uncut take runs alongside our story.

**Visual and story logic:** Six varied push moments play in the main panel for 15 seconds. The full 173-second physical recording starts simultaneously in the right panel and continues at normal speed without cuts. The selected montage and the continuous take are labeled distinctly.

## 0:15–0:28 · How much uncertainty should training face?

**Narration:** Too little randomization leaves policies unprepared. Too much makes learning harder. LUCID uses learned command–execution feedback to set training difficulty.

**Visual and story logic:** The deployment dilemma: randomization must balance exposure with learnability. Recorded G1 states show why instantaneous joint error mixes execution mismatch with torque-generating offsets. LUCID compares temporal histories in a learned space.

## 0:28–0:43 · Compare histories. Guide the next training block.

**Narration:** Issued commands pass through simulated delay and dynamics. Command and execution histories enter the same frozen encoder. Their normalized latent discrepancy guides the next training block.

**Visual and story logic:** The core idea comes first: issued-command history branches before delay, measured history follows execution, and both enter one frozen encoder. Their normalized discrepancy guides the next training block.

## 0:43–0:52 · Learn the comparison. Then freeze it.

**Narration:** A denoising V A E learns clean motion from noisy windows. Then we freeze its temporal encoder.

**Visual and story logic:** How the comparison is learned: denoise motion windows, then freeze the encoder before policy training. The same comparison function is used while the policy changes.

## 0:52–1:05 · One feedback loop. Six training channels.

**Narration:** Bounded P I sets randomization intensity from the latent gap. Low returns trigger a separate backoff. One intensity controls six channels for the next training block.

**Visual and story logic:** A concise feedback loop: the upper-quantile latent gap drives bounded PI, with independent return-based backoff. A shared intensity sets six channels for the next block: actuation delay, surface contact, mass and center of mass, joint offsets, pushes, and observation noise. Recorded G1 skeletons illustrate the channels; the diagram is explanatory.

## 1:05–1:18 · Stress-test beyond the training delay range.

**Narration:** Training uses up to forty milliseconds of added delay. Frozen policies face sixty milliseconds on full held-out motions, fifty percent above the training maximum.

**Visual and story logic:** Stress testing extends the maximum added delay from 40 ms in training to 60 ms in the held-out test, a 50% increase in this parameter. The test uses nominal dynamics. The separate context replay shows 1,024 environments with 0–40 ms delay; the paper trains with 4,096.

## 1:18–1:35 · Unseen delay. Higher completion.

**Narration:** Under unseen sixty-millisecond delay, completion rises from fifty-two point one percent with filtered-error P I to seventy-three point eight with LUCID. That is a twenty-one point seven percentage-point gain.

**Visual and story logic:** Completion under unseen +60 ms delay rises from 52.1% to 73.8%, a 21.7 percentage-point gain over filtered-error PI. Reported intervals and the hybrid’s highest tested means remain visible.

## 1:35–1:59 · Watch the response to delay and pushes.

**Narration:** These selected demonstrations combine forty milliseconds of added delay with scheduled pushes. LUCID is on the left; filtered-error P I is on the right. They show behavior under perturbation. Aggregate completion comes from separate benchmark trials.

**Visual and story logic:** Full six-second walking and turning demonstrations play at 1×, with +40 ms added delay and scheduled impulses. LUCID is left, reference center, filtered-error PI right. These selected recordings differ from the +60 ms aggregate benchmark; root drift remains visible.

## 1:59–2:10 · The representation and feedback matter.

**Narration:** Denoising raises completion over ordinary reconstruction. Live feedback also improves on one donor’s replayed schedule.

**Visual and story logic:** Denoising and live feedback are tested separately. The replay comparison uses one donor schedule and five recipient seeds; its scope remains explicit.

## 2:10–2:46 · From simulation stress tests to physical G1.

**Narration:** This is the same uncut recording, still at normal speed. LUCID repeats the turning reference through hand and foot perturbations, with zero-to-sixty-millisecond added randomized delay. Separately, the paper’s matched forty-millisecond test reports thirty-eight of sixty completions, versus twenty-three for filtered-error P I. The encoder and curriculum scheduler stay in training.

**Visual and story logic:** The same continuous physical take expands without restarting. Its randomized 0–60 ms delay and manual perturbations provide qualitative deployment evidence. A separate panel reports the manuscript’s matched fixed +40 ms benchmark: 38/60 versus 23/60 full-trial completions. These counts do not come from the displayed take.

## 2:46–2:59 · Train with feedback. Deploy the policy.

**Narration:** LUCID uses learned execution feedback to guide domain randomization. On the robot, only the policy and low-level controller remain.

**Visual and story logic:** The deployment path becomes the main takeaway: policy → low-level controller → G1. The encoder and curriculum scheduler remain training components. The choreographed robot lettering remains above the architecture. The continuous take finishes at 2:53, followed by a completion card.
