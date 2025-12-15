# Avadhan Training Backend

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run server
python main.py
```

Server runs on http://localhost:8000

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check + GPU status |
| `/api/train/start` | POST | Start training |
| `/api/train/stop` | POST | Stop/pause training |
| `/api/train/status/{id}` | GET | Get training status |
| `/api/model/upload` | POST | Upload model file |
| `/api/model/load` | POST | Load model into engine |
| `/api/slots/{id}` | GET | Get slot states |
| `/api/metrics/{id}` | GET | Get training metrics |
| `/ws/training/{id}` | WS | Real-time updates |

## Architecture

```
backend/
├── main.py              # FastAPI app
├── config.py            # Settings
├── api/
│   ├── routes.py        # REST endpoints
│   └── websocket.py     # WebSocket handler
├── avadhan/
│   ├── engine.py        # Main orchestrator
│   ├── slot_manager.py  # 8-slot Ashta system
│   ├── orthogonalizer.py # Gram-Schmidt
│   ├── controller.py    # Buddhi meta-policy
│   ├── memory.py        # 3-tier hierarchy
│   └── encoder.py       # Sentence transformers
└── models/
    └── loader.py        # ONNX/PyTorch/HF loader
```
