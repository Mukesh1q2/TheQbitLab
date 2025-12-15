'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TooltipContent {
    term: string
    definition: string
    formula?: string
}

const glossary: TooltipContent[] = [
    {
        term: 'Ashta',
        definition: '8-slot working memory regime. Optimal for most tasks with O(N) complexity.',
    },
    {
        term: 'Shata',
        definition: '100-slot regime for complex multi-task learning. O(N²) complexity.',
    },
    {
        term: 'Sahasra',
        definition: '1000-slot hierarchical regime. Uses clustering for O(N log N) scaling.',
    },
    {
        term: 'Orthogonalization',
        definition: 'Process that ensures slot state vectors are perpendicular, preventing information interference between threads.',
        formula: '⟨S_i, S_j⟩ = 0 for i ≠ j',
    },
    {
        term: 'Attention Weight (α)',
        definition: 'Priority assigned to each slot, determining how much focus it receives. Follows Boltzmann distribution.',
        formula: 'α_i = exp(βv_i) / Σ exp(βv_j)',
    },
    {
        term: 'Controller (Buddhi)',
        definition: 'Meta-policy that manages slot lifecycle: which to focus, evict, or consolidate.',
    },
    {
        term: 'Consolidation',
        definition: 'Process of compressing slot information into gists for long-term storage.',
        formula: 'M_E(t+Δ) = M_E(t) + C_W(M_W(t))',
    },
    {
        term: 'Thread Purity',
        definition: 'Metric measuring how well information stays within its designated slot without bleeding into others.',
    },
    {
        term: 'Interference Rate',
        definition: 'Percentage of cross-slot contamination. Lower is better. Target: < 5%.',
    },
    {
        term: 'β (Beta)',
        definition: 'Orthogonality weight. Higher values enforce stricter separation between slots.',
    },
    {
        term: 'η (Eta)',
        definition: 'Learning rate for the controller policy updates.',
    },
]

export function HelpTooltips() {
    const [selectedTerm, setSelectedTerm] = useState<TooltipContent | null>(null)

    return (
        <>
            {/* Help button */}
            <div className="relative">
                <button
                    onClick={() => setSelectedTerm(selectedTerm ? null : glossary[0])}
                    className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg',
                        'bg-secondary text-muted-foreground',
                        'hover:text-foreground transition-colors'
                    )}
                >
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-sm">Glossary</span>
                </button>

                {/* Glossary panel */}
                {selectedTerm && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-xl z-50"
                    >
                        <div className="flex items-center justify-between p-3 border-b border-border">
                            <span className="font-semibold text-foreground">Technical Glossary</span>
                            <button
                                onClick={() => setSelectedTerm(null)}
                                className="p-1 rounded hover:bg-secondary"
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="max-h-80 overflow-y-auto">
                            {glossary.map((item) => (
                                <button
                                    key={item.term}
                                    onClick={() => setSelectedTerm(item)}
                                    className={cn(
                                        'w-full text-left p-3 border-b border-border/50 transition-colors',
                                        selectedTerm.term === item.term
                                            ? 'bg-primary/10'
                                            : 'hover:bg-secondary/50'
                                    )}
                                >
                                    <div className="font-medium text-foreground text-sm">
                                        {item.term}
                                    </div>
                                    {selectedTerm.term === item.term && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-2"
                                        >
                                            <p className="text-xs text-muted-foreground">
                                                {item.definition}
                                            </p>
                                            {item.formula && (
                                                <code className="block mt-2 text-xs bg-secondary px-2 py-1 rounded font-mono text-primary">
                                                    {item.formula}
                                                </code>
                                            )}
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </>
    )
}
