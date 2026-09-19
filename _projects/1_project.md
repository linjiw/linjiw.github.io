---
layout: page
title: Adaptive Training for Robot Learning
description: Tasks, rewards, and domain randomization — GACL, Reward Training Wheels, and LUCID
img: assets/img/publication_preview/GACL_sq.jpg
importance: 1
category: robotics
related_publications: true
---

## Overview

My research asks how a teacher can understand a robot student and adapt three parts
of training: **tasks**, **auxiliary rewards**, and **simulation conditions**.
GACL and Reward Training Wheels (IROS 2025) address the first two decisions;
LUCID (preprint, 2026) extends the agenda to execution-informed domain randomization.
These are complementary methods with distinct mechanisms and evaluations.

[Explore the animated research story]({{ '/research/' | relative_url }}) for
teacher–student diagrams, classroom analogies, a scheduling demo, and linked results.

## Grounded Adaptive Curriculum Learning (GACL)

GACL {% cite wang2025gacl %} (with Zifan Xu, Peter Stone, and Xuesu Xiao)
introduces a teacher-student paradigm in which an informed teacher generates
training tasks by monitoring student performance in real time, while grounding
the curriculum in limited reference samples from the target task distribution
so training remains relevant to deployment.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mb-3">
        {% include figure.liquid loading="eager" path="assets/img/projects/gacl_framework.jpg" title="GACL framework" alt="Diagram of the GACL teacher-student curriculum-learning framework" class="img-fluid rounded z-depth-1" %}
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

RTW {% cite wang2025reward %}, co-first-authored with Tong Xu, automates auxiliary reward shaping: a teacher
adaptively weights auxiliary reward components as the robot's proficiency grows,
while the primary objective stays fixed. Weights can rise or fall; they are not
constrained to fade monotonically.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mb-3">
        {% include figure.liquid loading="eager" path="assets/img/projects/rtw_framework.jpg" title="RTW teacher-student framework" alt="Diagram of the Reward Training Wheels teacher-student framework" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The RTW teacher observes the student's reward history and re-weights auxiliary rewards each iteration.
</div>

<!-- TODO: replace with GIF/video of the off-road vehicle physical trials (5/5 success) -->

**Published results:** In simulation, RTW achieved a 2.35-point increase in
navigation success and a 122.62% relative improvement in off-road mobility on
vertically challenging terrain, reaching the respective performance thresholds
about 35% and 3× faster. Sim-trained policies achieved 5/5 physical off-road
trials versus 2/5 for expert-designed rewards, with up to 47.4% reduction in
orientation angles (more stable poses).

## LUCID: pacing domain randomization

[LUCID]({{ '/assets/pdf/lucid-preprint.pdf' | relative_url }}) is a 2026 preprint on
humanoid motion tracking. A frozen temporal encoder compares issued-command and
measured-execution histories. A bounded PI scheduler adjusts shared randomization
intensity, with return-based backoff when training degrades.

The study reports **88.9% vs. 76.8%** full-randomization simulation completion
against filtered-error PI (Table III). On the physical Unitree G1 with **40 ms
added delay**, completion was **38/60 vs. 23/60** across four motions, three
checkpoints, and five repetitions (Table VII). These are preprint study results.
Only the policy and low-level controller are needed at deployment.

## Platforms

- Wheeled ground robots navigating highly constrained spaces
- Quadruped locomotion in confined 3D environments
- Off-road vehicles on vertically challenging terrain
- Humanoid motion tracking in LUCID simulation and physical G1 experiments (preprint)

## Papers

- L. Wang, Z. Xu, P. Stone, X. Xiao. "GACL: Grounded Adaptive Curriculum Learning
  with Active Task and Performance Monitoring," IROS 2025.
  [arXiv](https://arxiv.org/abs/2508.02988)
- L. Wang, T. Xu, Y. Lu, X. Xiao. "Reward Training Wheels: Adaptive Auxiliary
  Rewards for Robotics Reinforcement Learning," IROS 2025.
  [arXiv](https://arxiv.org/abs/2503.15724)
