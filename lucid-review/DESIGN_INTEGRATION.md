# Integrating the supplied LUCID process-film design

Current revision: September 22, 2026. The presentation remains 176 seconds, with rewritten narration in the approved Ava voice and existing manuscript results. The preceding cut is preserved in `../archive/pre-design-20260919/`.

The new package’s strongest narrative device is a change of scale: a field of robots becomes one execution, then two histories, then a feedback signal that changes the next training world. We adopted this cause-and-effect sequence and its dark blue, purple and amber method panels while preserving the existing paper palette, measured G1 plots and comparison footage.

| Idea from the package | Integrated location | What the viewer learns |
|---|---|---|
| Population → single robot camera move | 0–4 s population, 4–10 s robot focus | Many environments produce individual execution experiences. |
| Reveal information in stages | 27–31.98 s execution; 31.98–36.73 s shared encoder | Issued commands branch before the delay queue; measured positions follow sensing. |
| Geometric latent comparison | 36.73–41 s | The normalized means are compared by cosine discrepancy. The 2-D circle is a conceptual view of 32-D features. |
| Close the feedback loop | 41–43 s | A block statistic and two controller branches set the next intensity. |
| Concrete bounded PI example | 57–63.25 s | Current discrepancy and accumulated error both affect pacing. |
| Independent return backoff | 63.25–66.80 s | Two low-return blocks after warm-up trigger a multiplicative reduction and integral reset. |
| One intensity → multiple ranges | 66.80–76 s | The next block changes delay, friction, mass/CoM, offsets, pushes and noise together. |
| Aerial LUCID letter formation | 168–176 s | End on the robot identity, physical +25 pp gain and policy/controller deployment path. |
| Explore rather than overload the film | Website control-loop section | Sliders and presets expose PI saturation, integral clamping, no-window hold and return-backoff priority. |

The original 90-second study is available in an expandable website player with chapter navigation. It remains separate from the narrated submission-length film. Its music is retained only in that optional player; the main movie keeps the approved voice track.

## Evidence boundaries

The opening replays previously recorded frozen-policy evaluation poses with G1 geometry. It is not footage of PPO updates. The selected robot has no new LUCID or PI attribution. The close-up ghost is a representative aligned reference, not an issued command. Green means no failure detected yet, not a completed trial.

The command-history tiles, normalized-vector directions, histogram, controller inputs and low-return ratios are teaching illustrations. The arithmetic follows the manuscript; these inputs are not represented as measured training logs. The website and film share `curriculum.mjs` so the equations and examples remain consistent. The exact command traces and paper encoder outputs are not present in the source captures.

The main controller example starts at λ = 0.520, y = 0.232 and I_previous = −0.35. With r = 0.145, e = −0.600, the integral clamps to −0.800, u = −0.600, and λ_next = 0.496. A subsequent illustrative backoff uses current λ = 0.496, not an additional PI proposal, producing 0.3472. At that intensity, the maximum discrete delay is floor(8λ) × 5 ms = 10 ms. Other displayed ranges interpolate from the paper’s nominal and full-range values.

Recorded G1 skeletons, joint curves, source comparison recordings, reported uncertainty intervals and all benchmark estimates are retained. LUCID remains left, the reference center, and filtered-error PI right in the simulation comparisons. The 29-joint visualization model remains distinct from the paper’s 23-joint encoder input.

Following the author’s request, the source’s decorative robot lettering now closes the main paper video at 168–176 s. A caption identifies it as a choreographed visualization. Source 0–5.5 s plays at 1×, followed by a 2.5 s final-frame hold. It does not claim learned formation control. Two physical G1 footage slots remain pending.

## Editable pipeline

- `project.json`: scene timing, narration and process-media placements.
- `process-viz.mjs`: deterministic SVG method animations, shared by browser and MP4.
- `curriculum.mjs`: published PI/backoff arithmetic and representative range calculations.
- `process-lab.mjs`: interactive website controller.
- `media/process/import.json`: original and derivative hashes, source trims, crop and scope.
- `media-timeline.mjs`: common website/export placements.
- `render.mjs`: cached scene rendering, media compositing, neural-audio mux and two-pass size-limited export.
- `LUCID_process_preview.mp4`: the revised 27–76 s sequence with matching narration.
- `professor-review/LUCID_Professor_Review.md`: full timed script and animation plan.

The source package’s rendering scripts were read for design and provenance. They were not executed; the exported footage and editable local renderer provide the integration.
