'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { avadhanClient, TrainingStatus, TrainingMetrics, Slot } from '@/lib/avadhan/client'

interface UseAvadhanOptions {
    projectId: string | null
    pollingInterval?: number
    useWebSocket?: boolean
}

interface UseAvadhanReturn {
    // State
    isConnected: boolean
    isBackendAvailable: boolean
    status: 'idle' | 'training' | 'paused' | 'completed' | 'error'
    currentEpoch: number
    slots: Slot[]
    metrics: TrainingMetrics | null
    metricsHistory: TrainingMetrics[]
    error: string | null

    // Actions
    startTraining: (config?: any) => Promise<void>
    stopTraining: () => Promise<void>
    pauseTraining: () => Promise<void>
    uploadModel: (file: File, modelType?: string) => Promise<void>
    refresh: () => Promise<void>
}

export function useAvadhan({
    projectId,
    pollingInterval = 1000,
    useWebSocket = true,
}: UseAvadhanOptions): UseAvadhanReturn {
    const [isConnected, setIsConnected] = useState(false)
    const [isBackendAvailable, setIsBackendAvailable] = useState(false)
    const [status, setStatus] = useState<UseAvadhanReturn['status']>('idle')
    const [currentEpoch, setCurrentEpoch] = useState(0)
    const [slots, setSlots] = useState<Slot[]>([])
    const [metrics, setMetrics] = useState<TrainingMetrics | null>(null)
    const [metricsHistory, setMetricsHistory] = useState<TrainingMetrics[]>([])
    const [error, setError] = useState<string | null>(null)

    const pollingRef = useRef<NodeJS.Timeout | null>(null)

    // Check backend availability
    useEffect(() => {
        const checkBackend = async () => {
            try {
                const health = await avadhanClient.healthCheck()
                setIsBackendAvailable(health.status === 'healthy')
                setIsConnected(true)
            } catch (e) {
                setIsBackendAvailable(false)
                setIsConnected(false)
            }
        }

        checkBackend()
        const interval = setInterval(checkBackend, 30000) // Check every 30s

        return () => clearInterval(interval)
    }, [])

    // Handle status update
    const handleStatusUpdate = useCallback((data: TrainingStatus) => {
        if (data.status) {
            setStatus(data.status as any)
        }
        if (data.current_epoch !== undefined) {
            setCurrentEpoch(data.current_epoch)
        }
        if (data.slots) {
            setSlots(data.slots)
        }
        if (data.latest_metrics) {
            setMetrics(data.latest_metrics)
        }
    }, [])

    // WebSocket connection
    useEffect(() => {
        if (!projectId || !useWebSocket || !isBackendAvailable) return

        avadhanClient.connectWebSocket(
            projectId,
            handleStatusUpdate,
            (error) => {
                console.error('WebSocket error:', error)
                setError('WebSocket connection error')
            }
        )

        return () => {
            avadhanClient.disconnectWebSocket()
        }
    }, [projectId, useWebSocket, isBackendAvailable, handleStatusUpdate])

    // Polling fallback
    useEffect(() => {
        if (!projectId || !isBackendAvailable) return
        if (useWebSocket && status === 'training') return // Use WS when training

        const poll = async () => {
            try {
                const statusData = await avadhanClient.getTrainingStatus(projectId)
                handleStatusUpdate(statusData)

                if (status === 'training') {
                    const metricsData = await avadhanClient.getMetrics(projectId)
                    setMetricsHistory(metricsData.metrics_history || [])
                }
            } catch (e) {
                console.error('Polling error:', e)
            }
        }

        poll()
        pollingRef.current = setInterval(poll, pollingInterval)

        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current)
            }
        }
    }, [projectId, pollingInterval, isBackendAvailable, useWebSocket, status, handleStatusUpdate])

    // Actions
    const startTraining = useCallback(async (config?: any) => {
        if (!projectId) return
        setError(null)

        try {
            const result = await avadhanClient.startTraining(projectId, config)
            if (result.success) {
                setStatus('training')
            } else {
                setError('Failed to start training')
            }
        } catch (e) {
            setError('Failed to connect to backend')
        }
    }, [projectId])

    const stopTraining = useCallback(async () => {
        if (!projectId) return

        try {
            await avadhanClient.stopTraining(projectId, 'stop')
            setStatus('idle')
        } catch (e) {
            setError('Failed to stop training')
        }
    }, [projectId])

    const pauseTraining = useCallback(async () => {
        if (!projectId) return

        try {
            await avadhanClient.stopTraining(projectId, 'pause')
            setStatus('paused')
        } catch (e) {
            setError('Failed to pause training')
        }
    }, [projectId])

    const uploadModel = useCallback(async (file: File, modelType?: string) => {
        if (!projectId) return
        setError(null)

        try {
            await avadhanClient.uploadModel(projectId, file, modelType)
        } catch (e) {
            setError('Failed to upload model')
        }
    }, [projectId])

    const refresh = useCallback(async () => {
        if (!projectId || !isBackendAvailable) return

        try {
            const statusData = await avadhanClient.getTrainingStatus(projectId)
            handleStatusUpdate(statusData)

            const metricsData = await avadhanClient.getMetrics(projectId)
            setMetricsHistory(metricsData.metrics_history || [])
        } catch (e) {
            setError('Failed to refresh')
        }
    }, [projectId, isBackendAvailable, handleStatusUpdate])

    return {
        isConnected,
        isBackendAvailable,
        status,
        currentEpoch,
        slots,
        metrics,
        metricsHistory,
        error,
        startTraining,
        stopTraining,
        pauseTraining,
        uploadModel,
        refresh,
    }
}
