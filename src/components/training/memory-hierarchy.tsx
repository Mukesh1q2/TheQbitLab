'use client'

import { motion } from 'framer-motion'
import { Database, ArrowRight, Brain, Archive } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MemoryHierarchyProps {
    workingCount?: number
    episodicCount?: number
    semanticCount?: number
}

export function MemoryHierarchy({
    workingCount = 8,
    episodicCount = 24,
    semanticCount = 156
}: MemoryHierarchyProps) {
    const tiers = [
        {
            name: 'Working Memory',
            symbol: 'M_W',
            icon: Brain,
            count: workingCount,
            color: 'text-cyan-500',
            bgColor: 'bg-cyan-500/10',
            borderColor: 'border-cyan-500/30',
            desc: 'Active Ashta slots',
        },
        {
            name: 'Episodic Store',
            symbol: 'M_E',
            icon: Database,
            count: episodicCount,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/30',
            desc: 'Compressed gists',
        },
        {
            name: 'Semantic Archive',
            symbol: 'M_S',
            icon: Archive,
            count: semanticCount,
            color: 'text-amber-500',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/30',
            desc: 'Long-term knowledge',
        },
    ]

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <Database className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Memory Hierarchy</h3>
            </div>

            {/* Flow diagram */}
            <div className="flex items-center justify-between gap-4 mb-6">
                {tiers.map((tier, i) => (
                    <div key={tier.name} className="flex items-center gap-4 flex-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                'flex-1 p-4 rounded-xl border-2',
                                tier.bgColor,
                                tier.borderColor
                            )}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <tier.icon className={cn('w-5 h-5', tier.color)} />
                                <span className="font-mono text-sm text-muted-foreground">{tier.symbol}</span>
                            </div>
                            <div className="text-2xl font-bold text-foreground">{tier.count}</div>
                            <div className="text-xs text-muted-foreground">{tier.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{tier.desc}</div>
                        </motion.div>

                        {i < tiers.length - 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            {/* Consolidation formula */}
            <div className="p-3 bg-secondary/50 rounded-lg text-center">
                <p className="font-mono text-sm text-muted-foreground">
                    M_E(t+Δ) = M_E(t) + C_W(M_W(t))
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    Consolidation: Working → Episodic → Semantic
                </p>
            </div>
        </div>
    )
}
