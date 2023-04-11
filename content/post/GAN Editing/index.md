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
|    ON   |        ON       |          ON         | StyleGAN|      w+     |     {{< figure src="./data/project/media_images_output_project_0_stylegan_z_1_100_1e-06_4004_bebeb425d957dbef4f9c.png" >}}     |
|    ON   |        ON       |         OFF         | StyleGAN     |      w+     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_z_1_100_0_4004_415e536104247044383b.png" >}}     |
|    ON   |       OFF       |          ON         | StyleGAN    |      w+     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_z_1_0_1e-06_4004_c94a7b60cb156f074e48.png" >}}     |
|    ON   |       OFF       |         OFF         | StyleGAN     |      w+     |   {{< figure src="./data/project/media_images_output_project_0_stylegan_z_1_0_0_4004_dd13a0dc4a4ab66f66e3.png" >}}      |
|   OFF   |        ON       |          ON         | StyleGAN    |      w+     |    {{< figure src="./data/project/media_images_output_project_0_stylegan_z_0_100_1e-06_4004_bc0458e560bd161434dc.png" >}}     |
|   OFF   |        ON       |         OFF         | StyleGAN     |      w+     |     {{< figure src="./data/project/media_images_output_project_0_stylegan_z_0_100_0_4004_72dbd55809d60c6aadf5.png">}}    |
## Part 1: Content Reconstruction

### Experiments

1. **Effect of optimizing content loss at different layers:** Explored the impact of optimizing content loss at various layers and chose the best one.
   {{< figure src="./data/reconstruct/content_16-1_style_1.png" title="Reconstruct, Content Layer [1 to 16], Top Left (16), Bottom Right (1)" >}}

2. **Comparison of two random noise input images:** Optimized two random noise input images with content loss and compared their results with the content image.
    {{< figure src="./data/reconstruct/content_wally.png" title="Wally" >}}
   {{< figure src="./data/reconstruct/reconstruct_wally.png" title="Reconstruct: Wally, Content Layer [1]" >}}
   {{< figure src="./data/reconstruct/content_fallingwater.png" title="Falling Water" >}}
   {{< figure src="./data/reconstruct/reconstruct_fallingwater.png" title="Reconstruct: Falling Water, Content Layer[1]" >}}

## Part 1: Texture Synthesis
In this project, we implemented a texture synthesis method using style-space loss, inspired by the Gram matrix. By measuring the distance between the styles of two images, we aimed to optimize and predict features that closely resemble the target style.

### Experiments

1. **Effect of optimizing texture loss at different layers:** Explored the impact of optimizing style loss at various layers and chose the best one. We discovered that the textures generated when optimizing style layers 1 to 5 exhibited the highest similarity with the original image. In contrast, the results became increasingly noisy and less visually coherent when the optimization was performed on later layers, such as layers 11 to 15. This observation suggests that earlier layers play a more significant role in capturing and reproducing the style features of the original image.
   {{< figure src="./data/synthesis/content_4_style_11-1.png" title="Synthesis, Style Layer [1-5 to 11-15], Top Left (11-15), Bottom Right (1-5)" >}}

2. **Comparison of two random noise input images:** Optimized two random noise input images with content loss and compared their results with the content image.
    {{< figure src="./data/synthesis/style_1.png" title="Frida Kahlo" >}}
   {{< figure src="./data/synthesis/synthesis_content_4_style_1_4.png" title="Synthesis: Frida Kahlo, Style Layer [1-5]" >}}
   {{< figure src="./data/synthesis/style_2.png" title="Picasso" >}}
   {{< figure src="./data/synthesis/synthesis_content_4_style_1_4_picasso.png" title="Synthesis: Picasso, Style Layer [1-5]" >}}

## Part 2: Style Transfer
In the final part of this project, we combined content and style loss to perform style transfer. By applying both losses to specific layers, we were able to generate stylized images that maintain the content of the original image while adopting the style of a reference image.



### Experiments
1. **Hyper-parameter tuning:** We carefully tuned the hyper-parameters to achieve satisfactory results。We ran two for loops, one to traverse content from [1 to 16] and another one to traverse style [1-5 to 11-15]. Each row uses a fixed content layer, each column shares a fixed style layer.
   {{< figure src="./data/transfer/15-13.png" title="Transfer, content layer from 15-13" >}}
   {{< figure src="./data/transfer/12-10.png" title="Transfer, content layer from 12-10" >}}
   {{< figure src="./data/transfer/9-7.png" title="Transfer, content layer from 9-7" >}}
   {{< figure src="./data/transfer/6-4.png" title="Transfer, content layer from 6-4" >}}
   {{< figure src="./data/transfer/3-1.png" title="Transfer, content layer from 3-1" >}}
2. **Gram Matrix Implementation:** The Gram matrix is a crucial component in style transfer, as it helps capture and quantify the style of an image. It works by computing the correlation between different feature maps in a given layer of a neural network, thus providing a representation of the style information contained in that layer.

   {{< figure src="./data/transfer/gram_matrix.png" title="Gram Matrix, source from cloudxlab.com " >}}
   <!-- https://cloudxlab.com/assessment/displayslide/5648/calculating-style -->
3. **Image Grid:** We generated a grid of images, showcasing the results of style transfer with two content images mixed with two style images. The grid also includes the original content and style images.
   {{< figure src="./data/transfer/content2.png" title="Content Images" >}}
   {{< figure src="./data/transfer/style_2.png" title="Style Images" >}}
   {{< figure src="./data/transfer/2by2Grid.png" title="Style Transfer: Mixed 2 By 2" >}}

4. **Style Transfer on My Favorite Image:** We applied style transfer to some of our favorite images and observed the results.
    {{< figure src="./data/transfer/style_andy.png" title="Style: Untitled (Beauty Products) by Andy Warhol" >}}
   {{< figure src="./data/transfer/content_laguna_beach.png" title="Content: Laguna Beach by Linji Wang" >}}
   {{< figure src="./data/transfer/style_laguna_beach.png" title="Andy Warhol Styled Laguna Beach" >}}
   {{< figure src="./data/transfer/untitled-beauty-productsLarge_laguna_beach_2023-04-03-02-04-02.gif" title="Style Transfer Process" >}}


## Conclusion
In conclusion, this project has successfully demonstrated the implementation of neural style transfer using content and style losses. The assignment began with content reconstruction, where the content loss was calculated as the squared L2-distance between the features of the input and content images at a certain layer. Different layers were evaluated for their effect on content optimization, and the results were analyzed and presented.

The second part of the assignment focused on texture synthesis using style loss, which was computed based on the Gram matrices of the input and style images. The effect of optimizing texture loss at different layers was explored, and synthesized textures were generated and compared.

Finally, both content and style losses were integrated to perform neural style transfer. Hyperparameters were tuned, and a 3x3 grid of results, including content and style images, was generated. The quality and running time of the style transfer were compared when using random noise and a content image as input. Furthermore, the style transfer technique was applied to a variety of favorite images, showcasing its versatility.

Overall, this project has deepened the understanding of neural style transfer, optimization of pixel values, and the role of content and style losses in producing visually appealing and artistic results. The experiments carried out and the results obtained provide valuable insights into the workings of neural style transfer and its potential applications in the creative domain.
