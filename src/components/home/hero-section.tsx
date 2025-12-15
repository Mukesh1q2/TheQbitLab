'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { TypewriterText } from './typewriter-text'
import { useAppStore } from '@/store/app-store'
import { AnimatedCounter } from '@/components/ui'
import { ChevronDown, Github, Linkedin, Twitter, Mail, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dynamically import heavy components (reduces initial bundle significantly)
const Canvas3D = dynamic(() => import('./hero-canvas'), {
  ssr: false,
  loading: () => null,
})

const SkillConstellation = dynamic(() => import('./skill-constellation').then(mod => ({ default: mod.SkillConstellation })), {
  ssr: false,
  loading: () => <div className="h-40" />,
})

const ParticleField = dynamic(() => import('./particle-field').then(mod => ({ default: mod.ParticleField })), {
  ssr: false,
  loading: () => null,
})

export function HeroSection() {
  const [variant, setVariant] = useState<'3d' | 'generative' | 'video'>('3d')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [is3DReady, setIs3DReady] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { theme, customization } = useAppStore()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Delay 3D loading for better FCP
  useEffect(() => {
    if (customization.show3DBackground) {
      const timer = setTimeout(() => setIs3DReady(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [customization.show3DBackground])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section
      ref={ref}
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        `theme-${theme.id}`,
        theme.id === 'quantum' && 'neural-network-bg particle-system',
        theme.id === 'terminal' && 'scan-lines',
        theme.id === 'vaporwave' && 'holographic'
      )}
    >
      {/* Background Canvas - Lazy loaded */}
      <div className="absolute inset-0 z-0">
        {is3DReady && variant === '3d' && <Canvas3D />}
        {customization.show3DBackground && variant === 'generative' && <ParticleField />}
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Hero Content */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Greeting */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-lg font-mono text-muted-foreground"
          >
            Hello, I'm{' '}
            <span className={cn(
              'font-bold',
              theme.id === 'quantum' && 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600',
              theme.id === 'terminal' && 'text-terminal-green terminal-glow',
              theme.id === 'vaporwave' && 'holographic',
              theme.id === 'neumorphic' && 'text-primary'
            )}>
              TheQbitlabs
            </span>
          </motion.div>

          {/* Typewriter Title */}
          <div className="space-y-4">
            <TypewriterText
              texts={[
                'AI Engineer',
                'LLM Architect',
                'Full-Stack Developer',
                'UX Designer',
                'Problem Solver'
              ]}
              className={cn(
                'text-4xl sm:text-6xl lg:text-7xl font-bold',
                theme.id === 'quantum' && 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500',
                theme.id === 'terminal' && 'text-terminal-green terminal-glow font-mono',
                theme.id === 'minimalist' && 'text-minimalist-charcoal',
                theme.id === 'neumorphic' && 'text-2xl',
                theme.id === 'vaporwave' && 'holographic font-display'
              )}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Building the future with cutting-edge AI solutions and modern web applications.
              Specializing in{' '}
              <span className="font-semibold text-primary">
                Large Language Models
              </span>
              ,{' '}
              <span className="font-semibold text-primary">
                React/Next.js
              </span>
              , and{' '}
              <span className="font-semibold text-primary">
                scalable architectures
              </span>
              .
            </motion.p>
          </div>

          {/* Stats Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap justify-center gap-8 py-8"
          >
            {[
              { label: 'Projects Built', value: '50+', color: 'from-blue-500 to-cyan-500' },
              { label: 'Lines of Code', value: '100K+', color: 'from-purple-500 to-pink-500' },
              { label: 'Happy Clients', value: '25+', color: 'from-green-500 to-emerald-500' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  'text-center p-4 rounded-xl backdrop-blur-sm border',
                  theme.id === 'quantum' && 'bg-white/10 border-white/20',
                  theme.id === 'terminal' && 'bg-terminal-green/10 border-terminal-green/30',
                  theme.id === 'minimalist' && 'bg-white border-gray-200',
                  theme.id === 'neumorphic' && 'neumorphic-card',
                  theme.id === 'vaporwave' && 'glass-dark'
                )}
              >
                <div className={cn(
                  'text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent',
                  stat.color
                )}>
                  <AnimatedCounter value={stat.value} duration={2} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill Constellation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            className="py-8"
          >
            <SkillConstellation />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all',
                theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25',
                theme.id === 'terminal' && 'bg-terminal-green text-black border-2 border-terminal-green',
                theme.id === 'minimalist' && 'bg-black text-white',
                theme.id === 'neumorphic' && 'neumorphic-button text-primary-foreground bg-primary',
                theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-pink to-vaporwave-cyan text-white'
              )}
            >
              View My Work
              <ChevronDown className="ml-2 w-5 h-5 rotate-[-90deg]" />
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all',
                'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
              )}
            >
              Contact Me
              <Mail className="ml-2 w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="flex justify-center gap-6 pt-8"
          >
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              { icon: Mail, href: 'mailto:hello@qbitlab.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  'p-3 rounded-xl transition-colors',
                  theme.id === 'quantum' && 'bg-white/10 hover:bg-white/20 text-white',
                  theme.id === 'terminal' && 'border border-terminal-green/30 hover:bg-terminal-green/10 text-terminal-green',
                  theme.id === 'minimalist' && 'bg-gray-100 hover:bg-gray-200 text-gray-700',
                  theme.id === 'neumorphic' && 'neumorphic-card hover:shadow-lg text-primary',
                  theme.id === 'vaporwave' && 'glass-dark hover:bg-white/10 text-vaporwave-cyan'
                )}
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, repeat: Infinity, repeatType: 'reverse', duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </motion.div>
    </section>
  )
}