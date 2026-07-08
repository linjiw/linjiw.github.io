---
layout: page
title: Normal Vector-Assisted SLAM Mapping
description: II-NVM — more accurate, more consistent maps (IEEE RA-L 2025)
img: assets/img/publication_preview/II-NVM_sq.jpg
importance: 3
category: robotics
related_publications: true
---

## Overview

II-NVM {% cite zhao2025ii %} improves SLAM map accuracy and consistency by
incorporating surface normal vector information into the mapping process,
addressing the double-sided mapping problem that arises when both sides of a
thin surface (walls, doors) are observed.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mb-3">
        {% include figure.liquid loading="eager" path="assets/img/projects/iinvm_system.jpg" title="II-NVM system overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    II-NVM pipeline: adaptive-radius normal calculation, normal-aware data association, and voxel map management.
</div>

<!-- TODO: add mapping result comparison GIF (with/without normal vectors) -->

## My contribution

This is a collaboration led by Chengwei Zhao; I am a co-author (5th of 7) and
contributed to the mapping methodology and evaluation. The work was published in
IEEE Robotics and Automation Letters (2025).

## Resources

- [arXiv](https://arxiv.org/abs/2504.08204)
- [IEEE Xplore](https://ieeexplore.ieee.org/document/10966190)
- [Code (official open-source release)](https://github.com/chengwei0427/II-NVM)
