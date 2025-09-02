---
layout: page
title: Enhanced SLAM with Normal Vectors
description: II-NVM - Improving map accuracy and consistency
img: assets/img/publication_preview/II-NVM.png
importance: 3
category: robotics
related_publications: zhao2025ii
---

## Overview

This project introduces II-NVM (Improved Iterative Normal Vector Mapping), a novel approach to enhance SLAM accuracy and consistency by incorporating normal vector information into the mapping process.

## Key Features

### Normal Vector Integration
- **Improved Accuracy**: Enhanced map precision through normal vector constraints
- **Consistency Maintenance**: Better loop closure with geometric constraints
- **Real-time Performance**: Efficient computation suitable for online SLAM

### Mapping Enhancement
- **Surface Reconstruction**: Better planar surface detection and representation
- **Noise Reduction**: Robust to sensor noise through normal vector filtering
- **Drift Correction**: Improved long-term mapping consistency

## Technical Implementation

- **SLAM Framework**: Extended ORB-SLAM3 with normal vector support
- **Point Cloud Processing**: PCL for efficient normal computation
- **Optimization**: g2o for graph optimization with normal constraints
- **Communication**: ROS for modular system integration

## Applications

Successfully tested on:
- Indoor mapping scenarios
- Outdoor navigation tasks
- Long-corridor environments with feature scarcity

## Impact

- **Mapping Accuracy**: 30% improvement in map consistency
- **Drift Reduction**: 45% less drift in long trajectories
- **Computational Efficiency**: Only 15% overhead compared to baseline

## Publication

This work has been published in IEEE Robotics and Automation Letters (2025):
- "II-NVM: Enhancing Map Accuracy and Consistency with Normal Vector-Assisted Mapping" by Zhao, Li, Jian, Xu, Wang, Ma, and Jin

## Resources

[Paper PDF](https://arxiv.org/pdf/2504.08204) | [IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/10966190)