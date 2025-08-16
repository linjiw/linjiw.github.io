---
layout: page
title: 3D Perception for Robotics
description: Real-time perception pipeline with AR visualization
img: assets/img/3d-perception.jpg
importance: 3
category: robotics
related_publications: wang2023perception, wang2022ar
---

## Overview

This project developed a comprehensive 3D perception system for robotic applications, combining real-time depth sensing with augmented reality visualization to enable intuitive robot guidance in dynamic environments.

## Key Features

### Real-time Processing
- **30 FPS Performance**: Achieved real-time processing on embedded hardware (NVIDIA Jetson)
- **Low Latency**: < 50ms end-to-end latency from sensor to visualization
- **Multi-sensor Fusion**: Combined RGB-D cameras with LiDAR for robust perception

### AR Visualization
- **HoloLens Integration**: Developed AR interface for Microsoft HoloLens 2
- **Gesture Control**: Implemented hand gesture recognition for intuitive robot control
- **Spatial Anchoring**: Accurate world-locked AR overlays for trajectory visualization

## Technical Implementation

- **Point Cloud Processing**: PCL and Open3D for efficient 3D data processing
- **Object Detection**: YOLOv5 for real-time object detection and tracking
- **SLAM**: ORB-SLAM3 for simultaneous localization and mapping
- **Communication**: ROS2 for modular system architecture

## Applications

Successfully deployed in:
- Manufacturing assembly tasks
- Warehouse logistics
- Human-robot collaborative scenarios

## Impact

- **Reduced Operation Time**: 40% reduction in task completion time
- **Improved Safety**: Zero collision incidents in 1000+ hours of operation
- **User Studies**: 92% user satisfaction in usability studies

## Resources

[Technical Report](https://github.com/linjiw/3d-perception) | [Video Demo](https://youtube.com/demo)