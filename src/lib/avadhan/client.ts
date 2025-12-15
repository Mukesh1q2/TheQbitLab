/**
 * Avadhan Training API Client
 * Connects Next.js frontend to Python FastAPI backend
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_AVADHAN_BACKEND_URL || 'http://localhost:8000'

interface TrainingConfig {
    regime: 'ashta' | 'shata' | 'sahasra'
    num_slots: number
    encoder_dim: number
    orthogonality_weight: number
    learning_rate: number
    batch_size: number
    max_epochs: number
}

interface Slot {
    id: string
    index: number
    priority: number
    thread_id: string
    last_active: number
    update_count: number
    vector_norm: number
    vector_preview: number[]
}

interface TrainingMetrics {
    epoch: number
    loss: number
    generation_loss: number
    contrastive_loss: number
    orthogonality_loss: number
    recall_accuracy: number
    thread_purity: number
    interference_rate: number
    compute_time: number
}

interface TrainingStatus {
    success: boolean
    status: 'idle' | 'training' | 'paused' | 'stopped' | 'completed'
    current_epoch: number
    config: TrainingConfig
    latest_metrics: TrainingMetrics | null
    slots: Slot[]
}

class AvadhanClient {
    private baseUrl: string
    private ws: WebSocket | null = null

    constructor(baseUrl: string = BACKEND_URL) {
        this.baseUrl = baseUrl
    }

    // ============== Health Check ==============

    async healthCheck(): Promise<{
        status: string
        device: string
        cuda_available: boolean
        cuda_device_count: number
    }> {
        const res = await fetch(`${this.baseUrl}/health`)
        return res.json()
    }

    // ============== Training ==============

    async startTraining(
        projectId: string,
        config?: Partial<TrainingConfig>
    ): Promise<{ success: boolean; message: string; project_id: string }> {
        const res = await fetch(`${this.baseUrl}/api/train/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ project_id: projectId, config }),
        })
        return res.json()
    }

    async stopTraining(
        projectId: string,
        action: 'stop' | 'pause' = 'stop'
    ): Promise<{ success: boolean; message: string; status: string }> {
        const res = await fetch(`${this.baseUrl}/api/train/stop`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ project_id: projectId, action }),
        })
        return res.json()
    }

    async getTrainingStatus(projectId: string): Promise<TrainingStatus> {
        const res = await fetch(`${this.baseUrl}/api/train/status/${projectId}`)
        return res.json()
    }

    // ============== Model ==============

    async uploadModel(
        projectId: string,
        file: File,
        modelType: string = 'pytorch'
    ): Promise<{
        success: boolean
        filename: string
        size_mb: number
        model_type: string
        path: string
    }> {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('project_id', projectId)
        formData.append('model_type', modelType)

        const res = await fetch(`${this.baseUrl}/api/model/upload`, {
            method: 'POST',
            body: formData,
        })
        return res.json()
    }

    async loadModel(
        projectId: string,
        modelType: string = 'pytorch'
    ): Promise<{ success: boolean; message: string; model_type: string }> {
        const res = await fetch(`${this.baseUrl}/api/model/load`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ project_id: projectId, model_type: modelType }),
        })
        return res.json()
    }

    // ============== Slots ==============

    async getSlots(projectId: string): Promise<{
        success: boolean
        slots: Slot[]
        orthogonality_matrix: number[][]
    }> {
        const res = await fetch(`${this.baseUrl}/api/slots/${projectId}`)
        return res.json()
    }

    // ============== Metrics ==============

    async getMetrics(
        projectId: string,
        limit: number = 100
    ): Promise<{
        success: boolean
        current_epoch: number
        metrics_history: TrainingMetrics[]
        latest: TrainingMetrics | null
    }> {
        const res = await fetch(
            `${this.baseUrl}/api/metrics/${projectId}?limit=${limit}`
        )
        return res.json()
    }

    // ============== WebSocket ==============

    connectWebSocket(
        projectId: string,
        onMessage: (data: TrainingStatus) => void,
        onError?: (error: Event) => void
    ): void {
        const wsUrl = this.baseUrl.replace('http', 'ws')
        this.ws = new WebSocket(`${wsUrl}/ws/training/${projectId}`)

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                onMessage(data)
            } catch (e) {
                console.error('WebSocket parse error:', e)
            }
        }

        this.ws.onerror = (event) => {
            console.error('WebSocket error:', event)
            onError?.(event)
        }

        this.ws.onclose = () => {
            console.log('WebSocket closed')
        }
    }

    disconnectWebSocket(): void {
        if (this.ws) {
            this.ws.close()
            this.ws = null
        }
    }

    sendPing(): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type: 'ping' }))
        }
    }
}

// Singleton instance
export const avadhanClient = new AvadhanClient()

export type {
    TrainingConfig,
    Slot,
    TrainingMetrics,
    TrainingStatus,
}
