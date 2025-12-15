'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/utils'

interface Stat {
  id: string
  label: string
  value: number
  suffix: string
  icon: string
  color: string
}

const stats: Stat[] = [
  {
    id: 'projects',
    label: 'Projects Completed',
    value: 47,
    suffix: '+',
    icon: '🚀',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'clients',
    label: 'Happy Clients',
    value: 23,
    suffix: '+',
    icon: '😊',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'experience',
    label: 'Years Experience',
    value: 5,
    suffix: '+',
    icon: '⏱️',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'technologies',
    label: 'Technologies Mastered',
    value: 25,
    suffix: '+',
    icon: '⚡',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'uptime',
    label: 'Code Uptime',
    value: 99,
    suffix: '.9%',
    icon: '💻',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'coffee',
    label: 'Cups of Coffee',
    value: 1247,
    suffix: '+',
    icon: '☕',
    color: 'from-amber-500 to-orange-500',
  },
]

function Counter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(value * easeOutQuart))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  )
}

export function StatsSection() {
  const { theme } = useAppStore()

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/50 to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={cn(
            'text-3xl sm:text-4xl lg:text-5xl font-bold mb-4',
            theme.id === 'quantum' && 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600',
            theme.id === 'terminal' && 'text-terminal-green terminal-glow font-mono',
            theme.id === 'minimalist' && 'text-minimalist-charcoal',
            theme.id === 'neumorphic' && 'text-gray-700',
            theme.id === 'vaporwave' && 'holographic font-display'
          )}>
            Numbers That Speak
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real metrics from real projects. Every number tells a story of dedication, 
            innovation, and successful delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className={cn(
                'text-center p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300',
                theme.id === 'quantum' && 'bg-white/10 border-white/20 hover:bg-white/15',
                theme.id === 'terminal' && 'bg-terminal-green/5 border-terminal-green/20 hover:bg-terminal-green/10',
                theme.id === 'minimalist' && 'bg-white border-gray-200 hover:shadow-lg',
                theme.id === 'neumorphic' && 'neumorphic-card hover:shadow-lg',
                theme.id === 'vaporwave' && 'glass-dark border-white/10 hover:border-white/20'
              )}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              
              <div className={cn(
                'text-2xl sm:text-3xl font-bold mb-2',
                `bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`
              )}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
              
              {/* Animated progress bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                className={cn(
                  'h-1 mt-4 rounded-full bg-gradient-to-r',
                  stat.color
                )}
                style={{ originX: 0 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Fun facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className={cn(
            'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium',
            theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
            theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green border border-terminal-green/20',
            theme.id === 'minimalist' && 'bg-gray-100 text-gray-700 border border-gray-200',
            theme.id === 'neumorphic' && 'neumorphic-inset text-gray-600',
            theme.id === 'vaporwave' && 'glass-dark text-vaporwave-cyan border border-white/10'
          )}>
            <span className="animate-pulse">🎯</span>
            <span>All statistics are real and updated in real-time</span>
            <span className="animate-pulse">✨</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}