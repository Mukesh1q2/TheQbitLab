// Avadhan Memory Hierarchy
// Implements the 3-tier memory system: Working → Episodic → Semantic
// Reference: Whitepaper Section 7 & 2.5-2.6

import { Slot, Gist, MemoryHierarchy } from './types'

/**
 * Create initial memory hierarchy
 */
export function createMemoryHierarchy(): MemoryHierarchy {
    return {
        working: [],
        episodic: [],
        semantic: [],
    }
}

/**
 * Generate unique gist ID
 */
function generateGistId(): string {
    return `gist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Consolidate a slot into a gist for episodic memory
 * Compresses the slot's state vector into a more compact representation
 * From whitepaper: M_E(t+Δ) = M_E(t) + C_W(M_W(t))
 */
export function consolidateSlotToGist(
    slot: Slot,
    summaryText: string = ''
): Gist {
    // In a real implementation, this would use a trained autoencoder
    // For now, we keep the vector and add metadata
    return {
        id: generateGistId(),
        text: summaryText || `Consolidated from slot ${slot.index}`,
        vector: [...slot.stateVector], // Copy the vector
        provenance: {
            slotId: slot.id,
            createdAt: new Date(),
        },
        confidence: slot.priority, // Use priority as initial confidence
        ttl: undefined, // No expiry by default
    }
}

/**
 * Add slot to working memory
 */
export function addToWorkingMemory(
    memory: MemoryHierarchy,
    slot: Slot
): MemoryHierarchy {
    return {
        ...memory,
        working: [...memory.working, slot],
    }
}

/**
 * Move gist from episodic to semantic memory
 * From whitepaper: M_S(t+Δ) = M_S(t) + C_E(M_E(t))
 */
export function promoteToSemantic(
    memory: MemoryHierarchy,
    gistId: string
): MemoryHierarchy {
    const gist = memory.episodic.find(g => g.id === gistId)
    if (!gist) return memory

    return {
        ...memory,
        episodic: memory.episodic.filter(g => g.id !== gistId),
        semantic: [...memory.semantic, gist],
    }
}

/**
 * Store gist in episodic memory
 */
export function storeInEpisodic(
    memory: MemoryHierarchy,
    gist: Gist
): MemoryHierarchy {
    return {
        ...memory,
        episodic: [...memory.episodic, gist],
    }
}

/**
 * Search episodic memory using vector similarity
 * Returns top-k most similar gists
 */
export function searchEpisodic(
    memory: MemoryHierarchy,
    queryVector: number[],
    k: number = 3
): Gist[] {
    const scored = memory.episodic.map(gist => ({
        gist,
        similarity: cosineSimilarity(queryVector, gist.vector),
    }))

    scored.sort((a, b) => b.similarity - a.similarity)
    return scored.slice(0, k).map(s => s.gist)
}

/**
 * Search semantic memory
 */
export function searchSemantic(
    memory: MemoryHierarchy,
    queryVector: number[],
    k: number = 3
): Gist[] {
    const scored = memory.semantic.map(gist => ({
        gist,
        similarity: cosineSimilarity(queryVector, gist.vector),
    }))

    scored.sort((a, b) => b.similarity - a.similarity)
    return scored.slice(0, k).map(s => s.gist)
}

/**
 * Compute cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0

    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i]
        normA += a[i] * a[i]
        normB += b[i] * b[i]
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB)
    return denominator === 0 ? 0 : dotProduct / denominator
}

/**
 * Retrieve gist back to working memory as a slot
 */
export function retrieveToWorking(
    memory: MemoryHierarchy,
    gistId: string,
    slotIndex: number
): { memory: MemoryHierarchy; slot: Slot | null } {
    // Check episodic first, then semantic
    let gist = memory.episodic.find(g => g.id === gistId)
    if (!gist) {
        gist = memory.semantic.find(g => g.id === gistId)
    }

    if (!gist) {
        return { memory, slot: null }
    }

    const slot: Slot = {
        id: `slot-${slotIndex}-${Date.now()}`,
        index: slotIndex,
        stateVector: [...gist.vector],
        priority: gist.confidence,
        lastActiveAt: new Date(),
        metadata: {
            origin: 'system',
            tags: ['retrieved', gist.id],
        },
    }

    return {
        memory: addToWorkingMemory(memory, slot),
        slot,
    }
}

/**
 * Clean up expired gists
 */
export function expireGists(memory: MemoryHierarchy): MemoryHierarchy {
    const now = Date.now()

    return {
        ...memory,
        episodic: memory.episodic.filter(g => {
            if (!g.ttl) return true
            const age = now - g.provenance.createdAt.getTime()
            return age < g.ttl * 1000
        }),
    }
}

/**
 * Get memory statistics
 */
export function getMemoryStats(memory: MemoryHierarchy): {
    workingCount: number
    episodicCount: number
    semanticCount: number
    totalVectors: number
} {
    return {
        workingCount: memory.working.length,
        episodicCount: memory.episodic.length,
        semanticCount: memory.semantic.length,
        totalVectors:
            memory.working.length +
            memory.episodic.length +
            memory.semantic.length,
    }
}

/**
 * Export memory for persistence
 */
export function exportMemory(memory: MemoryHierarchy): object {
    return {
        working: memory.working.map(s => s.id),
        episodic: memory.episodic.map(g => ({
            id: g.id,
            text: g.text,
            confidence: g.confidence,
            createdAt: g.provenance.createdAt.toISOString(),
        })),
        semantic: memory.semantic.map(g => ({
            id: g.id,
            text: g.text,
            confidence: g.confidence,
        })),
    }
}
