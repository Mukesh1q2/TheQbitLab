// Avadhan Controller (Buddhi)
// Implements the meta-policy for focus, evict, consolidate decisions
// Reference: Whitepaper Section 6 & 2.4

import {
    ControllerState,
    ControllerAction,
    Slot,
    AvadhanConfig,
    DEFAULT_ASHTA_CONFIG
} from './types'

/**
 * Create initial controller state
 */
export function createController(): ControllerState {
    return {
        actionHistory: [],
        reward: 0,
        energyUsed: 0,
        totalEnergy: 1.0, // Normalized energy budget
    }
}

/**
 * Compute controller objective
 * From whitepaper: max_B E[R] - λ_C |B|²
 * R = Σ_i α_i R_i (weighted reward)
 */
export function computeControllerObjective(
    slots: Slot[],
    rewards: number[],
    controllerNorm: number,
    lambda: number = 0.01
): number {
    const weightedReward = slots.reduce((sum, slot, i) => {
        return sum + slot.priority * (rewards[i] || 0)
    }, 0)

    return weightedReward - lambda * controllerNorm * controllerNorm
}

/**
 * Decide which slot to focus on
 * Selects slot with highest priority adjusted by recency
 */
export function decideFocus(
    state: ControllerState,
    slots: Slot[]
): string | null {
    if (slots.length === 0) return null

    const now = Date.now()
    const scored = slots.map(slot => {
        const recencyBonus = 1 / (1 + (now - slot.lastActiveAt.getTime()) / 60000)
        return {
            id: slot.id,
            score: slot.priority + 0.2 * recencyBonus,
        }
    })

    scored.sort((a, b) => b.score - a.score)
    return scored[0].id
}

/**
 * Decide which slot to evict when at capacity
 * Uses LRU with priority weighting
 */
export function decideEvict(
    state: ControllerState,
    slots: Slot[]
): string | null {
    if (slots.length === 0) return null

    const now = Date.now()
    const scored = slots.map(slot => {
        const age = (now - slot.lastActiveAt.getTime()) / 60000 // minutes
        // Lower score = more likely to evict
        return {
            id: slot.id,
            score: slot.priority / (1 + age * 0.1),
        }
    })

    scored.sort((a, b) => a.score - b.score)
    return scored[0].id
}

/**
 * Decide which slots to consolidate
 * Slots with low priority but valuable content should be consolidated
 */
export function decideConsolidate(
    state: ControllerState,
    slots: Slot[],
    threshold: number = 0.1
): string[] {
    return slots
        .filter(s => s.priority < threshold)
        .map(s => s.id)
}

/**
 * Execute a controller action
 */
export function executeAction(
    state: ControllerState,
    action: ControllerAction
): ControllerState {
    return {
        ...state,
        actionHistory: [...state.actionHistory, action],
    }
}

/**
 * Create action record
 */
export function createAction(
    type: ControllerAction['type'],
    slotId: string,
    reason: string
): ControllerAction {
    return {
        type,
        slotId,
        timestamp: new Date(),
        reason,
    }
}

/**
 * Update controller with reward signal
 * From whitepaper: Ḃ = η ∇_B (Σ_i α_i R_i - λ_C |B|²)
 */
export function updateController(
    state: ControllerState,
    reward: number,
    learningRate: number = 0.0001
): ControllerState {
    // Simple exponential moving average for reward tracking
    const newReward = state.reward * 0.9 + reward * 0.1

    return {
        ...state,
        reward: newReward,
    }
}

/**
 * Get recent actions for display
 */
export function getRecentActions(
    state: ControllerState,
    limit: number = 10
): ControllerAction[] {
    return state.actionHistory.slice(-limit).reverse()
}

/**
 * Compute controller statistics
 */
export function getControllerStats(state: ControllerState): {
    totalActions: number
    actionCounts: Record<ControllerAction['type'], number>
    avgReward: number
} {
    const actionCounts: Record<ControllerAction['type'], number> = {
        focus: 0,
        evict: 0,
        consolidate: 0,
        prefetch: 0,
        suspend: 0,
    }

    for (const action of state.actionHistory) {
        actionCounts[action.type]++
    }

    return {
        totalActions: state.actionHistory.length,
        actionCounts,
        avgReward: state.reward,
    }
}

/**
 * Full controller decision-making step
 */
export function controllerStep(
    state: ControllerState,
    slots: Slot[],
    config: AvadhanConfig = DEFAULT_ASHTA_CONFIG
): { state: ControllerState; actions: ControllerAction[] } {
    const actions: ControllerAction[] = []

    // Check if we need to consolidate any slots
    const toConsolidate = decideConsolidate(state, slots)
    for (const slotId of toConsolidate) {
        actions.push(createAction('consolidate', slotId, 'Priority below threshold'))
    }

    // Decide focus
    const focusSlot = decideFocus(state, slots)
    if (focusSlot) {
        actions.push(createAction('focus', focusSlot, 'Highest priority slot'))
    }

    // Execute all actions
    let newState = state
    for (const action of actions) {
        newState = executeAction(newState, action)
    }

    return { state: newState, actions }
}
