'use client'

import { motion } from 'framer-motion'
import { Brain, Cpu, Zap, Network } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AvadhanHero() {
    return (
        <section className={cn(
            'relative py-20 overflow-hidden',
            'bg-gradient-to-br from-background via-background to-primary/5'
        )}>
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full opacity-20 bg-primary"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                    >
                        <Brain className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                            Beyond Transformers
                        </span>
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="text-foreground">Avadhan </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
                            Training Module
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Train LLM models using the revolutionary Avadhan Hybrid Architecture.
                        8 parallel attention threads, orthogonalized subspaces, and O(N log N) complexity.
                    </p>

                    {/* Feature cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
                        {[
                            { icon: Network, label: '8 Ashta Slots', desc: 'Parallel attention' },
                            { icon: Zap, label: 'O(N log N)', desc: 'Efficient scaling' },
                            { icon: Cpu, label: 'Orthogonal', desc: 'Zero interference' },
                            { icon: Brain, label: 'Meta-Control', desc: 'Buddhi controller' },
                        ].map((feature, i) => (
                            <motion.div
                                key={feature.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className={cn(
                                    'p-4 rounded-xl border border-border',
                                    'bg-card/50 backdrop-blur-sm',
                                    'hover:border-primary/50 transition-colors'
                                )}
                            >
                                <feature.icon className="w-8 h-8 text-primary mb-2 mx-auto" />
                                <h3 className="font-semibold text-foreground">{feature.label}</h3>
                                <p className="text-sm text-muted-foreground">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
