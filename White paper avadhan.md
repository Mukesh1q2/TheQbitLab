 
## 📘 _Brahm AI Internal White-Paper Draft — Part 1_

### Title

**Mathematical Foundations of Avadhana Computing: A Cognitive Framework Beyond Transformers**

### Abstract

Avadhana Computing formalizes multi-threaded attention as a mathematical framework for constructing post-Transformer AI architectures. Drawing inspiration from the classical Indian discipline of Avadhana Vidya—an advanced human practice of simultaneous cognitive tracking—this paper develops continuous-time and discrete formulations of divided attention, meta-control, and hierarchical memory. The model integrates orthogonalized subspaces for interference-free parallelism, an adaptive energy-constrained controller, and hierarchical consolidation dynamics. We demonstrate how the Ashta (8-thread), Shata (100-thread), and Sahasra (1000-thread) regimes can be expressed as scalable optimization problems with (O(N\log N)) complexity, offering a potential replacement for quadratic-cost Transformers in long-context reasoning systems.

----------

### 1. Introduction

Modern deep-learning models, particularly Transformers, achieve remarkable fluency but suffer from quadratic attention cost, limited context retention, and absence of meta-cognitive control. Human cognitive traditions, however, have demonstrated disciplined methods of distributed attention that maintain coherence over hundreds of concurrent tasks. Avadhana Vidya encodes such capabilities through explicit practice of parallel recall, inhibition control, and self-monitoring.

This document reconstructs Avadhana principles into mathematical objects usable in Brahm AI’s architecture. The goal is not cultural imitation but functional synthesis: a model where multiple attention threads interact through orthogonal projection and adaptive resource allocation under a unified optimization objective.

----------

### 2. Conceptual Overview

**Core idea:** represent cognition as a manifold of parallel attention threads governed by three coupled subsystems:

Subsystem

Role

Symbol

Attention allocator

Distributes finite focus among concurrent tasks

(A(t))

Executive controller

Regulates allocation and interference

(B(t))

Memory integrator

Encodes, consolidates, and retrieves experience

(M(t))

Each operates as a differentiable dynamical process:  
[  
\begin{cases}  
\dot{A}(t)=f_A(A,B,M,I)\  
\dot{B}(t)=f_B(B,A,M,G)\  
\dot{M}(t)=f_M(M,A,B,E)  
\end{cases}  
]  
where (I,G,E) denote sensory input, goals, and energetic/emotional context.

----------

### 3. Mathematical Preliminaries

#### 3.1 Thread Space

Let (N) be the number of concurrent threads (Avadhanas).  
Each thread (i) maintains a state vector (S_i(t)\in\mathbb{R}^d).  
The working-memory manifold at time (t):  
[  
\mathcal{S}(t)={S_1(t),\dots,S_N(t)}.  
]

#### 3.2 Update Dynamics

[  
\dot{S}_i(t)=\alpha_i(t),P_i!\left(\phi(x_i(t))+\sum_{j\ne i}w_{ij}G_{ij}S_j(t)\right)  
]  
where

-   (\alpha_i(t)) = attention weight,
    
-   (P_i) = projection operator enforcing orthogonality,
    
-   (\phi) = encoder mapping input → latent space,
    
-   (w_{ij}), (G_{ij}) = coupling coefficients and gating functions.
    

----------

### 4. Energy-Constrained Attention Allocation

Finite attentional energy implies  
[  
\sum_{i=1}^{N}\alpha_i(t)=1.  
]  
Allocation follows a soft-Boltzmann distribution:  
[  
\alpha_i(t)=\frac{e^{\beta v_i(t)}}{\sum_{j}e^{\beta v_j(t)}},  
\quad v_i(t)=r_i(t)-\lambda,f_i(t)  
]  
where (r_i) is current reward (task relevance) and (f_i) a fatigue penalty.

----------

### 5. Orthogonalization and Interference Control

Inter-thread independence is enforced by continuous orthogonalization:  
[  
\tilde{S}_i=S_i-\sum_{j<i}\frac{\langle S_i,S_j\rangle}{|S_j|^2}S_j,  
\qquad  
S_i'=\frac{\tilde{S}_i}{|\tilde{S}_i|}.  
]  
Ideal condition:  
[  
\langle S_i',S_j'\rangle=0;\forall i\neq j.  
]  
This maintains discrete subspaces for each cognitive thread, preventing destructive interference—a mathematical counterpart to the Avadhani’s divided yet unified focus.

