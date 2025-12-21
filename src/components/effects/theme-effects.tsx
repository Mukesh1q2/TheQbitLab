'use client'

import { useEffect, useRef, memo, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'

/**
 * Effect Intensity Helper Functions
 * Convert 0-100 slider value to usable effect parameters
 */
const useEffectIntensity = () => {
    const { effectIntensity, performanceMode } = useAppStore()

    return useMemo(() => {
        // If performance mode is on, return minimum values
        if (performanceMode) {
            return {
                opacity: 0,
                particleMultiplier: 0,
                animationSpeed: 0,
                blurIntensity: 0,
                enabled: false,
            }
        }

        // Normalize intensity to 0-1 range
        const normalized = effectIntensity / 100

        return {
            // Opacity scales from 0.1 to 1.0
            opacity: 0.1 + (normalized * 0.9),
            // Particle count multiplier (0.3x to 1.5x)
            particleMultiplier: 0.3 + (normalized * 1.2),
            // Animation speed (0.5x to 1.5x)
            animationSpeed: 0.5 + (normalized * 1.0),
            // Blur intensity (50% to 150%)
            blurIntensity: 0.5 + (normalized * 1.0),
            // Whether effects should be enabled at all
            enabled: effectIntensity > 5,
        }
    }, [effectIntensity, performanceMode])
}

/**
 * Quantum Neural Network Effect
 * Interactive neural network that responds to cursor movement
 * P1: Now respects effectIntensity and performanceMode
 */
export const QuantumNeuralNetwork = memo(function QuantumNeuralNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const nodesRef = useRef<Array<{
        x: number
        y: number
        vx: number
        vy: number
        radius: number
        baseRadius: number
        pulsePhase: number
        connections: number[]
    }>>([])
    const { theme, particleEffects, performanceMode } = useAppStore()
    const intensity = useEffectIntensity()

    // P1: Disable effect if performance mode is on or intensity too low
    const isActive = theme.id === 'quantum' && particleEffects && !performanceMode && intensity.enabled

    useEffect(() => {
        if (!isActive) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initNodes()
        }

        // Initialize neural network nodes - P1: scales with intensity
        const initNodes = () => {
            const baseCount = Math.floor((canvas.width * canvas.height) / 25000)
            const nodeCount = Math.min(60, Math.max(10, Math.floor(baseCount * intensity.particleMultiplier)))
            nodesRef.current = Array.from({ length: nodeCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5 * intensity.animationSpeed,
                vy: (Math.random() - 0.5) * 0.5 * intensity.animationSpeed,
                radius: 2 + Math.random() * 3,
                baseRadius: 2 + Math.random() * 3,
                pulsePhase: Math.random() * Math.PI * 2,
                connections: [],
            }))

            // Pre-calculate connections based on proximity
            nodesRef.current.forEach((node, i) => {
                node.connections = nodesRef.current
                    .map((other, j) => ({ j, dist: Math.hypot(node.x - other.x, node.y - other.y) }))
                    .filter(({ j, dist }) => j !== i && dist < 200)
                    .sort((a, b) => a.dist - b.dist)
                    .slice(0, 5)
                    .map(({ j }) => j)
            })
        }

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener('mousemove', handleMouseMove)

        resize()
        window.addEventListener('resize', resize)

        // Animation loop
        let animationId: number
        let time = 0

        const draw = () => {
            // P1: Animation speed scales with intensity
            time += 0.016 * intensity.animationSpeed

            // Clear with fade trail
            ctx.fillStyle = 'rgba(10, 14, 39, 0.15)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const nodes = nodesRef.current
            const mouse = mouseRef.current

            // Update and draw nodes
            nodes.forEach((node, i) => {
                // Update position
                node.x += node.vx
                node.y += node.vy

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1

                // Mouse interaction - nodes are attracted to cursor
                const dx = mouse.x - node.x
                const dy = mouse.y - node.y
                const dist = Math.hypot(dx, dy)

                if (dist < 200 && dist > 0) {
                    const force = (200 - dist) / 200 * 0.02
                    node.vx += (dx / dist) * force
                    node.vy += (dy / dist) * force
                    // Expand radius when near cursor
                    node.radius = node.baseRadius + (200 - dist) / 20
                } else {
                    node.radius = node.baseRadius
                }

                // Damping
                node.vx *= 0.99
                node.vy *= 0.99

                // Pulsing effect
                node.pulsePhase += 0.02
                const pulse = Math.sin(node.pulsePhase) * 0.3 + 1

                // Draw node glow - P1: opacity scales with intensity
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius * pulse * 4
                )
                gradient.addColorStop(0, `rgba(0, 245, 255, ${0.8 * intensity.opacity})`)
                gradient.addColorStop(0.5, `rgba(178, 75, 243, ${0.3 * intensity.opacity})`)
                gradient.addColorStop(1, 'transparent')

                ctx.beginPath()
                ctx.arc(node.x, node.y, node.radius * pulse * 4, 0, Math.PI * 2)
                ctx.fillStyle = gradient
                ctx.fill()

                // Draw node core
                ctx.beginPath()
                ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2)
                ctx.fillStyle = '#00F5FF'
                ctx.fill()
            })

            // Draw connections
            ctx.lineWidth = 1
            nodes.forEach((node, i) => {
                node.connections.forEach(j => {
                    const other = nodes[j]
                    const dist = Math.hypot(node.x - other.x, node.y - other.y)

                    if (dist < 200) {
                        // P1: Connection opacity scales with intensity
                        const opacity = (1 - dist / 200) * 0.6 * intensity.opacity

                        // Create gradient connection
                        const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y)
                        gradient.addColorStop(0, `rgba(0, 245, 255, ${opacity})`)
                        gradient.addColorStop(0.5, `rgba(178, 75, 243, ${opacity * 0.8})`)
                        gradient.addColorStop(1, `rgba(0, 245, 255, ${opacity})`)

                        ctx.beginPath()
                        ctx.moveTo(node.x, node.y)
                        ctx.lineTo(other.x, other.y)
                        ctx.strokeStyle = gradient
                        ctx.stroke()

                        // Draw data pulse along connection
                        const pulsePos = (time * 0.5 + i * 0.1) % 1
                        const pulseX = node.x + (other.x - node.x) * pulsePos
                        const pulseY = node.y + (other.y - node.y) * pulsePos

                        ctx.beginPath()
                        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
                        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
                        ctx.fill()
                    }
                })
            })

            // Draw cursor glow
            if (mouse.x > 0 && mouse.y > 0) {
                const cursorGrad = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, 150
                )
                cursorGrad.addColorStop(0, 'rgba(178, 75, 243, 0.3)')
                cursorGrad.addColorStop(0.5, 'rgba(0, 245, 255, 0.1)')
                cursorGrad.addColorStop(1, 'transparent')

                ctx.beginPath()
                ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2)
                ctx.fillStyle = cursorGrad
                ctx.fill()
            }

            animationId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [isActive, intensity.particleMultiplier, intensity.animationSpeed, intensity.opacity])

    if (theme.id !== 'quantum' || !particleEffects) return null

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    )
})

