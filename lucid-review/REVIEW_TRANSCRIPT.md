# LUCID professor-review transcript — revision 12

Review cut: **3:11** = 15-second edited push montage + the unchanged 2:56 presentation. The separate submission cut remains 2:56 and 18.54 MB.

## 0:00–0:15 | Selected push highlights

Hand pushes. Foot pushes. Downward pressure. These highlights show the same turning policy under added randomized delay. Next, the full continuous take.

Six selected excerpts, played at 1×: upper body, leg, downward, hand-plus-foot, combined perturbation, and later leg contact. A brief transition announces the full continuous take. This opening has edits; the following physical take does not.

## 0:15–0:25 | A turning policy under real disturbances.

This G one repeats a turning motion under manual pushes and zero-to-sixty-millisecond added delay.

## 0:25–0:42 | Which feedback should set training difficulty?

Randomization must balance exposure against learnability. Joint error mixes execution mismatch with torque-generating offsets. LUCID compares command and execution histories in a learned temporal space.

## 0:42–0:58 | Compare histories. Guide the next training block.

Issued commands pass through simulated delay and dynamics. Command and execution histories enter the same frozen encoder. Their normalized latent discrepancy guides the next training block.

## 0:58–1:12 | Learn the comparison before policy training.

First, a denoising temporal V A E learns to reconstruct clean motion from noisy windows. We freeze its encoder, keeping the comparison fixed as the policy learns.

## 1:12–1:31 | Adapt exposure across six training channels.

Bounded P I adjusts intensity using the learned gap and accumulated error. Two low-return blocks trigger a separate backoff. One intensity sets all six training ranges for the next block.

## 1:31–1:45 | Stress-test beyond the training delay range.

Training uses up to forty milliseconds of added delay. Frozen policies face sixty milliseconds on full held-out motions, fifty percent above the training maximum.

## 1:45–2:03 | Unseen delay. Higher completion.

Under unseen sixty-millisecond delay, completion rises from fifty-two point one percent with filtered-error P I to seventy-three point eight with LUCID. That is a twenty-one point seven percentage-point gain.

## 2:03–2:15 | The representation and feedback matter.

Denoising raises completion over ordinary reconstruction. Live feedback also improves on one donor’s replayed schedule.

## 2:15–2:39 | Inspect delay and push responses.

These selected demonstrations combine forty milliseconds of added delay with scheduled pushes. LUCID is on the left; filtered-error P I is on the right. They show behavior under perturbation. Aggregate completion comes from separate benchmark trials.

## 2:39–3:03 | Continuous deployment, separate benchmark.

The same hardware recording has continued throughout this presentation. Separately, the paper’s matched forty-millisecond test reports thirty-eight of sixty completions for LUCID, versus twenty-three for filtered-error P I. Only the policy and low-level controller run onboard.

## 3:03–3:11 | Train with feedback. Deploy the policy.

Learn robustness during training. Deploy only the policy and low-level controller.
