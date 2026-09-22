# LUCID revised video transcript

Synthetic neural narration: Ava, at −5% rate. 176-second film; sentence timings are measured from the generated audio.

## 00:00:00–00:00:10 | A turning policy under real disturbances.

This G one repeats a turning motion under manual pushes and zero-to-sixty-millisecond added delay.

## 00:00:10–00:00:27 | Which feedback should set training difficulty?

Randomization must balance exposure against learnability. Joint error mixes execution mismatch with torque-generating offsets. LUCID compares command and execution histories in a learned temporal space.

## 00:00:27–00:00:43 | Compare histories. Guide the next training block.

Issued commands pass through simulated delay and dynamics. Command and execution histories enter the same frozen encoder. Their normalized latent discrepancy guides the next training block.

## 00:00:43–00:00:57 | Learn the comparison before policy training.

First, a denoising temporal V A E learns to reconstruct clean motion from noisy windows. We freeze its encoder, keeping the comparison fixed as the policy learns.

## 00:00:57–00:01:16 | Adapt exposure across six training channels.

Bounded P I adjusts intensity using the learned gap and accumulated error. Two low-return blocks trigger a separate backoff. One intensity sets all six training ranges for the next block.

## 00:01:16–00:01:30 | Stress-test beyond the training delay range.

Training uses up to forty milliseconds of added delay. Frozen policies face sixty milliseconds on full held-out motions, fifty percent above the training maximum.

## 00:01:30–00:01:48 | Unseen delay. Higher completion.

Under unseen sixty-millisecond delay, completion rises from fifty-two point one percent with filtered-error P I to seventy-three point eight with LUCID. That is a twenty-one point seven percentage-point gain.

## 00:01:48–00:02:00 | The representation and feedback matter.

Denoising raises completion over ordinary reconstruction. Live feedback also improves on one donor’s replayed schedule.

## 00:02:00–00:02:24 | Inspect delay and push responses.

These selected demonstrations combine forty milliseconds of added delay with scheduled pushes. LUCID is on the left; filtered-error P I is on the right. They show behavior under perturbation. Aggregate completion comes from separate benchmark trials.

## 00:02:24–00:02:48 | Continuous deployment, separate benchmark.

The same hardware recording has continued throughout this presentation. Separately, the paper’s matched forty-millisecond test reports thirty-eight of sixty completions for LUCID, versus twenty-three for filtered-error P I. Only the policy and low-level controller run onboard.

## 00:02:48–00:02:56 | Train with feedback. Deploy the policy.

Learn robustness during training. Deploy only the policy and low-level controller.
