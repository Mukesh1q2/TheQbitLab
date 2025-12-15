"""
Avadhan API Routes
"""
import os
import asyncio
from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException, UploadFile, File, Form, BackgroundTasks
from pydantic import BaseModel
import aiofiles

from config import settings

router = APIRouter()

# In-memory storage for training sessions
training_sessions: Dict[str, Any] = {}

# ============== Request/Response Models ==============

class TrainingConfig(BaseModel):
    regime: str = "ashta"  # ashta, shata, sahasra
    num_slots: int = 8
    encoder_dim: int = 384
    orthogonality_weight: float = 0.1
    learning_rate: float = 1e-4
    batch_size: int = 8
    max_epochs: int = 100

class StartTrainingRequest(BaseModel):
    project_id: str
    config: Optional[TrainingConfig] = None

class StopTrainingRequest(BaseModel):
    project_id: str
    action: str = "stop"  # stop or pause

class LoadModelRequest(BaseModel):
    project_id: str
    model_type: str = "pytorch"  # pytorch, onnx, huggingface, safetensors

# ============== Training Endpoints ==============

@router.post("/train/start")
async def start_training(request: StartTrainingRequest, background_tasks: BackgroundTasks):
    """Start Avadhan training"""
    from avadhan.engine import AvadhanEngine
    
    project_id = request.project_id
    config = request.config or TrainingConfig()
    
    # Check if already training
    if project_id in training_sessions:
        session = training_sessions[project_id]
        if session.get("status") == "training":
            return {"success": False, "error": "Training already in progress"}
    
    # Create engine
    try:
        engine = AvadhanEngine(
            num_slots=config.num_slots,
            encoder_dim=config.encoder_dim,
            orthogonality_weight=config.orthogonality_weight,
            learning_rate=config.learning_rate,
            device=settings.DEVICE,
        )
        
        training_sessions[project_id] = {
            "engine": engine,
            "config": config.model_dump(),
            "status": "training",
            "current_epoch": 0,
            "metrics": [],
        }
        
        # Start training in background
        background_tasks.add_task(run_training, project_id, config.max_epochs)
        
        return {
            "success": True,
            "message": "Training started",
            "project_id": project_id,
            "config": config.model_dump(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def run_training(project_id: str, max_epochs: int):
    """Background training loop"""
    session = training_sessions.get(project_id)
    if not session:
        return
    
    engine = session["engine"]
    
    for epoch in range(max_epochs):
        if session["status"] != "training":
            break
        
        # Run training step
        metrics = engine.training_step()
        
        session["current_epoch"] = epoch + 1
        session["metrics"].append(metrics)
        
        # Small delay to prevent CPU hogging
        await asyncio.sleep(0.1)
    
    session["status"] = "completed"

@router.post("/train/stop")
async def stop_training(request: StopTrainingRequest):
    """Stop or pause training"""
    project_id = request.project_id
    
    if project_id not in training_sessions:
        raise HTTPException(status_code=404, detail="Training session not found")
    
    session = training_sessions[project_id]
    session["status"] = "paused" if request.action == "pause" else "stopped"
    
    return {
        "success": True,
        "message": f"Training {request.action}ed",
        "status": session["status"],
    }

@router.get("/train/status/{project_id}")
async def get_training_status(project_id: str):
    """Get training status"""
    if project_id not in training_sessions:
        return {"success": False, "error": "Session not found", "status": "idle"}
    
    session = training_sessions[project_id]
    engine = session.get("engine")
    
    return {
        "success": True,
        "status": session["status"],
        "current_epoch": session["current_epoch"],
        "config": session["config"],
        "latest_metrics": session["metrics"][-1] if session["metrics"] else None,
        "slots": engine.get_slot_states() if engine else [],
    }

# ============== Model Endpoints ==============

@router.post("/model/upload")
async def upload_model(
    file: UploadFile = File(...),
    project_id: str = Form(...),
    model_type: str = Form("pytorch"),
):
    """Upload a model file"""
    # Validate file size
    content = await file.read()
    size_mb = len(content) / (1024 * 1024)
    
    if size_mb > settings.MAX_MODEL_SIZE_MB:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Max: {settings.MAX_MODEL_SIZE_MB}MB"
        )
    
    # Save file
    save_dir = os.path.join(settings.MODELS_DIR, project_id)
    os.makedirs(save_dir, exist_ok=True)
    
    file_path = os.path.join(save_dir, file.filename)
    async with aiofiles.open(file_path, "wb") as f:
        await f.write(content)
    
    return {
        "success": True,
        "filename": file.filename,
        "size_mb": round(size_mb, 2),
        "model_type": model_type,
        "path": file_path,
    }

@router.post("/model/load")
async def load_model(request: LoadModelRequest):
    """Load a model into the engine"""
    from models.loader import ModelLoader
    
    project_id = request.project_id
    model_dir = os.path.join(settings.MODELS_DIR, project_id)
    
    if not os.path.exists(model_dir):
        raise HTTPException(status_code=404, detail="Model directory not found")
    
    try:
        loader = ModelLoader(device=settings.DEVICE)
        model = loader.load(model_dir, request.model_type)
        
        # Store in session
        if project_id in training_sessions:
            training_sessions[project_id]["model"] = model
        
        return {
            "success": True,
            "message": "Model loaded",
            "model_type": request.model_type,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============== Slot Endpoints ==============

@router.get("/slots/{project_id}")
async def get_slots(project_id: str):
    """Get slot states"""
    if project_id not in training_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    engine = training_sessions[project_id].get("engine")
    if not engine:
        raise HTTPException(status_code=404, detail="Engine not initialized")
    
    return {
        "success": True,
        "slots": engine.get_slot_states(),
        "orthogonality_matrix": engine.get_orthogonality_matrix(),
    }

# ============== Metrics Endpoints ==============

@router.get("/metrics/{project_id}")
async def get_metrics(project_id: str, limit: int = 100):
    """Get training metrics history"""
    if project_id not in training_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session = training_sessions[project_id]
    metrics = session.get("metrics", [])
    
    return {
        "success": True,
        "current_epoch": session["current_epoch"],
        "metrics_history": metrics[-limit:],
        "latest": metrics[-1] if metrics else None,
    }