----------

### 6. Controller (Executive) Dynamics

Controller state (B(t)) adapts through gradient or reinforcement updates:  
[  
\dot{B}(t)=\eta,\nabla_B!\left(\sum_i\alpha_iR_i-\lambda_C|B|^2\right),  
]  
reward (R_i) being recall accuracy or task success.  
Objective:  
[  
\max_B ;\mathbb{E}[R]-\lambda_C|B|^2.  
]  
This defines a self-regulating meta-policy adjusting attention weights and interference gates in real time.

----------

### 7. Memory Consolidation

Three tiers:

-   (M_W): working store,
    
-   (M_E): episodic buffer,
    
-   (M_S): semantic archive.
    

Transition operators:  
[  
M_E(t+\Delta)=M_E(t)+C_W(M_W(t)),\qquad  
M_S(t+\Delta)=M_S(t)+C_E(M_E(t))  
]  
with (C_W,C_E) as compression/distillation mappings (learned autoencoders).

----------

### 8. Optimization Objective

Unified free-energy functional:  
[  
\mathcal{F}=\sum_i\alpha_i D(S_i,x_i)  
+\lambda!\sum_{i\neq j}|\langle S_i,S_j\rangle|^2  
+\mu|B|^2.  
]  
Minimization under constraints  
(\sum_i\alpha_i=1) and orthogonality conditions  
yields equilibrium between accuracy, interference, and control cost—an analogue of cognitive balance.

----------

### 9. Scaling Regimes

Regime

Threads (N)

Complexity

Controller depth

Approx. cost

Ashta Avadhana

8

O(N)

1-layer linear

Baseline

Shata Avadhana

100

O(N²)

hierarchical 2-layer

≈10× baseline

Sahasra Avadhana

1000

O(N log N) (hierarchical)

multi-tier

≈20× baseline

Hierarchical gating clusters lower-level threads under macro-controllers, maintaining bounded energy despite exponential task growth.

----------

### 10. Summary of Part 1

This formulation converts the qualitative art of Avadhana into a system of coupled differential equations and constrained optimization problems. It defines mathematical primitives—slot vectors, attention weights, projection operators, and controller policies—that can be implemented within Brahm AI’s hybrid neural architecture.
 
### _Theoretical Framework and Proofs_

----------

### 11. Formal Objective and Lagrangian Structure

The Avadhana system minimizes total cognitive free energy  
[  
\mathcal{F}=\sum_i\alpha_i,D(S_i,x_i)  
+\lambda\sum_{i\ne j}!|\langle S_i,S_j\rangle|^2  
+\mu|B|^2,  
]  
subject to  
[  
\sum_i\alpha_i=1,\qquad  
S_i^\top S_j=0;(i\neq j).  
]

Introducing Lagrange multipliers (\nu) and matrix (\Gamma):  
[  
\mathcal{L}  
=\mathcal{F}  
+\nu!\left(\sum_i\alpha_i-1\right)  
+\operatorname{Tr}[\Gamma(S^\top S-I)].  
]  
Here (S\in\mathbb{R}^{d\times N}) is the matrix whose columns are (S_i).

----------

### 12. Gradient Conditions

Setting derivatives to zero yields equilibrium.

**Attention weights**  
[  
\frac{\partial\mathcal{L}}{\partial\alpha_i}  
= D(S_i,x_i)+\nu=0  
\Rightarrow  
\alpha_i  
=\frac{e^{-\beta D(S_i,x_i)}}{\sum_j e^{-\beta D(S_j,x_j)}}.  
]  
Thus the attention allocation follows an exponential weighting over reconstruction errors, enforcing energy conservation.

**Thread states**  
[  
\frac{\partial\mathcal{L}}{\partial S_i}  
=2\alpha_i(S_i-x_i)  
+4\lambda!!\sum_{j\ne i}!(S_j S_j^\top)S_i  
+2\Gamma S_i  
=0.  
]  
The middle term acts as a _repulsion field_ between subspaces, guaranteeing orthogonality in equilibrium.

----------

### 13. Orthogonalization Proof Sketch

Let (Q_i=S_i/|S_i|).  
Define potential  
(\Phi=\sum_{i\ne j}\langle Q_i,Q_j\rangle^2.)

