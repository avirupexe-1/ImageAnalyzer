---
title: VintageLogin
emoji: ■
sdk: docker
app_port: 7860
pinned: false
license: mit
---

# VintageLogin

A full-stack Flask web application with user authentication, PostgreSQL on Neon, 7 dancing pixel animal companions, and AI-powered image analysis using NVIDIA NIM (Phi-3.5 Vision).

## Features

- 🔐 User registration & login with hashed passwords
- 🐘 PostgreSQL database via Neon (cloud)
- 🤖 AI image analysis with 7 personality-driven pixel buddies
- 🎨 Vintage UI with Cormorant Garamond + Jost fonts
- 🖼️ Drag & drop image upload
- 🐾 7 dancing pixel animal companions

## Required Secrets (HF Spaces → Settings → Variables and Secrets)

| Secret | Description |
|--------|-------------|
| `SECRET_KEY` | Random string for session signing |
| `DATABASE_URL` | Neon PostgreSQL connection string (pooling OFF, sslmode=require) |
| `NVIDIA_API_KEY` | NVIDIA NIM API key from build.nvidia.com |

## Tech Stack

- **Backend**: Python 3.10 + Flask
- **Database**: PostgreSQL via Neon
- **Auth**: Flask-Login + Werkzeug
- **AI**: NVIDIA NIM Phi-3.5 Vision
- **Server**: Gunicorn (port 7860)
- **Deploy**: Docker on Hugging Face Spaces

## Local Development

```bash
cp .env.example .env
# Fill in .env with your secrets
pip install -r requirements.txt
python app.py
```

Built by Avirup | B.Tech AI & Data Science, Parul University
