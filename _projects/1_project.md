---
layout: page
title: RL for Robotic Manipulation
description: Curriculum learning approaches for complex manipulation tasks
img: assets/img/publication_preview/GACL.png
importance: 1
category: robotics
related_publications: wang2025gacl, wang2025reward
---

## Overview

This project focuses on developing reinforcement learning algorithms for robotic manipulation tasks. We address the challenge of training robots to perform complex manipulation tasks through grounded adaptive curriculum learning and reward shaping techniques.

## Key Contributions

- **Grounded Adaptive Curriculum Learning (GACL)**: Developed a novel framework integrating real-world data with adaptive simulated task generation
- **Reward Training Wheels**: Implemented adaptive auxiliary rewards that automatically adjust based on learning progress
- **24.58% Higher Success Rate**: Achieved significant improvement in task success rate with 50% better sample efficiency

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

This work has resulted in two papers accepted at the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) 2025:
- GACL: Grounded Adaptive Curriculum Learning with Active Task and Performance Monitoring
- Reward Training Wheels: Adaptive Auxiliary Rewards for Robotics Reinforcement Learning

## Code

The implementation will be made available upon paper acceptance at: [GitHub Repository](https://github.com/linjiw/rl-manipulation)