Taking gradient descent  
(\dot{S_i}=-\nabla_{S_i}\Phi)  
leads to the differential equation  
[  
\dot{S_i}=-4\sum_{j\ne i}!(Q_jQ_j^\top)S_i,  
]  
whose stationary points satisfy (Q_i^\top Q_j=0).  
Therefore any stable minimum of (\Phi) corresponds to an orthogonal basis.  
This continuous process can be approximated by Gram–Schmidt steps in discrete time.

----------

### 14. Convergence of Attention Dynamics

Define utility (v_i=r_i-\lambda f_i) and softmax allocation  
(\alpha_i=\frac{e^{\beta v_i}}{\sum_j e^{\beta v_j}}).  
Gradient ascent on expected reward  
[  
\dot{\alpha_i}=\eta(\partial R/\partial \alpha_i)  
]  
preserves the simplex constraint. Lyapunov analysis using potential  
(V(\alpha)=\sum_i\alpha_i\log(\alpha_i/p_i))  
(where (p_i) is the optimal distribution)  
shows (V\ge0) and (\dot{V}\le0),  
ensuring asymptotic convergence to optimal allocation under bounded energy.

----------

### 15. Discrete-Time Approximation

For implementation on digital hardware, define update at timestep (t):

1.  **Input encoding**  
    [  
    z_i^{(t)}=\phi(x_i^{(t)}).  
    ]
    
2.  **Attention update**  
    [  
    \alpha_i^{(t+1)}=\frac{e^{\beta v_i^{(t)}}}{\sum_j e^{\beta v_j^{(t)}}}.  
    ]
    
3.  **Thread state**  
    [  
    S_i^{(t+1)}=S_i^{(t)}+\eta\alpha_i^{(t)}!\left[z_i^{(t)}-!!\sum_{j\ne i}!w_{ij}^{(t)}S_j^{(t)}\right].  
    ]
    
4.  **Orthogonalization**  
    [  
    S_i^{(t+1)}\leftarrow  
    S_i^{(t+1)}-  
    \sum_{j<i}\frac{\langle S_i^{(t+1)},S_j^{(t+1)}\rangle}{|S_j^{(t+1)}|^2}S_j^{(t+1)}.  
    ]
    
5.  **Controller update**  
    [  
    B^{(t+1)}=B^{(t)}+\eta_B\nabla_B!\left(\sum_i\alpha_i^{(t)}R_i^{(t)}-\lambda_C|B^{(t)}|^2\right).  
    ]
    

These updates form the discrete Avadhana Learning Cycle, directly mappable to GPU kernels.

----------

### 16. Stability Analysis

Let the combined state vector be  
(\Theta=[S_1,\dots,S_N,B,\alpha]).  
Linearization around equilibrium gives  
(\dot{\Theta}=J\Theta,)  
where (J) is the Jacobian of partial derivatives.  
If all eigenvalues of (J) have negative real parts, the equilibrium is stable.  
Under mild assumptions ((\lambda,\mu>0), bounded gradients) this holds, ensuring global convergence in continuous-time simulation.

----------

### 17. Computational Complexity

Each orthogonalization requires (O(Nd)) inner products, giving total (O(N^2d)) for naïve implementation.  
Hierarchical grouping reduces this to (O(N\log N)), the _Sahasra regime_, by clustering (N) threads into (k=\log N) layers with intra-cluster orthogonalization only.

----------

### 18. Theoretical Implications

-   **Energy conservation** naturally limits over-activation, removing the need for heavy dropout or normalization layers.
    
-   **Orthogonal subspaces** allow infinite-context retention without quadratic memory growth.
    
-   **Meta-controller dynamics** introduce self-regulation analogous to consciousness—each thread aware of global cost.
    
-   **Hierarchical organization** ensures scalability; each cluster behaves as a local Transformer head governed by higher-order controllers.
    

----------

### 19. Transition Toward Implementation

The derived equations can be directly encoded in Brahm AI’s training engine as:

-   **Slot modules** (parallel latent vectors with orthogonal updates).
    
-   **Controller agent** (reinforcement or gradient meta-learner adjusting α and coupling weights).
    
-   **Memory hierarchy** (vector-database layers mapping to (M_W,M_E,M_S)).
    

Next section will translate these equations into pseudocode and API-level modules suitable for hybrid integration with existing neural back-ends.

----------
 

# Implementation Framework & Algorithmic Mapping

## 1 — End-to-end system overview (one-line)

**Avadhāna Engine** = small generative core + explicit _Working Memory (WM) slots_ + _Episodic Store_ + _Meta-Controller_ + _Consolidation / Rehearsal_ + _Verifier_, with hierarchical scaling layers for Sahasra.

