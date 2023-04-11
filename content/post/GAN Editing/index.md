---
title: GAN Photo Editing
subtitle: A Journey Through Generative AI Techniques
summary: In this project, we explore the applications of Generative Adversarial Networks (GANs) for photo editing tasks such as image reconstruction, interpolation, and synthesis.
authors:
- admin
tags:
- Computer Vision
- Image Generation
- Deep Learning
- Style Image
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
  caption: 'Style Transfer with Falling Water'
  focal_point: ""
  placement: 2
  preview_only: false
---
<!-- {{ <.TableOfContents> }} -->
{{< toc >}}
## Introduction


In this assignment, we implement a few different techniques that require manipulating images on the manifold of natural images. 
- First, we invert a pre-trained generator to find a latent variable that closely reconstructs a given real image. 
- In the second part of the assignment, we take a hand-drawn sketch and generate an image that fits the sketch accordingly.

## Setup

To set up the environment for this project, create a new virtual environment and install the required dependencies:

```python
conda create -n 16726_hw5
conda activate 16726_hw5
pip3 install torch==1.12.1+cu113 torchvision==0.13.1+cu113 torchaudio==0.12.1 --extra-index-url https://download.pytorch.org/whl/cu113
pip3 install click requests tqdm pyspng ninja matplotlib imageio imageio-ffmpeg==0.4.3
pip install wandb # weight and bias is used in this blog for logging experiments.
```


## Part 1: Inverting the Generator [30 pts]

In the first part of the assignment, we solve an optimization problem to reconstruct the image from a particular latent code. We use different combinations of loss functions, generative models, and latent spaces to find the best result.

### Implementation Details

1. Implement the forward function in the `Criterion` class.
2. Implement `sample_noise` for StyleGAN2, including w and w+.
3. Implement the optimization step using LBFGS or other optimizers.
4. Implement the whole functionality in `project()`.

### Deliverables

Show example outputs of image reconstruction efforts and provide comments on why the various outputs look how they do.
- Various combinations of the losses including Lp loss, Preceptual loss and/or regularization loss that penalizes L2 norm of delta.
- different generative models including vanilla GAN, StyleGAN
- different latent space (latent code in z space, w space, and w+ space)

