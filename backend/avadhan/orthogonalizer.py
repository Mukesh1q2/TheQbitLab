"""
Avadhan Orthogonalizer - GPU-accelerated Gram-Schmidt
Implements interference control between attention slots
"""
import torch
import torch.nn.functional as F
from typing import List, Dict


class Orthogonalizer:
    """
    GPU-accelerated orthogonalization for slot state vectors
    Implements Gram-Schmidt with batched operations
    
    From whitepaper:
    S̃_i = S_i - Σ_{j<i} (⟨S_i, S_j⟩ / |S_j|²) S_j
    S'_i = S̃_i / |S̃_i|
    """
    
    def __init__(self, device: torch.device = None, eps: float = 1e-6):
        self.device = device or torch.device("cpu")
        self.eps = eps
    
    def orthogonalize(self, slots: List[Dict]) -> List[Dict]:
        """
        Apply Gram-Schmidt orthogonalization to all slots
        
        Args:
            slots: List of slot dicts with 'vector' key
        
        Returns:
            Slots with orthogonalized vectors
        """
        if len(slots) < 2:
            return slots
        
        # Extract and stack vectors
        vectors = torch.stack([s["vector"] for s in slots])
        
        # Apply batched Gram-Schmidt
        orth_vectors = self._gram_schmidt_batched(vectors)
        
        # Update slots with orthogonalized vectors
        for i, slot in enumerate(slots):
            slot["vector"] = orth_vectors[i]
        
        return slots
    
    def _gram_schmidt_batched(self, vectors: torch.Tensor) -> torch.Tensor:
        """
        Batched Gram-Schmidt orthogonalization
        
        Args:
            vectors: [N, D] tensor of slot vectors
        
        Returns:
            [N, D] tensor of orthogonalized vectors
        """
        n, d = vectors.shape
        device = vectors.device
        
        # Normalize input
        vectors = F.normalize(vectors, dim=1, eps=self.eps)
        
        # Orthogonalize iteratively
        orth = torch.zeros_like(vectors)
        
        for i in range(n):
            v = vectors[i].clone()
            
            # Subtract projections onto all previous orthogonal vectors
            if i > 0:
                # Compute all projections at once
                U = orth[:i]  # [i, D]
                coeffs = torch.mv(U, v)  # [i] = ⟨v, u_j⟩
                projection = torch.sum(coeffs.unsqueeze(1) * U, dim=0)  # [D]
                v = v - projection
            
            # Normalize
            norm = v.norm()
            if norm > self.eps:
                v = v / norm
            
            orth[i] = v
        
        return orth
    
    def compute_matrix(self, slots: List[Dict]) -> torch.Tensor:
        """
        Compute orthogonality matrix: ⟨S_i, S_j⟩ for all pairs
        Ideal: all off-diagonal elements should be 0
        
        Returns:
            [N, N] similarity matrix
        """
        if len(slots) < 2:
            return torch.eye(len(slots), device=self.device)
        
        vectors = torch.stack([s["vector"] for s in slots])
        vectors = F.normalize(vectors, dim=1, eps=self.eps)
        
        # Compute similarity matrix
        sim_matrix = torch.mm(vectors, vectors.t())
        
        return sim_matrix
    
    def compute_interference_rate(self, slots: List[Dict]) -> float:
        """
        Compute interference rate (average off-diagonal similarity)
        Lower is better; 0 means perfect orthogonality
        """
        if len(slots) < 2:
            return 0.0
        
        matrix = self.compute_matrix(slots)
        n = matrix.shape[0]
        
        # Get off-diagonal elements
        mask = ~torch.eye(n, dtype=torch.bool, device=self.device)
        off_diagonal = matrix[mask]
        
        # Average absolute value
        interference = off_diagonal.abs().mean().item()
        
        return interference
    
    def compute_loss(
        self, 
        slots: List[Dict], 
        weight: float = 0.1
    ) -> torch.Tensor:
        """
        Compute orthogonality loss for training
        L_orth = λ Σ_{i≠j} |⟨S_i, S_j⟩|²
        
        Args:
            slots: List of slot dicts
            weight: Orthogonality weight (λ/β)
        
        Returns:
            Scalar loss tensor
        """
        if len(slots) < 2:
            return torch.tensor(0.0, device=self.device)
        
        vectors = torch.stack([s["vector"] for s in slots])
        vectors = F.normalize(vectors, dim=1, eps=self.eps)
        
        # Compute similarity matrix
        sim_matrix = torch.mm(vectors, vectors.t())
        
        # Mask diagonal (self-similarity)
        n = sim_matrix.shape[0]
        mask = ~torch.eye(n, dtype=torch.bool, device=self.device)
        
        # Sum of squared off-diagonal elements
        off_diagonal = sim_matrix[mask]
        loss = (off_diagonal ** 2).sum()
        
        return weight * loss
    
    def apply_repulsion(
        self, 
        slots: List[Dict], 
        learning_rate: float = 0.01
    ) -> List[Dict]:
        """
        Apply repulsion force to reduce interference
        From whitepaper: Ṡ_i = -4 Σ_{j≠i} (Q_j Q_j^T) S_i
        """
        if len(slots) < 2:
            return slots
        
        vectors = torch.stack([s["vector"] for s in slots])
        vectors = F.normalize(vectors, dim=1, eps=self.eps)
        
        n = vectors.shape[0]
        new_vectors = vectors.clone()
        
        for i in range(n):
            repulsion = torch.zeros_like(vectors[i])
            
            for j in range(n):
                if i != j:
                    # Outer product applied: Q_j (Q_j^T S_i)
                    dot = torch.dot(vectors[j], vectors[i])
                    repulsion += dot * vectors[j]
            
            # Apply repulsion
            new_vectors[i] = vectors[i] - 4 * learning_rate * repulsion
            new_vectors[i] = F.normalize(new_vectors[i], dim=0, eps=self.eps)
        
        # Update slots
        for i, slot in enumerate(slots):
            slot["vector"] = new_vectors[i]
        
        return slots
