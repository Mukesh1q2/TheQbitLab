"""
Avadhan Text Encoder - Sentence Transformers integration
Encodes text to vectors for slot state initialization
"""
import torch
import torch.nn as nn
from typing import List, Union, Optional
import numpy as np

try:
    from sentence_transformers import SentenceTransformer
    ST_AVAILABLE = True
except ImportError:
    ST_AVAILABLE = False


class TextEncoder(nn.Module):
    """
    Text encoder for Avadhan using Sentence Transformers
    Falls back to simple hashing if sentence-transformers not available
    """
    
    def __init__(
        self,
        model_name: str = "sentence-transformers/all-MiniLM-L6-v2",
        dim: int = 384,
        device: torch.device = None,
    ):
        super().__init__()
        
        self.dim = dim
        self.device = device or torch.device("cpu")
        self.model_name = model_name
        
        # Try to load sentence transformer
        if ST_AVAILABLE:
            try:
                self.encoder = SentenceTransformer(model_name)
                self.encoder.to(self.device)
                self.use_st = True
                print(f"Loaded sentence transformer: {model_name}")
            except Exception as e:
                print(f"Failed to load sentence transformer: {e}")
                self.use_st = False
                self._init_fallback()
        else:
            print("Sentence transformers not available, using fallback encoder")
            self.use_st = False
            self._init_fallback()
    
    def _init_fallback(self):
        """Initialize fallback encoder using simple embeddings"""
        self.embedding = nn.Embedding(10000, self.dim)
        self.projection = nn.Linear(self.dim, self.dim)
        self.to(self.device)
    
    def encode(
        self, 
        text: Union[str, List[str]],
        normalize: bool = True,
    ) -> torch.Tensor:
        """
        Encode text to vector(s)
        
        Args:
            text: Single text or list of texts
            normalize: Whether to L2 normalize output
        
        Returns:
            [dim] tensor for single text, [batch, dim] for list
        """
        single_input = isinstance(text, str)
        if single_input:
            text = [text]
        
        if self.use_st:
            embeddings = self._encode_with_st(text)
        else:
            embeddings = self._encode_fallback(text)
        
        if normalize:
            embeddings = torch.nn.functional.normalize(embeddings, dim=-1)
        
        if single_input:
            return embeddings[0]
        
        return embeddings
    
    def _encode_with_st(self, texts: List[str]) -> torch.Tensor:
        """Encode using Sentence Transformers"""
        with torch.no_grad():
            embeddings = self.encoder.encode(
                texts,
                convert_to_tensor=True,
                device=self.device,
                show_progress_bar=False,
            )
        return embeddings
    
    def _encode_fallback(self, texts: List[str]) -> torch.Tensor:
        """Fallback encoding using hashing + embedding"""
        embeddings = []
        
        for text in texts:
            # Simple word hashing
            tokens = self._tokenize(text)
            
            if len(tokens) == 0:
                emb = torch.zeros(self.dim, device=self.device)
            else:
                # Get embeddings for tokens
                token_ids = torch.tensor(tokens, device=self.device)
                token_embs = self.embedding(token_ids)
                
                # Mean pooling
                emb = token_embs.mean(dim=0)
                emb = self.projection(emb)
            
            embeddings.append(emb)
        
        return torch.stack(embeddings)
    
    def _tokenize(self, text: str, max_tokens: int = 128) -> List[int]:
        """Simple tokenization via hashing"""
        words = text.lower().split()[:max_tokens]
        tokens = [hash(word) % 10000 for word in words]
        return tokens
    
    def forward(
        self, 
        texts: Union[str, List[str]]
    ) -> torch.Tensor:
        """Forward pass (alias for encode)"""
        return self.encode(texts)
    
    def get_embedding_dim(self) -> int:
        """Get output embedding dimension"""
        return self.dim
