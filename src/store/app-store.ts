import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Theme {
  id: string
  name: string
  description: string
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
}

export const THEMES: Theme[] = [
  {
    id: 'quantum',
    name: 'Quantum Neural',
    description: 'AI-Focused theme with neural network animations',
    preview: '🌌',
    colors: {
      primary: '#0A0E27',
      secondary: '#00F5FF',
      accent: '#B24BF3',
      background: '#0A0E27',
    },
  },
  {
    id: 'minimalist',
    name: 'Minimalist Pro',
    description: 'Clean & professional with Swiss design principles',
    preview: '✨',
    colors: {
      primary: '#242B38',      // P0 FIX: Deep charcoal
      secondary: '#F5F7FA',    // P0 FIX: Soft off-white
      accent: '#C9A227',       // P0 FIX: Rich gold
      background: '#F8FAFC',   // P0 FIX: Warm cream white
    },
  },
  {
    id: 'terminal',
    name: 'Matrix Terminal',
    description: 'The Matrix inspired - digital rain & CRT effects',
    preview: '💻',
    colors: {
      primary: '#0A0D0A',      // P0 FIX: Very dark with green tint
      secondary: '#4D8B4D',    // P0 FIX: Desaturated sage green
      accent: '#D4922C',       // P0 FIX: Amber for hierarchy
      background: '#080A08',   // P0 FIX: Dark with subtle green
    },
  },
  {
    id: 'neumorphic',
    name: 'Liquid Glass',
    description: 'iPhone-inspired frosted glass with depth',
    preview: '🎨',
    colors: {
      primary: '#E8ECF2',      // P0 FIX: Cool gray base
      secondary: '#F5F8FC',    // P0 FIX: Bright card color
      accent: '#0A84FF',       // P0 FIX: iOS blue
      background: '#E6EBF2',   // P0 FIX: Soft cool gray
    },
  },
  {
    id: 'vaporwave',
    name: 'Cyber Vaporwave',
    description: 'Retro sunset, neon grid & synthwave vibes',
    preview: '🌈',
    colors: {
      primary: '#D94F8C',      // P1 FIX: Softer pink
      secondary: '#5CB8B8',    // P1 FIX: Teal instead of neon cyan
      accent: '#8B5CC4',       // P1 FIX: Softer purple
      background: '#161422',   // P1 FIX: Warmer dark
    },
  },
]

// Advanced theme customization options
export interface ThemeCustomization {
  // Display toggles
  showSkillConstellation: boolean
  show3DBackground: boolean
  badgeFollowCursor: boolean

  // 3D Background style
  backgroundStyle: 'neural' | 'particles' | 'minimal' | 'off'

  // Visual settings
  glassOpacity: number // 0-100
  headerTransparency: number // 0-100
  blurIntensity: number // 0-20

  // Animation settings
  cursorEffects: boolean

  // Color overrides (optional)
  customPrimaryColor?: string
  customAccentColor?: string
  customBackgroundColor?: string
}

const DEFAULT_CUSTOMIZATION: ThemeCustomization = {
  showSkillConstellation: false, // Disabled for performance
  show3DBackground: false,       // Disabled for performance - user can enable
  badgeFollowCursor: false,      // Disabled for performance
  backgroundStyle: 'minimal',    // Minimal for faster load
  glassOpacity: 80,
  headerTransparency: 90,
  blurIntensity: 10,
  cursorEffects: false,          // Disabled for performance
}

interface AppState {
  theme: Theme
  customization: ThemeCustomization
  isLoading: boolean
  isMenuOpen: boolean
  currentView: string
  animationSpeed: 'slow' | 'normal' | 'fast'
  particleEffects: boolean
  soundEnabled: boolean

  // P1 Features
  effectIntensity: number        // 0-100 master control for all effects
  performanceMode: boolean       // Disables all effects when true
  previewTheme: Theme | null     // For live preview before committing

  // Actions
  setTheme: (theme: Theme) => void
  setCustomization: (customization: Partial<ThemeCustomization>) => void
  resetCustomization: () => void
  setLoading: (loading: boolean) => void
  toggleMenu: () => void
  setCurrentView: (view: string) => void
  setAnimationSpeed: (speed: 'slow' | 'normal' | 'fast') => void
  toggleParticleEffects: () => void
  toggleSound: () => void

  // P1 Actions
  setEffectIntensity: (intensity: number) => void
  togglePerformanceMode: () => void
  setPreviewTheme: (theme: Theme | null) => void
  applyPreviewTheme: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: THEMES[0],
      customization: DEFAULT_CUSTOMIZATION,
      isLoading: false,
      isMenuOpen: false,
      currentView: 'home',
      animationSpeed: 'normal',
      particleEffects: true,
      soundEnabled: false,

      // P1 defaults
      effectIntensity: 70,          // Default to 70% intensity
      performanceMode: true,        // Enabled by default for better performance
      previewTheme: null,

      setTheme: (theme) => {
        set({ theme, previewTheme: null })
        document.documentElement.className = `theme-${theme.id}`
        document.documentElement.setAttribute('data-theme', theme.id)
      },

      setCustomization: (customization) => set((state) => ({
        customization: { ...state.customization, ...customization }
      })),

      resetCustomization: () => set({ customization: DEFAULT_CUSTOMIZATION }),

      setLoading: (loading) => set({ isLoading: loading }),

      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

      setCurrentView: (view) => set({ currentView: view }),

      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),

      toggleParticleEffects: () => set((state) => ({
        particleEffects: !state.particleEffects
      })),

      toggleSound: () => set((state) => ({
        soundEnabled: !state.soundEnabled
      })),

      // P1 Actions
      setEffectIntensity: (intensity) => set({ effectIntensity: Math.max(0, Math.min(100, intensity)) }),

      togglePerformanceMode: () => set((state) => {
        const newMode = !state.performanceMode
        // When enabling performance mode, disable all heavy features but remember previous settings
        if (newMode) {
          // Store current settings to restore later (using a simple approach - storing in the state)
          return {
            performanceMode: true,
            // Store previous particleEffects state
            _previousParticleEffects: state.particleEffects,
            _previousBackgroundStyle: state.customization.backgroundStyle,
            particleEffects: false,
            customization: {
              ...state.customization,
              show3DBackground: false,
              showSkillConstellation: false,
              cursorEffects: false,
              badgeFollowCursor: false,
              backgroundStyle: 'off' as const,
            }
          }
        }
        // When disabling performance mode, restore previous settings
        const prevParticle = (state as any)._previousParticleEffects ?? true
        const prevBgStyle = (state as any)._previousBackgroundStyle ?? 'minimal'
        return {
          performanceMode: false,
          particleEffects: prevParticle,
          customization: {
            ...state.customization,
            backgroundStyle: prevBgStyle,
          }
        }
      }),

      setPreviewTheme: (theme) => {
        set({ previewTheme: theme })
        // Apply preview to DOM without committing
        if (theme) {
          document.documentElement.setAttribute('data-theme', theme.id)
        } else {
          // Revert to current theme
          const currentTheme = get().theme
          document.documentElement.setAttribute('data-theme', currentTheme.id)
        }
      },

      applyPreviewTheme: () => {
        const preview = get().previewTheme
        if (preview) {
          get().setTheme(preview)
        }
      },
    }),
    {
      name: 'theqbitlabs-app-storage',
      partialize: (state) => ({
        theme: state.theme,
        customization: state.customization,
        animationSpeed: state.animationSpeed,
        particleEffects: state.particleEffects,
        soundEnabled: state.soundEnabled,
        effectIntensity: state.effectIntensity,
        performanceMode: state.performanceMode,
      }),
    }
  )
)