// Avadhan Training Module - Type Definitions
// Based on the Avadhan Hybrid Architecture whitepaper

export interface AvadhanConfig {
    regime: 'ashta' | 'shata' | 'sahasra'
    numSlots: number          // 8, 100, or 1000
    encoderDim: number        // d = 512 default
    orthogonalityWeight: number  // β = 0.1
    contrastiveTemp: number   // τ = 0.07
    controllerLR: number      // 1e-4
    energyConstraint: boolean
}

export interface Slot {
    id: string
    index: number
    stateVector: number[]     // R^d
    priority: number          // α_i attention weight
    lastActiveAt: Date
    metadata: {
        language?: string
        origin: 'user' | 'model' | 'system'
        tags: string[]
    }
}

export interface SlotManagerState {
    slots: Slot[]
    maxSlots: number
    nextIndex: number
    orthogonalityMatrix: number[][] // ⟨S_i, S_j⟩ for all pairs
}

export interface ControllerAction {
    type: 'focus' | 'evict' | 'consolidate' | 'prefetch' | 'suspend'
    slotId: string
    timestamp: Date
    reason: string
}

export interface ControllerState {
    actionHistory: ControllerAction[]
    reward: number
    energyUsed: number
    totalEnergy: number
}

export interface Gist {
    id: string
    text: string
    vector: number[]
    provenance: {
        slotId: string
        createdAt: Date
    }
    confidence: number
    ttl?: number
}

export interface MemoryHierarchy {
    working: Slot[]           // M_W - active slots
    episodic: Gist[]          // M_E - compressed gists
    semantic: Gist[]          // M_S - long-term archive
}

export interface TrainingMetrics {
    epoch: number
    loss: number
    generationLoss: number    // L_gen
    contrastiveLoss: number   // L_contrastive
    orthogonalityLoss: number // L_orth
    verifierLoss: number      // L_verifier
    recallAccuracy: number
    threadPurity: number
    interferenceRate: number
    hallucinationRate: number
    computeCost: number       // GPU-seconds
}

export interface TrainingProject {
    id: string
    name: string
    description: string
    modelPath?: string
    modelFormat: 'onnx' | 'pytorch' | 'tensorflow' | 'custom'
    config: AvadhanConfig
    status: TrainingStatus
    slots: Slot[]
    metrics: TrainingMetrics[]
    memory: MemoryHierarchy
    controller: ControllerState
    createdAt: Date
    updatedAt: Date
}

export type TrainingStatus =
    | 'idle'
    | 'uploading'
    | 'initializing'
    | 'training'
    | 'paused'
    | 'completed'
    | 'error'

export interface TrainingEvent {
    type: 'slot_update' | 'metric_update' | 'controller_action' | 'consolidation' | 'error'
    timestamp: Date
    data: unknown
}

// API Request/Response types
export interface CreateProjectRequest {
    name: string
    description?: string
    config?: Partial<AvadhanConfig>
}

export interface UploadModelRequest {
    projectId: string
    file: File
    format: TrainingProject['modelFormat']
}

export interface StartTrainingRequest {
    projectId: string
    config?: Partial<AvadhanConfig>
}

export interface TrainingStatusResponse {
    project: TrainingProject
    isTraining: boolean
    currentEpoch: number
    latestMetrics?: TrainingMetrics
}

// Default configurations
export const DEFAULT_ASHTA_CONFIG: AvadhanConfig = {
    regime: 'ashta',
    numSlots: 8,
    encoderDim: 512,
    orthogonalityWeight: 0.1,
    contrastiveTemp: 0.07,
    controllerLR: 0.0001,
    energyConstraint: true,
}

export const DEFAULT_SHATA_CONFIG: AvadhanConfig = {
    regime: 'shata',
    numSlots: 100,
    encoderDim: 512,
    orthogonalityWeight: 0.1,
    contrastiveTemp: 0.07,
    controllerLR: 0.0001,
    energyConstraint: true,
}

export const DEFAULT_SAHASRA_CONFIG: AvadhanConfig = {
    regime: 'sahasra',
    numSlots: 1000,
    encoderDim: 512,
    orthogonalityWeight: 0.1,
    contrastiveTemp: 0.07,
    controllerLR: 0.00001,
    energyConstraint: true,
}
