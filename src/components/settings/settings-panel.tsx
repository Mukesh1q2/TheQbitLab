'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Settings, Palette, Zap, Volume2, VolumeX, Check, X,
    Eye, EyeOff, Layers, Droplet, RotateCcw, Sliders
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore, THEMES, Theme, ThemeCustomization } from '@/store/app-store'

export function SettingsPanel() {
    const [isOpen, setIsOpen] = useState(false)
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
    } = useAppStore()

    return (
        <>
            {/* Trigger button */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    'fixed bottom-6 right-6 z-40',
                    'w-12 h-12 rounded-full',
                    'bg-primary text-primary-foreground',
                    'flex items-center justify-center',
                    'shadow-lg hover:scale-105 transition-transform',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                )}
                aria-label="Open settings"
            >
                <Settings className="w-5 h-5" />
            </button>

            {/* Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
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
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-md hover:bg-secondary transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
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
                                            activeTab === tab
                                                ? 'text-primary border-b-2 border-primary'
                                                : 'text-muted-foreground hover:text-foreground'
                                        )}
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
                                        <section>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Palette className="w-5 h-5 text-primary" />
                                                <h3 className="font-medium text-foreground">Select Theme</h3>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {THEMES.map((t) => (
                                                    <ThemePreviewCard
                                                        key={t.id}
                                                        theme={t}
                                                        isSelected={theme.id === t.id}
                                                        onClick={() => setTheme(t)}
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
                                        <section className="space-y-3">
                                            <h3 className="font-medium text-foreground mb-3">Animation Effects</h3>

                                            <ToggleItem
                                                icon={<span className="text-lg">✨</span>}
                                                label="Particle Effects"
                                                description="Theme-specific animations"
                                                enabled={particleEffects}
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
                                                {theme.id === 'terminal' && 'Matrix digital rain with CRT scan lines and screen flicker.'}
                                                {theme.id === 'neumorphic' && 'Floating frosted glass orbs with depth and blur effects.'}
                                                {theme.id === 'vaporwave' && 'Retro sunset, neon grid, and glitch animation effects.'}
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
        </>
    )
}

// Theme Preview Card
function ThemePreviewCard({
    theme,
    isSelected,
    onClick,
}: {
    theme: Theme
    isSelected: boolean
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'relative p-3 rounded-xl border-2 transition-all text-left',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isSelected
                    ? 'border-primary shadow-lg'
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
        </button>
    )
}

// Toggle Item
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
                    <div className="font-medium text-foreground text-sm">{label}</div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                </div>
            </div>
            <ToggleSwitch enabled={enabled} onToggle={onToggle} />
        </div>
    )
}

// Slider Item
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
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{label}</span>
                <span className="text-xs text-muted-foreground">{value}%</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className={cn(
                    'w-full h-2 rounded-full appearance-none cursor-pointer',
                    'bg-secondary',
                    '[&::-webkit-slider-thumb]:appearance-none',
                    '[&::-webkit-slider-thumb]:w-4',
                    '[&::-webkit-slider-thumb]:h-4',
                    '[&::-webkit-slider-thumb]:rounded-full',
                    '[&::-webkit-slider-thumb]:bg-primary',
                    '[&::-webkit-slider-thumb]:cursor-pointer',
                    '[&::-webkit-slider-thumb]:transition-transform',
                    '[&::-webkit-slider-thumb]:hover:scale-110'
                )}
            />
        </div>
    )
}

// Toggle Switch
function ToggleSwitch({
    enabled,
    onToggle,
}: {
    enabled: boolean
    onToggle: () => void
}) {
    return (
        <button
            onClick={onToggle}
            className={cn(
                'relative w-11 h-6 rounded-full transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                enabled ? 'bg-primary' : 'bg-muted'
            )}
            role="switch"
            aria-checked={enabled}
        >
            <motion.div
                animate={{ x: enabled ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
            />
        </button>
    )
}