/**
 * Matrix Digital Rain Effect
 * P0 FIX: Reduced intensity - dimmer greens, lower opacity, slower fade
 * P1: Now respects effectIntensity and performanceMode
 */
export const MatrixRain = memo(function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme, particleEffects, performanceMode } = useAppStore()
    const intensity = useEffectIntensity()

    // P1: Disable effect if performance mode is on or intensity too low
    const isActive = theme.id === 'terminal' && particleEffects && !performanceMode && intensity.enabled

    useEffect(() => {
        if (!isActive) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Matrix characters (English letters + numbers + symbols)
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>{}[]=/\\|~';
        const charArray = chars.split('');

        // P1: Column count scales with intensity (fewer columns = better performance)
        const columnMultiplier = 0.4 + (intensity.particleMultiplier * 0.6)
        const fontSize = 14
        const columns = Math.floor((canvas.width / fontSize) * columnMultiplier)
        const drops: number[] = Array(columns).fill(1)

        // Animation
        let animationId: number
        const draw = () => {
            // P0 FIX: Slower fade trail for reduced visual noise
            ctx.fillStyle = 'rgba(8, 12, 8, 0.12)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // P1: Green intensity scales with effect intensity
                const greenBase = Math.floor(90 * intensity.opacity)
                const greenEnd = Math.floor(107 * intensity.opacity)
                ctx.fillStyle = drops[i] * fontSize > canvas.height - 50
                    ? `rgb(61, ${greenBase}, 61)`   // Dim sage at the end
                    : `rgb(42, ${greenEnd}, 42)`;   // Even dimmer for the trail

                ctx.fillText(char, x, y)

                // Reset drop randomly after falling
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            }

            animationId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
        }
    }, [isActive, intensity.particleMultiplier, intensity.opacity])

    if (!isActive) return null

    // P1: Canvas opacity scales with intensity
    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.05 + (intensity.opacity * 0.15) }}
            aria-hidden="true"
        />
    )
})

