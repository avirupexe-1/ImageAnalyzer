---
title: VintageLogin
emoji: 🕰️
colorFrom: yellow
colorTo: gray
sdk: docker
app_port: 7860
pinned: false
license: mit
short_description: Vintage Flask login app with AI pixel animal buddies
---

# 🕰️ VintageLogin

A full-stack Flask web application with a vintage aesthetic, AI-powered image analysis, and dancing pixel animal companions.

## 🔑 Required Secrets (HF Space → Settings → Secrets)

| Secret | Value |
|--------|-------|
| `SECRET_KEY` | Any long random string |
| `NVIDIA_API_KEY` | From [build.nvidia.com](https://build.nvidia.com) |
| `DATABASE_URL` | `postgresql://user:pass@host:5432/dbname` from Supabase or Neon |

## 🐾 Buddies

Pip the Duck 🐥 · Mochi the Cat 🐱 · Rusty the Fox 🦊 · Lily the Frog 🐸 · Coco the Bunny 🐰 · Bruno the Bear 🐻 · Percy the Penguin 🐧

## 🛠️ Stack

Flask · Flask-SQLAlchemy · Flask-Login · Flask-Migrate · PostgreSQL · NVIDIA NIM (Phi-3.5 Vision) · Gunicorn · Docker