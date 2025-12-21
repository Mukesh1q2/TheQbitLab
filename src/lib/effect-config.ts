/**
 * Theme Effects Configuration
 * Centralized configuration for all theme effects
 * P1: Modular architecture for easier maintenance and extension
 */

export interface EffectConfig {
    id: string
    name: string
    description: string
    themes: string[]  // Which themes use this effect
    performanceImpact: 'low' | 'medium' | 'high'
    defaultEnabled: boolean
}

/**
 * Registry of all available theme effects
 * Add new effects here when implementing them
 */
export const EFFECT_REGISTRY: EffectConfig[] = [
    {
        id: 'quantum-neural',
        name: 'Quantum Neural Network',
        description: 'Interactive neural network with cursor-responsive nodes',
        themes: ['quantum'],
        performanceImpact: 'high',
        defaultEnabled: true,
    },
    {
        id: 'matrix-rain',
        name: 'Matrix Digital Rain',
        description: 'Falling character animation inspired by The Matrix',
        themes: ['terminal'],
        performanceImpact: 'medium',
        defaultEnabled: true,
    },
    {
        id: 'crt-effect',
        name: 'CRT Monitor Overlay',
        description: 'Scan lines and vignette for retro monitor look',
        themes: ['terminal'],
        performanceImpact: 'low',
        defaultEnabled: true,
    },
    {
        id: 'liquid-glass',
        name: 'Liquid Glass Orbs',
        description: 'Floating frosted glass orbs with depth',
        themes: ['neumorphic'],
        performanceImpact: 'medium',
        defaultEnabled: true,
    },
    {
        id: 'vaporwave-scene',
        name: 'Vaporwave Scene',
        description: 'Retro sunset with neon grid and glitch lines',
        themes: ['vaporwave'],
        performanceImpact: 'medium',
        defaultEnabled: true,
    },
]

/**
 * Get effects available for a specific theme
 */
export function getEffectsForTheme(themeId: string): EffectConfig[] {
    return EFFECT_REGISTRY.filter(effect => effect.themes.includes(themeId))
}

/**
 * Get total performance impact for active effects
 * Returns a score from 0-100
 */
export function calculatePerformanceScore(activeEffects: string[]): number {
    const impactValues = {
        low: 10,
        medium: 25,
        high: 40,
    }

    const totalImpact = activeEffects.reduce((score, effectId) => {
        const effect = EFFECT_REGISTRY.find(e => e.id === effectId)
        if (effect) {
            return score + impactValues[effect.performanceImpact]
        }
        return score
    }, 0)

    return Math.min(100, totalImpact)
}

/**
 * Recommended effect intensity based on device capability
 * Note: This is a simple heuristic; more sophisticated detection could be added
 */
export function getRecommendedIntensity(): number {
    if (typeof window === 'undefined') return 70

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return 20
    }

    // Check device memory (if available)
    const nav = navigator as any
    if (nav.deviceMemory) {
        if (nav.deviceMemory <= 2) return 30
        if (nav.deviceMemory <= 4) return 50
        if (nav.deviceMemory <= 8) return 70
        return 90
    }

    // Check hardware concurrency (CPU cores)
    if (navigator.hardwareConcurrency) {
        if (navigator.hardwareConcurrency <= 2) return 30
        if (navigator.hardwareConcurrency <= 4) return 50
        if (navigator.hardwareConcurrency <= 8) return 70
        return 90
    }

    // Default to medium intensity
    return 70
}

/**
 * Effect intensity presets for quick selection
 */
export const INTENSITY_PRESETS = {
    off: 0,
    minimal: 20,
    balanced: 50,
    enhanced: 75,
    maximum: 100,
} as const

export type IntensityPreset = keyof typeof INTENSITY_PRESETS
