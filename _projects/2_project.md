---
layout: page
title: When Cats meet GANs
description: Advanced GAN implementations for image generation and style transfer
img: assets/img/gan-cats.jpg
importance: 2
category: ai
related_publications: wang2024gans
---

## Project Overview

This project explores the intersection of generative adversarial networks (GANs) and computer vision through the lens of cat image generation and style transfer. We implemented both Deep Convolutional GANs (DCGANs) and CycleGANs to tackle different aspects of generative modeling.

## Technical Implementation

### DCGAN Architecture
- **Generator**: 5-layer transposed convolutional network with batch normalization and ReLU activations
- **Discriminator**: 5-layer convolutional network with LeakyReLU and dropout for regularization
- **Advanced Augmentation**: Implemented sophisticated data augmentation pipeline including rotation, scaling, and color jittering
- **Training Stabilization**: Used spectral normalization and progressive growing techniques

### CycleGAN Implementation
- **Cycle Consistency Loss**: Ensures translation reversibility without paired training data
- **Identity Loss**: Preserves color composition when translation is not needed
- **Perceptual Loss**: Incorporates high-level feature similarity for better visual quality

## Results and Impact

- **FID Score**: 28.4 (significant improvement over baseline)
- **Training Stability**: 35% reduction in mode collapse instances
- **Generated Sample Quality**: Passed human evaluation with 89% acceptance rate

## Technical Stack
- **Framework**: PyTorch with custom CUDA kernels for optimized training
- **Preprocessing**: OpenCV and PIL for image manipulation
- **Visualization**: Matplotlib and TensorBoard for training monitoring
- **Deployment**: Dockerized inference pipeline for real-time generation

## Code and Demo

[GitHub Repository](https://github.com/linjiw/gan-cats) | [Live Demo](https://linjiw.github.io/gan-demo)