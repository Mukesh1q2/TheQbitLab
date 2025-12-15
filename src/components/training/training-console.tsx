'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Terminal, ChevronDown, Download, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogEntry {
    timestamp: string
    level: 'info' | 'warn' | 'error' | 'success'
    message: string
}

interface TrainingConsoleProps {
    projectId?: string
    isTraining?: boolean
}

export function TrainingConsole({ projectId, isTraining = false }: TrainingConsoleProps) {
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [isExpanded, setIsExpanded] = useState(true)
    const [autoScroll, setAutoScroll] = useState(true)

    useEffect(() => {
        if (!isTraining) return

        // Add simulated training logs
        const interval = setInterval(() => {
            const messages = [
                { level: 'info', message: 'Processing batch...' },
                { level: 'info', message: 'Orthogonalizing slots...' },
                { level: 'success', message: 'Slot states updated' },
                { level: 'info', message: 'Computing attention weights...' },
                { level: 'info', message: 'Running controller step...' },
                { level: 'warn', message: 'Low priority slot detected' },
                { level: 'success', message: 'Epoch complete' },
            ]

            const randomMsg = messages[Math.floor(Math.random() * messages.length)]

            setLogs(prev => [...prev.slice(-99), {
                timestamp: new Date().toISOString(),
                level: randomMsg.level as LogEntry['level'],
                message: randomMsg.message,
            }])
        }, 500)

        return () => clearInterval(interval)
    }, [isTraining])

    const clearLogs = () => setLogs([])

    const downloadLogs = () => {
        const content = logs.map(l => `[${l.timestamp}] [${l.level.toUpperCase()}] ${l.message}`).join('\n')
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `training-logs-${Date.now()}.txt`
        a.click()
        URL.revokeObjectURL(url)
    }

    const getLevelColor = (level: LogEntry['level']) => {
        switch (level) {
            case 'info': return 'text-blue-400'
            case 'warn': return 'text-amber-400'
            case 'error': return 'text-red-400'
            case 'success': return 'text-green-400'
            default: return 'text-muted-foreground'
        }
    }

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div
                className="flex items-center justify-between p-4 bg-secondary/50 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Training Console</h3>
                    <span className="text-xs text-muted-foreground">({logs.length} entries)</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); downloadLogs() }}
                        className="p-1.5 rounded hover:bg-secondary transition-colors"
                        title="Download logs"
                    >
                        <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); clearLogs() }}
                        className="p-1.5 rounded hover:bg-secondary transition-colors"
                        title="Clear logs"
                    >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                </div>
            </div>

            {/* Console output */}
            {isExpanded && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="bg-[#1a1a2e] font-mono text-sm overflow-hidden"
                >
                    <div
                        className="h-48 overflow-y-auto p-4 space-y-1"
                        ref={(el) => {
                            if (el && autoScroll) {
                                el.scrollTop = el.scrollHeight
                            }
                        }}
                    >
                        {logs.length === 0 ? (
                            <div className="text-muted-foreground text-center py-8">
                                {isTraining ? 'Waiting for logs...' : 'Start training to see logs'}
                            </div>
                        ) : (
                            logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex gap-2"
                                >
                                    <span className="text-muted-foreground shrink-0">
                                        {new Date(log.timestamp).toLocaleTimeString()}
                                    </span>
                                    <span className={cn('shrink-0 uppercase', getLevelColor(log.level))}>
                                        [{log.level}]
                                    </span>
                                    <span className="text-gray-300">{log.message}</span>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
