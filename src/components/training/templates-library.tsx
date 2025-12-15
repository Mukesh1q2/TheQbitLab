'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    FileText,
    Bot,
    Code,
    Sparkles,
    MessageSquare,
    Brain,
    Zap,
    CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Template {
    id: string
    name: string
    description: string
    icon: React.ElementType
    category: string
    config: {
        personality: string
        systemPrompt: string
        regime: 'ashta' | 'shata' | 'sahasra'
        orthogonalityWeight: number
    }
    tags: string[]
    popular?: boolean
}

const templates: Template[] = [
    {
        id: 'research-assistant',
        name: 'Research Assistant',
        description: 'Trained to analyze academic papers, summarize findings, and answer research questions with citations.',
        icon: FileText,
        category: 'productivity',
        config: {
            personality: 'technical',
            systemPrompt: 'You are a research assistant specializing in academic analysis. Always cite sources and provide structured summaries.',
            regime: 'shata',
            orthogonalityWeight: 0.15,
        },
        tags: ['academic', 'analysis', 'citations'],
        popular: true,
    },
    {
        id: 'code-reviewer',
        name: 'Code Reviewer',
        description: 'Reviews code for bugs, security issues, and best practices. Provides actionable improvement suggestions.',
        icon: Code,
        category: 'development',
        config: {
            personality: 'technical',
            systemPrompt: 'You are an expert code reviewer. Analyze code for bugs, security vulnerabilities, and best practices. Be thorough but constructive.',
            regime: 'ashta',
            orthogonalityWeight: 0.1,
        },
        tags: ['code', 'review', 'security'],
        popular: true,
    },
    {
        id: 'creative-writer',
        name: 'Creative Writer',
        description: 'Generates creative content including stories, poems, and marketing copy with unique voice.',
        icon: Sparkles,
        category: 'creative',
        config: {
            personality: 'creative',
            systemPrompt: 'You are a creative writer with a unique voice. Generate engaging, original content that captivates readers.',
            regime: 'ashta',
            orthogonalityWeight: 0.05,
        },
        tags: ['writing', 'stories', 'marketing'],
    },
    {
        id: 'customer-support',
        name: 'Customer Support',
        description: 'Friendly and helpful support agent trained to resolve issues and answer product questions.',
        icon: MessageSquare,
        category: 'business',
        config: {
            personality: 'friendly',
            systemPrompt: 'You are a helpful customer support agent. Be friendly, empathetic, and solution-oriented. Always aim to resolve issues efficiently.',
            regime: 'ashta',
            orthogonalityWeight: 0.1,
        },
        tags: ['support', 'helpdesk', 'friendly'],
    },
    {
        id: 'data-analyst',
        name: 'Data Analyst',
        description: 'Analyzes data patterns, generates insights, and creates visualizations from structured data.',
        icon: Brain,
        category: 'analytics',
        config: {
            personality: 'technical',
            systemPrompt: 'You are a data analyst. Analyze data patterns, identify trends, and provide actionable insights. Use statistical methods when appropriate.',
            regime: 'shata',
            orthogonalityWeight: 0.12,
        },
        tags: ['data', 'analytics', 'insights'],
    },
    {
        id: 'multi-task-agent',
        name: 'Multi-Task Agent',
        description: 'Advanced agent using Sahasra regime for handling 1000+ parallel context threads.',
        icon: Zap,
        category: 'advanced',
        config: {
            personality: 'professional',
            systemPrompt: 'You are a highly capable multi-task agent. Handle complex, interleaved requests while maintaining context across many threads.',
            regime: 'sahasra',
            orthogonalityWeight: 0.2,
        },
        tags: ['advanced', 'multi-task', 'complex'],
    },
]

interface TemplatesLibraryProps {
    onSelectTemplate?: (template: Template) => void
}

export function TemplatesLibrary({ onSelectTemplate }: TemplatesLibraryProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

    const categories = [...new Set(templates.map(t => t.category))]

    const filteredTemplates = selectedCategory
        ? templates.filter(t => t.category === selectedCategory)
        : templates

    const handleSelect = (template: Template) => {
        setSelectedTemplate(template.id)
        onSelectTemplate?.(template)
    }

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Quick Start Templates</h3>
                </div>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                        'px-3 py-1 rounded-full text-sm transition-colors',
                        selectedCategory === null
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-muted-foreground hover:text-foreground'
                    )}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            'px-3 py-1 rounded-full text-sm capitalize transition-colors',
                            selectedCategory === cat
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-muted-foreground hover:text-foreground'
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Templates grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredTemplates.map((template) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleSelect(template)}
                        className={cn(
                            'relative p-4 rounded-lg border cursor-pointer transition-colors',
                            selectedTemplate === template.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                        )}
                    >
                        {template.popular && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 text-xs bg-amber-500/20 text-amber-500 rounded-full">
                                Popular
                            </span>
                        )}

                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                                <template.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-foreground">{template.name}</h4>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {template.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs px-2 py-0.5 bg-secondary rounded capitalize">
                                        {template.config.regime}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        β={template.config.orthogonalityWeight}
                                    </span>
                                </div>
                            </div>
                            {selectedTemplate === template.id && (
                                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {selectedTemplate && (
                <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                        ✨ Template selected! Click "Create Agent" to use this configuration.
                    </p>
                </div>
            )}
        </div>
    )
}
