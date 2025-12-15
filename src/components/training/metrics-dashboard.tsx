'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingDown, Activity, Zap, Brain, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Metrics {
    epoch: number
    loss: number
    generationLoss: number
    contrastiveLoss: number
    orthogonalityLoss: number
    verifierLoss: number
    recallAccuracy: number
    threadPurity: number
    interferenceRate: number
    hallucinationRate: number
    computeCost: number
}

interface MetricsDashboardProps {
    projectId?: string
    isTraining?: boolean
}

export function MetricsDashboard({ projectId, isTraining = false }: MetricsDashboardProps) {
    const [metrics, setMetrics] = useState<Metrics | null>(null)
    const [history, setHistory] = useState<Metrics[]>([])
    const [epoch, setEpoch] = useState(0)

    useEffect(() => {
        if (!projectId || !isTraining) return

        const fetchMetrics = async () => {
            try {
                const res = await fetch(`/api/training/metrics/${projectId}?limit=50`)
                const data = await res.json()
                if (data.success) {
                    setMetrics(data.latestMetrics)
                    setHistory(data.metricsHistory)
                    setEpoch(data.currentEpoch)
                }
            } catch (error) {
                console.error('Failed to fetch metrics:', error)
            }
        }

        fetchMetrics()
        const interval = setInterval(fetchMetrics, 1000)
        return () => clearInterval(interval)
    }, [projectId, isTraining])

    // Demo metrics when not connected
    const displayMetrics = metrics || {
        epoch: 0,
        loss: 1.5,
        generationLoss: 0.9,
        contrastiveLoss: 0.3,
        orthogonalityLoss: 0.2,
        verifierLoss: 0.1,
        recallAccuracy: 0.65,
        threadPurity: 0.72,
        interferenceRate: 0.05,
        hallucinationRate: 0.12,
        computeCost: 0.8,
    }

    const metricCards = [
        {
            label: 'Total Loss',
            value: displayMetrics.loss.toFixed(4),
            icon: TrendingDown,
            color: 'text-red-500',
            trend: 'down',
        },
        {
            label: 'Recall Accuracy',
            value: (displayMetrics.recallAccuracy * 100).toFixed(1) + '%',
            icon: Brain,
            color: 'text-green-500',
            trend: 'up',
        },
        {
            label: 'Thread Purity',
            value: (displayMetrics.threadPurity * 100).toFixed(1) + '%',
            icon: Activity,
            color: 'text-blue-500',
            trend: 'up',
        },
        {
            label: 'Interference',
            value: (displayMetrics.interferenceRate * 100).toFixed(2) + '%',
            icon: Zap,
            color: 'text-purple-500',
            trend: 'down',
        },
        {
            label: 'Hallucination',
            value: (displayMetrics.hallucinationRate * 100).toFixed(1) + '%',
            icon: AlertTriangle,
            color: 'text-amber-500',
            trend: 'down',
        },
        {
            label: 'GPU Cost',
            value: displayMetrics.computeCost.toFixed(2) + 's',
            icon: BarChart3,
            color: 'text-cyan-500',
            trend: 'stable',
        },
    ]

    const lossBreakdown = [
        { label: 'L_gen', value: displayMetrics.generationLoss, color: 'bg-blue-500' },
        { label: 'L_contrast', value: displayMetrics.contrastiveLoss, color: 'bg-purple-500' },
        { label: 'L_orth', value: displayMetrics.orthogonalityLoss, color: 'bg-cyan-500' },
        { label: 'L_verify', value: displayMetrics.verifierLoss, color: 'bg-green-500' },
    ]

    const totalLoss = lossBreakdown.reduce((sum, l) => sum + l.value, 0)

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Training Metrics</h3>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Epoch:</span>
                    <span className="font-mono text-foreground">{epoch}</span>
                </div>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {metricCards.map((card) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-secondary/50 border border-border"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <card.icon className={cn('w-4 h-4', card.color)} />
                            <span className="text-xs text-muted-foreground">{card.label}</span>
                        </div>
                        <div className="text-lg font-bold text-foreground">
                            {card.value}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Loss breakdown */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Loss Breakdown</h4>
                <div className="h-4 rounded-full overflow-hidden flex">
                    {lossBreakdown.map((loss) => (
                        <motion.div
                            key={loss.label}
                            className={cn(loss.color)}
                            initial={{ width: 0 }}
                            animate={{ width: `${(loss.value / totalLoss) * 100}%` }}
                            transition={{ duration: 0.5 }}
                            title={`${loss.label}: ${loss.value.toFixed(4)}`}
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-2">
                    {lossBreakdown.map((loss) => (
                        <div key={loss.label} className="flex items-center gap-1 text-xs">
                            <div className={cn('w-2 h-2 rounded-full', loss.color)} />
                            <span className="text-muted-foreground">{loss.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mini loss chart */}
            {history.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Loss History</h4>
                    <div className="h-20 flex items-end gap-1">
                        {history.slice(-30).map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.min((h.loss / 2) * 100, 100)}%` }}
                                className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t"
                                title={`Epoch ${h.epoch}: ${h.loss.toFixed(4)}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
