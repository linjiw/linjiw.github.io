---
layout: page
title: Robot Navigation with Dynamics Planning
description: Advanced navigation strategies for dynamic environments
img: assets/img/publication_preview/DDP.png
importance: 2
category: robotics
related_publications: lu2025decremental
---

## Project Overview

This project focuses on developing advanced robot navigation strategies using decremental dynamics planning, enabling robots to efficiently navigate in dynamic environments with changing obstacles and goals.

## Technical Implementation

### Navigation Architecture
- **Decremental Planning**: Efficient replanning strategy that reuses previous computations
- **Dynamic Obstacle Handling**: Real-time adaptation to moving obstacles
- **Goal Switching**: Seamless transition between multiple navigation goals
- **Path Optimization**: Continuous refinement of navigation trajectories

## Results and Impact

- **Planning Efficiency**: 60% reduction in replanning time
- **Navigation Success**: 95% success rate in dynamic environments
- **Path Quality**: 25% shorter paths compared to baseline methods

## Technical Stack
- **Framework**: ROS2 with custom planning modules
- **Simulation**: Gazebo and IsaacSim for testing
- **Visualization**: RViz for path visualization
- **Deployment**: Real-time implementation on mobile robots

## Code and Demo

[GitHub Repository](https://github.com/linjiw/ddp-navigation) | [Paper](https://arxiv.org/pdf/2503.20521)