'use client'

import { useEffect, useRef, memo, useCallback } from 'react'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'

/**
 * Quantum Neural Network Effect
 * Interactive neural network that responds to cursor movement
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
    const { theme, particleEffects } = useAppStore()

    useEffect(() => {
        if (theme.id !== 'quantum' || !particleEffects) return

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

        // Initialize neural network nodes (reduced for performance)
        const initNodes = () => {
            const nodeCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 25000))
            nodesRef.current = Array.from({ length: nodeCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
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
            time += 0.016

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

                // Draw node glow
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius * pulse * 4
                )
                gradient.addColorStop(0, 'rgba(0, 245, 255, 0.8)')
                gradient.addColorStop(0.5, 'rgba(178, 75, 243, 0.3)')
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
                        const opacity = (1 - dist / 200) * 0.6

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
    }, [theme.id, particleEffects])

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
 * Inspired by The Matrix movie - falling green code
 */
export const MatrixRain = memo(function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme, particleEffects } = useAppStore()

    useEffect(() => {
        if (theme.id !== 'terminal' || !particleEffects) return

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

        const fontSize = 14
        const columns = Math.floor(canvas.width / fontSize)
        const drops: number[] = Array(columns).fill(1)

        // Animation
        let animationId: number
        const draw = () => {
            // Semi-transparent black for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Subtle head of the rain (no bright glow)
                ctx.fillStyle = drops[i] * fontSize > canvas.height - 50
                    ? '#2aaa2a'
                    : '#1a8a1a';

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
    }, [theme.id, particleEffects])

    if (theme.id !== 'terminal' || !particleEffects) return null

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-15"
            aria-hidden="true"
        />
    )
})

/**
 * CRT Monitor Effect Overlay
 * Scan lines, screen flicker, and curvature
 */
export function CRTEffect() {
    const { theme, particleEffects } = useAppStore()

    if (theme.id !== 'terminal' || !particleEffects) return null

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
            {/* Scan lines */}
            <div
                className="absolute inset-0"
                style={{
                    background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
          )`,
                }}
            />

            {/* Screen flicker */}
            <div
                className="absolute inset-0 animate-pulse opacity-[0.02]"
                style={{ background: '#00FF00' }}
            />

            {/* Vignette effect */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 100%
          )`,
                }}
            />

            {/* Corner curvature shadows */}
            <div
                className="absolute inset-0"
                style={{
                    boxShadow: `
            inset 0 0 100px rgba(0, 0, 0, 0.3),
            inset 0 0 50px rgba(0, 0, 0, 0.2)
          `,
                }}
            />
        </div>
    )
}

/**
 * Liquid Glass Effect
 * iPhone-inspired glassmorphism with depth
 */
export function LiquidGlassEffect() {
    const { theme, particleEffects } = useAppStore()

    if (theme.id !== 'neumorphic' || !particleEffects) return null

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Floating glass orbs */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: `${200 + i * 100}px`,
                        height: `${200 + i * 100}px`,
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 20}%`,
                        background: `radial-gradient(
              circle at 30% 30%,
              rgba(255, 255, 255, 0.8),
              rgba(255, 255, 255, 0.2) 50%,
              transparent 70%
            )`,
                        backdropFilter: 'blur(40px)',
                        animation: `float ${8 + i * 2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                    }}
                />
            ))}

            {/* Subtle gradient wash */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(
            135deg,
            rgba(147, 197, 253, 0.1) 0%,
            rgba(196, 181, 253, 0.1) 50%,
            rgba(251, 191, 36, 0.05) 100%
          )`,
                }}
            />
        </div>
    )
}

/**
 * Vaporwave Aesthetic Effect
 * Retro 80s/90s with sun, grid, and glitch
 */
export function VaporwaveEffect() {
    const { theme, particleEffects } = useAppStore()

    if (theme.id !== 'vaporwave' || !particleEffects) return null

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Sunset gradient */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1/2"
                style={{
                    background: `linear-gradient(
            0deg,
            rgba(255, 16, 240, 0.3) 0%,
            rgba(123, 44, 191, 0.2) 30%,
            transparent 100%
          )`,
                }}
            />

            {/* Retro sun */}
            <div
                className="absolute left-1/2 bottom-1/4 -translate-x-1/2 w-64 h-64"
                style={{
                    background: `linear-gradient(
            0deg,
            #FF10F0 0%,
            #FF6B00 30%,
            #FFD93D 60%,
            #FFF 100%
          )`,
                    borderRadius: '50%',
                    filter: 'blur(2px)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                    opacity: 0.6,
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

            {/* Perspective grid */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1/3"
                style={{
                    background: `
            linear-gradient(90deg, rgba(0, 217, 255, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(0, 217, 255, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 30px',
                    transform: 'perspective(200px) rotateX(60deg)',
                    transformOrigin: 'center top',
                }}
            />

            {/* Glitch lines */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                        style={{
                            top: `${30 + i * 20}%`,
                            animation: `glitch ${0.5 + i * 0.2}s ease-in-out infinite`,
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
 */
export function ThemeEffects() {
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
