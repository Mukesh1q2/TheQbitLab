"""
Avadhan Slot Manager - PyTorch Implementation
Manages the Ashta (8-slot) working memory system with GPU tensors
"""
import torch
import torch.nn.functional as F
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
import time


class SlotManager:
    """
    Manages parallel attention slots with GPU tensors
    Implements the Ashta (8-slot), Shata (100-slot), Sahasra (1000-slot) regimes
    """
    
    def __init__(
        self,
        num_slots: int = 8,
        dim: int = 384,
        device: torch.device = None,
    ):
        self.num_slots = num_slots
        self.dim = dim
        self.device = device or torch.device("cpu")
        
        # Slot storage
        self.slots: List[Dict] = []
        self.next_index = 0
        
        # Attention weights (α_i) - Boltzmann distributed
        self.attention_weights = torch.ones(num_slots, device=self.device) / num_slots
        
    def ingest(
        self, 
        vector: torch.Tensor, 
        thread_id: str,
        metadata: Optional[Dict] = None,
    ) -> Dict:
        """
        Ingest a new vector into the slot manager
        
        Args:
            vector: Encoded input vector [dim]
            thread_id: Thread identifier
            metadata: Optional metadata
        
        Returns:
            Result dict with slot info and any evicted slot
        """
        result = {"evicted": None, "updated": False, "created": False}
        
        # Ensure vector is on correct device
        if not isinstance(vector, torch.Tensor):
            vector = torch.tensor(vector, device=self.device, dtype=torch.float32)
        vector = vector.to(self.device)
        
        # Check if slot for this thread exists
        existing_idx = self._find_slot(thread_id)
        
        if existing_idx is not None:
            # Update existing slot
            slot = self.slots[existing_idx]
            
            # Exponential moving average update
            alpha = 0.7
            slot["vector"] = alpha * slot["vector"] + (1 - alpha) * vector
            slot["vector"] = F.normalize(slot["vector"], dim=0)
            slot["last_active"] = time.time()
            slot["update_count"] += 1
            
            result["updated"] = True
            result["slot_id"] = slot["id"]
            
        else:
            # Need to create new slot
            if len(self.slots) >= self.num_slots:
                # Evict lowest priority slot
                evict_idx = self._select_eviction_target()
                result["evicted"] = self.slots.pop(evict_idx)
            
            # Create new slot
            slot = {
                "id": f"slot_{self.next_index}_{int(time.time())}",
                "index": self.next_index,
                "vector": F.normalize(vector, dim=0),
                "priority": 1.0 / (self.next_index + 1),
                "last_active": time.time(),
                "thread_id": thread_id,
                "update_count": 1,
                "metadata": metadata or {},
            }
            
            self.slots.append(slot)
            self.next_index += 1
            
            result["created"] = True
            result["slot_id"] = slot["id"]
        
        # Update attention weights
        self._update_attention_weights()
        
        return result
    
    def _find_slot(self, thread_id: str) -> Optional[int]:
        """Find slot index by thread ID"""
        for i, slot in enumerate(self.slots):
            if slot["thread_id"] == thread_id:
                return i
        return None
    
    def _select_eviction_target(self) -> int:
        """Select slot to evict based on LRU + priority"""
        if not self.slots:
            return 0
        
        now = time.time()
        scores = []
        
        for i, slot in enumerate(self.slots):
            age = now - slot["last_active"]
            # Lower score = more likely to evict
            score = slot["priority"] / (1 + age * 0.01)
            scores.append((i, score))
        
        scores.sort(key=lambda x: x[1])
        return scores[0][0]
    
    def _update_attention_weights(self):
        """
        Update attention weights using Boltzmann distribution
        α_i = exp(β * v_i) / Σ exp(β * v_j)
        """
        if not self.slots:
            return
        
        beta = 1.0  # Temperature
        utilities = []
        
        now = time.time()
        for slot in self.slots:
            # Utility = priority - fatigue (time decay)
            fatigue = (now - slot["last_active"]) * 0.001
            utility = slot["priority"] - fatigue
            utilities.append(utility)
        
        utilities = torch.tensor(utilities, device=self.device)
        self.attention_weights = F.softmax(beta * utilities, dim=0)
        
        # Update slot priorities
        for i, slot in enumerate(self.slots):
            if i < len(self.attention_weights):
                slot["priority"] = self.attention_weights[i].item()
    
    def get_slot(self, slot_id: str) -> Optional[Dict]:
        """Get slot by ID"""
        for slot in self.slots:
            if slot["id"] == slot_id:
                return slot
        return None
    
    def get_state_matrix(self) -> torch.Tensor:
        """Get slot vectors as matrix [num_slots, dim]"""
        if not self.slots:
            return torch.zeros(0, self.dim, device=self.device)
        
        vectors = [slot["vector"] for slot in self.slots]
        return torch.stack(vectors)
    
    def export_slots(self) -> List[Dict]:
        """Export slots for API response"""
        exported = []
        for slot in self.slots:
            exported.append({
                "id": slot["id"],
                "index": slot["index"],
                "priority": slot["priority"],
                "thread_id": slot["thread_id"],
                "last_active": slot["last_active"],
                "update_count": slot["update_count"],
                "vector_norm": slot["vector"].norm().item(),
                "vector_preview": slot["vector"][:10].tolist(),
            })
        return exported
    
    def reset(self):
        """Reset all slots"""
        self.slots = []
        self.next_index = 0
        self.attention_weights = torch.ones(self.num_slots, device=self.device) / self.num_slots