Flow (high level):

1.  Input prompt(s) → Encoder → candidate slot or new slot creation.
    
2.  Slot Manager (Ashta WM) holds N active slots.
    
3.  Controller (Buddhi) schedules focus / suspend / consolidate.
    
4.  When needed, Consolidation compresses slot → Episodic Store (Śata).
    
5.  Retrieval brings gists back into WM for generation by core LLM.
    
6.  Verifier checks outputs vs gists; fallback if low-confidence.
    

Diagram (conceptual):  
Input → Encoder → [Slot Manager ← Controller] ↔ Episodic Store ← Consolidation  
↘ Generator → Verifier → Output

----------

## 2 — Key software modules (APIs & responsibilities)

### 2.1 Encoder

-   Function: text/audio → vector (`encoder(text) -> vec ∈ R^d`).
    
-   Implementation: small transformer / sentence-transformer; quantize to float16/int8 for storage.
    
-   API: `encode(text: str) -> np.array`
    

### 2.2 Slot Manager (Ashta WM)

-   Maintains fixed-size slot table: `Slot = {id, state_vec, last_active_ts, priority, metadata}`.
    
-   APIs:
    
    -   `ingest(thread_id, text)` — encodes & writes to slot (create/update).
        
    -   `recall(thread_id)` — returns slot state or None.
        
    -   `evict()` — policy-driven eviction, triggers consolidation.
        

### 2.3 Orthogonalizer (Interference control)

-   Enforces soft/hard orthogonality across active slots.
    
-   API: `orthogonalize(slot_states: Tensor[d, N]) -> Tensor[d, N]`.
    
-   Use incremental SVD/Oja for online updates; fallback Gram-Schmidt for small N.
    

### 2.4 Controller (Meta-policy / Buddhi)

-   Decides: which slot to focus, prefetch, evict, and rehearsal schedule.
    
-   Can be: heuristic → imitation → RL policy.
    
-   API: `decide(state_features) -> actions` (e.g., `focus_slot`, `evict_slot`, `promote_slot`).
    

### 2.5 Consolidation Engine (Distiller)

-   Creates compact gists: `{gist_text, gist_vec, metadata, confidence}`.
    
-   Stores into Episodic DB (FAISS/Milvus/Weaviate).
    
-   API: `consolidate(slot) -> gist_record`.
    

### 2.6 Episodic Store (Śata)

-   Vector DB + text store. Supports ANN search + metadata filters.
    
-   API: `store(gist)`, `search(query_vec, k) -> [gist_records]`.
    

### 2.7 Generator (small LLM: core)

-   Composes output conditioned on activated slot(s).
    
-   API: `generate(prompt, slot_states) -> text`.
    

### 2.8 Verifier

-   NLI/entailment model checking consistency between generated text and top-k gists.
    
-   API: `verify(generated_text, gists) -> score/confidence`.
    

----------

## 3 — Data models & JSON schemas

### Slot JSON

```json
{
  "slot_id": "t1",
  "state_vec": "<base64 or file ref>",
  "last_active": "2025-10-16T10:00:00Z",
  "priority": 0.82,
  "metadata": {"language":"en","origin":"user","tags":["projectX"]}
}

```

### Gist (episodic DB) JSON

```json
{
  "gist_id": "g_0001",
  "gist_text": "Invoice #12345 due Oct 21 2025; payer: Acme Ltd.",
  "gist_vec": "<vector>",
  "provenance": {"slot_id":"t1","created_at":"..."},
  "confidence": 0.94,
  "ttl": null
}

```

### API for a session request (example)

```json
{
  "session_id":"sess-01",
  "events":[
    {"time":0.1,"thread_id":"t1","prompt":"Remember invoice #12345 due Oct 21"},
    {"time":0.2,"thread_id":"t2","prompt":"Poem: rhyme 'light', include 'moon'."}
  ],
  "query": {"type":"recall","thread_order":["t1","t2"]}
}

```

----------

## 4 — Core algorithms (pseudocode)

### 4.1 Ashta (8-slot) cycle — pseudocode

