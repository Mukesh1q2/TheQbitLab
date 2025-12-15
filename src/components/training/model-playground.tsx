'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MessageSquare,
    Send,
    Settings,
    Loader2,
    Copy,
    Check,
    RotateCcw,
    Download,
    Sparkles,
    Thermometer,
    Hash,
    Clock,
    Zap,
    ChevronDown,
    Bot,
    User,
    AlertCircle,
    Play,
    Pause,
    BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: Date
    tokenCount?: number
    responseTime?: number
    threadId?: string
}

interface InferenceConfig {
    temperature: number
    topP: number
    maxTokens: number
    streamResponse: boolean
    useAvadhanMemory: boolean
    threadId: string
}

interface ModelPlaygroundProps {
    projectId?: string
    modelPath?: string
    isModelReady?: boolean
    trainingEpochs?: number
    trainingStatus?: 'idle' | 'training' | 'paused' | 'completed'
}

export function ModelPlayground({
    projectId,
    modelPath,
    isModelReady = false,
    trainingEpochs = 0,
    trainingStatus = 'idle'
}: ModelPlaygroundProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [copied, setCopied] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    // Inference configuration
    const [config, setConfig] = useState<InferenceConfig>({
        temperature: 0.7,
        topP: 0.9,
        maxTokens: 512,
        streamResponse: true,
        useAvadhanMemory: true,
        threadId: `thread_${Date.now()}`
    })

    // Performance metrics
    const [metrics, setMetrics] = useState({
        totalResponses: 0,
        avgResponseTime: 0,
        totalTokens: 0
    })

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Check minimum training requirements
    const canTest = useCallback(() => {
        if (!projectId) return { ready: false, reason: 'No project selected' }
        if (trainingStatus === 'training') return { ready: false, reason: 'Training in progress' }
        if (trainingEpochs < 1) return { ready: false, reason: 'Model needs at least 1 epoch of training' }
        if (!isModelReady) return { ready: false, reason: 'Model not loaded or ready' }
        return { ready: true, reason: '' }
    }, [projectId, trainingStatus, trainingEpochs, isModelReady])

    const testStatus = canTest()

    // Generate response
    const generateResponse = async () => {
        if (!input.trim() || isGenerating || !testStatus.ready) return

        const userMessage: Message = {
            id: `msg_${Date.now()}`,
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
            threadId: config.threadId
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsGenerating(true)
        setError(null)

        const startTime = Date.now()

        try {
            const response = await fetch('/api/training/inference', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId,
                    prompt: userMessage.content,
                    config: {
                        temperature: config.temperature,
                        topP: config.topP,
                        maxTokens: config.maxTokens,
                        useAvadhanMemory: config.useAvadhanMemory,
                        threadId: config.threadId,
                        conversationHistory: messages.map(m => ({
                            role: m.role,
                            content: m.content
                        }))
                    }
                })
            })

            const data = await response.json()
            const responseTime = Date.now() - startTime

            if (!data.success) {
                throw new Error(data.error || 'Failed to generate response')
            }

            const assistantMessage: Message = {
                id: `msg_${Date.now()}`,
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
                tokenCount: data.tokenCount,
                responseTime,
                threadId: config.threadId
            }

            setMessages(prev => [...prev, assistantMessage])

            // Update metrics
            setMetrics(prev => ({
                totalResponses: prev.totalResponses + 1,
                avgResponseTime: Math.round(
                    (prev.avgResponseTime * prev.totalResponses + responseTime) /
                    (prev.totalResponses + 1)
                ),
                totalTokens: prev.totalTokens + (data.tokenCount || 0)
            }))

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate response')
        } finally {
            setIsGenerating(false)
        }
    }

    // Copy message to clipboard
    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }

    // Clear conversation
    const clearConversation = () => {
        setMessages([])
        setConfig(prev => ({ ...prev, threadId: `thread_${Date.now()}` }))
        setError(null)
    }

    // Export conversation
    const exportConversation = () => {
        const data = {
            projectId,
            threadId: config.threadId,
            config,
            metrics,
            messages: messages.map(m => ({
                role: m.role,
                content: m.content,
                timestamp: m.timestamp.toISOString(),
                tokenCount: m.tokenCount,
                responseTime: m.responseTime
            }))
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `conversation_${config.threadId}.json`
        a.click()
        URL.revokeObjectURL(url)
    }

    // Handle keyboard shortcuts
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            generateResponse()
        }
    }

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-secondary/30 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Model Playground</h3>
                        <p className="text-xs text-muted-foreground">
                            Test your trained model in real-time
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Metrics summary */}
                    {metrics.totalResponses > 0 && (
                        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-secondary/50 rounded-lg text-xs">
                            <span className="flex items-center gap-1 text-muted-foreground">
                                <BarChart3 className="w-3 h-3" />
                                {metrics.totalResponses} responses
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {metrics.avgResponseTime}ms avg
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                                <Hash className="w-3 h-3" />
                                {metrics.totalTokens} tokens
                            </span>
                        </div>
                    )}

                    {/* Action buttons */}
                    <button
                        onClick={exportConversation}
                        disabled={messages.length === 0}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
                        title="Export conversation"
                    >
                        <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                        onClick={clearConversation}
                        disabled={messages.length === 0}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
                        title="Clear conversation"
                    >
                        <RotateCcw className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={cn(
                            "p-2 rounded-lg transition-colors",
                            showSettings ? "bg-primary/10 text-primary" : "hover:bg-secondary text-muted-foreground"
                        )}
                        title="Settings"
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-b border-border"
                    >
                        <div className="p-4 bg-secondary/20 space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Temperature */}
                                <div>
                                    <label className="flex items-center gap-1 text-sm font-medium text-foreground mb-2">
                                        <Thermometer className="w-3 h-3" />
                                        Temperature
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={config.temperature}
                                        onChange={(e) => setConfig(prev => ({
                                            ...prev,
                                            temperature: parseFloat(e.target.value)
                                        }))}
                                        className="w-full"
                                    />
                                    <span className="text-xs text-muted-foreground">{config.temperature}</span>
                                </div>

                                {/* Top P */}
                                <div>
                                    <label className="flex items-center gap-1 text-sm font-medium text-foreground mb-2">
                                        <Sparkles className="w-3 h-3" />
                                        Top P
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={config.topP}
                                        onChange={(e) => setConfig(prev => ({
                                            ...prev,
                                            topP: parseFloat(e.target.value)
                                        }))}
                                        className="w-full"
                                    />
                                    <span className="text-xs text-muted-foreground">{config.topP}</span>
                                </div>

                                {/* Max Tokens */}
                                <div>
                                    <label className="flex items-center gap-1 text-sm font-medium text-foreground mb-2">
                                        <Hash className="w-3 h-3" />
                                        Max Tokens
                                    </label>
                                    <input
                                        type="number"
                                        min="64"
                                        max="4096"
                                        step="64"
                                        value={config.maxTokens}
                                        onChange={(e) => setConfig(prev => ({
                                            ...prev,
                                            maxTokens: parseInt(e.target.value)
                                        }))}
                                        className="w-full px-2 py-1 bg-background border border-border rounded text-sm"
                                    />
                                </div>

                                {/* Avadhan Memory */}
                                <div>
                                    <label className="flex items-center gap-1 text-sm font-medium text-foreground mb-2">
                                        <Zap className="w-3 h-3" />
                                        Avadhan Memory
                                    </label>
                                    <button
                                        onClick={() => setConfig(prev => ({
                                            ...prev,
                                            useAvadhanMemory: !prev.useAvadhanMemory
                                        }))}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                                            config.useAvadhanMemory
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-muted-foreground"
                                        )}
                                    >
                                        {config.useAvadhanMemory ? 'Enabled' : 'Disabled'}
                                    </button>
                                </div>
                            </div>

                            {/* Thread ID */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Thread ID:</span>
                                <code className="px-2 py-1 bg-background rounded text-xs font-mono">
                                    {config.threadId}
                                </code>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Model Readiness Banner */}
            {!testStatus.ready && (
                <div className="p-4 bg-amber-500/10 border-b border-amber-500/20">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">{testStatus.reason}</span>
                    </div>
                    {trainingEpochs < 1 && (
                        <p className="text-xs text-muted-foreground mt-1">
                            Train for at least 1 epoch to start testing. Recommended: 10+ epochs for Avadhan models.
                        </p>
                    )}
                </div>
            )}

            {/* Training Progress Indicator */}
            {trainingStatus === 'training' && (
                <div className="p-4 bg-primary/10 border-b border-primary/20">
                    <div className="flex items-center gap-2 text-primary">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-medium">
                            Training in progress... Epoch {trainingEpochs}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Wait for training to complete or pause to test current checkpoint.
                    </p>
                </div>
            )}

            {/* Messages Area */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-background/50">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="p-4 rounded-full bg-secondary/50 mb-4">
                            <Bot className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h4 className="font-medium text-foreground mb-1">Start a Conversation</h4>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Test your trained Avadhan model by sending a message below.
                            The model will use its trained memory slots to generate responses.
                        </p>

                        {/* Quick prompts */}
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                            {['Tell me about yourself', 'Summarize our previous conversation', 'What do you remember?'].map(prompt => (
                                <button
                                    key={prompt}
                                    onClick={() => setInput(prompt)}
                                    disabled={!testStatus.ready}
                                    className="px-3 py-1.5 text-xs bg-secondary rounded-full hover:bg-secondary/80 transition-colors disabled:opacity-50"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex gap-3",
                                message.role === 'user' ? 'justify-end' : 'justify-start'
                            )}
                        >
                            {message.role === 'assistant' && (
                                <div className="p-2 rounded-full bg-primary/10 h-fit">
                                    <Bot className="w-4 h-4 text-primary" />
                                </div>
                            )}

                            <div className={cn(
                                "max-w-[80%] rounded-xl p-3",
                                message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary'
                            )}>
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                                {/* Message metadata */}
                                <div className="mt-2 flex items-center gap-2 text-xs opacity-70">
                                    <span>{message.timestamp.toLocaleTimeString()}</span>
                                    {message.tokenCount && (
                                        <span>• {message.tokenCount} tokens</span>
                                    )}
                                    {message.responseTime && (
                                        <span>• {message.responseTime}ms</span>
                                    )}
                                    <button
                                        onClick={() => copyToClipboard(message.content, message.id)}
                                        className="ml-auto p-1 rounded hover:bg-white/10 transition-colors"
                                    >
                                        {copied === message.id ? (
                                            <Check className="w-3 h-3" />
                                        ) : (
                                            <Copy className="w-3 h-3" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {message.role === 'user' && (
                                <div className="p-2 rounded-full bg-secondary h-fit">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                </div>
                            )}
                        </motion.div>
                    ))
                )}

                {/* Generating indicator */}
                {isGenerating && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="p-2 rounded-full bg-primary/10 h-fit">
                            <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <div className="bg-secondary rounded-xl p-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Generating response...
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Error display */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                    >
                        <div className="flex items-center gap-2 text-destructive text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-secondary/30 border-t border-border">
                <div className="flex gap-2">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={testStatus.ready ? "Type your message..." : testStatus.reason}
                        disabled={!testStatus.ready || isGenerating}
                        rows={1}
                        className={cn(
                            "flex-1 px-4 py-2 bg-background border border-border rounded-lg resize-none",
                            "focus:outline-none focus:ring-2 focus:ring-primary/50",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                        style={{ minHeight: '42px', maxHeight: '120px' }}
                    />
                    <button
                        onClick={generateResponse}
                        disabled={!input.trim() || isGenerating || !testStatus.ready}
                        className={cn(
                            "px-4 py-2 rounded-lg font-medium transition-colors",
                            "bg-primary text-primary-foreground",
                            "hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                    >
                        {isGenerating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>

                <p className="text-xs text-muted-foreground mt-2 text-center">
                    Press Enter to send • Shift+Enter for new line
                </p>
            </div>
        </div>
    )
}
