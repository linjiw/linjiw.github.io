---
title: Neural Style Transfer
subtitle: A Comprehensive Study on Neural Style Transfer.
summary: I'm excited to share my recent project on Neural Style Transfer, which is a fascinating technique that combines the content of one image with the artistic style of another, resulting in a stunning and unique blend of the two. 
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


- In this project, I started by optimizing random noise in content space, which helped me understand the concept of optimizing pixels based on specific losses. 
- Then, I focused on generating textures by optimizing the style only, which allowed me to grasp the connection between style-space distance and the gram matrix. 
- Finally, I combined all these elements to perform the Neural Style Transfer, creating a beautiful, Frida-Kahlo-inspired rendition of Fallingwater.

Feel free to explore the images below to see the original content image, the style image, and the final Neural Style Transfer output. Let your imagination run wild as you discover the endless possibilities of blending art and technology!

<!-- 🖼️ Content Image: Fallingwater

🎨 Style Image: Self-Portrait with Thorn Necklace and Hummingbird by Frida Kahlo

🌟 Output: Frida-Kahlo-ized Fallingwater -->



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
1. **Hyper-parameter tuning:** Explored the impact of optimizing style loss at various layers and chose the best one. We discovered that the textures generated when optimizing style layers 1 to 5 exhibited the highest similarity with the original image. In contrast, the results became increasingly noisy and less visually coherent when the optimization was performed on later layers, such as layers 11 to 15. This observation suggests that earlier layers play a more significant role in capturing and reproducing the style features of the original image.
   {{< figure src="./data/synthesis/content_4_style_11-1.png" title="Synthesis, Style Layer [1-5 to 11-15], Top Left (11-15), Bottom Right (1-5)" >}}
2. **Gram Matrix Implementation:** Explored the impact of optimizing style loss at various layers and chose the best one. We discovered that the textures generated when optimizing style layers 1 to 5 exhibited the highest similarity with the original image. In contrast, the results became increasingly noisy and less visually coherent when the optimization was performed on later layers, such as layers 11 to 15. This observation suggests that earlier layers play a more significant role in capturing and reproducing the style features of the original image.
   {{< figure src="./data/synthesis/content_4_style_11-1.png" title="Synthesis, Style Layer [1-5 to 11-15], Top Left (11-15), Bottom Right (1-5)" >}}
3. **3 by 3 Image Grid:** Explored the impact of optimizing style loss at various layers and chose the best one. We discovered that the textures generated when optimizing style layers 1 to 5 exhibited the highest similarity with the original image. In contrast, the results became increasingly noisy and less visually coherent when the optimization was performed on later layers, such as layers 11 to 15. This observation suggests that earlier layers play a more significant role in capturing and reproducing the style features of the original image.
   {{< figure src="./data/synthesis/content_4_style_11-1.png" title="Synthesis, Style Layer [1-5 to 11-15], Top Left (11-15), Bottom Right (1-5)" >}}

4. **Style Transfer on My Favorite Image:** Optimized two random noise input images with content loss and compared their results with the content image.
    {{< figure src="./data/synthesis/style_1.png" title="Frida Kahlo" >}}
   {{< figure src="./data/synthesis/synthesis_content_4_style_1_4.png" title="Synthesis: Frida Kahlo, Style Layer [1-5]" >}}
   {{< figure src="./data/synthesis/style_2.png" title="Picasso" >}}
   {{< figure src="./data/synthesis/synthesis_content_4_style_1_4_picasso.png" title="Synthesis: Picasso, Style Layer [1-5]" >}}

#### Observations:

We observed that the results with the cycle-consistency loss were better than the results without it. The translations between the two domains were more accurate and realistic. This is because the cycle-consistency loss enforces the consistency between the two translations, which helps the model to learn better.

We also observed that the DCDiscriminator resulted in better quality translations than the PatchDiscriminator. This is because the DCDiscriminator has a larger receptive field, which enables it to capture more global features of the image.

