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
      primary: '#1A1A1A',
      secondary: '#F5F5F5',
      accent: '#D4AF37',
      background: '#FFFFFF',
    },
  },
  {
    id: 'terminal',
    name: 'Matrix Terminal',
    description: 'The Matrix inspired - digital rain & CRT effects',
    preview: '💻',
    colors: {
      primary: '#000000',
      secondary: '#00FF41',
      accent: '#008F11',
      background: '#0D0208',
    },
  },
  {
    id: 'neumorphic',
    name: 'Liquid Glass',
    description: 'iPhone-inspired frosted glass with depth',
    preview: '🎨',
    colors: {
      primary: '#F5F5F7',
      secondary: '#E8E8ED',
      accent: '#007AFF',
      background: '#F2F2F7',
    },
  },
  {
    id: 'vaporwave',
    name: 'Cyber Vaporwave',
    description: 'Retro sunset, neon grid & synthwave vibes',
    preview: '🌈',
    colors: {
      primary: '#FF2975',
      secondary: '#00F0FF',
      accent: '#7B2FBF',
      background: '#0A0A12',
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

      setTheme: (theme) => {
        set({ theme })
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
    }),
    {
      name: 'theqbitlabs-app-storage',
      partialize: (state) => ({
        theme: state.theme,
        customization: state.customization,
        animationSpeed: state.animationSpeed,
        particleEffects: state.particleEffects,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
)