/**
 * CRT Monitor Effect Overlay
 * P0 FIX: Drastically reduced scan lines (0.01 opacity), removed flicker, subtle vignette
 * P1: Now respects performanceMode
 */
export function CRTEffect() {
    const { theme, particleEffects, performanceMode } = useAppStore()
    const intensity = useEffectIntensity()

    if (theme.id !== 'terminal' || !particleEffects || performanceMode || !intensity.enabled) return null

    // P1: Scale CRT effects with intensity
    const scanlineOpacity = 0.005 + (0.015 * intensity.opacity)
    const vignetteOpacity = 0.15 + (0.20 * intensity.opacity)
    const shadowSpread = Math.floor(30 + (60 * intensity.blurIntensity))

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
            <div
                className="absolute inset-0"
                style={{
                    background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 100, 0, ${scanlineOpacity}) 3px,
            rgba(0, 100, 0, ${scanlineOpacity}) 4px
          )`,
                }}
            />

            {/* REMOVED: Screen flicker was too distracting */}

            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(
            ellipse at center,
            transparent 60%,
            rgba(0, 0, 0, ${vignetteOpacity}) 100%
          )`,
                }}
            />

            <div
                className="absolute inset-0"
                style={{
                    boxShadow: `
            inset 0 0 ${shadowSpread}px rgba(0, 0, 0, ${0.1 + 0.1 * intensity.opacity}),
            inset 0 0 ${shadowSpread / 2}px rgba(0, 0, 0, ${0.05 + 0.1 * intensity.opacity})
          `,
                }}
            />
        </div>
    )
}

/**
 * Liquid Glass Effect
 * P0 FIX: Reduced blur (12px instead of 40px), more subtle orbs
 * P1: Now respects performanceMode
 */
