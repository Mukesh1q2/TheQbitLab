'use client'

import { useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
    content: string
    children: ReactNode
    side?: 'top' | 'bottom' | 'left' | 'right'
    className?: string
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false)

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-popover border-x-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-popover border-x-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-popover border-y-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-popover border-y-transparent border-l-transparent',
    }

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={cn(
                        'absolute z-50 px-3 py-1.5 text-xs font-medium',
                        'bg-popover text-popover-foreground',
                        'rounded-md shadow-lg border border-border',
                        'whitespace-nowrap animate-fade-in',
                        positionClasses[side],
                        className
                    )}
                    role="tooltip"
                >
                    {content}
                    <div
                        className={cn(
                            'absolute w-0 h-0 border-4',
                            arrowClasses[side]
                        )}
                    />
                </div>
            )}
        </div>
    )
}

// Icon button with tooltip
interface IconButtonProps {
    icon: ReactNode
    label: string
    onClick?: () => void
    className?: string
    tooltipSide?: 'top' | 'bottom' | 'left' | 'right'
    variant?: 'default' | 'ghost' | 'outline'
}

export function IconButton({
    icon,
    label,
    onClick,
    className,
    tooltipSide = 'bottom',
    variant = 'ghost',
}: IconButtonProps) {
    const variantClasses = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    }

    return (
        <Tooltip content={label} side={tooltipSide}>
            <button
                onClick={onClick}
                className={cn(
                    'inline-flex items-center justify-center rounded-md p-2',
                    'transition-colors focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                    variantClasses[variant],
                    className
                )}
                aria-label={label}
            >
                {icon}
            </button>
        </Tooltip>
    )
}