#### Conclusion:

In conclusion, we have trained CycleGAN from scratch with and without the cycle-consistency loss, and have compared the results using the DCDiscriminator and the PatchDiscriminator. We have observed that the cycle-consistency loss and the DCDiscriminator resulted in better quality translations between the two domains. These observations can help in improving the translation quality between different domains in image processing applications.

## Bells & Whistles

### Implement and train a diffusion model

#### Training Diffusion Models with Hugging Face's Diffusers

#### Introduction

In this project, we train a simple diffusion model using the Hugging Face's Diffusers library. Diffusion models have become state-of-the-art generative models in recent times.

#### Key Parts of the Code

##### Configuration:

We define a 'TrainingConfig' class that holds all the training hyperparameters.
Hyperparameters include 'image_size', 'train_batch_size', 'eval_batch_size', 'num_epochs', 'gradient_accumulation_steps', 'learning_rate', and 'lr_warmup_steps', among others.
##### Data Preprocessing:

We use the datasets library to load our dataset and apply data transformations.
The dataset is preprocessed using the transforms.Compose function from torchvision.
The dataset is then transformed on-the-fly during training.
##### Model Definition:

We define our model using the 'UNet2DModel' class from the diffusers library.
The model has various hyperparameters such as 'sample_size', 'in_channels', 'out_channels', 'layers_per_block', 'block_out_channels', 'down_block_types', and 'up_block_types'.
<!-- ```python
from diffusers import UNet2DModel


model = UNet2DModel(
    sample_size=config.image_size,  # the target image resolution
    in_channels=3,  # the number of input channels, 3 for RGB images
    out_channels=3,  # the number of output channels
    layers_per_block=2,  # how many ResNet layers to use per UNet block
    block_out_channels=(128, 128, 256, 256, 512, 512),  # the number of output channes for each UNet block
    down_block_types=( 
        "DownBlock2D",  # a regular ResNet downsampling block
        "DownBlock2D", 
        "DownBlock2D", 
        "DownBlock2D", 
        "AttnDownBlock2D",  # a ResNet downsampling block with spatial self-attention
        "DownBlock2D",
    ), 
    up_block_types=(
        "UpBlock2D",  # a regular ResNet upsampling block
        "AttnUpBlock2D",  # a ResNet upsampling block with spatial self-attention
        "UpBlock2D", 
        "UpBlock2D", 
        "UpBlock2D", 
        "UpBlock2D"  
      ),
) -->
<!-- ``` -->
<!-- ##### Noise Scheduler:

We use the 'DDPMScheduler' class from the diffusers library to define the noise scheduler for our model.
The scheduler takes a batch of images, a batch of random noise, and the timesteps for each image.
```python
from diffusers import DDPMScheduler

noise_scheduler = DDPMScheduler(num_train_timesteps=1000)
``` -->
#### Training Setup:

We use an AdamW optimizer and a cosine learning rate schedule for training.
We use the DDPMPipeline class from the diffusers library for end-to-end inference during evaluation.
The training function train_loop is defined, which includes gradient accumulation, mixed precision training, and multi-GPU or TPU training using the Accelerator class from the accelerate library.
<!-- 
```python
for step, batch in enumerate(train_dataloader):
    clean_images = batch['images']
    # Sample noise to add to the images
    noise = torch.randn(clean_images.shape).to(clean_images.device)
    bs = clean_images.shape[0]

    # Sample a random timestep for each image
    timesteps = torch.randint(0, noise_scheduler.num_train_timesteps, (bs,), device=clean_images.device).long()

    # Add noise to the clean images according to the noise magnitude at each timestep
    # (this is the forward diffusion process)
    noisy_images = noise_scheduler.add_noise(clean_images, noise, timesteps)
    
    with accelerator.accumulate(model):
        # Predict the noise residual
        noise_pred = model(noisy_images, timesteps, return_dict=False)[0]
        loss = F.mse_loss(noise_pred, noise)
        accelerator.backward(loss)

        accelerator.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        lr_scheduler.step()
        optimizer.zero_grad()
            
```
#### Training Execution: -->