| L1 Loss | Perceptual Loss | Regularization Loss |    Model    | Latent Space | Results |
|:-------:|:---------------:|:-------------------:|:-----------:|:------------:|:-------:|
|    ON   |        ON       |          ON         | Vanilla GAN    |      z     |     {{< figure src="./data/project/vanilla_z_1_100_1e_06.png" >}}     |
|    ON   |        ON       |         OFF         | Vanilla GAN     |      z     |    {{< figure src="./data/project/vanilla_z_1_100_0.png" >}}     |
|    ON   |       OFF       |          ON         | Vanilla GAN     |      z     |    {{< figure src="./data/project/vanilla_z_1_0_1e-06.png" >}}     |
|    ON   |       OFF       |         OFF         | Vanilla GAN     |      z     |   {{< figure src="./data/project/vanilla_z_1_0_0.png" >}}      |
|   OFF   |        ON       |          ON         | Vanilla GAN    |      z     |    {{< figure src="./data/project/media_images_output_project_0_vanilla_z_0_100_1e-06.png" >}}     |
|   OFF   |        ON       |         OFF         | Vanilla GAN     |      z     |     {{< figure src="./data/project/media_images_output_project_0_vanilla_z_0_100_0.png">}}    |
|    ON   |        ON       |          ON         | StyleGAN|      z     |     {{< figure src="./data/project/media_images_output_project_0_stylegan_z_1_100_1e-06_4004_bebeb425d957dbef4f9c.png" >}}     |
|    ON   |        ON       |         OFF         | StyleGAN     |      z     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_z_1_100_0_4004_415e536104247044383b.png" >}}     |
|    ON   |       OFF       |          ON         | StyleGAN    |      z     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_z_1_0_1e-06_4004_c94a7b60cb156f074e48.png" >}}     |
|    ON   |       OFF       |         OFF         | StyleGAN     |      z     |   {{< figure src="./data/project/media_images_output_project_0_stylegan_z_1_0_0_4004_dd13a0dc4a4ab66f66e3.png" >}}      |
|   OFF   |        ON       |          ON         | StyleGAN    |      z     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_z_0_100_1e-06_4004_bc0458e560bd161434dc.png" >}}     |
|   OFF   |        ON       |         OFF         | StyleGAN     |      z     |     {{< figure src="./data/project/media_images_output_project_0_stylegan_z_0_100_0_4004_72dbd55809d60c6aadf5.png">}}    |
|    ON   |        ON       |          ON         | StyleGAN|      w     |     {{< figure src="./data/project/media_images_output_project_0_stylegan_w_1_100_1e-06_4004_b631e25d5521c00718d4.png" >}}     |
|    ON   |        ON       |         OFF         | StyleGAN     |      w     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_w_1_100_0_4004_829d13f5a063b2c278d0.png" >}}     |
|    ON   |       OFF       |          ON         | StyleGAN    |      w     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_w_1_0_1e-06_4004_068ef97c4f13a85ca22b.png" >}}     |
|    ON   |       OFF       |         OFF         | StyleGAN     |      w     |   {{< figure src="./data/project/media_images_output_project_0_stylegan_w_1_0_0_4004_a0048096f02d312a464c.png" >}}      |
|   OFF   |        ON       |          ON         | StyleGAN    |      w     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_w_0_100_1e-06_4004_0011bfc0a88246482962.png" >}}     |
|   OFF   |        ON       |         OFF         | StyleGAN     |      w     |     {{< figure src="./data/project/media_images_output_project_0_stylegan_w_0_100_0_4004_b9fc403d056cb3d20782.png">}}    |
|    ON   |        ON       |          ON         | StyleGAN|      w+     |     {{< figure src="./data/project/media_images_output_project_0_stylegan_w+_1_100_1e-06_4004_d5cb1908a90fef931d42.png" >}}     |
|    ON   |        ON       |         OFF         | StyleGAN     |      w+     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_w+_1_100_0_4004_520c171b3be96c12ec9a.png" >}}     |
|    ON   |       OFF       |          ON         | StyleGAN    |      w+     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_w+_1_0_1e-06_4004_96571a7039c51c03e1a9.png" >}}     |
|    ON   |       OFF       |         OFF         | StyleGAN     |      w+     |   {{< figure src="./data/project/0_stylegan_w+_1_0_0_4004_98a74167d8cdde94f7b3.png" >}}      |
|   OFF   |        ON       |          ON         | StyleGAN    |      w+     |    {{< figure src="./data/project/0_stylegan_w+_0_100_1e-06_4004_0011bfc0a88246482962.png" >}}     |
|   OFF   |        ON       |         OFF         | StyleGAN     |      w+     |     {{< figure src="./data/project/media_images_output_project_0_stylegan_w+_0_100_0_4004_b9fc403d056cb3d20782.png">}}    |

Our experiments compared **GAN architectures** and **loss functions** to assess their impact on generated images. We found that **StyleGAN** with **L1 loss**, **Perceptual loss**, and **Regularization loss** consistently delivered superior results, generating high-quality images closely resembling the target distribution.

We observed challenges in training without **Perceptual loss**, resulting in less stable training processes. In contrast, **Vanilla GAN** generated plausible images but lacked the fine-grained detail present in **StyleGAN** outputs.

In conclusion, **StyleGAN** combined with **L1**, **Perceptual**, and **Regularization losses** outperformed other configurations, demonstrating its effectiveness in generating high-quality, detailed images.


## Part 2: Interpolate your Cats [10 pts]

In this part, we perform interpolation between latent vectors found in Part 1 using different generative models and latent spaces.

### Implementation

1. Implement the interpolation step in `interpolate()`.

### Deliverables

Show a few interpolations between grumpy cats and comment on the quality of the images and the interpolation process.

