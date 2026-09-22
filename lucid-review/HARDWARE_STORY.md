# Continuous physical G1 deployment — revision 11

The new footage is a qualitative LUCID deployment demonstration. The author confirmed that the turning reference is looped, with randomized **0–60 ms added command delay** and manual perturbations. The footage does not supply a measured push force, a time series of latency, or a matched filtered-error PI hardware run.

## Source and edit

- Source: `IMG_7323.MOV`, 275.46 seconds, provided by the author.
- Author-selected deployment interval: approximately **00:57–03:50**.
- Selected excerpt: **173 seconds at 1×**, in chronological order, without internal cuts, source loops, slow motion, speed changes, or a freeze presented as live motion.
- The reference motion loops in the deployed controller. The video file does **not** loop.
- Processing: apply recorded orientation; convert phone HDR to SDR; blur only the operator's face/head; retain the room, limbs, feet, cables and robot; remove original audio and identifying metadata; encode progressive H.264/yuv420p at 24 fps.
- Face tracking uses local Apple Vision detections plus reviewed points where the face is occluded or off screen. Local SAM 2.1 robot masks provide image bounding boxes **only for positioning annotation arrows**. No generated robot pixels or pose replacement are used.
- Numbered purple hand-contact and orange foot-contact annotations follow the visible contact sequences. Directions are approximate camera-view projections, not calibrated 3D forces or measured magnitudes. Sustained contact intervals are grouped; the number of labels is not an experimental impulse count. `media/hardware/push-events.json` contains the editable timing, contact type, and direction.
- To edit: change the event JSON, copy its `events` array to `hardware_take.events` in `project.json`, then run `tools/annotate-hardware.py` with Python, OpenCV and NumPy. Use `--source /path/to/IMG_7323.MOV` if the original has moved. Supplied face and image-box tracks make annotation changes reproducible without rerunning segmentation. Then run the usual voice/render pipeline.
- The source is retained unchanged at its original local path. Unblurred frames and processing intermediates are excluded from the editable delivery kit.

## Presentation timing

The source clock is **presentation time + 57 seconds**, through presentation 2:53. This same clock drives both browser playback and the encoded movie.

| Film time | Physical source | Presentation |
|---|---|---|
| 0:00–0:09 | 0:57–1:06 | Large physical G1 view; name, turning motion, added delay, and manual perturbation labels. |
| 0:09–0:10 | 1:06–1:07 | The continuously advancing image shrinks into the right-hand inset. |
| 0:10–2:24 | 1:07–3:21 | The same recording continues while the left area explains feedback, encoder pretraining, curriculum, evaluation, results, ablations, and simulation comparisons. |
| 2:24–2:48 | 3:21–3:45 | The same source expands for the hardware chapter. A separate panel reports the paper’s controlled +40 ms comparison. |
| 2:48–2:53 | 3:45–3:50 | The take continues in the corner beside the robot-lettering conclusion. |
| 2:53–2:56 | Excerpt ended | The inset becomes an explicit “173 s shown continuously” completion card. No repeated or frozen footage is presented as continuing deployment. |

## Revised narration

Opening: “This G one repeats a turning motion under manual pushes and zero-to-sixty-millisecond added delay.”

Hardware: “The same hardware recording has continued throughout this presentation. Separately, the paper’s matched forty-millisecond test reports thirty-eight of sixty completions for LUCID, versus twenty-three for filtered-error P I. Only the policy and low-level controller run onboard.”

All other method and result narration is preserved. `TRANSCRIPT.md` and `captions.srt` contain the complete current script and measured timings. The older professor DOCX files describe revision 10 and are retained as historical review materials; this plan and the current transcript supersede their opening and hardware layouts.

## Evidence boundaries

The **0–60 ms qualitative take** is visually distinct from the paper’s **fixed +40 ms aggregate benchmark** (38/60 LUCID, 23/60 filtered-error PI, +25 pp, paired 95% CI [11.8, 38.2] pp). This one take is not a trial success-rate estimate. Sustained upright motion does not establish reference-tracking accuracy, and no synthetic tracking-error trace is drawn over it.

The existing MuJoCo failures remain identified as **filtered-error PI simulation outcomes**, with their original conditions and timing. No physical fall or counterfactual hardware failure is fabricated. The web library additionally offers the complete annotated 173-second take for uninterrupted large-format inspection.