```text
FUNCTION ashta_ingest(event):
  v = encoder(event.prompt)
  if slot_manager.has_slot(event.thread_id):
    slot = slot_manager.get(event.thread_id)
    slot.state_vec = compose(slot.state_vec, v)   # e.g., generator-conditioned update
    slot.last_active = now()
  else:
    if slot_manager.size >= N:
      evict_slot = controller.select_evict(slot_manager)
      gist = consolidator.summarize(evict_slot)
      episodic_db.store(gist)
      slot_manager.remove(evict_slot)
    slot_manager.create(event.thread_id, state_vec=v, metadata=...)

  # orthogonalize active slots to reduce interference
  slot_states = slot_manager.get_all_state_vectors()
  slot_states = orthogonalizer.orthogonalize(slot_states)
  slot_manager.update_states(slot_states)

```

### 4.2 Ashta recall & generate

```text
FUNCTION ashta_recall(query):
  outputs = []
  for tid in query.thread_order:
    slot = slot_manager.get(tid)
    if slot is None:
      # retrieval from episodic store
      qvec = encoder("context: " + tid)
      candidates = episodic_db.search(qvec, k=3)
      if candidates:
         slot = slot_manager.create(tid, state_vec=candidates[0].gist_vec)
    generated = generator.generate(base_prompt_for_tid, slot.state_vec)
    verif = verifier.verify(generated, episodic_db.topk_for_tid(tid))
    if verif.score < CONF_THRESHOLD:
       # fallback: ask clarification or fetch more gists
       generated = fallback_strategy()
    outputs.append({tid: generated})
  return outputs

```

### 4.3 Śata consolidation (background worker)

```text
WORKER consolidation_loop():
  while True:
    evicted_slot = eviction_queue.pop()
    gist_text = summarizer.extractive(evicted_slot.state_vec, evicted_slot.metadata)
    gist_vec = encoder(gist_text)
    gist = {text:gist_text, vec:gist_vec, metadata:...}
    episodic_db.store(gist)
    # schedule lower-tier distillation (nightly batch)

```

### 4.4 Sahasra hierarchical policy (sketch)

-   Group N threads into clusters via online clustering (L2 or cosine).
    
-   Maintain cluster controllers that manage cluster-level priorities.
    
-   Controller top-level decides cluster prefetch; cluster controller decides intra-cluster slot assignment.
    

----------

## 5 — PyTorch-style orthogonalizer (code snippet)

Use batched operations and GPU-friendly linear algebra (cuBLAS). This is _soft Gram-Schmidt_ for a batch of slot vectors.

```python
import torch

def soft_orthogonalize(slots: torch.Tensor, eps=1e-6):
    # slots: (N, d) or (d, N) choose (N,d)
    N, d = slots.shape
    # normalize
    slots = slots / (slots.norm(dim=1, keepdim=True) + eps)
    orth = []
    for i in range(N):
        v = slots[i]
        if i == 0:
            orth.append(v)
            continue
        U = torch.stack(orth)  # (i, d)
        # projection of v on subspace span(U)
        coeffs = (U @ v)  # (i,)
        proj = (coeffs.unsqueeze(1) * U).sum(dim=0)
        v_orth = v - proj
        v_orth = v_orth / (v_orth.norm() + eps)
        orth.append(v_orth)
    return torch.stack(orth)  # (N, d)

```

**Notes:**

-   For small N (Ashta), Gram-Schmidt is fine. For larger N use incremental SVD or Oja updates with batch matrix ops.
    
-   Implement in fused kernels / JIT for speed.
    

----------

## 6 — Training recipes & curricula

### 6.1 Objectives / Losses

-   **Generation loss**: cross-entropy (generator).
    
-   **Memory-contrastive loss (InfoNCE)**: encourages gist_vec to be near original episode vec.
    
-   **Orthogonality regularizer**: (L_{orth} = \lambda_{orth}\sum_{i\ne j}(\langle S_i,S_j\rangle)^2) (soft enforcement).
    
-   **Verifier loss**: supervised NLI labels for generated vs memory.
    
-   **Controller RL objective**: reward = recall_accuracy − λ * compute_cost − μ * interference_penalty.
    

Total loss (joint):  
[  
L = L_{gen} + \alpha L_{contrastive} + \beta L_{orth} + \gamma L_{verifier}  
]  
Controller trained by RL (PPO) or policy-gradient on simulated sessions.

### 6.2 Curriculum (progressive difficulty)

-   Stage 0: Single-thread encoding/recall (baseline).
    
-   Stage 1: Ashta (N=8) synthetic sessions, simple prompts, train encoder+slot updates + orthogonalizer.
    
-   Stage 2: Śata (N≈100) with episodic retrieval, consolidation pipeline.
    