export function LiquidGlassEffect() {
    const { theme, particleEffects, performanceMode } = useAppStore()
    const intensity = useEffectIntensity()

    if (theme.id !== 'neumorphic' || !particleEffects || performanceMode || !intensity.enabled) return null

    // P1: Calculate number of orbs and blur based on intensity
    const orbCount = Math.max(2, Math.floor(4 * intensity.particleMultiplier))
    const blurAmount = Math.floor(8 + (8 * intensity.blurIntensity))
    const orbOpacity = 0.2 + (0.3 * intensity.opacity)

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* P1: Orb count and blur scale with intensity */}
            {[...Array(orbCount)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: `${150 + i * 80}px`,
                        height: `${150 + i * 80}px`,
                        left: `${15 + i * 20}%`,
                        top: `${5 + i * 22}%`,
                        background: `radial-gradient(
              circle at 30% 30%,
              rgba(255, 255, 255, ${0.3 * orbOpacity}),
              rgba(255, 255, 255, ${0.1 * orbOpacity}) 50%,
              transparent 70%
            )`,
                        backdropFilter: `blur(${blurAmount}px)`,
                        animation: `float ${(10 + i * 3) / intensity.animationSpeed}s ease-in-out infinite`,
                        animationDelay: `${i * 0.7}s`,
                    }}
                />
            ))}

            {/* P0 FIX: Lighter gradient wash */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(
            135deg,
            rgba(147, 197, 253, 0.05) 0%,
            rgba(196, 181, 253, 0.05) 50%,
            rgba(251, 191, 36, 0.02) 100%
          )`,
                }}
            />
        </div>
    )
}

/**
 * Vaporwave Aesthetic Effect
 * Retro 80s/90s with sun, grid, and glitch
 * P1: Softened colors, respects performanceMode
 */
export function VaporwaveEffect() {
    const { theme, particleEffects, performanceMode } = useAppStore()
    const intensity = useEffectIntensity()

    if (theme.id !== 'vaporwave' || !particleEffects || performanceMode || !intensity.enabled) return null

    // P1: Calculate opacity and animation speeds based on intensity
    const sunOpacity = 0.3 + (0.4 * intensity.opacity)
    const gridOpacity = 0.15 + (0.2 * intensity.opacity)
    const glitchOpacity = 0.15 + (0.25 * intensity.opacity)

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* P1: Softer sunset gradient - opacity scales with intensity */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1/2"
                style={{
                    background: `linear-gradient(
            0deg,
            rgba(217, 79, 140, ${0.15 + 0.2 * intensity.opacity}) 0%,
            rgba(139, 92, 196, ${0.1 + 0.1 * intensity.opacity}) 30%,
            transparent 100%
          )`,
                }}
            />

            {/* P1: Sun opacity scales with intensity */}
            <div
                className="absolute left-1/2 bottom-1/4 -translate-x-1/2 w-64 h-64"
                style={{
                    background: `linear-gradient(
            0deg,
            #D94F8C 0%,
            #E87B4F 30%,
            #F0C05A 60%,
            #FAF3E0 100%
          )`,
                    borderRadius: '50%',
                    filter: `blur(${3 * intensity.blurIntensity}px)`,
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                    opacity: sunOpacity,
                }}
            />

            {/* Horizontal stripe cuts through sun */}
            <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 w-80 h-64">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-full bg-background"
                        style={{
                            height: `${2 + i * 0.5}px`,
                            top: `${20 + i * 12}%`,
                        }}
                    />
                ))}
            </div>

            {/* P1: Grid opacity scales with intensity */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1/3"
                style={{
                    background: `
            linear-gradient(90deg, rgba(92, 184, 184, ${gridOpacity}) 1px, transparent 1px),
            linear-gradient(rgba(92, 184, 184, ${gridOpacity}) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 30px',
                    transform: 'perspective(200px) rotateX(60deg)',
                    transformOrigin: 'center top',
                }}
            />

            {/* P1: Glitch lines opacity and animation scale with intensity */}
            <div className="absolute inset-0" style={{ opacity: glitchOpacity }}>
                {[...Array(Math.floor(3 * intensity.particleMultiplier))].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                        style={{
                            top: `${30 + i * 20}%`,
                            animation: `glitch ${(0.5 + i * 0.2) / intensity.animationSpeed}s ease-in-out infinite`,
                            animationDelay: `${i * 0.3}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

/**
 * Combined Theme Effects Component
 * Add this to layout to enable all theme effects
 * Performance mode check at top level prevents ALL effect components from mounting
 */
export function ThemeEffects() {
    const { performanceMode } = useAppStore()

    // Skip ALL effects in performance mode - prevents JS execution overhead
    if (performanceMode) return null

    return (
        <>
            <QuantumNeuralNetwork />
            <MatrixRain />
            <CRTEffect />
            <LiquidGlassEffect />
            <VaporwaveEffect />
        </>
    )
}
