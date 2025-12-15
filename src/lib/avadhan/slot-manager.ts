// Avadhan Slot Manager
// Implements the Ashta (8-slot) Working Memory system
// Reference: Whitepaper Section 2.2 & 4.1

import { Slot, SlotManagerState, AvadhanConfig, DEFAULT_ASHTA_CONFIG } from './types'
import { orthogonalize, computeOrthogonalityMatrix } from './orthogonalizer'

/**
 * Generate a random unit vector of dimension d
 */
function randomUnitVector(d: number): number[] {
    const v = Array(d).fill(0).map(() => Math.random() * 2 - 1)
    const norm = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0))
    return v.map(x => x / norm)
}

/**
 * Create initial slot manager state
 */
export function createSlotManager(config: AvadhanConfig = DEFAULT_ASHTA_CONFIG): SlotManagerState {
    return {
        slots: [],
        maxSlots: config.numSlots,
        nextIndex: 0,
        orthogonalityMatrix: [],
    }
}

/**
 * Create a new slot with given content
 */
export function createSlot(
    index: number,
    stateVector: number[],
    metadata: Slot['metadata'] = { origin: 'user', tags: [] }
): Slot {
    return {
        id: `slot-${index}-${Date.now()}`,
        index,
        stateVector,
        priority: 1.0 / (index + 1), // Initial priority decay
        lastActiveAt: new Date(),
        metadata,
    }
}

/**
 * Ingest new input into the slot manager
 * From whitepaper Algorithm 4.1 (ashta_ingest)
 */
export function ingestToSlots(
    state: SlotManagerState,
    inputVector: number[],
    threadId: string,
    config: AvadhanConfig = DEFAULT_ASHTA_CONFIG
): { state: SlotManagerState; evictedSlot?: Slot } {
    let evictedSlot: Slot | undefined

    // Check if slot for this thread already exists
    const existingIndex = state.slots.findIndex(s => s.id.includes(threadId))

    if (existingIndex >= 0) {
        // Update existing slot
        const updatedSlots = [...state.slots]
        const existingSlot = updatedSlots[existingIndex]

        // Compose new state: blend existing with new input
        const alpha = 0.7 // blend factor
        const newVector = existingSlot.stateVector.map(
            (v, i) => alpha * v + (1 - alpha) * inputVector[i]
        )

        // Normalize
        const norm = Math.sqrt(newVector.reduce((sum, x) => sum + x * x, 0))

        updatedSlots[existingIndex] = {
            ...existingSlot,
            stateVector: newVector.map(x => x / norm),
            lastActiveAt: new Date(),
            priority: Math.min(existingSlot.priority + 0.1, 1.0),
        }

        // Orthogonalize all slots
        const orthSlots = orthogonalize(updatedSlots)

        return {
            state: {
                ...state,
                slots: orthSlots,
                orthogonalityMatrix: computeOrthogonalityMatrix(orthSlots),
            },
        }
    }

    // Need to create new slot
    if (state.slots.length >= state.maxSlots) {
        // Evict lowest priority slot
        const sortedByPriority = [...state.slots].sort((a, b) => a.priority - b.priority)
        evictedSlot = sortedByPriority[0]

        state = {
            ...state,
            slots: state.slots.filter(s => s.id !== evictedSlot!.id),
        }
    }

    // Create new slot
    const newSlot = createSlot(state.nextIndex, inputVector, {
        origin: 'user',
        tags: [threadId],
    })

    const updatedSlots = [...state.slots, newSlot]
    const orthSlots = orthogonalize(updatedSlots)

    return {
        state: {
            slots: orthSlots,
            maxSlots: state.maxSlots,
            nextIndex: state.nextIndex + 1,
            orthogonalityMatrix: computeOrthogonalityMatrix(orthSlots),
        },
        evictedSlot,
    }
}

/**
 * Update attention weights (α_i) based on Boltzmann distribution
 * From whitepaper: α_i = exp(β v_i) / Σ_j exp(β v_j)
 * where v_i = r_i - λ f_i (reward - fatigue)
 */
export function updateAttentionWeights(
    slots: Slot[],
    rewards: number[],
    beta: number = 1.0,
    fatigueDecay: number = 0.1
): Slot[] {
    if (slots.length === 0) return []

    // Compute utility values
    const now = Date.now()
    const utilities = slots.map((slot, i) => {
        const reward = rewards[i] || 0
        const fatigue = (now - slot.lastActiveAt.getTime()) / (1000 * 60) * fatigueDecay
        return reward - fatigue
    })

    // Compute softmax (Boltzmann distribution)
    const maxUtil = Math.max(...utilities)
    const expUtils = utilities.map(u => Math.exp(beta * (u - maxUtil)))
    const sumExp = expUtils.reduce((sum, e) => sum + e, 0)
    const alphas = expUtils.map(e => e / sumExp)

    return slots.map((slot, i) => ({
        ...slot,
        priority: alphas[i],
    }))
}

/**
 * Get slot by ID
 */
export function getSlot(state: SlotManagerState, slotId: string): Slot | undefined {
    return state.slots.find(s => s.id === slotId)
}

/**
 * Get all slots sorted by priority
 */
export function getSlotsByPriority(state: SlotManagerState): Slot[] {
    return [...state.slots].sort((a, b) => b.priority - a.priority)
}

/**
 * Compute total energy used (sum of attention weights)
 * Should always equal 1 under energy constraint
 */
export function computeEnergyUsage(slots: Slot[]): number {
    return slots.reduce((sum, s) => sum + s.priority, 0)
}

/**
 * Reset all slots to uniform priority
 */
export function resetPriorities(slots: Slot[]): Slot[] {
    const uniformPriority = 1.0 / slots.length
    return slots.map(s => ({ ...s, priority: uniformPriority }))
}

/**
 * Export slot states for persistence
 */
export function exportSlots(state: SlotManagerState): object {
    return {
        slots: state.slots.map(s => ({
            id: s.id,
            index: s.index,
            priority: s.priority,
            lastActiveAt: s.lastActiveAt.toISOString(),
            vectorDim: s.stateVector.length,
            metadata: s.metadata,
        })),
        maxSlots: state.maxSlots,
        nextIndex: state.nextIndex,
    }
}
