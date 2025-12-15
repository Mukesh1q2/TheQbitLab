'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Square, Settings, Sliders } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrainingControlsProps {
    projectId?: string
    status?: 'idle' | 'training' | 'paused' | 'completed'
    onStart?: () => void
    onPause?: () => void
    onStop?: () => void
    onConfigChange?: (config: TrainingConfig) => void
}

interface TrainingConfig {
    regime: 'ashta' | 'shata' | 'sahasra'
    numSlots: number
    orthogonalityWeight: number
    learningRate: number
    energyConstraint: boolean
}

export function TrainingControls({
    projectId,
    status = 'idle',
    onStart,
    onPause,
    onStop,
    onConfigChange,
}: TrainingControlsProps) {
    const [config, setConfig] = useState<TrainingConfig>({
        regime: 'ashta',
        numSlots: 8,
        orthogonalityWeight: 0.1,
        learningRate: 0.0001,
        energyConstraint: true,
    })
    const [showConfig, setShowConfig] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleStart = async () => {
        if (!projectId) return
        setLoading(true)
        try {
            const res = await fetch('/api/training/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, config }),
            })
            const data = await res.json()
            if (data.success) onStart?.()
        } finally {
            setLoading(false)
        }
    }

    const handlePause = async () => {
        if (!projectId) return
        setLoading(true)
        try {
            await fetch('/api/training/stop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, action: 'pause' }),
            })
            onPause?.()
        } finally {
            setLoading(false)
        }
    }

    const handleStop = async () => {
        if (!projectId) return
        setLoading(true)
        try {
            await fetch('/api/training/stop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, action: 'stop' }),
            })
            onStop?.()
        } finally {
            setLoading(false)
        }
    }

    const updateConfig = (key: keyof TrainingConfig, value: any) => {
        const newConfig = { ...config, [key]: value }
        if (key === 'regime') {
            newConfig.numSlots = value === 'ashta' ? 8 : value === 'shata' ? 100 : 1000
        }
        setConfig(newConfig)
        onConfigChange?.(newConfig)
    }

    const regimes = [
        { id: 'ashta', label: 'Ashta', slots: 8, desc: 'O(N)' },
        { id: 'shata', label: 'Śata', slots: 100, desc: 'O(N²)' },
        { id: 'sahasra', label: 'Sahasra', slots: 1000, desc: 'O(N log N)' },
    ]

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Training Controls</h3>
                </div>
                <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                    <Settings className="w-4 h-4 text-muted-foreground" />
                </button>
            </div>

            {/* Control buttons */}
            <div className="flex gap-2 mb-4">
                {status === 'idle' || status === 'paused' ? (
                    <button
                        onClick={handleStart}
                        disabled={!projectId || loading}
                        className={cn(
                            'flex-1 py-3 px-4 rounded-lg font-medium transition-colors',
                            'bg-green-600 text-white hover:bg-green-700',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            'flex items-center justify-center gap-2'
                        )}
                    >
                        <Play className="w-4 h-4" />
                        {status === 'paused' ? 'Resume' : 'Start Training'}
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handlePause}
                            disabled={loading}
                            className={cn(
                                'flex-1 py-3 px-4 rounded-lg font-medium transition-colors',
                                'bg-amber-600 text-white hover:bg-amber-700',
                                'flex items-center justify-center gap-2'
                            )}
                        >
                            <Pause className="w-4 h-4" />
                            Pause
                        </button>
                        <button
                            onClick={handleStop}
                            disabled={loading}
                            className={cn(
                                'py-3 px-4 rounded-lg font-medium transition-colors',
                                'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                                'flex items-center justify-center gap-2'
                            )}
                        >
                            <Square className="w-4 h-4" />
                        </button>
                    </>
                )}
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2 mb-4">
                <motion.div
                    animate={status === 'training' ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className={cn(
                        'w-2 h-2 rounded-full',
                        status === 'training' && 'bg-green-500',
                        status === 'paused' && 'bg-amber-500',
                        status === 'idle' && 'bg-gray-500',
                        status === 'completed' && 'bg-blue-500'
                    )}
                />
                <span className="text-sm text-muted-foreground capitalize">{status}</span>
            </div>

            {/* Configuration panel */}
            {showConfig && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-border pt-4 space-y-4"
                >
                    {/* Regime selector */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Training Regime
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {regimes.map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => updateConfig('regime', r.id)}
                                    disabled={status === 'training'}
                                    className={cn(
                                        'p-2 rounded-lg border text-center transition-colors',
                                        config.regime === r.id
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border hover:border-primary/50',
                                        'disabled:opacity-50'
                                    )}
                                >
                                    <div className="font-medium text-foreground">{r.label}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {r.slots} slots • {r.desc}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hyperparameters */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Orthogonality Weight (β): {config.orthogonalityWeight}
                        </label>
                        <input
                            type="range"
                            min="0.01"
                            max="1"
                            step="0.01"
                            value={config.orthogonalityWeight}
                            onChange={(e) => updateConfig('orthogonalityWeight', parseFloat(e.target.value))}
                            disabled={status === 'training'}
                            className="w-full accent-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Learning Rate (η): {config.learningRate}
                        </label>
                        <input
                            type="range"
                            min="0.00001"
                            max="0.01"
                            step="0.00001"
                            value={config.learningRate}
                            onChange={(e) => updateConfig('learningRate', parseFloat(e.target.value))}
                            disabled={status === 'training'}
                            className="w-full accent-primary"
                        />
                    </div>

                    {/* Energy constraint toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={config.energyConstraint}
                            onChange={(e) => updateConfig('energyConstraint', e.target.checked)}
                            disabled={status === 'training'}
                            className="rounded border-border"
                        />
                        <span className="text-sm text-foreground">Enable Energy Constraint (Σα = 1)</span>
                    </label>
                </motion.div>
            )}

            {!projectId && (
                <p className="text-sm text-amber-500 mt-2">
                    Create a project first to start training
                </p>
            )}
        </div>
    )
}
