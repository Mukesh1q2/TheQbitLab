'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
    className?: string
    variant?: 'text' | 'circular' | 'rectangular' | 'card'
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse bg-muted',
                variant === 'circular' && 'rounded-full',
                variant === 'text' && 'h-4 rounded',
                variant === 'rectangular' && 'rounded-lg',
                variant === 'card' && 'rounded-xl',
                className
            )}
        />
    )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
    return (
        <div className={cn('space-y-2', className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    variant="text"
                    className={cn(
                        'h-4',
                        i === lines - 1 && 'w-3/4'
                    )}
                />
            ))}
        </div>
    )
}

export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn('bg-card border border-border rounded-xl p-6 space-y-4', className)}>
            <div className="flex items-center gap-3">
                <Skeleton variant="circular" className="w-10 h-10" />
                <div className="flex-1 space-y-2">
                    <Skeleton variant="text" className="w-1/3 h-4" />
                    <Skeleton variant="text" className="w-1/2 h-3" />
                </div>
            </div>
            <SkeletonText lines={3} />
        </div>
    )
}

export function SkeletonSlotGrid({ className }: { className?: string }) {
    return (
        <div className={cn('bg-card border border-border rounded-xl p-6', className)}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Skeleton variant="circular" className="w-5 h-5" />
                    <Skeleton variant="text" className="w-32 h-5" />
                </div>
                <Skeleton variant="text" className="w-20 h-4" />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} variant="card" className="aspect-square" />
                ))}
            </div>
        </div>
    )
}

export function SkeletonMetrics({ className }: { className?: string }) {
    return (
        <div className={cn('bg-card border border-border rounded-xl p-6', className)}>
            <div className="flex items-center gap-2 mb-4">
                <Skeleton variant="circular" className="w-5 h-5" />
                <Skeleton variant="text" className="w-40 h-5" />
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-4 space-y-2">
                        <Skeleton variant="text" className="w-12 h-3" />
                        <Skeleton variant="text" className="w-20 h-8" />
                    </div>
                ))}
            </div>
            <Skeleton variant="rectangular" className="w-full h-32" />
        </div>
    )
}
