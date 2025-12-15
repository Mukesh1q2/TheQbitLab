"""
Avadhan Training Backend - FastAPI Application
"""
import asyncio
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from config import settings
from api.routes import router as api_router
from api.websocket import router as ws_router

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info(f"Starting Avadhan Backend on {settings.HOST}:{settings.PORT}")
    logger.info(f"Device: {settings.DEVICE}")
    
    # Create directories
    import os
    os.makedirs(settings.MODELS_DIR, exist_ok=True)
    os.makedirs(settings.CHECKPOINTS_DIR, exist_ok=True)
    os.makedirs(settings.LOGS_DIR, exist_ok=True)
    
    yield
    
    # Shutdown
    logger.info("Shutting down Avadhan Backend")

# Create FastAPI app
app = FastAPI(
    title="Avadhan Training API",
    description="Python/PyTorch backend for Avadhan hybrid architecture training",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api_router, prefix="/api")
app.include_router(ws_router, prefix="/ws")

@app.get("/")
async def root():
    return {
        "name": "Avadhan Training Backend",
        "version": "1.0.0",
        "device": settings.DEVICE,
    }

@app.get("/health")
async def health_check():
    import torch
    return {
        "status": "healthy",
        "device": settings.DEVICE,
        "cuda_available": torch.cuda.is_available(),
        "cuda_device_count": torch.cuda.device_count() if torch.cuda.is_available() else 0,
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )
