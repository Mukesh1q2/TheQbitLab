'use client'

import { forwardRef, ComponentProps } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/app-store'

/**
 * Performance-aware motion components
 * In performance mode, these render as regular divs without framer-motion overhead
 * This significantly reduces TBT (Total Blocking Time) in Lighthouse
 */

type MotionDivProps = ComponentProps<typeof motion.div>
type MotionSpanProps = ComponentProps<typeof motion.span>
type MotionAnchorProps = ComponentProps<typeof motion.a>

// Extract only the style/className props for static rendering
function extractStaticProps<T extends object>(props: T): Record<string, any> {
    const motionKeys = new Set([
        'initial', 'animate', 'exit', 'variants', 'whileHover', 'whileTap', 'whileInView',
        'whileFocus', 'whileDrag', 'viewport', 'transition', 'layout', 'layoutId',
        'onAnimationStart', 'onAnimationComplete', 'onUpdate', 'onDrag', 'onDragEnd',
        'onDragStart', 'onDirectionLock', 'onPan', 'onPanEnd', 'onPanStart', 'onTap',
        'onTapCancel', 'onTapStart', 'onHoverStart', 'onHoverEnd', 'onViewportEnter',
        'onViewportLeave', 'dragConstraints', 'dragElastic', 'dragMomentum', 'dragTransition',
        'dragPropagation', 'dragControls', 'dragListener', 'drag', 'dragDirectionLock',
        'dragSnapToOrigin', 'onLayoutMeasure', 'onLayoutAnimationStart',
        'onLayoutAnimationComplete', 'layoutDependency', 'layoutRoot', 'layoutScroll',
    ])

    const staticProps: Record<string, any> = {}
    for (const [key, value] of Object.entries(props)) {
        if (!motionKeys.has(key)) {
            staticProps[key] = value
        }
    }
    return staticProps
}

export const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>((props, ref) => {
    const { performanceMode } = useAppStore()

    if (performanceMode) {
        const staticProps = extractStaticProps(props)
        return <div ref={ref} {...staticProps} />
    }

    return <motion.div ref={ref} {...props} />
})
MotionDiv.displayName = 'MotionDiv'

export const MotionSpan = forwardRef<HTMLSpanElement, MotionSpanProps>((props, ref) => {
    const { performanceMode } = useAppStore()

    if (performanceMode) {
        const staticProps = extractStaticProps(props)
        return <span ref={ref} {...staticProps} />
    }

    return <motion.span ref={ref} {...props} />
})
MotionSpan.displayName = 'MotionSpan'

export const MotionAnchor = forwardRef<HTMLAnchorElement, MotionAnchorProps>((props, ref) => {
    const { performanceMode } = useAppStore()

    if (performanceMode) {
        const staticProps = extractStaticProps(props)
        return <a ref={ref} {...staticProps} />
    }

    return <motion.a ref={ref} {...props} />
})
MotionAnchor.displayName = 'MotionAnchor'

// Re-export AnimatePresence for consistency
export { AnimatePresence }
