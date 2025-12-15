"""
WebSocket for real-time training updates
"""
import asyncio
import json
from typing import Dict, Set
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

# Connected clients per project
connected_clients: Dict[str, Set[WebSocket]] = {}

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}
    
    async def connect(self, websocket: WebSocket, project_id: str):
        await websocket.accept()
        if project_id not in self.active_connections:
            self.active_connections[project_id] = set()
        self.active_connections[project_id].add(websocket)
    
    def disconnect(self, websocket: WebSocket, project_id: str):
        if project_id in self.active_connections:
            self.active_connections[project_id].discard(websocket)
    
    async def broadcast(self, project_id: str, message: dict):
        if project_id in self.active_connections:
            dead_connections = set()
            for connection in self.active_connections[project_id]:
                try:
                    await connection.send_json(message)
                except:
                    dead_connections.add(connection)
            # Clean up dead connections
            for conn in dead_connections:
                self.active_connections[project_id].discard(conn)

manager = ConnectionManager()

@router.websocket("/training/{project_id}")
async def training_websocket(websocket: WebSocket, project_id: str):
    """WebSocket endpoint for real-time training updates"""
    await manager.connect(websocket, project_id)
    
    try:
        while True:
            # Receive any client messages (for control commands)
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout=1.0)
                message = json.loads(data)
                
                # Handle client commands
                if message.get("type") == "ping":
                    await websocket.send_json({"type": "pong"})
                    
            except asyncio.TimeoutError:
                # No message, send status update
                from api.routes import training_sessions
                
                if project_id in training_sessions:
                    session = training_sessions[project_id]
                    engine = session.get("engine")
                    
                    update = {
                        "type": "status_update",
                        "status": session["status"],
                        "current_epoch": session["current_epoch"],
                        "latest_metrics": session["metrics"][-1] if session["metrics"] else None,
                        "slots": engine.get_slot_states() if engine else [],
                    }
                    await websocket.send_json(update)
                    
    except WebSocketDisconnect:
        manager.disconnect(websocket, project_id)

async def broadcast_training_update(project_id: str, update: dict):
    """Broadcast training update to all connected clients"""
    await manager.broadcast(project_id, update)
