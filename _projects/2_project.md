---
layout: page
title: Decremental Dynamics Planning
description: Robot navigation that plans with full dynamics only where it matters — 2nd place in both phases of the 2025 BARN Challenge
img: assets/img/publication_preview/DDP_sq.jpg
importance: 3
category: robotics
related_publications: true
---

## Overview

Most navigation planners either pay the full computational cost of planning with
complete robot dynamics everywhere, or ignore dynamics and suffer in difficult
terrain. Decremental Dynamics Planning (DDP) {% cite lu2025decremental %} starts
planning with full dynamics near the robot — where fidelity matters most — and
progressively simplifies the dynamics model along the horizon, spending compute
where it buys the most safety and performance.

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mb-3">
        {% include figure.liquid loading="eager" path="assets/img/projects/ddp_comparison.jpg" title="DDP vs decomposed planning" alt="Comparison of conventional decomposed planning and Decremental Dynamics Planning" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Top: a conventional global + local planner. Bottom: DDP plans one trajectory with dynamics fidelity that decreases along the horizon.
</div>

<!-- TODO: replace with BARN Challenge run video / navigation GIF -->

## My contribution

This is a collaboration led by my labmate Yuanjie Lu (with Tong Xu, Nick Hawes of
Oxford, and our advisor Xuesu Xiao); I am third author.

## Published results

- Augmenting three different existing planners with DDP improved planning
  performance overall.
- The DDP-based RobotiXX navigation system placed **2nd in both the simulation
  qualifier and physical finals of the 2025 BARN Challenge** (Benchmark
  Autonomous Robot Navigation).

## Paper

Y. Lu, T. Xu, L. Wang, N. Hawes, X. Xiao. "Decremental Dynamics Planning for
Robot Navigation," IROS 2025. [arXiv](https://arxiv.org/abs/2503.20521)
