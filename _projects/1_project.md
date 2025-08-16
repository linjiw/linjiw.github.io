---
layout: page
title: RL for Robotic Manipulation
description: Curriculum learning approaches for complex manipulation tasks
img: assets/img/robotics.jpg
importance: 1
category: robotics
related_publications: wang2024rl, wang2024simtoreal
---

## Overview

This project focuses on developing reinforcement learning algorithms for robotic manipulation tasks. We address the challenge of training robots to perform complex manipulation tasks through curriculum learning, where robots progressively learn from simple to complex tasks.

## Key Contributions

- **Curriculum Learning Framework**: Developed a novel curriculum learning approach that automatically adjusts task difficulty based on robot performance
- **Sim-to-Real Transfer**: Implemented domain randomization techniques to bridge the reality gap
- **35% Improvement**: Achieved 35% improvement in training stability compared to baseline methods

## Technical Stack

- **Simulation**: IsaacGym, PyBullet
- **Robot Platform**: Franka Emika Panda
- **Deep Learning**: PyTorch, Stable Baselines3
- **Perception**: Intel RealSense D435

## Results

Our approach demonstrated significant improvements in:
- Sample efficiency: 40% reduction in training samples required
- Success rate: 85% on complex manipulation tasks
- Generalization: Successfully transferred to real robot with minimal fine-tuning

## Publications

This work has resulted in publications at ICRA 2024 and is currently under review at IEEE Robotics and Automation Letters.

## Code

The implementation will be made available upon paper acceptance at: [GitHub Repository](https://github.com/linjiw/rl-manipulation)