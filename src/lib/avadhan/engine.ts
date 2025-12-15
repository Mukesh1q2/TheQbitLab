// Avadhan Engine - Main Entry Point
// Orchestrates all Avadhan components for training
// Reference: Whitepaper Section 1 (End-to-end system overview)

import {
    AvadhanConfig,
    TrainingProject,
    TrainingMetrics,
    TrainingStatus,
    TrainingEvent,
    DEFAULT_ASHTA_CONFIG,
    Slot,
    SlotManagerState,
    ControllerState,
    MemoryHierarchy,
} from './types'
import {
    createSlotManager,
    ingestToSlots,
    updateAttentionWeights,
    exportSlots,
} from './slot-manager'
import {
    orthogonalize,
    computeOrthogonalityMatrix,
    computeOrthogonalityLoss,
    computeInterferenceScore,
} from './orthogonalizer'
import {
    createController,
    controllerStep,
    updateController,
} from './controller'
import {
    createMemoryHierarchy,
    consolidateSlotToGist,
    storeInEpisodic,
    getMemoryStats,
} from './memory'
import { encodeText, randomVector } from './encoder'

export interface AvadhanEngineState {
    projectId: string
    config: AvadhanConfig
    status: TrainingStatus
    slotManager: SlotManagerState
    controller: ControllerState
    memory: MemoryHierarchy
    metrics: TrainingMetrics[]
    currentEpoch: number
    eventListeners: ((event: TrainingEvent) => void)[]
}

/**
 * Create a new Avadhan Engine instance
 */
export function createEngine(
    projectId: string,
    config: AvadhanConfig = DEFAULT_ASHTA_CONFIG
): AvadhanEngineState {
    return {
        projectId,
        config,
        status: 'idle',
        slotManager: createSlotManager(config),
        controller: createController(),
        memory: createMemoryHierarchy(),
        metrics: [],
        currentEpoch: 0,
        eventListeners: [],
    }
}

/**
 * Initialize slots with random vectors
 */
export function initializeSlots(
    engine: AvadhanEngineState,
    count: number = 8
): AvadhanEngineState {
    const dim = engine.config.encoderDim
    let state = engine.slotManager

    for (let i = 0; i < Math.min(count, engine.config.numSlots); i++) {
        const vector = randomVector(dim)
        const result = ingestToSlots(state, vector, `init-${i}`, engine.config)
        state = result.state
    }

    return {
        ...engine,
        slotManager: state,
        status: 'initializing',
    }
}

/**
 * Ingest text input into the engine
 */
export function ingest(
    engine: AvadhanEngineState,
    text: string,
    threadId: string
): AvadhanEngineState {
    const vector = encodeText(text, engine.config.encoderDim)
    const result = ingestToSlots(engine.slotManager, vector, threadId, engine.config)

    // If a slot was evicted, consolidate it
    let memory = engine.memory
    if (result.evictedSlot) {
        const gist = consolidateSlotToGist(result.evictedSlot, `Evicted: ${threadId}`)
        memory = storeInEpisodic(memory, gist)

        emitEvent(engine, {
            type: 'consolidation',
            timestamp: new Date(),
            data: { slotId: result.evictedSlot.id, gistId: gist.id },
        })
    }

    emitEvent(engine, {
        type: 'slot_update',
        timestamp: new Date(),
        data: { threadId, slotCount: result.state.slots.length },
    })

    return {
        ...engine,
        slotManager: result.state,
        memory,
    }
}

/**
 * Run a single training step
 */
