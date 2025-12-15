'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
    value: number | string
    duration?: number
    suffix?: string
    prefix?: string
    className?: string
}

/**
 * AnimatedCounter - Counts up from 0 to the target value when in view
 */
export function AnimatedCounter({
    value,
    duration = 2,
    suffix = '',
    prefix = '',
    className = '',
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [displayValue, setDisplayValue] = useState('0')

    // Parse the numeric value from string like "50+" or "100K+"
    const parseValue = (val: number | string): { num: number; suffix: string } => {
        if (typeof val === 'number') {
            return { num: val, suffix: '' }
        }

        const match = val.match(/^([\d.]+)([KMB]*)(\+*)$/)
        if (match) {
            let num = parseFloat(match[1])
            const multiplier = match[2]
            const plus = match[3]

            // Handle K, M, B multipliers
            if (multiplier === 'K') num *= 1000
            else if (multiplier === 'M') num *= 1000000
            else if (multiplier === 'B') num *= 1000000000

            return { num, suffix: multiplier + plus }
        }

        return { num: parseFloat(val) || 0, suffix: '' }
    }

    const { num: targetNum, suffix: valueSuffix } = parseValue(value)

    useEffect(() => {
        if (!isInView) return

        const startTime = Date.now()
        const endTime = startTime + duration * 1000

        const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / (duration * 1000), 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)

            const currentValue = Math.floor(targetNum * easeOutQuart)

            // Format the display value
            let formatted: string
            if (targetNum >= 1000000000) {
                formatted = (currentValue / 1000000000).toFixed(1) + 'B'
            } else if (targetNum >= 1000000) {
                formatted = (currentValue / 1000000).toFixed(1) + 'M'
            } else if (targetNum >= 1000) {
                formatted = (currentValue / 1000).toFixed(1) + 'K'
            } else {
                formatted = currentValue.toString()
            }

            // Add suffix from original value (+)
            if (valueSuffix.includes('+') && progress === 1) {
                formatted += '+'
            } else if (progress === 1 && typeof value === 'string' && value.includes('+')) {
                formatted += '+'
            }

            setDisplayValue(formatted)

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [isInView, targetNum, duration, valueSuffix, value])

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
        >
            {prefix}{displayValue}{suffix}
        </motion.span>
    )
}
