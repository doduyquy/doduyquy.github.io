---
title: "[For testing] What are Diffusion Models?"
description: "Giải thích Diffusion Models từ trực giác đến công thức và triển khai."
date: 2026-05-15
tags: ["Diffusion", "Deep Learning", "Computer Vision"]
lang: "vi"
draft: false
---

So far, I’ve written about three types of generative models: GAN, VAE, and Flow-based models...Diffusion models are a class of generative AI algorithms that create highly realistic data—such as images, audio, or video—by learning to gradually reverse a noisy process. They are the core technology behind popular AI generators like Midjourney, Stable Diffusion, and DALL-E

## Forward diffusion process

Diffusion models gradually add Gaussian noise to data...
Diffusion Model (Mô hình khuếch tán) là một loại mô hình học sâu (deep learning) tạo sinh (generative model) tiên tiến, được sử dụng chủ yếu để tạo ra dữ liệu mới chất lượng cao như hình ảnh, video, hoặc âm thanh từ nhiễu ngẫu nhiên.


<figure>
  <img src="/diffusion-overview.svg" alt="Mô tả hình ảnh" />
  <figcaption>Hình 1: Quá trình forward của diffusion</figcaption>
</figure>

### 1. Quá trình thêm nhiễu từng bước (Step-by-step Forward Process)
Tại mỗi bước $t$, một lượng nhiễu nhỏ được thêm vào dữ liệu của bước trước đó $x_{t-1}$:

$$
q(x_t | x_{t-1}) = \mathcal{N}(x_t; \sqrt{1 - \beta_t} x_{t-1}, \beta_t \mathbf{I})
$$

### 2. Quá trình thêm nhiễu trực tiếp từ ảnh gốc (Marginal Distribution)
Nhờ tính chất của phân phối chuẩn, ta có thể tính trực tiếp trạng thái $x_t$ từ ảnh gốc $x_0$ ở bất kỳ bước $t$ nào mà không cần tính tuần tự:

$$
q(x_t | x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha}_t} x_0, (1 - \bar{\alpha}_t) \mathbf{I})
$$

### 3. Công thức lấy mẫu (Reparameterization Trick)
Trong thực hành, để tạo ra $x_t$, chúng ta sử dụng công thức biến đổi sau:

$$
x_t = \sqrt{\bar{\alpha}_t} x_0 + \sqrt{1 - \bar{\alpha}_t} \epsilon \quad \text{với} \quad \epsilon \sim \mathcal{N}(0, \mathbf{I})
$$

**Trong đó:**
* $\beta_t$: Hệ số phương sai (variance schedule) kiểm soát lượng nhiễu thêm vào ở mỗi bước.
* $\alpha_t = 1 - \beta_t$
* $\bar{\alpha}_t = \prod_{i=1}^t \alpha_i$
* $\epsilon$: Nhiễu ngẫu nhiên được lấy mẫu từ phân phối chuẩn tắc.

## Reverse process

The model learns how to denoise step by step...
Chúng hoạt động dựa trên nguyên lý đảo ngược quá trình khuếch tán, tức là học cách biến đổi một khung cảnh hỗn độn (nhiễu) thành một cấu trúc dữ liệu rõ ràng, sắc nét.