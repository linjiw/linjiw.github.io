> **Revision 11 update:** A 173-second continuous physical LUCID take now appears throughout the film. Conditions are author-confirmed 0–60 ms added randomized delay with manual perturbations. This is separate from the controlled +40 ms paper benchmark. Face-only blur preserves the room and limbs. See [HARDWARE_STORY.md](HARDWARE_STORY.md); earlier pending-footage notes below describe the archived v10 cut.

# September 22 deployment-story revision

Moved the core architecture to 27 s, shortened pretraining to 14 s, tied method highlights to actual narration cues, and added six G1 channel cards. The opening separates simulated motion from a physical-result card. Hardware count panels and the closing emphasize the reported +25 pp physical effect. The evaluation ruler distinguishes the +60 ms test from the +40 ms demonstrations and 0–40 ms context replay. New channel effects are labeled schematic. Two physical footage slots remain pending.

# Current revision — robot-lettering finale

The final 168–176 s now integrate the supplied aerial LUCID robot-lettering scene. A centered crop removes the source’s duplicate titles/captions; two aligned cards retain the reported +21.7-point result and the deployment path. Source 0–5.5 s plays at 1×; the final frame holds for 2.5 s. A visible caption identifies the choreographed G1 visualization. Earlier entries below describe preceding revisions.

# Current revision — September 19 process-film integration

The opening (0–10 s) now uses population and robot-focus edits from the supplied process film. The method (47–80 s) reveals the signal path, shared encoder, conceptual latent geometry, illustrative controller arithmetic and next-block training ranges. The website adds a calculator using the manuscript rules. The same approved voice and 176-second structure remain in use.

Controller values and vector directions are explicitly labeled teaching illustrations. They do not claim to be measured training logs. Recorded skeletons and curves remain capture-derived; comparison identities remain LUCID / reference / filtered-error PI. See `DESIGN_INTEGRATION.md` and `media/process/import.json` for the new provenance and interpretation boundaries.

The remaining entries below are a **historical change log**. Statements about the absence of numerical illustrations and earlier opening assets describe preceding revisions, not the current film.

# Current revision — September 18 feedback

The current film uses the Ava neural narration, simpler feedback and result visuals, and two complete 6 s MuJoCo recordings (walking 123–129 s; turning 132–138 s). Original five excerpts remain in the website library. Both simulation and hardware place LUCID on the left. Physical footage is still pending. See README.md, project.json and professor-review/LUCID_Professor_Review.md for the current production plan.

The audit below records the preceding asset-ingestion stage; its five-excerpt movie timings are historical. Source identities, recorded motion provenance and selection limitations remain applicable.

# Visual authenticity audit — September 18, 2026

The current film and website share one deterministic renderer. Every moving skeleton now comes from recorded G1 joint states or the matching reference motion, passed through the source G1 MuJoCo model. No hand-drawn gait, sinusoidal joint history, animated pseudo-latent activation, or invented curriculum block remains in the active renderer.

| Chapter | Previous visual | Current visual and evidence |
|---|---|---|
| Opening, 0–10 s | Parallel evaluation replay | Retained original replay. Its 1,024 environments, frozen policy and 0.25× simulation time remain distinguished from the paper training protocol. |
| Motion gap, 10–27 s | Hand-built skeleton with exaggerated lag; sine histories | Walking, turning and side-step captures at 50 Hz. Actual G1 FK skeleton and link-mesh envelopes, synchronized reference overlays, left-knee radians and world root-position error. Paper PD decomposition explains why reference error is not the LUCID signal. |
| Pretraining, 27–47 s | Artificial clean/noisy sine curves, neural dots and latent bars | Matching walking reference, moving 25-sample window of six named leg joints, and the paper's denoising VAE objective and constants. The 29-DOF demo supplies the six visible joints; the paper encoder's 25×23 input is explicitly a separate protocol. No decoder reconstruction or latent value is invented. |
| Rollout, 47–63 s | Figure 1 vector architecture | Preserved scientifically meaningful signal topology. G1 dynamics node includes a recorded simulation pose. Issued commands branch before the FIFO; measured positions form the other history. Moving connector dots indicate information flow, not measured packet timing. |
| Scheduler, 63–80 s | Invented five-block numerical example and histogram | Exact symbolic posterior-mean normalization, cosine discrepancy, valid-window quantile, nominal calibration, bounded PI update and independent return backoff. Animated highlights reveal the reasoning without fabricating a training trace. |
| Evaluation, 80–92 s | Parallel replay and protocol | Retained with original source timing. Evaluation footage does not claim to show training updates. |
| Results, 92–108 s | Manuscript bars, intervals and response curves | Retained reported Table III/Figure 2b values. These were already evidence-based, not invented data. |
| Ablations, 108–120 s | Manuscript ablation/allocation plots | Retained Table V/Figure 2a values and reported uncertainty. |
| Simulation, 120–144 s | Five selected comparisons with unresolved A/B names | Same original excerpts; labels follow the supplied bundle and author confirmation: LUCID / reference / filtered-error PI. Stronger-push conditions and later falls stay visible. |
| Hardware, 144–168 s | Product-photo placeholders and Figure 3 | Placeholder backgrounds use the matching G1 reference; clearly marked as a simulation reference preview with physical footage pending. Reported physical G1 results remain tied to the paper. |
| Closing, 168–176 s | Manufacturer product photo | Actual model-derived reference skeleton and link envelopes, labeled reference replay. Policy-only deployment remains the takeaway. |

