# LUCID revised video transcript

Synthetic neural narration: Ava, at −5% rate. 179-second film; sentence timings are measured from the generated audio.

## 00:00:00–00:00:15 | One policy. Repeated real-world disturbances.

Hand pushes. Foot pushes. Downward pressure. LUCID repeats a turning motion under added randomized delay. The full, uncut take runs alongside our story.

## 00:00:15–00:00:28 | How much uncertainty should training face?

Too little randomization leaves policies unprepared. Too much makes learning harder. LUCID uses learned command–execution feedback to set training difficulty.

## 00:00:28–00:00:43 | Compare histories. Guide the next training block.

Issued commands pass through simulated delay and dynamics. Command and execution histories enter the same frozen encoder. Their normalized latent discrepancy guides the next training block.

## 00:00:43–00:00:52 | Learn the comparison. Then freeze it.

A denoising V A E learns clean motion from noisy windows. Then we freeze its temporal encoder.

## 00:00:52–00:01:05 | One feedback loop. Six training channels.

Bounded P I sets randomization intensity from the latent gap. Low returns trigger a separate backoff. One intensity controls six channels for the next training block.

## 00:01:05–00:01:18 | Stress-test beyond the training delay range.

Training uses up to forty milliseconds of added delay. Frozen policies face sixty milliseconds on full held-out motions, fifty percent above the training maximum.

## 00:01:18–00:01:35 | Unseen delay. Higher completion.

Under unseen sixty-millisecond delay, completion rises from fifty-two point one percent with filtered-error P I to seventy-three point eight with LUCID. That is a twenty-one point seven percentage-point gain.

## 00:01:35–00:01:59 | Watch the response to delay and pushes.

These selected demonstrations combine forty milliseconds of added delay with scheduled pushes. LUCID is on the left; filtered-error P I is on the right. They show behavior under perturbation. Aggregate completion comes from separate benchmark trials.

## 00:01:59–00:02:10 | The representation and feedback matter.

Denoising raises completion over ordinary reconstruction. Live feedback also improves on one donor’s replayed schedule.

## 00:02:10–00:02:46 | From simulation stress tests to physical G1.

This is the same uncut recording, still at normal speed. LUCID repeats the turning reference through hand and foot perturbations, with zero-to-sixty-millisecond added randomized delay. Separately, the paper’s matched forty-millisecond test reports thirty-eight of sixty completions, versus twenty-three for filtered-error P I. The encoder and curriculum scheduler stay in training.

## 00:02:46–00:02:59 | Train with feedback. Deploy the policy.

LUCID uses learned execution feedback to guide domain randomization. On the robot, only the policy and low-level controller remain.
