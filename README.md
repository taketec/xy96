⚠️The frontend of the app is largely in works. Only the backend is done.⚠️
## Introduction -
XY96 is a powerful tool designed to streamline the creation of background environments for 3D art, a typically time-consuming and labor-intensive process for VFX artists. Leveraging state-of-the-art text-to-image generation models and  depth estimation integration, XY96 allows for rapid visualization of ideas and ease of creating vfx backgrounds. With a user-friendly interface, artists can generate high-quality images from text prompts and convert them into usable .glb background files with a single click, simplifying the workflow and saving valuable time. XY96 empowers artists to quickly and efficiently create stunning backgrounds, allowing them to focus on the creative aspects of their projects.

##  Tech stack -
 - Frontend - React + Electronjs. 
 - Backend - Expressjs, MongoDB
 - AI models are run on replicate. Payments are done via Razorpay

# Features -

 - ## Final output in blender - 
![](https://github.com/taketec/xy96/blob/main/previews/blender_preview.gif)
(note:corrections can be made to the final output easily)
 - ## Razorpay gateway integration - 
![](https://github.com/taketec/xy96/blob/main/previews/vlc-record-2024-07-21-22h51m25s-React-App-.gif)

 - ## Text to image- 
![](https://github.com/taketec/xy96/blob/main/previews/image-_generation_demo.gif)

 - ## Image to 3d - 
![](https://github.com/taketec/xy96/blob/main/previews/imageto3d_preview.gif)


## Features i will to implement later with time - (from most important to least)
 - switch from fooocus to midjourney, fooocus is just for testing
 - add a international payment gateway (eg: stripe)
 - add redis for polled updates to clients
