'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Palette, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useAppStore, THEMES } from '@/store/app-store'

const navigation = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'About', href: '/about', icon: '👤' },
  { name: 'Projects', href: '/projects', icon: '🚀' },
  { name: 'Services', href: '/services', icon: '⚙️' },
  { name: 'Blog', href: '/blog', icon: '📝' },
  { name: 'Contact', href: '/contact', icon: '📞' },
  { name: 'Playground', href: '/playground', icon: '🎮' },
  { name: 'Marketplace', href: '/marketplace', icon: '🏪' },
  { name: 'Training', href: '/training', icon: '🎓' },
]

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useAppStore()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const handleThemeChange = (newTheme: typeof THEMES[0]) => {
    setTheme(newTheme)
    setShowThemeMenu(false)
  }

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-primary-foreground font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                QbitLab
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Theme Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              >
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">{theme.preview}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Choose Theme
                    </div>
                    {THEMES.map((themeOption) => (
                      <button
                        key={themeOption.id}
                        onClick={() => handleThemeChange(themeOption)}
                        className={cn(
                          'w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200',
                          theme.id === themeOption.id && 'bg-accent text-accent-foreground'
                        )}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{themeOption.preview}</span>
                          <div>
                            <div className="font-medium">{themeOption.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {themeOption.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur border-t border-border">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                      'hover:bg-accent hover:text-accent-foreground',
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}