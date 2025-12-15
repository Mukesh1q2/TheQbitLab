"""
Buddhi Controller - Meta-policy for slot management
Implements focus, evict, consolidate decisions with optional RL
"""
import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Dict, List, Tuple, Optional
import numpy as np


class BuddhiController(nn.Module):
    """
    Meta-controller (Buddhi) for Avadhan slot management
    Decides: which slot to focus, evict, and when to consolidate
    
    Can operate in:
    - Heuristic mode (rule-based)
    - RL mode (trained policy network)
    """
    
    def __init__(
        self,
        num_slots: int = 8,
        state_dim: int = 384,
        hidden_dim: int = 128,
        device: torch.device = None,
        use_rl: bool = False,
    ):
        super().__init__()
        
        self.num_slots = num_slots
        self.state_dim = state_dim
        self.device = device or torch.device("cpu")
        self.use_rl = use_rl
        
        # Policy network (for RL mode)
        self.policy_net = nn.Sequential(
            nn.Linear(num_slots * state_dim + num_slots, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, num_slots * 3),  # 3 actions per slot
        ).to(self.device)
        
        # Value network
        self.value_net = nn.Sequential(
            nn.Linear(num_slots * state_dim + num_slots, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, 1),
        ).to(self.device)
        
        # Action history
        self.action_history: List[Dict] = []
        self.cumulative_reward = 0.0
        
    def step(
        self, 
        slot_states: torch.Tensor,
        priorities: Optional[torch.Tensor] = None,
    ) -> List[Dict]:
        """
        Run one controller step
        
        Args:
            slot_states: [num_slots, state_dim] slot vectors
            priorities: [num_slots] attention weights
        
        Returns:
            List of action dicts
        """
        actions = []
        
        if slot_states.numel() == 0:
            return actions
        
        n = slot_states.shape[0]
        
        if priorities is None:
            priorities = torch.ones(n, device=self.device) / n
        
        if self.use_rl:
            actions = self._rl_step(slot_states, priorities)
        else:
            actions = self._heuristic_step(slot_states, priorities)
        
        # Record actions
        self.action_history.extend(actions)
        
        return actions
    
    def _heuristic_step(
        self, 
        slot_states: torch.Tensor,
        priorities: torch.Tensor,
    ) -> List[Dict]:
        """Heuristic-based decision making (LRU + priority)"""
        actions = []
        n = slot_states.shape[0]
        
        # Focus on highest priority slot
        focus_idx = priorities.argmax().item()
        actions.append({
            "type": "focus",
            "slot_idx": focus_idx,
            "reason": "Highest priority",
        })
        
        # Check for slots that should be consolidated (low priority)
        consolidate_threshold = 1.0 / (n * 2)
        for i in range(n):
            if priorities[i].item() < consolidate_threshold:
                actions.append({
                    "type": "consolidate",
                    "slot_idx": i,
                    "reason": "Priority below threshold",
                })
        
        return actions
    
    def _rl_step(
        self, 
        slot_states: torch.Tensor,
        priorities: torch.Tensor,
    ) -> List[Dict]:
        """RL-based decision making using policy network"""
        actions = []
        
        # Flatten state
        flat_states = slot_states.flatten()
        state_input = torch.cat([flat_states, priorities])
        
        # Pad if needed
        expected_size = self.num_slots * self.state_dim + self.num_slots
        if state_input.numel() < expected_size:
            padding = torch.zeros(
                expected_size - state_input.numel(), 
                device=self.device
            )
            state_input = torch.cat([state_input, padding])
        
        # Get action logits
        with torch.no_grad():
            logits = self.policy_net(state_input.unsqueeze(0))
            logits = logits.view(self.num_slots, 3)  # [num_slots, 3 actions]
            
            # Sample actions
            probs = F.softmax(logits, dim=-1)
            actions_tensor = torch.multinomial(probs, 1).squeeze(-1)
        
        # Convert to action dicts
        action_types = ["focus", "consolidate", "suspend"]
        for i in range(min(slot_states.shape[0], self.num_slots)):
            action_idx = actions_tensor[i].item()
            if action_idx > 0:  # 0 = no action
                actions.append({
                    "type": action_types[action_idx],
                    "slot_idx": i,
                    "reason": "RL policy decision",
                })
        
        return actions
    
    def compute_reward(
        self,
        recall_accuracy: float,
        interference_rate: float,
        compute_cost: float,
        lambda_compute: float = 0.01,
        lambda_interference: float = 0.1,
    ) -> float:
        """
        Compute controller reward
        R = accuracy - λ_c * compute_cost - λ_i * interference
        """
        reward = (
            recall_accuracy 
            - lambda_compute * compute_cost 
            - lambda_interference * interference_rate
        )
        self.cumulative_reward += reward
        return reward
    
    def get_recent_actions(self, limit: int = 10) -> List[Dict]:
        """Get recent actions for display"""
        return self.action_history[-limit:]
    
    def get_stats(self) -> Dict:
        """Get controller statistics"""
        action_counts = {"focus": 0, "consolidate": 0, "suspend": 0, "evict": 0}
        
        for action in self.action_history:
            action_type = action.get("type", "unknown")
            if action_type in action_counts:
                action_counts[action_type] += 1
        
        return {
            "total_actions": len(self.action_history),
            "action_counts": action_counts,
            "cumulative_reward": self.cumulative_reward,
        }
    
    def reset(self):
        """Reset controller state"""
        self.action_history = []
        self.cumulative_reward = 0.0
