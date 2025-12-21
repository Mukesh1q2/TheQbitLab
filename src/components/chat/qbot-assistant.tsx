'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

export function QbotAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: "Hey! 👋 I'm Qbot, your AI guide to TheQbitLabs. Ask me about Mukesh's projects, skills, or how we can help with your next AI project!",
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    history: messages.slice(-10).map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            })

            const data = await response.json()

            if (data.success) {
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: data.response,
                    timestamp: new Date(),
                }
                setMessages((prev) => [...prev, assistantMessage])
            } else {
                throw new Error(data.error)
            }
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Oops! Something went wrong. Please try again or contact mukesh@theqbitlabs.com directly. 📧",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const suggestedQuestions = [
        "What projects has Mukesh built?",
        "What AI services do you offer?",
        "Tell me about OptiBid Energy",
    ]

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={cn(
                    'fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl',
                    'bg-gradient-to-r from-cyan-500 to-purple-600',
                    'hover:from-cyan-400 hover:to-purple-500',
                    'transition-all duration-300',
                    isOpen && 'scale-0 opacity-0'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: isOpen ? 0 : 1 }}
            >
                <MessageCircle className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </motion.button>

            {/* Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            'fixed bottom-6 right-6 z-50',
                            'w-[380px] h-[600px] max-h-[80vh]',
                            'bg-[#0a0e1a] border border-white/10 rounded-2xl shadow-2xl',
                            'flex flex-col overflow-hidden',
                            'sm:w-[380px] sm:right-6',
                            'max-sm:inset-x-4 max-sm:bottom-4 max-sm:w-auto'
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0a0e1a]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white flex items-center gap-1">
                                        Qbot <Sparkles className="w-3 h-3 text-cyan-400" />
                                    </h3>
                                    <p className="text-xs text-cyan-400">AI Assistant • Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        'flex gap-3',
                                        message.role === 'user' && 'flex-row-reverse'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                                            message.role === 'assistant'
                                                ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                                                : 'bg-white/10'
                                        )}
                                    >
                                        {message.role === 'assistant' ? (
                                            <Bot className="w-4 h-4 text-white" />
                                        ) : (
                                            <User className="w-4 h-4 text-cyan-400" />
                                        )}
                                    </div>
                                    <div
                                        className={cn(
                                            'max-w-[80%] p-3 rounded-2xl text-sm overflow-hidden',
                                            message.role === 'assistant'
                                                ? 'bg-white/5 text-gray-200 rounded-tl-sm'
                                                : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-tr-sm'
                                        )}
                                    >
                                        <ReactMarkdown
                                            components={{
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                                                li: ({ node, ...props }) => <li className="" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-bold text-inherit" {...props} />,
                                                a: ({ node, ...props }) => <a className="underline hover:opacity-80" target="_blank" rel="noopener noreferrer" {...props} />,
                                            }}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Loading indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Questions (only show at start) */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2">
                                <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedQuestions.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => setInput(q)}
                                            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-cyan-400 transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask Qbot anything..."
                                    disabled={isLoading}
                                    className={cn(
                                        'flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl',
                                        'text-white placeholder:text-gray-500',
                                        'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50',
                                        'disabled:opacity-50'
                                    )}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className={cn(
                                        'p-3 rounded-xl transition-all',
                                        'bg-gradient-to-r from-cyan-500 to-purple-600',
                                        'hover:from-cyan-400 hover:to-purple-500',
                                        'disabled:opacity-50 disabled:cursor-not-allowed'
                                    )}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5 text-white" />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Powered by Gemini 3.0 Flash (Preview) ✨
                            </p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
