'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Sparkles, MessageSquare, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatbotCreatorProps {
    onProjectCreated?: (project: { id: string; name: string }) => void
}

export function ChatbotCreator({ onProjectCreated }: ChatbotCreatorProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [personality, setPersonality] = useState('professional')
    const [systemPrompt, setSystemPrompt] = useState('')
    const [creating, setCreating] = useState(false)
    const [showAdvanced, setShowAdvanced] = useState(false)

    const personalities = [
        { id: 'professional', label: 'Professional', emoji: '💼' },
        { id: 'friendly', label: 'Friendly', emoji: '😊' },
        { id: 'technical', label: 'Technical', emoji: '🔧' },
        { id: 'creative', label: 'Creative', emoji: '🎨' },
        { id: 'custom', label: 'Custom', emoji: '✨' },
    ]

    const createProject = async () => {
        if (!name.trim()) return

        setCreating(true)
        try {
            const response = await fetch('/api/training/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    description: description.trim() || undefined,
                    config: {
                        personality,
                        systemPrompt: systemPrompt.trim() || undefined,
                    },
                }),
            })

            const data = await response.json()
            if (data.success) {
                onProjectCreated?.(data.project)
                setName('')
                setDescription('')
                setSystemPrompt('')
            }
        } catch (error) {
            console.error('Failed to create project:', error)
        } finally {
            setCreating(false)
        }
    }

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Create AI Agent</h3>
            </div>

            <div className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                        Agent Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Research Assistant"
                        className={cn(
                            'w-full px-3 py-2 rounded-lg border bg-background',
                            'text-foreground placeholder:text-muted-foreground',
                            'focus:outline-none focus:ring-2 focus:ring-primary/50'
                        )}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What will this agent do?"
                        rows={2}
                        className={cn(
                            'w-full px-3 py-2 rounded-lg border bg-background',
                            'text-foreground placeholder:text-muted-foreground',
                            'focus:outline-none focus:ring-2 focus:ring-primary/50',
                            'resize-none'
                        )}
                    />
                </div>

                {/* Personality */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Personality
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                        {personalities.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setPersonality(p.id)}
                                className={cn(
                                    'p-2 rounded-lg border text-center transition-colors',
                                    personality === p.id
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:border-primary/50'
                                )}
                            >
                                <span className="text-xl">{p.emoji}</span>
                                <p className="text-xs text-muted-foreground mt-1">{p.label}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Advanced settings toggle */}
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <Settings className="w-4 h-4" />
                    Advanced Settings
                    <motion.span
                        animate={{ rotate: showAdvanced ? 180 : 0 }}
                        className="ml-auto"
                    >
                        ▼
                    </motion.span>
                </button>

                {/* Advanced settings */}
                {showAdvanced && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-2"
                    >
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                System Prompt
                            </label>
                            <textarea
                                value={systemPrompt}
                                onChange={(e) => setSystemPrompt(e.target.value)}
                                placeholder="Custom instructions for the agent..."
                                rows={4}
                                className={cn(
                                    'w-full px-3 py-2 rounded-lg border bg-background',
                                    'text-foreground placeholder:text-muted-foreground',
                                    'focus:outline-none focus:ring-2 focus:ring-primary/50',
                                    'resize-none font-mono text-sm'
                                )}
                            />
                        </div>
                    </motion.div>
                )}

                {/* Create button */}
                <button
                    onClick={createProject}
                    disabled={!name.trim() || creating}
                    className={cn(
                        'w-full py-2 px-4 rounded-lg font-medium transition-colors',
                        'bg-primary text-primary-foreground',
                        'hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed',
                        'flex items-center justify-center gap-2'
                    )}
                >
                    {creating ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                                <Sparkles className="w-4 h-4" />
                            </motion.div>
                            Creating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4" />
                            Create Agent
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
