'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Settings, Palette, Zap, Volume2, VolumeX, Check, X,
    Eye, EyeOff, Layers, Droplet, RotateCcw, Sliders,
    Gauge, Bolt, Monitor
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore, THEMES, Theme, ThemeCustomization } from '@/store/app-store'

export function SettingsPanel() {
    const [activeTab, setActiveTab] = useState<'themes' | 'display' | 'effects'>('themes')

    const {
        theme,
        setTheme,
        customization,
        setCustomization,
        resetCustomization,
        animationSpeed,
        setAnimationSpeed,
        soundEnabled,
        toggleSound,
        particleEffects,
        toggleParticleEffects,
        // P1 Features
        effectIntensity,
        setEffectIntensity,
        performanceMode,
        togglePerformanceMode,
        previewTheme,
        setPreviewTheme,
        isSettingsOpen,
        setSettingsOpen,
    } = useAppStore()

    // P1: Handle theme hover for live preview
    const handleThemeHover = useCallback((t: Theme | null) => {
        if (t && t.id !== theme.id) {
            setPreviewTheme(t)
        } else if (!t) {
            setPreviewTheme(null)
        }
    }, [theme.id, setPreviewTheme])

    // P1: Handle theme selection (commits the preview)
    const handleThemeSelect = useCallback((t: Theme) => {
        setTheme(t)
    }, [setTheme])

    return (
        <AnimatePresence>
            {isSettingsOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setPreviewTheme(null) // Reset preview on close
                            setSettingsOpen(false)
                        }}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    />

                    {/* Panel content */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={cn(
                            'fixed right-0 top-0 bottom-0 z-50',
                            'w-full max-w-md',
                            'bg-card border-l border-border',
                            'flex flex-col',
                            'shadow-2xl'
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h2 className="text-lg font-semibold text-foreground">Theme Settings</h2>
                            <button
                                onClick={() => {
                                    setPreviewTheme(null) // Reset preview on close
                                    setSettingsOpen(false)
                                }}
                                className="p-2 rounded-md hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                aria-label="Close settings panel"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* P1: Performance Mode Quick Toggle */}
                        <div className="px-4 py-3 border-b border-border bg-secondary/30">
                            <button
                                onClick={togglePerformanceMode}
                                className={cn(
                                    'w-full flex items-center justify-between p-3 rounded-lg transition-all',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                                    performanceMode
                                        ? 'bg-accent/20 border-2 border-accent'
                                        : 'bg-secondary/50 border border-border hover:border-accent/50'
                                )}
                                role="switch"
                                aria-checked={performanceMode}
                                aria-label={`Performance Mode: ${performanceMode ? 'enabled, all effects disabled' : 'disabled, click to disable all heavy effects'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        'w-10 h-10 rounded-full flex items-center justify-center',
                                        performanceMode ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                                    )}>
                                        <Bolt className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-medium text-foreground">Performance Mode</div>
                                        <div className="text-xs text-muted-foreground">
                                            {performanceMode ? 'All effects disabled' : 'Disable all heavy effects instantly'}
                                        </div>
                                    </div>
                                </div>
                                <div className={cn(
                                    'px-3 py-1 rounded-full text-xs font-medium',
                                    performanceMode
                                        ? 'bg-accent text-accent-foreground'
                                        : 'bg-muted text-muted-foreground'
                                )}>
                                    {performanceMode ? 'ON' : 'OFF'}
                                </div>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-border">
                            {(['themes', 'display', 'effects'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        'flex-1 py-3 text-sm font-medium transition-colors',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                                        activeTab === tab
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                    role="tab"
                                    aria-selected={activeTab === tab}
                                    aria-controls={`tabpanel-${tab}`}
                                >
                                    {tab === 'themes' && 'Themes'}
                                    {tab === 'display' && 'Display'}
                                    {tab === 'effects' && 'Effects'}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {/* Themes Tab */}
                            {activeTab === 'themes' && (
                                <div className="space-y-6">
                                    {/* Live Preview indicator */}
                                    {previewTheme && (
                                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/30 flex items-center gap-2">
                                            <Monitor className="w-4 h-4 text-accent" />
                                            <span className="text-sm text-accent">
                                                Previewing: <strong>{previewTheme.name}</strong>
                                            </span>
                                        </div>
                                    )}

                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Palette className="w-5 h-5 text-primary" />
                                            <h3 className="font-medium text-foreground">Select Theme</h3>
                                            <span className="text-xs text-muted-foreground ml-auto">Hover to preview</span>
                                        </div>
                                        <div
                                            className="grid grid-cols-2 gap-3"
                                            onMouseLeave={() => handleThemeHover(null)}
                                        >
                                            {THEMES.map((t) => (
                                                <ThemePreviewCard
                                                    key={t.id}
                                                    theme={t}
                                                    isSelected={theme.id === t.id}
                                                    isPreviewing={previewTheme?.id === t.id}
                                                    onClick={() => handleThemeSelect(t)}
                                                    onHover={() => handleThemeHover(t)}
                                                />
                                            ))}
                                        </div>
                                    </section>

                                    {/* Animation Speed */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Zap className="w-5 h-5 text-primary" />
                                            <h3 className="font-medium text-foreground">Animation Speed</h3>
                                        </div>
                                        <div className="flex gap-2">
                                            {(['slow', 'normal', 'fast'] as const).map((speed) => (
                                                <button
                                                    key={speed}
                                                    onClick={() => setAnimationSpeed(speed)}
                                                    className={cn(
                                                        'flex-1 py-2 px-4 rounded-lg text-sm font-medium',
                                                        'border transition-colors',
                                                        animationSpeed === speed
                                                            ? 'bg-primary text-primary-foreground border-primary'
                                                            : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
                                                    )}
                                                >
                                                    {speed.charAt(0).toUpperCase() + speed.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {/* Display Tab */}
                            {activeTab === 'display' && (
                                <div className="space-y-6">
                                    {/* Toggles */}
                                    <section className="space-y-3">
                                        <h3 className="font-medium text-foreground mb-3">Visibility</h3>

                                        <ToggleItem
                                            icon={<Layers className="w-4 h-4" />}
                                            label="Skill Constellation"
                                            description="Show tech stack on hero"
                                            enabled={customization.showSkillConstellation}
                                            onToggle={() => setCustomization({
                                                showSkillConstellation: !customization.showSkillConstellation
                                            })}
                                        />

                                        <ToggleItem
                                            icon={<Eye className="w-4 h-4" />}
                                            label="3D Background"
                                            description="Three.js neural network"
                                            enabled={customization.show3DBackground}
                                            onToggle={() => setCustomization({
                                                show3DBackground: !customization.show3DBackground
                                            })}
                                        />

                                        <ToggleItem
                                            icon={<Zap className="w-4 h-4" />}
                                            label="Cursor Effects"
                                            description="Interactive mouse glow"
                                            enabled={customization.cursorEffects}
                                            onToggle={() => setCustomization({
                                                cursorEffects: !customization.cursorEffects
                                            })}
                                        />

                                        <ToggleItem
                                            icon={<span className="text-sm">🎯</span>}
                                            label="Badge Follow Cursor"
                                            description="Skills attracted to mouse"
                                            enabled={customization.badgeFollowCursor}
                                            onToggle={() => setCustomization({
                                                badgeFollowCursor: !customization.badgeFollowCursor
                                            })}
                                        />
                                    </section>

                                    {/* Background Style */}
                                    <section className="space-y-3">
                                        <h3 className="font-medium text-foreground mb-3">Background Style</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {(['neural', 'particles', 'minimal', 'off'] as const).map((style) => (
                                                <button
                                                    key={style}
                                                    onClick={() => setCustomization({ backgroundStyle: style })}
                                                    className={cn(
                                                        'p-3 rounded-lg border text-left transition-all',
                                                        customization.backgroundStyle === style
                                                            ? 'border-primary bg-primary/10'
                                                            : 'border-border hover:border-primary/50'
                                                    )}
                                                >
                                                    <div className="font-medium text-foreground text-sm capitalize">
                                                        {style === 'neural' && '🧠 Neural'}
                                                        {style === 'particles' && '✨ Particles'}
                                                        {style === 'minimal' && '◽ Minimal'}
                                                        {style === 'off' && '🚫 Off'}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {style === 'neural' && '3D network'}
                                                        {style === 'particles' && 'Floating dots'}
                                                        {style === 'minimal' && 'Subtle gradient'}
                                                        {style === 'off' && 'No background'}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Sliders */}
                                    <section className="space-y-4">
                                        <h3 className="font-medium text-foreground mb-3">Visual Settings</h3>

                                        <SliderItem
                                            label="Glass Opacity"
                                            value={customization.glassOpacity}
                                            min={20}
                                            max={100}
                                            onChange={(v) => setCustomization({ glassOpacity: v })}
                                        />

                                        <SliderItem
                                            label="Header Transparency"
                                            value={customization.headerTransparency}
                                            min={50}
                                            max={100}
                                            onChange={(v) => setCustomization({ headerTransparency: v })}
                                        />

                                        <SliderItem
                                            label="Blur Intensity"
                                            value={customization.blurIntensity}
                                            min={0}
                                            max={20}
                                            onChange={(v) => setCustomization({ blurIntensity: v })}
                                        />
                                    </section>

                                    {/* Reset */}
                                    <button
                                        onClick={resetCustomization}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        Reset to defaults
                                    </button>
                                </div>
                            )}

                            {/* Effects Tab */}
                            {activeTab === 'effects' && (
                                <div className="space-y-6">
                                    {/* P1: Effect Intensity Master Slider */}
                                    <section className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Gauge className="w-5 h-5 text-primary" />
                                            <h3 className="font-medium text-foreground">Effect Intensity</h3>
                                            <span className="ml-auto text-sm font-mono text-muted-foreground">
                                                {effectIntensity}%
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            Master control for all visual effects. Lower values = better performance.
                                        </p>

                                        {/* P1: Effect Intensity slider with full accessibility */}
                                        <div className="space-y-2">
                                            <input
                                                id="effect-intensity-slider"
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={effectIntensity}
                                                onChange={(e) => setEffectIntensity(Number(e.target.value))}
                                                className="w-full h-2 rounded-full appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                style={{
                                                    background: `linear-gradient(to right, 
                                                            hsl(var(--muted)) 0%, 
                                                            hsl(var(--primary)) ${effectIntensity}%, 
                                                            hsl(var(--muted)) ${effectIntensity}%)`
                                                }}
                                                aria-label="Effect Intensity"
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-valuenow={effectIntensity}
                                                aria-valuetext={`${effectIntensity}% - ${effectIntensity < 30 ? 'Performance optimized' : effectIntensity < 70 ? 'Balanced' : 'Maximum visuals'}`}
                                            />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Off</span>
                                                <span>Low</span>
                                                <span>Medium</span>
                                                <span>High</span>
                                                <span>Max</span>
                                            </div>
                                        </div>

                                        {/* Intensity recommendations */}
                                        <div className={cn(
                                            'p-3 rounded-lg text-sm',
                                            effectIntensity < 30
                                                ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                                : effectIntensity < 70
                                                    ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                                                    : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                                        )}>
                                            {effectIntensity < 30 && '⚡ Performance optimized - minimal visual effects'}
                                            {effectIntensity >= 30 && effectIntensity < 70 && '✨ Balanced - good visual experience with decent performance'}
                                            {effectIntensity >= 70 && '🎨 Maximum visuals - best experience on powerful devices'}
                                        </div>
                                    </section>

                                    <section className="space-y-3">
                                        <h3 className="font-medium text-foreground mb-3">Animation Effects</h3>

                                        <ToggleItem
                                            icon={<span className="text-lg">✨</span>}
                                            label="Particle Effects"
                                            description="Theme-specific animations"
                                            enabled={particleEffects && !performanceMode}
                                            onToggle={toggleParticleEffects}
                                        />

                                        <ToggleItem
                                            icon={soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                            label="Sound Effects"
                                            description="UI interaction sounds"
                                            enabled={soundEnabled}
                                            onToggle={toggleSound}
                                        />
                                    </section>

                                    {/* Theme-specific info */}
                                    <section className="p-4 rounded-lg bg-secondary/50">
                                        <h4 className="font-medium text-foreground mb-2">
                                            {theme.name} Effects
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            {theme.id === 'quantum' && 'Interactive neural network with cursor-responsive nodes and glowing connections.'}
                                            {theme.id === 'terminal' && 'Subtle matrix rain with refined CRT ambient effects.'}
                                            {theme.id === 'neumorphic' && 'Subtle frosted glass orbs with refined depth effects.'}
                                            {theme.id === 'vaporwave' && 'Retro sunset with refined neon grid and ambient effects.'}
                                            {theme.id === 'minimalist' && 'Clean, minimal animations with subtle micro-interactions.'}
                                        </p>
                                    </section>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-border text-center text-xs text-muted-foreground">
                            Settings are saved automatically
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

// Theme Preview Card
function ThemePreviewCard({
    theme,
    isSelected,
    isPreviewing,
    onClick,
    onHover,
}: {
    theme: Theme
    isSelected: boolean
    isPreviewing?: boolean
    onClick: () => void
    onHover?: () => void
}) {
    return (
        <button
            onClick={onClick}
            onMouseEnter={onHover}
            className={cn(
                'relative p-3 rounded-xl border-2 transition-all text-left',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isSelected
                    ? 'border-primary shadow-lg'
                    : isPreviewing
                        ? 'border-accent/70 shadow-md bg-accent/5'
                        : 'border-border hover:border-primary/50'
            )}
        >
            {/* Color preview */}
            <div className="flex gap-1 mb-2">
                <div
                    className="w-5 h-5 rounded-full border border-border/50"
                    style={{ backgroundColor: theme.colors.background }}
                />
                <div
                    className="w-5 h-5 rounded-full border border-border/50"
                    style={{ backgroundColor: theme.colors.primary }}
                />
                <div
                    className="w-5 h-5 rounded-full border border-border/50"
                    style={{ backgroundColor: theme.colors.secondary }}
                />
                <div
                    className="w-5 h-5 rounded-full border border-border/50"
                    style={{ backgroundColor: theme.colors.accent }}
                />
            </div>

            {/* Theme info */}
            <div className="flex items-center gap-1 mb-1">
                <span className="text-base">{theme.preview}</span>
                <span className="font-medium text-foreground text-sm truncate">{theme.name}</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">
                {theme.description}
            </p>

            {/* Selected indicator */}
            {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                </div>
            )}

            {/* Preview indicator */}
            {isPreviewing && !isSelected && (
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-accent/80 text-accent-foreground rounded text-[10px] font-medium">
                    Preview
                </div>
            )}
        </button>
    )
}

function ToggleItem({
    icon,
    label,
    description,
    enabled,
    onToggle,
}: {
    icon: React.ReactNode
    label: string
    description: string
    enabled: boolean
    onToggle: () => void
}) {
    const toggleId = `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`

    return (
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-3">
                <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                )}>
                    {icon}
                </div>
                <div>
                    <label htmlFor={toggleId} className="font-medium text-foreground text-sm cursor-pointer">{label}</label>
                    <div className="text-xs text-muted-foreground" id={`${toggleId}-description`}>{description}</div>
                </div>
            </div>
            <ToggleSwitch
                enabled={enabled}
                onToggle={onToggle}
                id={toggleId}
                aria-describedby={`${toggleId}-description`}
            />
        </div>
    )
}

function SliderItem({
    label,
    value,
    min,
    max,
    onChange,
}: {
    label: string
    value: number
    min: number
    max: number
    onChange: (value: number) => void
}) {
    // Generate a stable ID from the label
    const sliderId = `slider-${label.toLowerCase().replace(/\s+/g, '-')}`

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor={sliderId} className="text-sm text-foreground">{label}</label>
                <span className="text-xs text-muted-foreground" aria-live="polite">{value}%</span>
            </div>
            <input
                id={sliderId}
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className={cn(
                    'w-full h-2 rounded-full appearance-none cursor-pointer',
                    'bg-secondary',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    '[&::-webkit-slider-thumb]:appearance-none',
                    '[&::-webkit-slider-thumb]:w-4',
                    '[&::-webkit-slider-thumb]:h-4',
                    '[&::-webkit-slider-thumb]:rounded-full',
                    '[&::-webkit-slider-thumb]:bg-primary',
                    '[&::-webkit-slider-thumb]:cursor-pointer',
                    '[&::-webkit-slider-thumb]:transition-transform',
                    '[&::-webkit-slider-thumb]:hover:scale-110'
                )}
                aria-label={label}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
            />
        </div>
    )
}

function ToggleSwitch({
    enabled,
    onToggle,
    id,
    'aria-describedby': ariaDescribedby,
}: {
    enabled: boolean
    onToggle: () => void
    id?: string
    'aria-describedby'?: string
}) {
    return (
        <button
            id={id}
            onClick={onToggle}
            className={cn(
                'relative w-11 h-6 rounded-full transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                enabled ? 'bg-primary' : 'bg-muted'
            )}
            role="switch"
            aria-checked={enabled}
            aria-describedby={ariaDescribedby}
        >
            <motion.div
                animate={{ x: enabled ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
            />
        </button>
    )
}
