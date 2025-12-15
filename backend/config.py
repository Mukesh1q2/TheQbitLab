"""
Avadhan Training Backend - Configuration
"""
import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # CORS
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:3001"]
    
    # GPU
    DEVICE: str = "cuda" if os.environ.get("CUDA_VISIBLE_DEVICES") else "cpu"
    MIXED_PRECISION: bool = True
    
    # Model defaults
    DEFAULT_ENCODER: str = "sentence-transformers/all-MiniLM-L6-v2"
    DEFAULT_GENERATOR: str = "microsoft/DialoGPT-small"
    MAX_MODEL_SIZE_MB: int = 5000
    
    # Training defaults
    DEFAULT_BATCH_SIZE: int = 8
    DEFAULT_LEARNING_RATE: float = 1e-4
    DEFAULT_NUM_SLOTS: int = 8
    DEFAULT_ENCODER_DIM: int = 384
    
    # Avadhan hyperparameters
    ORTHOGONALITY_WEIGHT: float = 0.1
    CONTRASTIVE_TEMP: float = 0.07
    CONTROLLER_LR: float = 1e-4
    
    # Paths
    MODELS_DIR: str = "./models"
    CHECKPOINTS_DIR: str = "./checkpoints"
    LOGS_DIR: str = "./logs"
    
    class Config:
        env_file = ".env"

settings = Settings()
