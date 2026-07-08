---
layout: page
title: Decremental Dynamics Planning
description: Robot navigation that plans with full dynamics only where it matters — 1st place, 2025 BARN Challenge (simulation)
img: assets/img/publication_preview/DDP_sq.jpg
importance: 2
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

## My contribution

This is a collaboration led by my labmate Yuanjie Lu (with Tong Xu, Nick Hawes of
Oxford, and our advisor Xuesu Xiao); I am third author and contributed to the
planning framework and experimental evaluation.

## Published results

- Augmenting three different existing planners with DDP improved planning
  performance across the board.
- A new DDP-based navigation system won **1st place in the simulation phase of
  the 2025 BARN Challenge** (Benchmark Autonomous Robot Navigation), validated in
  both simulated and physical experiments.

## Paper

Y. Lu, T. Xu, L. Wang, N. Hawes, X. Xiao. "Decremental Dynamics Planning for
Robot Navigation," IROS 2025. [arXiv](https://arxiv.org/abs/2503.20521)
