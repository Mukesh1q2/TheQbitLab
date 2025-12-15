"""
Model Loader - Supports ONNX, PyTorch, HuggingFace, SafeTensors
"""
import os
import torch
from typing import Optional, Dict, Any, Union
from pathlib import Path

try:
    import onnxruntime as ort
    ONNX_AVAILABLE = True
except ImportError:
    ONNX_AVAILABLE = False

try:
    from transformers import AutoModel, AutoTokenizer
    HF_AVAILABLE = True
except ImportError:
    HF_AVAILABLE = False

try:
    from safetensors.torch import load_file as load_safetensors
    SAFETENSORS_AVAILABLE = True
except ImportError:
    SAFETENSORS_AVAILABLE = False


class ModelLoader:
    """
    Universal model loader supporting multiple formats:
    - ONNX (.onnx)
    - PyTorch (.pt, .pth, .bin)
    - HuggingFace transformers
    - SafeTensors (.safetensors)
    """
    
    def __init__(self, device: str = "cuda"):
        self.device = torch.device(device if torch.cuda.is_available() else "cpu")
        
        print(f"ModelLoader initialized on {self.device}")
        print(f"  ONNX: {ONNX_AVAILABLE}")
        print(f"  HuggingFace: {HF_AVAILABLE}")
        print(f"  SafeTensors: {SAFETENSORS_AVAILABLE}")
    
    def load(
        self, 
        path: str, 
        model_type: str = "auto",
        **kwargs
    ) -> Any:
        """
        Load a model from path
        
        Args:
            path: Path to model file or directory
            model_type: One of 'auto', 'onnx', 'pytorch', 'huggingface', 'safetensors'
        
        Returns:
            Loaded model
        """
        path = Path(path)
        
        if model_type == "auto":
            model_type = self._detect_type(path)
        
        loaders = {
            "onnx": self._load_onnx,
            "pytorch": self._load_pytorch,
            "huggingface": self._load_huggingface,
            "safetensors": self._load_safetensors,
        }
        
        loader = loaders.get(model_type)
        if loader is None:
            raise ValueError(f"Unknown model type: {model_type}")
        
        return loader(path, **kwargs)
    
    def _detect_type(self, path: Path) -> str:
        """Auto-detect model type from path"""
        if path.is_dir():
            # Check for HuggingFace model
            if (path / "config.json").exists():
                return "huggingface"
            # Check for PyTorch checkpoint
            for ext in [".pt", ".pth", ".bin"]:
                if list(path.glob(f"*{ext}")):
                    return "pytorch"
            # Check for safetensors
            if list(path.glob("*.safetensors")):
                return "safetensors"
        else:
            ext = path.suffix.lower()
            if ext == ".onnx":
                return "onnx"
            elif ext in [".pt", ".pth", ".bin"]:
                return "pytorch"
            elif ext == ".safetensors":
                return "safetensors"
        
        return "pytorch"  # Default
    
    def _load_onnx(self, path: Path, **kwargs) -> Any:
        """Load ONNX model with ONNX Runtime"""
        if not ONNX_AVAILABLE:
            raise ImportError("onnxruntime not installed")
        
        # Find .onnx file
        if path.is_dir():
            onnx_files = list(path.glob("*.onnx"))
            if not onnx_files:
                raise FileNotFoundError(f"No .onnx files in {path}")
            path = onnx_files[0]
        
        # Create session
        providers = ['CUDAExecutionProvider', 'CPUExecutionProvider']
        if self.device.type == "cpu":
            providers = ['CPUExecutionProvider']
        
        session = ort.InferenceSession(str(path), providers=providers)
        
        return {
            "type": "onnx",
            "session": session,
            "inputs": session.get_inputs(),
            "outputs": session.get_outputs(),
        }
    
    def _load_pytorch(self, path: Path, **kwargs) -> Any:
        """Load PyTorch model"""
        # Find model file
        if path.is_dir():
            for ext in [".pt", ".pth", ".bin"]:
                files = list(path.glob(f"*{ext}"))
                if files:
                    path = files[0]
                    break
        
        if not path.exists():
            raise FileNotFoundError(f"Model not found: {path}")
        
        # Load checkpoint
        checkpoint = torch.load(path, map_location=self.device)
        
        # Handle different checkpoint formats
        if isinstance(checkpoint, dict):
            if "model_state_dict" in checkpoint:
                state_dict = checkpoint["model_state_dict"]
            elif "state_dict" in checkpoint:
                state_dict = checkpoint["state_dict"]
            else:
                state_dict = checkpoint
        else:
            # Assume it's a model directly
            model = checkpoint
            model.to(self.device)
            return {"type": "pytorch", "model": model}
        
        return {
            "type": "pytorch",
            "state_dict": state_dict,
            "checkpoint": checkpoint,
        }
    
    def _load_huggingface(self, path: Path, **kwargs) -> Any:
        """Load HuggingFace transformers model"""
        if not HF_AVAILABLE:
            raise ImportError("transformers not installed")
        
        model_path = str(path)
        
        # Load model and tokenizer
        model = AutoModel.from_pretrained(model_path)
        model.to(self.device)
        
        tokenizer = None
        try:
            tokenizer = AutoTokenizer.from_pretrained(model_path)
        except:
            pass
        
        return {
            "type": "huggingface",
            "model": model,
            "tokenizer": tokenizer,
        }
    
    def _load_safetensors(self, path: Path, **kwargs) -> Any:
        """Load SafeTensors model"""
        if not SAFETENSORS_AVAILABLE:
            raise ImportError("safetensors not installed")
        
        # Find .safetensors file
        if path.is_dir():
            st_files = list(path.glob("*.safetensors"))
            if not st_files:
                raise FileNotFoundError(f"No .safetensors files in {path}")
            path = st_files[0]
        
        state_dict = load_safetensors(str(path), device=str(self.device))
        
        return {
            "type": "safetensors",
            "state_dict": state_dict,
        }
    
    def get_model_info(self, model: Dict) -> Dict:
        """Get information about a loaded model"""
        model_type = model.get("type", "unknown")
        
        info = {
            "type": model_type,
            "device": str(self.device),
        }
        
        if model_type == "pytorch":
            if "model" in model:
                info["parameters"] = sum(p.numel() for p in model["model"].parameters())
            elif "state_dict" in model:
                info["layers"] = len(model["state_dict"])
        
        elif model_type == "onnx":
            session = model.get("session")
            if session:
                info["inputs"] = [i.name for i in session.get_inputs()]
                info["outputs"] = [o.name for o in session.get_outputs()]
        
        elif model_type == "huggingface":
            if "model" in model:
                info["parameters"] = sum(p.numel() for p in model["model"].parameters())
                info["config"] = model["model"].config.to_dict() if hasattr(model["model"], "config") else {}
        
        return info
