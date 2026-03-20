import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-fallback-key-change-in-production")
    
    DATABASE_URL = os.environ.get("DATABASE_URL", "")
    
    # Fix postgres:// -> postgresql:// for SQLAlchemy
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 300,
        "connect_args": {
            "sslmode": "require"
        }
    }
    
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    
    NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY", "")