export function trainingStep(
    engine: AvadhanEngineState,
    inputBatch: { text: string; threadId: string }[]
): AvadhanEngineState {
    let currentEngine = engine

    // Process each input
    for (const input of inputBatch) {
        currentEngine = ingest(currentEngine, input.text, input.threadId)
    }

    // Update attention weights
    const rewards = currentEngine.slotManager.slots.map(() => Math.random())
    const updatedSlots = updateAttentionWeights(
        currentEngine.slotManager.slots,
        rewards,
        1.0,
        engine.config.orthogonalityWeight
    )

    // Orthogonalize
    const orthSlots = orthogonalize(updatedSlots)

    // Controller step
    const { state: newController, actions } = controllerStep(
        currentEngine.controller,
        orthSlots,
        engine.config
    )

    // Emit controller actions
    for (const action of actions) {
        emitEvent(currentEngine, {
            type: 'controller_action',
            timestamp: new Date(),
            data: action,
        })
    }

    // Compute metrics
    const metrics = computeMetrics(orthSlots, currentEngine.currentEpoch)

    emitEvent(currentEngine, {
        type: 'metric_update',
        timestamp: new Date(),
        data: metrics,
    })

    return {
        ...currentEngine,
        slotManager: {
            ...currentEngine.slotManager,
            slots: orthSlots,
            orthogonalityMatrix: computeOrthogonalityMatrix(orthSlots),
        },
        controller: newController,
        metrics: [...currentEngine.metrics, metrics],
        currentEpoch: currentEngine.currentEpoch + 1,
    }
}

/**
 * Compute training metrics for current state
 */
function computeMetrics(slots: Slot[], epoch: number): TrainingMetrics {
    const orthLoss = computeOrthogonalityLoss(slots)
    const interference = computeInterferenceScore(slots)

    // Simulated losses (in production, these would come from actual training)
    const baseLoss = Math.max(0.1, 2.0 - epoch * 0.05)

    return {
        epoch,
        loss: baseLoss + orthLoss,
        generationLoss: baseLoss * 0.6,
        contrastiveLoss: baseLoss * 0.2,
        orthogonalityLoss: orthLoss,
        verifierLoss: baseLoss * 0.1,
        recallAccuracy: Math.min(0.95, 0.5 + epoch * 0.02),
        threadPurity: Math.min(0.98, 0.6 + epoch * 0.015),
        interferenceRate: interference,
        hallucinationRate: Math.max(0.01, 0.2 - epoch * 0.01),
        computeCost: slots.length * 0.1,
    }
}

/**
 * Start training
 */
export function startTraining(engine: AvadhanEngineState): AvadhanEngineState {
    return {
        ...engine,
        status: 'training',
    }
}

/**
 * Pause training
 */
export function pauseTraining(engine: AvadhanEngineState): AvadhanEngineState {
    return {
        ...engine,
        status: 'paused',
    }
}

/**
 * Stop training
 */
export function stopTraining(engine: AvadhanEngineState): AvadhanEngineState {
    return {
        ...engine,
        status: 'completed',
    }
}

/**
 * Add event listener
 */
export function addEventListener(
    engine: AvadhanEngineState,
    listener: (event: TrainingEvent) => void
): AvadhanEngineState {
    return {
        ...engine,
        eventListeners: [...engine.eventListeners, listener],
    }
}

/**
 * Emit event to all listeners
 */
function emitEvent(engine: AvadhanEngineState, event: TrainingEvent): void {
    for (const listener of engine.eventListeners) {
        try {
            listener(event)
        } catch (error) {
            console.error('Event listener error:', error)
        }
    }
}

/**
 * Get current engine state for API response
 */
export function getEngineState(engine: AvadhanEngineState): object {
    return {
        projectId: engine.projectId,
        status: engine.status,
        currentEpoch: engine.currentEpoch,
        config: engine.config,
        slots: exportSlots(engine.slotManager),
        memory: getMemoryStats(engine.memory),
        latestMetrics: engine.metrics[engine.metrics.length - 1] || null,
        metricsHistory: engine.metrics.slice(-100), // Last 100 epochs
    }
}

/**
 * Export everything for persistence
 */
export function exportEngine(engine: AvadhanEngineState): object {
    return {
        projectId: engine.projectId,
        config: engine.config,
        status: engine.status,
        currentEpoch: engine.currentEpoch,
        slots: engine.slotManager.slots.map(s => ({
            id: s.id,
            index: s.index,
            stateVector: s.stateVector,
            priority: s.priority,
            lastActiveAt: s.lastActiveAt.toISOString(),
            metadata: s.metadata,
        })),
        metrics: engine.metrics,
    }
}
