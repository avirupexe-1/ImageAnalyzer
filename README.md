---
title: VintageLogin
emoji: 🕰️
colorFrom: yellow
colorTo: gray
sdk: docker
pinned: false
license: mit
short_description: Vintage Flask login app with AI pixel animal buddies
---


# 🕰️ VintageLogin

A full-stack Flask web application with a vintage aesthetic, AI-powered image analysis, and dancing pixel animal companions.

![Python](https://img.shields.io/badge/Python-3.10-blue)
![Flask](https://img.shields.io/badge/Flask-2.x-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-orange)
![NVIDIA](https://img.shields.io/badge/AI-NVIDIA%20NIM-76b900)

## ✨ Features

- 🔐 **User Authentication** — Register and login with hashed passwords using Werkzeug
- 🗃️ **SQLite Database** — Stores user data with Flask-SQLAlchemy
- 🐾 **7 Dancing Pixel Buddies** — A random pixel animal companion greets you every login
- 🤖 **AI Image Analysis** — Drop any image and your buddy describes it in their own personality using NVIDIA NIM (Microsoft Phi-3.5 Vision)
- 🎨 **Vintage UI** — Warm parchment tones, Cormorant Garamond typography, split-card layout
- ✍️ **Letter-by-letter typing effect** — Buddy responses appear one character at a time

## 🐾 Meet the Buddies

| Buddy | Personality |
|---|---|
| Pip the Duck 🐥 | Chaotic and excited about everything |
| Mochi the Cat 🐱 | Dry wit, secretly fascinated |
| Rusty the Fox 🦊 | Clever and witty, spots everything |
| Lily the Frog 🐸 | Chill philosopher frog |
| Coco the Bunny 🐰 | Overenthusiastic, runs on serotonin |
| Bruno the Bear 🐻 | Cozy gentle giant, loves honey |
| Percy the Penguin 🐧 | Very proper, gets flustered easily |

## 🛠️ Tech Stack

- **Backend:** Python, Flask, Flask-SQLAlchemy, Flask-Login, Flask-Migrate
- **Database:** SQLite
- **AI Vision:** NVIDIA NIM API — Microsoft Phi-3.5 Vision Instruct
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Fonts:** Cormorant Garamond, Jost (Google Fonts)
- **Deployment:** Docker, Hugging Face Spaces

## 📁 Project Structure
```
vintagelogin/
├── app.py              # Flask app entry point
├── auth.py             # Login, register, logout routes
├── main.py             # Dashboard route + /describe API
├── models.py           # SQLAlchemy User model
├── vision.py           # NVIDIA NIM image analysis
├── config.py           # App configuration
├── Dockerfile          # For Hugging Face deployment
├── requirements.txt
├── .env.example        # Environment variable template
├── static/
│   ├── css/style.css
│   ├── js/script.js
│   └── images/
│       ├── cats.png         # Login page illustration
│       └── animals/         # Pixel buddy images
│           ├── duck.png
│           ├── cat.png
│           ├── fox.png
│           ├── frog.png
│           ├── bunny.png
│           ├── bear.png
│           └── penguin.png
└── templates/
    ├── login.html
    ├── register.html
    ├── dashboard.html
    └── index.html
```

## 🚀 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/YOURUSERNAME/vintagelogin.git
cd vintagelogin
```

### 2. Create a virtual environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and fill in your keys:
```
SECRET_KEY=your-random-secret-key
NVIDIA_API_KEY=nvapi-your-nvidia-key
FLASK_APP=app.py
```

Get your free NVIDIA API key at [build.nvidia.com](https://build.nvidia.com)

### 5. Run the app
```bash
python app.py
```

Visit `http://127.0.0.1:5000` 🎉

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `SECRET_KEY` | Flask session secret key | ✅ |
| `NVIDIA_API_KEY` | NVIDIA NIM API key (free) | ✅ |
| `FLASK_APP` | Entry point file | ✅ |

## 📸 Screenshots

> Login page, Dashboard, and AI buddy in action — coming soon!

## 🎓 Built By

**Avirup** — B.Tech AI & Data Science, Parul University  
3rd project — learning full-stack development with Flask and databases

## 📄 License

MIT License — free to use and learn from!