'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CollapsibleProps {
    title: string
    icon?: ReactNode
    defaultOpen?: boolean
    className?: string
    children: ReactNode
    badge?: string | number
}

export function Collapsible({
    title,
    icon,
    defaultOpen = true,
    className,
    children,
    badge,
}: CollapsibleProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className={cn('bg-card border border-border rounded-xl overflow-hidden', className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'w-full flex items-center justify-between p-4',
                    'hover:bg-secondary/50 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset'
                )}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-2">
                    {icon && <span className="text-primary">{icon}</span>}
                    <span className="font-semibold text-foreground">{title}</span>
                    {badge !== undefined && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {badge}
                        </span>
                    )}
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-4 pt-0 border-t border-border">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Multi-section collapsible (accordion style - only one open at a time)
interface AccordionItem {
    id: string
    title: string
    icon?: ReactNode
    content: ReactNode
    badge?: string | number
}

interface AccordionProps {
    items: AccordionItem[]
    className?: string
    allowMultiple?: boolean
}

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>([items[0]?.id])

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems(prev =>
                prev.includes(id)
                    ? prev.filter(x => x !== id)
                    : [...prev, id]
            )
        } else {
            setOpenItems(prev =>
                prev.includes(id) ? [] : [id]
            )
        }
    }

    return (
        <div className={cn('space-y-2', className)}>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                >
                    <button
                        onClick={() => toggleItem(item.id)}
                        className={cn(
                            'w-full flex items-center justify-between p-4',
                            'hover:bg-secondary/50 transition-colors',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset'
                        )}
                        aria-expanded={openItems.includes(item.id)}
                    >
                        <div className="flex items-center gap-2">
                            {item.icon && <span className="text-primary">{item.icon}</span>}
                            <span className="font-semibold text-foreground">{item.title}</span>
                            {item.badge !== undefined && (
                                <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                        <motion.div
                            animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                        {openItems.includes(item.id) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-4 pt-0 border-t border-border">
                                    {item.content}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}
