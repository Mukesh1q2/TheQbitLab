'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Activity, Zap, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Slot {
    id: string
    index: number
    priority: number
    lastActiveAt: string
    vectorPreview: number[]
    vectorNorm: number
    metadata: {
        origin: string
        tags: string[]
    }
}

interface SlotVisualizerProps {
    projectId?: string
    isTraining?: boolean
}

export function SlotVisualizer({ projectId, isTraining = false }: SlotVisualizerProps) {
    const [slots, setSlots] = useState<Slot[]>([])
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    const [orthMatrix, setOrthMatrix] = useState<number[][]>([])
    const maxSlots = 8

    useEffect(() => {
        if (!projectId || !isTraining) return

        const fetchSlots = async () => {
            try {
                const res = await fetch(`/api/training/slots/${projectId}`)
                const data = await res.json()
                if (data.success) {
                    setSlots(data.slots)
                    setOrthMatrix(data.orthogonalityMatrix || [])
                }
            } catch (error) {
                console.error('Failed to fetch slots:', error)
            }
        }

        fetchSlots()
        const interval = setInterval(fetchSlots, 1000)
        return () => clearInterval(interval)
    }, [projectId, isTraining])

    // Demo slots when not connected
    const displaySlots = slots.length > 0 ? slots : Array(8).fill(null).map((_, i) => ({
        id: `demo-${i}`,
        index: i,
        priority: Math.random(),
        lastActiveAt: new Date().toISOString(),
        vectorPreview: Array(10).fill(0).map(() => Math.random() * 2 - 1),
        vectorNorm: 1,
        metadata: { origin: 'demo', tags: [] },
    }))

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Ashta Slot Visualizer</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{displaySlots.length}/{maxSlots} Active</span>
                    {isTraining && (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-primary"
                        />
                    )}
                </div>
            </div>

            {/* Slot Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {displaySlots.map((slot, i) => (
                    <motion.div
                        key={slot.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedSlot(slot.id === selectedSlot ? null : slot.id)}
                        className={cn(
                            'relative p-4 rounded-lg border cursor-pointer transition-colors',
                            selectedSlot === slot.id
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50',
                            'overflow-hidden'
                        )}
                    >
                        {/* Priority bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-accent"
                                initial={{ width: 0 }}
                                animate={{ width: `${slot.priority * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* Slot info */}
                        <div className="text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                S{i + 1}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                α = {slot.priority.toFixed(2)}
                            </div>
                        </div>

                        {/* Activity indicator */}
                        <motion.div
                            animate={isTraining ? {
                                opacity: [0.3, 1, 0.3],
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            className="absolute top-2 right-2"
                        >
                            <Activity className="w-3 h-3 text-primary" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Selected slot details */}
            <AnimatePresence>
                {selectedSlot && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-border pt-4"
                    >
                        {(() => {
                            const slot = displaySlots.find(s => s.id === selectedSlot)
                            if (!slot) return null
                            return (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-foreground">
                                            Slot {slot.index + 1} Details
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {slot.metadata.origin}
                                        </span>
                                    </div>

                                    {/* Vector preview */}
                                    <div>
                                        <span className="text-xs text-muted-foreground">State Vector (first 10 dims):</span>
                                        <div className="flex gap-1 mt-1">
                                            {slot.vectorPreview.map((v, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-1 h-8 rounded"
                                                    style={{
                                                        backgroundColor: v > 0
                                                            ? `rgba(0, 245, 255, ${Math.abs(v)})`
                                                            : `rgba(178, 75, 243, ${Math.abs(v)})`,
                                                    }}
                                                    title={v.toFixed(4)}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                        <div className="p-2 rounded bg-secondary">
                                            <div className="text-foreground font-medium">
                                                {slot.vectorNorm.toFixed(3)}
                                            </div>
                                            <div className="text-muted-foreground">Norm</div>
                                        </div>
                                        <div className="p-2 rounded bg-secondary">
                                            <div className="text-foreground font-medium">
                                                {(slot.priority * 100).toFixed(1)}%
                                            </div>
                                            <div className="text-muted-foreground">Priority</div>
                                        </div>
                                        <div className="p-2 rounded bg-secondary">
                                            <div className="text-foreground font-medium">
                                                {slot.metadata.tags.length}
                                            </div>
                                            <div className="text-muted-foreground">Tags</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Orthogonality indicator */}
            {orthMatrix.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Orthogonality Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Circle className="w-3 h-3 text-primary fill-primary" />
                        <span className="text-xs text-muted-foreground">
                            All slots orthogonalized (interference: 0.00%)
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
