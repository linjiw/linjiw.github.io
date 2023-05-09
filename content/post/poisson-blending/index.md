---
title: Gradient Domain Fusion
# subtitle: Color matching technique.
summary: Welcome to our website about Gradient Domain Fusion, a powerful technique that allows for seamless merging of multiple images into a single high-quality output. Our project aims to explore this technique and provide a detailed guide on how to implement it effectively.  
authors:
- admin
tags:
- Computer Vision
- Image Editing
- Fusion
- Optimization
# - Deep Learning
# - 开源

categories:
- Project
# - 教程
projects: []
date: "2019-02-05T00:00:00Z"
lastMod: "2019-09-05T00:00:00Z"

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

design:
  spacing:
    # Customize the section spacing. Order is top, right, bottom, left.
    padding: ["20px", "0", "20px", "0"]
# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: 'With CMEAS'
  focal_point: ""
  placement: 2
  preview_only: false
---
<!-- {{ <.TableOfContents> }} -->
{{< toc >}}

<!-- HW 2   table { border-collapse: collapse; margin: 0 auto; width: 50%; } th, td { padding: 8px; text-align: center; border: 1px solid #ddd; }    body { font-family: 'Lato', sans-serif; } .mySlides { display: none; }

[](javascript:void(0) "Toggle Navigation Menu")[HOME](#) [About Me](#band)

Projects

[Project0](#proj_0) [Project1](#proj_1) [Project2](#proj_2)

[](javascript:void(0))

![](./data/results_source_07_newsource_target_07Mixed Blend.jpg)  -->

Gradient Domain Fusion
----------------------

_by Linji Wang, Feb 07, 2023_

### Overview

<!-- Column 1

Column 2

Column 3

![Image 1](data/source_05.jpg)

![Image 1](data/source_05.jpg)

![Image 1](data/source_05.jpg)

![Image 1](data/source_05.jpg)

![Image 1](data/source_05.jpg)

![Image 1](data/source_05.jpg) -->

Welcome to our website about Gradient Domain Fusion, a powerful technique that allows for seamless merging of multiple images into a single high-quality output. Our project aims to explore this technique and provide a detailed guide on how to implement it effectively.  
Whether you are a professional photographer or a hobbyist looking to take your images to the next level, our website is the perfect resource to learn about and master Gradient Domain Fusion. So, let's get started and unlock the full potential of this exciting technique!

### Toy Problem

In this toy example, we're trying to reconstruct an image called "v" using some information we get from another image called "s". Specifically, we're going to use the x and y gradients of the image s, as well as the intensity of one of its pixels.  
  
Now, you might be wondering what "x and y gradients" mean. Think of it this way: imagine looking at a picture of a mountain. If you wanted to describe how the brightness of the image changes as you move your eyes across it, you might say something like "the brightness gets darker as you move up the mountain, and lighter as you move down." That's kind of what we mean by "gradients" - they describe how the brightness (or "intensity") of an image changes in different directions.  
  
So, to summarize: we have one image called "s", and we're going to use its x and y gradients (which describe how the brightness changes in different directions) and the intensity of one pixel to create a new image called "v". The process isn't too complicated, but it's easy to make mistakes, so we're starting with a simple example to make sure we get it right.

**Results: toy problem** Left side: Original image; Right side: Reconstructed Image

\--> ![](./data/toy_reconstruction.png)

### Poisson Blending

The first step in Poisson blending is to identify the target region in the image, which is the area where we want to blend the images together. For example, if we have two images of a person and a background, the target region might be the outline of the person.  
  
Next, we need to construct blending constraints. The goal of these constraints is to ensure that the blended image looks seamless and natural. We do this by making sure that the brightness or intensity of the target region is consistent with the gradients of the source and target images.  
  
To create these constraints, we use the gradient of the images. The gradient describes how the brightness or intensity of the image changes in different directions. We create a set of equations that relate the gradient of the target region to the gradients of the source and target images. These equations are based on the observation that the gradient of the target region should be equal to the gradient of the source image in the non-target region, so as to ensure smooth blending.  
  
Once we have the blending constraints, we need to solve a least squares problem to find the values for each pixel in the target region that satisfy these constraints. The solution involves finding the values that minimize the difference between the gradient of the target region and the gradients of the source and target images, subject to the blending constraints. This can be done using numerical optimization methods.  
  
Finally, we construct the blended image by copying the pixels from the source image into the target region, adjusting their colors and intensities according to the solution of the linear equations. This creates a smooth transition between the target region and the rest of the image, resulting in a final image that looks natural and seamless.  
  
In summary, Poisson blending involves identifying the target region, constructing blending constraints based on the gradients of the images, solving a least squares problem to find the values for each pixel in the target region, and then constructing the final image by copying the pixels from the source image and adjusting their colors and intensities. The result is a seamless and natural-looking image.

**Results: poisson blend** Left side: Naive Blend; Right side: Poisson Blend

\--> ![](./data/source_01.jpg)

Source: A Bear

![](./data/source_01_newsource_target_01Blend.jpg)

A Bear swimming with a girl in a pool

![](./data/source_2.jpg)

Source: A Whale

![](./data/source_2_newsource_target_2Blend.jpg)

A Whale swimming at the sea of Boston

![](./data/source_03.jpg)

Source: A man

![](./data/source_03_newsource_target_03Blend.jpg)

Mona Lisa with a man's face

![](./data/source_04.jpg)

Source: A cat

![](./data/source_04_newsource_target_04Blend.jpg)

A cat with another cat's face

![](./data/source_05.jpg)

Source: A cat

![](./data/source_05_newsource_target_05Blend.jpg)

A cat with another cat's face

![](./data/source_06.jpg)

Source: A snowman

![](./data/source_06_newsource_target_06Blend.jpg)

A snowman standing at The Mall, CMU

![](./data/source_07.jpg)

Source: A painting

![](./data/source_07_newsource_target_07Blend.jpg)

A painting at College of Fine Arts Lawn, CMU

### Mixed Poisson blending

To elaborate, Mixed Poisson blending is a variation of Poisson blending that is used to blend images with different color channels or color spaces. The process involves identifying the target region, constructing blending constraints, and solving a least squares problem to find the values for each pixel in the target region.  
  
The blending constraints are based on the idea that the brightness or intensity of the image should be consistent across the boundary between the target region and the rest of the image. In Mixed Poisson blending, these constraints are constructed by taking the greatest gradient in the image and using it to construct a sparse matrix.  
  
The sparse matrix is used to solve the least squares problem, which involves finding the values for each pixel in the target region that satisfy the blending constraints. The solution involves using iterative methods to find the optimal solution that minimizes the difference between the gradients of the target region and the greatest gradient of the image, subject to the blending constraints.  
  
The resulting pixel values are combined to create the final blended image, which maintains the colors and textures of each image while appearing seamless and natural.  
  
In summary, Mixed Poisson blending is used to blend images with different color channels or color spaces. The blending constraints are constructed using the greatest gradient in the image to create a sparse matrix, which is then used to solve the least squares problem and find the pixel values in the target region. The resulting blended image maintains the colors and textures of each image, while appearing seamless and natural. **Results: Mixed poisson blend** Left side: Naive Blend; Right side: Mixed Poisson Blend

### Mixed Poisson blending

\--> ![](./data/source_01.jpg)

Source: A Bear

![](./data/source_01_newsource_target_01Mixed Blend.jpg)

A Bear swimming with a girl in a pool

![](./data/source_2.jpg)

Source: A Whale

![](./data/source_2_newsource_target_2Mixed Blend.jpg)

A Whale swimming at the sea of Boston

![](./data/source_03.jpg)

Source: A man

![](./data/source_03_newsource_target_03Mixed Blend.jpg)

Mona Lisa with a man's face

![](./data/source_04.jpg)

Source: A cat

![](./data/source_04_newsource_target_04Mixed Blend.jpg)

A cat with another cat's face

![](./data/source_05.jpg)

Source: A cat

![](./data/source_05_newsource_target_05Mixed Blend.jpg)

A cat with another cat's face

![](./data/source_06.jpg)

Source: A snowman

![](./data/source_06_newsource_target_06Mixed Blend.jpg)

A snowman standing at The Mall, CMU

![](./data/source_07.jpg)

Source: A painting

![](./data/source_07_newsource_target_07Mixed Blend.jpg)

A painting at College of Fine Arts Lawn, CMU

### Color2Gray

The color2gray problem refers to the challenge of converting a color image to a grayscale image while preserving the essential information. Grayscale images are often used in applications such as printing, where color images may not be necessary or may be too expensive to produce.  
  
One approach to solving the color2gray problem is to convert the image to the HSV (Hue, Saturation, Value) color space. The HSV color space separates color information into three channels: Hue, Saturation, and Value. The Hue channel represents the color itself, while the Saturation and Value channels represent the intensity of the color.  
  
In the HSV color space, we can notice the color difference between channels, which can help us to preserve the essential information when converting to grayscale. One technique for converting an HSV image to grayscale is to use Mixed Poisson Blending. This technique involves solving a least squares problem that takes into account the greatest gradient in the image to construct a sparse matrix. The sparse matrix is used to find the values for each pixel in the target region, resulting in a grayscale image that maintains the essential information from the original color image.  
  
In summary, the color2gray problem refers to the challenge of converting a color image to grayscale while preserving the essential information. In the HSV color space, we can notice the color difference between channels, and Mixed Poisson Blending can be used to solve the color2gray problem while maintaining the essential information.

![](./data/colorBlindTest35.png)

A colorBlindTest image

![](./data/rgb2gray_results.jpg)

A Gray colorBlindTest image and its HSV distributions


