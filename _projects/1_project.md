---
layout: page
title: Curriculum & Reward Learning for Robot Navigation and Locomotion
description: GACL and Reward Training Wheels — adaptive training for RL robots (IROS 2025)
img: assets/img/publication_preview/GACL_sq.jpg
importance: 1
category: robotics
related_publications: true
---

## Overview

Reinforcement learning for robots is bottlenecked by *how* we train, not just what
we train: fixed task curricula and hand-designed rewards require expert effort and
still leave performance on the table. This project develops two complementary
frameworks — both first-author papers accepted at IROS 2025 — that adapt the
training process itself to the robot's learning progress.

## Grounded Adaptive Curriculum Learning (GACL)

GACL {% cite wang2025gacl %} (with Zifan Xu, Peter Stone, and Xuesu Xiao)
introduces a teacher-student paradigm in which an informed teacher generates
training tasks by monitoring student performance in real time, while grounding
the curriculum in real-world task distributions so training remains relevant to
deployment.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mb-3">
        {% include figure.liquid loading="eager" path="assets/img/projects/gacl_framework.jpg" title="GACL framework" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The GACL teacher adapts task difficulty from live student performance while grounding tasks in the target distribution.
</div>

<!-- TODO: replace with short GIF/video of the wheeled robot and quadruped executing learned policies -->

**Published results:** 6.8% higher success rate than state-of-the-art curriculum
methods on wheeled navigation in constrained environments, and 6.1% higher on
quadruped locomotion in challenging 3D confined spaces.

## Reward Training Wheels (RTW)

RTW {% cite wang2025reward %} automates auxiliary reward shaping: a teacher
adaptively weights auxiliary reward components as the robot's proficiency grows,
so guidance fades out exactly like training wheels on a bicycle.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mb-3">
        {% include figure.liquid loading="eager" path="assets/img/projects/rtw_framework.jpg" title="RTW teacher-student framework" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The RTW teacher observes the student's reward history and re-weights auxiliary rewards each iteration.
</div>

<!-- TODO: replace with GIF/video of the off-road vehicle physical trials (5/5 success) -->

**Published results:** 2.35% higher navigation success rate than expert-designed
rewards and a 122.62% improvement in off-road mobility on vertically challenging
terrain, with 35% and 3× faster training respectively. On the physical off-road
robot, RTW achieved 5/5 successful trials versus 2/5 for expert-designed rewards,
with up to 47.4% reduction in orientation angles (more stable poses).

## Platforms

- Wheeled ground robots navigating highly constrained spaces
- Quadruped locomotion in confined 3D environments
- Off-road vehicles on vertically challenging terrain
- **Ongoing:** extending curriculum learning to humanoid robots

## Papers

- L. Wang, Z. Xu, P. Stone, X. Xiao. "GACL: Grounded Adaptive Curriculum Learning
  with Active Task and Performance Monitoring," IROS 2025.
  [arXiv](https://arxiv.org/abs/2508.02988)
- L. Wang, T. Xu, Y. Lu, X. Xiao. "Reward Training Wheels: Adaptive Auxiliary
  Rewards for Robotics Reinforcement Learning," IROS 2025.
  [arXiv](https://arxiv.org/abs/2503.15724)
