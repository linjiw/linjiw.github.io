> **Revision 11 update:** A 173-second continuous physical LUCID take now appears throughout the film. Conditions are author-confirmed 0–60 ms added randomized delay with manual perturbations. This is separate from the controlled +40 ms paper benchmark. Face-only blur preserves the room and limbs. See [HARDWARE_STORY.md](HARDWARE_STORY.md); earlier pending-footage notes below describe the archived v10 cut.

# Manuscript grounding

Primary source: `output/pdf/LUCID_ICRA_finalpass.pdf`, latest manuscript export in the workspace on September 17, 2026. Read the PDF text and corresponding `ICRA_2027_LUCID_finalpass/sections/*.tex` and tables; visually checked Fig. 1. The video illustrates the paper's reported results, not an independent reproduction of the underlying experiments.

| Video scene | Paper evidence | Fidelity constraints |
|---|---|---|
| Challenge | Method: commanded and executed motion | Issued targets, applied targets and measured positions are distinct. PD needs an offset to create torque. Do not label raw error as pure latency. |
| Pretraining | Method: latent motion understanding | 25 samples × 23 joints, 50 Hz, 0.48 s endpoint span; 3-layer TCN, 32-dimensional posterior mean; 120,000 reference windows; denoising VAE; frozen after pretraining. |
| Feedback | Method: scheduling; Fig. 1 | Same frozen encoder for issued-command and measured-position histories. L2-normalize posterior means; discrepancy = 1 − dot product. 90th percentile over valid within-episode windows. |
| PI/backoff | Method: algorithm | Positive proportional error below nominal reference, with integral memory; bounded update. After warm-up, two consecutive low-return blocks set next intensity to 0.70 × current intensity and reset integral. Do not imply a runtime robot safety controller. |
| Training | Experimental setup | 4,096 environments; two 24-step rollouts/block; 150 blocks = 29,491,200 transitions. 120 training, 30 calibration, 30 held-out clips. Five seeds, 1,000 shared scenarios/seed. |
| Evaluation | Setup | Training delay 0–40 ms in 5 ms FIFO ticks. OOD test: fixed 60 ms added delay, nominal dynamics. Full-range evaluation differs from this condition. Training episode cap 2 s; evaluation full clips 2.5–6.0 s. |
| Full-range result | Table III | Filtered-error PI 76.8 ± 2.0%; scalar LUCID 88.9 ± 1.1%; gain 12.1 percentage points. |
| OOD delay result | Table III | Filtered-error PI 52.1 ± 2.8%; scalar LUCID 73.8 ± 2.1%; gain 21.7 percentage points. Means with reported 95% bootstrap half-widths. |
| Scope of superiority | Table III | Hybrid LUCID + DORAEMON has 89.5% full-range and 74.6% OOD-delay completion, higher tested means than scalar LUCID. Do not call scalar LUCID universally best. |
| Components | Table V | 60 ms: no backoff 50.4 ± 4.6%; ordinary reconstruction 64.8 ± 4.3%; full LUCID 73.8 ± 2.1%. Ordered replay 58.2%; live difference 15.6 pp. Replay has one donor and five recipients. |
| MuJoCo | Table VII | +40 ms added delay: filtered-error PI 28/60; LUCID 44/60. Full trials on four motions, three checkpoints, five repetitions. |
| Physical G1 | Deployment; Table VII; Fig. 3 | +40 ms added delay: filtered-error PI 23/60; LUCID 38/60. Paired difference +25.0 pp, 95% CI [11.8, 38.2]. |
| Deployment | Deployment | No encoder/scheduler onboard. 18.4 ms nominal sensor-to-dispatch latency; +40 ms FIFO gives 58.4 ms, excluding mechanical response. Do not call this “40 ms total latency.” |

The moving G1 skeletons, visual-link envelopes, joint curves and reference windows now use saved simulation states and the exact source model. Their labels follow the supplied bundle and author confirmation: LUCID and filtered-error PI, beside the synchronized reference; see `policy-identity.json` and `VISUAL_AUDIT.md`. Architecture and connector animations remain explanatory diagrams. The denoising objective and scheduler use manuscript equations and constants without invented latent values or block inputs. Performance charts remain reported manuscript values, separate from selected demonstrations.

The manuscript's readiness notes retain gaps in original training start-phase/tuning records and independent raw-data reproduction. The template does not invent those details, and does not claim that the source experiments have been independently audited.

## September 18 presentation revision

The learned discrepancy is presented as an evaluated comparison signal, not a physical-cause separator. Denoising is not claimed to remove all torque offsets. The main result is +21.7 pp at unseen +60 ms delay; the hybrid acknowledgment remains. The replay chart uses its reported asymmetric interval [44.6, 66.0]. Complete walking and turning captures show substantial root drift; staying upright is not described as full-clip success. Physical comparison slots now match the simulation order, LUCID left. Deployment is stated precisely as no encoder or curriculum scheduler onboard, rather than zero total computation.


## September 19 process-film method illustrations

The 47–80 s visual examples implement the final-pass manuscript's normalized discrepancy, block p90, bounded PI and independent return backoff (sections/method.tex), with representative training ranges from tables/setup.tex. `curriculum.mjs` is shared by the film and interactive calculator. Its numerical inputs are explicitly illustrative, not logged measurements. The new opening is imported recorded evaluation replay; its representative reference ghost is not an issued command and no new comparison-policy identity is assigned. See DESIGN_INTEGRATION.md and media/process/import.json.

## September 22 deployment narrative

The opening previews the physical result from Table VII alongside separately labeled simulation replay. A 40-to-60 ms ruler uses the exact training and held-out added-delay settings: 60/40 − 1 = 50%. This does not establish a safety margin, maximum hardware tolerance, domain invariance or causal phase isolation. Hardware counts are 38/60 versus 23/60: +25 percentage points, paired 95% interval [11.8,38.2]; the relative increase is 65.2%, but the film emphasizes counts and the paired difference. The onboard claim remains only that no encoder or scheduler runs onboard. No unobserved physical failure mode, zero-shot protocol, absence of history buffers or zero-drop recovery is claimed.