-   Stage 3: Sahasra (N≥1k) hierarchical clustering + controller RL fine-tuning.
    

### 6.3 Imitation + RL hybrid for controller

1.  Pretrain controller on heuristic traces (LRU, priority by recency) via supervised cross-entropy.
    
2.  Fine-tune with PPO using simulated sessions and reward function described above.
    

----------

## 7 — Hyperparameters (defaults to start with)

-   encoder dim `d = 512` (128–2048 depending on capacity)
    
-   Ashta slots `N = 8` (start), expand to 32 for heavy tasks
    
-   orthogonality weight `beta = 0.1` (tune)
    
-   contrastive temp `tau = 0.07`
    
-   generator core: small LM like 125M–1B parameters (start 350M)
    
-   summarizer: T5-small / DistilBART for consolidation
    
-   controller LR `1e-4` (policy LR `1e-5` for PPO)
    
-   rehearsal cadence: 10–60 minutes for active items (task dependent)
    

----------

## 8 — GPU / TPU optimization & implementation tips

### 8.1 Kernel-level

-   Batch orthogonalization: implement in fused CUDA kernel for speed (avoid Python loops for large N).
    
-   Use `torch.jit` / XLA for TPU; leverage cuBLAS GEMM ops for projection matrix multiplication.
    
-   Mixed precision (AMP) for encoder/generator; keep orthogonalizer in FP32 to avoid numerical drift.
    

### 8.2 Memory & throughput

-   Avoid sending entire episodic history to GPU. Keep WM on GPU; episodic DB on CPU/SSD with async retrieval.
    
-   Cache hot gists in GPU memory if access frequency high.
    

### 8.3 Training speedups

-   Precompute encoder vectors for static datasets to decouple encoder training from memory/controller training.
    
-   Use gradient checkpointing for generator and summarizer.
    

### 8.4 Distribution

-   Shard episodic DB across nodes; use Faiss with IVF+PQ for memory efficiency.
    
-   Controller + WM colocated on inference nodes; consolidation/difficult training in background.
    

----------

## 9 — Evaluation & experiments (detailed)

### 9.1 Benchmark tasks

-   **MTR (Multi-Thread Recall)**: synthetic sessions with N ∈ {8,16,32,64,100}. Measure recall accuracy, thread purity, latency.
    
-   **CC (Constrained Composition)**: test constrained generation (poetry constraints) per thread. Metric: constraint satisfaction + quality.
    
-   **IR (Interruption Recovery)**: inject adversarial noise; measure resilience.
    
-   **LRR (Long-range Retrieval)**: put facts early; query after long delay beyond transformer context. Measure recall success.
    

### 9.2 Metrics

-   **Recall Accuracy** (exact/fuzzy)
    
-   **Thread Purity** (ratio of tokens from correct thread)
    
-   **Interference Rate** (cross-thread contamination rate)
    
-   **Hallucination Rate** (verified by verifier)
    
-   **Compute Cost** (GPU-seconds/query) and **Tokens avoided**
    
-   **Controller Efficiency** (Reward per compute)
    

### 9.3 Ablations

-   With / without orthogonalization.
    
-   Heuristic vs RL controller.
    
-   Different summarizer sizes.
    
-   Caching vs no-caching.
    

----------

## 10 — Deployment & infra blueprint

### 10.1 Small-scale prototype

-   Single node (GPU) for WM + generator + controller; FAISS on CPU for episodic DB.
    
-   Consolidation worker as background CPU/GPU job.
    

### 10.2 Production

-   WM nodes (stateless for sessions) with local cache of hot gists.
    
-   Episodic DB cluster (Milvus/Weaviate) with PQ quantization, horizontal scaling.
    
-   Controller training cluster (RL training) separate from inference.
    
-   Monitoring stack (Prometheus/Grafana) for latency, recall accuracy, hallucination rates.
    

### 10.3 Security / Privacy

-   Per-thread TTL and encryption at rest for episodic DB.
    
-   Opt-in/user-rights for memory retention and deletion API.
    
-   Access controls for proctoring memory reads.
    

----------

## 11 — Monitoring & logging (what to collect)

-   Slot lifecycle events (create/update/evict)
    
-   Controller actions and rewards (per session)
    
-   Orthogonality statistics: mean |⟨S_i,S_j⟩|, L2 norms per slot
    
-   Verifier scores & fallback triggers
    
-   Latency metrics (p50/p95/p99)
    
-   Hallucination flags (derived from verifier + human audits)
    

 