We use the 'notebook_launcher' function from the accelerate library to launch the training from the notebook.
#### Key Functions

*transform(examples)*: Applies the image transformations on the fly during training.
*evaluate(config, epoch, pipeline)*: Generates a batch of sample images during evaluation and saves them as a grid to the disk.
*train_loop(config, model, noise_scheduler, optimizer, train_dataloader, lr_scheduler)*: The main training loop, which includes the forward diffusion process, loss calculation, and backpropagation.
#### Diffusion Results

|  Title     |    Image      |
| :------: | :------: |
|Apple |{{< figure src="./data/difussion/apple.png" >}}                     |
|Cat |{{< figure src="./data/difussion/cat.png"  >}}                 |

The quality of the generated images and how well the DCGAN has captured the main differences between the two domains depend on factors such as the quality of the training data, hyperparameters used during training, and complexity of image domains. If the diffusion results look unrealistic compared to the DCGAN results, it could be due to factors such as dataset quality, model complexity, hyperparameter tuning, or training time. Further analysis and experimentation would be necessary to pinpoint the specific reason for the difference in image quality.
<!-- |D_fake_loss |{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_fake_loss.png" >}}                     |
|D_real_loss |{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_real_loss.png" >}}                     |
|D_X_loss |{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_X_loss.png" >}}                     |
|D_Y_loss |{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_Y_loss.png" >}}                     |
|G_loss |{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/G_loss.png" >}}                     | -->

<!-- Sample images generated during evaluation can be inserted here.
Training metrics such as loss and learning rate can be inserted here. -->
<!-- 
#### cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug

{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/sample-010000-X-Y.png" title="sample X to Y: cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/sample-010000-Y-X.png" title="sample Y to X: cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_fake_loss.png" title="D_fake_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_real_loss.png" title="D_real_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_X_loss.png" title="D_X_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_Y_loss.png" title="D_Y_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/G_loss.png" title="G_loss: cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug, iter = 10000" >}} -->

<!-- #### cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug

{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/sample-010000-X-Y.png" title="sample X to Y: cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/sample-010000-Y-X.png" title="sample Y to X: cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_fake_loss.png" title="D_fake_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_real_loss.png" title="D_real_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_X_loss.png" title="D_X_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_Y_loss.png" title="D_Y_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/G_loss.png" title="G_loss: cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug, iter = 10000" >}} -->

<!-- #### cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug

{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/sample-010000-X-Y.png" title="sample X to Y: cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/sample-010000-Y-X.png" title="sample Y to X: cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_fake_loss.png" title="D_fake_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_real_loss.png" title="D_real_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_X_loss.png" title="D_X_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/D_Y_loss.png" title="D_Y_loss: data_preprocess=deluxe, iter = 10000" >}}
{{< figure src="./data/cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug/G_loss.png" title="G_loss: cat_10deluxe_instance_patch_cycle_naive_cycle_diffaug, iter = 10000" >}} --> -->

<!-- 
(Brief comment on the quality of the generated images, and whether the CycleGAN has captured the main differences between the two domains)

INSERT IMAGE: Two example images of generated apples from oranges, and two example images of generated oranges from apples.

(Brief comment on the quality of the generated images, and whether the CycleGAN has captured the main differences between the two domains) -->

## Conclusion
This report presents our implementation of DCGAN and CycleGAN for various image generation tasks. Through these experiments, we have observed the impact of data augmentation and differentiable augmentation on the training process and final results. We have also seen the capabilities of CycleGAN in generating realistic images for domain-to-domain translation tasks, such as converting Grumpy cats to Russian Blue cats and vice versa, and converting apples to oranges and vice versa.
