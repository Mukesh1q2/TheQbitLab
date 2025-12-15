'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    GitCompare,
    ChevronDown,
    CheckCircle,
    XCircle,
    Cpu,
    Brain,
    Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComparisonItem {
    feature: string
    transformer: string | boolean
    avadhan: string | boolean
    winner: 'transformer' | 'avadhan' | 'tie'
}

const comparisons: ComparisonItem[] = [
    {
        feature: 'Attention Complexity',
        transformer: 'O(N²)',
        avadhan: 'O(N log N)',
        winner: 'avadhan',
    },
    {
        feature: 'Context Length',
        transformer: 'Limited (4K-128K)',
        avadhan: 'Unlimited (hierarchical)',
        winner: 'avadhan',
    },
    {
        feature: 'Parallel Processing',
        transformer: 'Single attention head',
        avadhan: '8-1000 parallel slots',
        winner: 'avadhan',
    },
    {
        feature: 'Interference Control',
        transformer: 'None (heads interfere)',
        avadhan: 'Orthogonalized subspaces',
        winner: 'avadhan',
    },
    {
        feature: 'Memory Efficiency',
        transformer: 'Quadratic memory',
        avadhan: 'Linear memory',
        winner: 'avadhan',
    },
    {
        feature: 'Multi-task Learning',
        transformer: 'Task interference',
        avadhan: 'Independent threads',
        winner: 'avadhan',
    },
    {
        feature: 'Pre-trained Models',
        transformer: 'Widely available',
        avadhan: 'Limited (new architecture)',
        winner: 'transformer',
    },
    {
        feature: 'Community & Tools',
        transformer: 'Mature ecosystem',
        avadhan: 'Emerging',
        winner: 'transformer',
    },
]

export function ArchitectureComparison() {
    const [isExpanded, setIsExpanded] = useState(false)

    const avadhanWins = comparisons.filter(c => c.winner === 'avadhan').length
    const transformerWins = comparisons.filter(c => c.winner === 'transformer').length

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <GitCompare className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Avadhan vs Transformer</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-500">{avadhanWins} Avadhan</span>
                        <span className="text-muted-foreground">vs</span>
                        <span className="text-blue-500">{transformerWins} Transformer</span>
                    </div>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                </div>
            </button>

            {/* Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-4 border-t border-border">
                            {/* Visual comparison */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                                    <Cpu className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                    <h4 className="font-semibold text-foreground">Transformer</h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Self-attention mechanism
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                                    <Brain className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <h4 className="font-semibold text-foreground">Avadhan</h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Multi-threaded attention
                                    </p>
                                </div>
                            </div>

                            {/* Comparison table */}
                            <div className="space-y-2">
                                {comparisons.map((item, i) => (
                                    <motion.div
                                        key={item.feature}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-secondary/30 text-sm"
                                    >
                                        <div className="font-medium text-foreground">
                                            {item.feature}
                                        </div>
                                        <div className={cn(
                                            'flex items-center gap-1',
                                            item.winner === 'transformer' ? 'text-blue-500' : 'text-muted-foreground'
                                        )}>
                                            {item.winner === 'transformer' && <CheckCircle className="w-3 h-3" />}
                                            {typeof item.transformer === 'boolean'
                                                ? (item.transformer ? '✓' : '✗')
                                                : item.transformer}
                                        </div>
                                        <div className={cn(
                                            'flex items-center gap-1',
                                            item.winner === 'avadhan' ? 'text-green-500' : 'text-muted-foreground'
                                        )}>
                                            {item.winner === 'avadhan' && <CheckCircle className="w-3 h-3" />}
                                            {typeof item.avadhan === 'boolean'
                                                ? (item.avadhan ? '✓' : '✗')
                                                : item.avadhan}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-primary" />
                                    <span className="text-sm text-foreground font-medium">
                                        Avadhan excels at long-context, multi-task scenarios
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Best for: Research, multi-document analysis, complex reasoning tasks
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