We first generate in the interpolation in 64 by 64.

{{< figure src="./data/interpolate/01.gif">}}
{{< figure src="./data/interpolate/2.gif">}}

But we found 64 by 64 resolution is not enough for website view experience. So we edit part of the code to enable higher resolution (512 by 512).
{{< figure src="./data/interpolate/03.gif">}}
{{< figure src="./data/interpolate/5.gif">}}


And I tried to test the interpolation on some cute cats images.

{{< figure src="./data/interpolate/11.gif">}}
{{< figure src="./data/interpolate/15.gif">}}


## Part 3: Scribble to Image [40 Points]

In this part, we generate an image subject to constraints, like color scribble constraints, using a penalized nonconvex optimization problem.

### Implementation Details

1. Implement the code for synthesizing images from drawings to realistic ones using the optimization procedure in `draw()`.

### Deliverables
Draw some cats and experiment with sparser and denser sketches and the use of color. Show example outputs along with commentary on what seems to have happened and why. 

| Target | Results | 
|:-------:|:---------------:|
|  {{< figure src="./data/draw/media_images_output_draw_0_data_0_685759aa7ccdce514a24.png">}}      |    {{< figure src="./data/draw/media_images_output_project_0_stylegan_w+_1_10_1e-06_12013_08c54f90bce097455075.png">}}          |
|  {{< figure src="./data/draw/media_images_output_draw_1_data_12062_00e0913765996185883b.png">}}      |    {{< figure src="./data/draw/media_images_output_project_1_stylegan_w+_1_10_1e-06_24075_c541cd2f1e2be1d82034.png">}}           |
|  {{< figure src="./data/draw/2_data_24100_d786d60d1e48ec2aebf2.png">}}      |    {{< figure src="./data/draw/media_images_output_project_2_stylegan_w+_1_10_1e-06_36113_f03f9cffdc953145278d.png">}}           |
|  {{< figure src="./data/draw/media_images_output_draw_3_data_36130_6976808218d3e438a312.png">}}      |    {{< figure src="./data/draw/media_images_output_project_3_stylegan_w+_1_10_1e-06_48143_1be8665e33a1bf3150e8.png">}}           |
|  {{< figure src="./data/draw/media_images_output_draw_4_data_48152_554a7c1d62c815e83243.png">}}      |    {{< figure src="./data/draw/media_images_output_project_4_stylegan_w+_1_10_1e-06_60165_e3516c0d8ce51c0011fc.png">}}           |
|  {{< figure src="./data/draw/media_images_output_draw_5_data_60178_bd3aaa9115213ce0d768.png">}}      |    {{< figure src="./data/draw/media_images_output_project_5_stylegan_w+_1_10_1e-06_72191_f2ed53d8e93e33c07ba8.png">}}           |
|  {{< figure src="./data/draw/media_images_output_draw_6_data_72196_e294ed27fb37e4e191cf.png">}}      |    {{< figure src="./data/draw/media_images_output_project_6_stylegan_w+_1_10_1e-06_84209_fd14e62000b27732a369.png">}}           |
|  {{< figure src="./data/draw/media_images_output_draw_7_data_84230_062814c6a7cee9aa5e24.png">}}      |    {{< figure src="./data/draw/media_images_output_project_7_stylegan_w+_1_10_1e-06_96243_2946dc0f8311277108e4.png">}}           |
|  {{< figure src="./data/draw/media_images_output_draw_8_data_96248_0e319a9a812700472a55.png">}}      |    {{< figure src="./data/draw/media_images_output_project_8_stylegan_w+_1_10_1e-06_108261_fa18dcf2db0b95732dfe.png">}}           |

I also add some DIY mask for fun.

| Target | Results | 
|:-------:|:---------------:|
|  {{< figure src="./data/draw/media_images_output_draw_0_data_0_685759aa7ccdce514a24.png">}}      |    {{< figure src="./data/draw/media_images_output_project_0_stylegan_w+_1_10_1e-06_12013_08c54f90bce097455075.png">}}          |
