---
layout: page
title: Scene-Aware Humanoid Locomotion and Policy Inference
description: Moving Through Clutter plus an ongoing ROS 2/C++ inference prototype for humanoid policies
importance: 2
category: robotics
related_publications: true
---

## Moving Through Clutter

Real homes and workplaces are dense, three-dimensional, and geometrically
constrained, while many humanoid locomotion systems are demonstrated on open,
flat terrain. Moving Through Clutter (MTC) {% cite wang2026moving %} is a
virtual-reality framework for collecting and evaluating
embodiment-consistent, scene-aware humanoid motion in procedurally generated
clutter.

The framework captures whole-body human motion in VR, automatically retargets it
to a humanoid model, and measures stability, collision safety, and scene clutter.
The first dataset contains **348 trajectories across 145 diverse 3D scenes**. I
am third author, with Beichen Wang, Yuanjie Lu, Liuchuan Yu, and Xuesu Xiao.

## Humanoid policy-inference prototype

Alongside the research, I am prototyping a deployment path for humanoid motion
policies in C++ and ROS 2. The public
[motion-tracking controller repository](https://github.com/linjiw/motion_tracking_controller_bfm)
adds:

- paired ONNX residual and base-policy inference;
- metadata-driven observation assembly and normalization;
- temporal history buffering and policy diagnostics; and
- an Isaac Lab-to-MuJoCo parity workflow before longer simulation or hardware
  experiments.

This is an **ongoing prototype**, not a claim of validated physical deployment.
Its validation gates remain explicit in the repository documentation.

## Research direction

MTC's controllable scene-clutter levels provide a natural task axis for future
curriculum-learning research. Connecting automatic curricula to scene-aware
whole-body control is an active direction rather than a reported result of the
MTC preprint.

## Resources

- [MTC paper](https://arxiv.org/abs/2603.05993)
- [Humanoid policy-inference prototype](https://github.com/linjiw/motion_tracking_controller_bfm)
