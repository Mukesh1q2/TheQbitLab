"""
Avadhan Memory Hierarchy - 3-tier memory system
Working Memory → Episodic Store → Semantic Archive
"""
import torch
import torch.nn.functional as F
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
import time
import numpy as np

try:
    import faiss
    FAISS_AVAILABLE = True
except ImportError:
    FAISS_AVAILABLE = False


@dataclass
class Gist:
    """Compressed memory gist"""
    id: str
    text: str
    vector: torch.Tensor
    slot_id: str
    created_at: float
    confidence: float
    ttl: Optional[float] = None


class MemoryHierarchy:
    """
    3-tier memory hierarchy for Avadhan:
    - Working Memory (M_W): Active slots
    - Episodic Store (M_E): Compressed gists from evicted slots
    - Semantic Archive (M_S): Long-term consolidated knowledge
    
    Uses FAISS for efficient vector search when available
    """
    
    def __init__(
        self,
        dim: int = 384,
        device: torch.device = None,
        use_faiss: bool = True,
    ):
        self.dim = dim
        self.device = device or torch.device("cpu")
        self.use_faiss = use_faiss and FAISS_AVAILABLE
        
        # Episodic store
        self.episodic: List[Gist] = []
        self.episodic_index = None
        
        # Semantic archive
        self.semantic: List[Gist] = []
        self.semantic_index = None
        
        # Initialize FAISS indices if available
        if self.use_faiss:
            self._init_faiss_indices()
    
    def _init_faiss_indices(self):
        """Initialize FAISS indices for fast vector search"""
        self.episodic_index = faiss.IndexFlatIP(self.dim)  # Inner product
        self.semantic_index = faiss.IndexFlatIP(self.dim)
    
    def consolidate(self, slot: Dict) -> Gist:
        """
        Consolidate a slot into a gist for episodic storage
        M_E(t+Δ) = M_E(t) + C_W(M_W(t))
        
        Args:
            slot: Slot dict with 'vector', 'id', etc.
        
        Returns:
            Created Gist
        """
        gist = Gist(
            id=f"gist_{int(time.time())}_{len(self.episodic)}",
            text=f"Consolidated from slot {slot.get('id', 'unknown')}",
            vector=slot["vector"].clone().cpu(),
            slot_id=slot.get("id", ""),
            created_at=time.time(),
            confidence=slot.get("priority", 0.5),
        )
        
        self.episodic.append(gist)
        
        # Add to FAISS index
        if self.use_faiss and self.episodic_index is not None:
            vector_np = F.normalize(gist.vector, dim=0).numpy().reshape(1, -1)
            self.episodic_index.add(vector_np.astype(np.float32))
        
        return gist
    
    def promote_to_semantic(self, gist_id: str) -> bool:
        """
        Promote a gist from episodic to semantic memory
        M_S(t+Δ) = M_S(t) + C_E(M_E(t))
        """
        gist = None
        gist_idx = None
        
        for i, g in enumerate(self.episodic):
            if g.id == gist_id:
                gist = g
                gist_idx = i
                break
        
        if gist is None:
            return False
        
        # Remove from episodic
        self.episodic.pop(gist_idx)
        
        # Add to semantic
        self.semantic.append(gist)
        
        # Update FAISS indices
        if self.use_faiss:
            self._rebuild_indices()
        
        return True
    
    def search_episodic(
        self, 
        query_vector: torch.Tensor, 
        k: int = 3
    ) -> List[Gist]:
        """Search episodic memory for similar gists"""
        if not self.episodic:
            return []
        
        query = F.normalize(query_vector, dim=0)
        
        if self.use_faiss and self.episodic_index is not None:
            query_np = query.cpu().numpy().reshape(1, -1).astype(np.float32)
            distances, indices = self.episodic_index.search(query_np, min(k, len(self.episodic)))
            return [self.episodic[i] for i in indices[0] if i < len(self.episodic)]
        else:
            # Fallback to brute force
            return self._search_brute_force(query, self.episodic, k)
    
    def search_semantic(
        self, 
        query_vector: torch.Tensor, 
        k: int = 3
    ) -> List[Gist]:
        """Search semantic memory for similar gists"""
        if not self.semantic:
            return []
        
        query = F.normalize(query_vector, dim=0)
        
        if self.use_faiss and self.semantic_index is not None:
            query_np = query.cpu().numpy().reshape(1, -1).astype(np.float32)
            distances, indices = self.semantic_index.search(query_np, min(k, len(self.semantic)))
            return [self.semantic[i] for i in indices[0] if i < len(self.semantic)]
        else:
            return self._search_brute_force(query, self.semantic, k)
    
    def _search_brute_force(
        self, 
        query: torch.Tensor, 
        gists: List[Gist], 
        k: int
    ) -> List[Gist]:
        """Brute force search fallback"""
        if not gists:
            return []
        
        similarities = []
        for gist in gists:
            sim = F.cosine_similarity(
                query.unsqueeze(0), 
                gist.vector.unsqueeze(0)
            ).item()
            similarities.append((sim, gist))
        
        similarities.sort(key=lambda x: x[0], reverse=True)
        return [g for _, g in similarities[:k]]
    
    def _rebuild_indices(self):
        """Rebuild FAISS indices after modifications"""
        if not self.use_faiss:
            return
        
        # Rebuild episodic index
        self.episodic_index = faiss.IndexFlatIP(self.dim)
        if self.episodic:
            vectors = np.stack([
                F.normalize(g.vector, dim=0).numpy() 
                for g in self.episodic
            ]).astype(np.float32)
            self.episodic_index.add(vectors)
        
        # Rebuild semantic index
        self.semantic_index = faiss.IndexFlatIP(self.dim)
        if self.semantic:
            vectors = np.stack([
                F.normalize(g.vector, dim=0).numpy() 
                for g in self.semantic
            ]).astype(np.float32)
            self.semantic_index.add(vectors)
    
    def expire_gists(self):
        """Remove expired gists based on TTL"""
        now = time.time()
        
        self.episodic = [
            g for g in self.episodic 
            if g.ttl is None or (now - g.created_at) < g.ttl
        ]
        
        if self.use_faiss:
            self._rebuild_indices()
    
    def get_stats(self) -> Dict:
        """Get memory statistics"""
        return {
            "episodic_count": len(self.episodic),
            "semantic_count": len(self.semantic),
            "total_gists": len(self.episodic) + len(self.semantic),
            "faiss_enabled": self.use_faiss,
        }
    
    def export(self) -> Dict:
        """Export memory for persistence"""
        return {
            "episodic": [
                {
                    "id": g.id,
                    "text": g.text,
                    "slot_id": g.slot_id,
                    "created_at": g.created_at,
                    "confidence": g.confidence,
                }
                for g in self.episodic
            ],
            "semantic": [
                {
                    "id": g.id,
                    "text": g.text,
                    "slot_id": g.slot_id,
                    "created_at": g.created_at,
                    "confidence": g.confidence,
                }
                for g in self.semantic
            ],
        }