## Source and processing

`assets/motion/recorded-g1.json` contains three motions × three tracks × 300 samples: 2,700 poses in total. Each pose preserves root XYZ, a WXYZ quaternion, and all 29 joint angles. It also stores the 30 G1 body origins and actual head-mesh centroid, model parent topology, and projected visual-link envelopes.

The source is `/home/linjiw/lucid-sonic/artifacts/submission_four_motion_20260917/`, read through the user's accessible experiment host. Source motion PKL hashes, capture NPY hashes, model hash, player-module hash, experiment plan and MuJoCo version are embedded in the JSON. `assets/motion/model-mesh-hashes.json` separately records the visual mesh checksums. References use the original player's 30→50 Hz resampling and the capture script's frame k+1 convention. The original pose-capture code asserts trajectory parity with its prior recording; this edit reuses the saved arrays and does not rerun dynamics.

`tools/export-recorded-motion.py` performs read-only forward kinematics with `mj_forward`. It never steps physics, trains or evaluates a policy. Body points are rounded to 10⁻⁶ m. Link envelopes are convex projections of the model's visual meshes, simplified within 2.5 mm in projection and quantized to 0.1 mm. They are model silhouettes, not camera measurements or a photorealistic render.

For pose comparison, each skeleton's pelvis XY translation is removed independently; orientation and height are retained. The fixed camera is u = 0.60X − 0.80Y, v = Z + 0.10(0.80X + 0.60Y). The root-position error plot instead uses the **original world coordinates**, without this display alignment. Curves show all 300 samples with a shared time cursor. Frame selection holds the nearest preceding source sample; no synthetic motion interpolation or temporal lag is introduced. Pretraining/closing reference loops are labeled replay.

The pretraining heatmap displays six named leg joints over 25 contiguous reference samples (0.48 s between endpoints); it is not a claimed recovery of the paper's complete 23-joint preprocessing or training split. Color saturates at ±1.5 rad; purple is nonnegative and blue is negative.

## Confirmed comparison identity

The supplied bundle README explicitly assigns **left LUCID, center shared reference, right filtered-error PI**. Its method folders, annotation receipts and the author's direct clarification on September 18, 2026 agree. `policy-identity.json` is the shared label authority for the film, skeleton views, measured plots and downloadable CSV. The CSV names each policy while retaining the corresponding `source_track` key for traceability.

The preceding presentation incorrectly treated the upstream `fixed`/`off` experiment records as decisive method identity and replaced the bundle's labels. That was an editorial inference, not a verified checkpoint audit, and it is withdrawn. Original capture keys and the conflicting upstream metadata remain unchanged in the raw data so the source record is not rewritten. The corrected presentation mapping is explicit: `fixed` → LUCID, `off` → filtered-error PI, `reference` → synchronized reference. This correction changes attribution, narration and labels, not pose values, timing, graph values or trial outcomes.

The skeleton data are from the three MuJoCo captures. Isaac Lab crouch/side-step remain original pose-replay videos, with their original simulator labels; no MuJoCo dynamics or skeleton series is inferred for them.

## Evidence still unavailable in these captures

The selected pose arrays do not store the actually issued policy targets, delayed targets, matching paper encoder posterior means, or per-block LUCID gaps/returns/intensities. A nearby implementation encoder uses H=16 and J=29 rather than the manuscript's H=25 and J=23, so it was not substituted. Reference motion must not be relabeled as issued commands or passed off as a measured LUCID latent signal. The method therefore uses exact paper equations alongside authentic motion observations.

Physical G1 video slots are still pending. The simulator reference visible in a placeholder is explicitly labeled; it is not real-world trial footage. Paper performance estimates are reported results, not recomputed from these selected recordings.
