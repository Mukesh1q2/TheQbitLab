'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import { 
  ArrowRight,
  Mail,
  MessageCircle,
  Calendar,
  Download,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Zap,
  Code,
  Brain,
  Rocket
} from 'lucide-react'

export function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { theme } = useAppStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const ctaButtons = [
    {
      title: 'Start a Project',
      description: 'Let\'s build something amazing together',
      icon: Rocket,
      href: '/contact',
      primary: true,
      color: 'from-cyan-500 to-purple-600'
    },
    {
      title: 'Book a Consultation',
      description: 'Free 30-minute strategy session',
      icon: Calendar,
      href: '/booking',
      primary: false,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Explore LLM Playground',
      description: 'Try my AI tools and experiments',
      icon: Brain,
      href: '/playground',
      primary: false,
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/theqbitlabs',
      color: 'hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/theqbitlabs',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/theqbitlabs',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:hello@theqbitlabs.com',
      color: 'hover:text-red-500'
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-background via-secondary/20 to-accent/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          'absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl',
          theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500 to-purple-600',
          theme.id === 'terminal' && 'bg-gradient-to-r from-terminal-green to-terminal-amber',
          theme.id === 'minimalist' && 'bg-gradient-to-r from-gray-300 to-gray-500',
          theme.id === 'neumorphic' && 'bg-gradient-to-r from-purple-400 to-pink-400',
          theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-pink to-vaporwave-cyan'
        )} />
        <div className={cn(
          'absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl',
          theme.id === 'quantum' && 'bg-gradient-to-r from-purple-600 to-pink-500',
          theme.id === 'terminal' && 'bg-gradient-to-r from-terminal-amber to-terminal-red',
          theme.id === 'minimalist' && 'bg-gradient-to-r from-gray-500 to-gray-700',
          theme.id === 'neumorphic' && 'bg-gradient-to-r from-blue-400 to-purple-400',
          theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-cyan to-vaporwave-purple'
        )} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium mb-8',
              theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
              theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green border border-terminal-green/20',
              theme.id === 'minimalist' && 'bg-gray-100 text-gray-700 border border-gray-200',
              theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600 border border-gray-200',
              theme.id === 'vaporwave' && 'bg-vaporwave-cyan/10 text-vaporwave-cyan border border-vaporwave-cyan/20'
            )}
          >
            <Sparkles className="w-4 h-4" />
            Ready to build the future together?
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={cn(
              'text-4xl sm:text-5xl lg:text-6xl font-bold mb-6',
              theme.id === 'quantum' && 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500',
              theme.id === 'terminal' && 'text-terminal-green terminal-glow font-mono',
              theme.id === 'minimalist' && 'text-minimalist-charcoal',
              theme.id === 'neumorphic' && 'text-gray-700',
              theme.id === 'vaporwave' && 'holographic font-display'
            )}
          >
            Let's Create Something
            <br />
            <span className={cn(
              'bg-gradient-to-r bg-clip-text text-transparent',
              theme.id === 'quantum' && 'from-purple-500 to-pink-500',
              theme.id === 'terminal' && 'from-terminal-amber to-terminal-red',
              theme.id === 'minimalist' && 'from-gray-600 to-gray-800',
              theme.id === 'neumorphic' && 'from-purple-600 to-pink-600',
              theme.id === 'vaporwave' && 'from-vaporwave-pink to-vaporwave-purple'
            )}>
              Extraordinary
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Whether you need cutting-edge AI solutions, scalable web applications, 
            or innovative digital experiences, I'm here to turn your vision into reality. 
            Let's build the future, one line of code at a time.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {ctaButtons.map((button, index) => {
            const Icon = button.icon
            return (
              <motion.a
                key={button.title}
                href={button.href}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'group relative p-8 rounded-2xl border transition-all duration-300 overflow-hidden',
                  button.primary
                    ? theme.id === 'quantum' && 'bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border-cyan-400/30 hover:border-cyan-400/50'
                    || theme.id === 'terminal' && 'bg-gradient-to-br from-terminal-green/20 to-terminal-amber/20 border-terminal-green/30 hover:border-terminal-green/50'
                    || theme.id === 'minimalist' && 'bg-gradient-to-br from-minimalist-charcoal/10 to-gray-700/10 border-minimalist-charcoal/30 hover:border-minimalist-charcoal/50'
                    || theme.id === 'neumorphic' && 'neumorphic-card hover:shadow-xl'
                    || theme.id === 'vaporwave' && 'glass-dark border-white/20 hover:border-white/40'
                    : theme.id === 'quantum' && 'bg-white/5 border-white/10 hover:border-white/20'
                    || theme.id === 'terminal' && 'bg-terminal-bg border-terminal-green/20 hover:border-terminal-green/40'
                    || theme.id === 'minimalist' && 'bg-white border border-gray-200 hover:shadow-lg'
                    || theme.id === 'neumorphic' && 'neumorphic-card hover:shadow-lg'
                    || theme.id === 'vaporwave' && 'glass-dark border border-white/10 hover:border-white/20'
                )}
              >
                {/* Background Gradient */}
                {button.primary && (
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    button.color
                  )} />
                )}

                <div className="relative z-10 text-center">
                  <div className={cn(
                    'inline-flex p-4 rounded-xl mb-4 transition-all duration-300',
                    button.primary
                      ? theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                      || theme.id === 'terminal' && 'bg-gradient-to-r from-terminal-green to-terminal-amber text-terminal-bg'
                      || theme.id === 'minimalist' && 'bg-gradient-to-r from-minimalist-charcoal to-gray-700 text-white'
                      || theme.id === 'neumorphic' && 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      || theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-pink to-vaporwave-purple text-white'
                      : theme.id === 'quantum' && 'bg-cyan-500/20 text-cyan-400'
                      || theme.id === 'terminal' && 'bg-terminal-green/20 text-terminal-green'
                      || theme.id === 'minimalist' && 'bg-gray-100 text-gray-700'
                      || theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600'
                      || theme.id === 'vaporwave' && 'bg-vaporwave-cyan/20 text-vaporwave-cyan'
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {button.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {button.description}
                  </p>

                  <div className={cn(
                    'flex items-center justify-center gap-2 text-sm font-medium transition-colors',
                    button.primary
                      ? 'text-white'
                      : theme.id === 'quantum' && 'text-cyan-400'
                      || theme.id === 'terminal' && 'text-terminal-green'
                      || theme.id === 'minimalist' && 'text-minimalist-charcoal'
                      || theme.id === 'neumorphic' && 'text-gray-700'
                      || theme.id === 'vaporwave' && 'text-vaporwave-cyan'
                  )}>
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className={cn(
            'max-w-2xl mx-auto p-8 rounded-2xl border text-center',
            theme.id === 'quantum' && 'bg-white/5 border-white/10',
            theme.id === 'terminal' && 'bg-terminal-bg border-terminal-green/20',
            theme.id === 'minimalist' && 'bg-white border-gray-200',
            theme.id === 'neumorphic' && 'neumorphic-card',
            theme.id === 'vaporwave' && 'glass-dark border-white/10'
          )}
        >
          <div className="mb-6">
            <h3 className={cn(
              'text-2xl font-bold mb-2',
              theme.id === 'quantum' && 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600',
              theme.id === 'terminal' && 'text-terminal-green terminal-glow',
              theme.id === 'minimalist' && 'text-minimalist-charcoal',
              theme.id === 'neumorphic' && 'text-gray-700',
              theme.id === 'vaporwave' && 'holographic'
            )}>
              Stay Updated
            </h3>
            <p className="text-muted-foreground">
              Get the latest insights on AI, web development, and tech trends delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className={cn(
                  'w-full px-4 py-3 rounded-xl border transition-colors',
                  theme.id === 'quantum' && 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-cyan-400',
                  theme.id === 'terminal' && 'bg-terminal-bg border-terminal-green/30 text-terminal-green placeholder-terminal-green/60 focus:border-terminal-green',
                  theme.id === 'minimalist' && 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-minimalist-charcoal',
                  theme.id === 'neumorphic' && 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-purple-400',
                  theme.id === 'vaporwave' && 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-vaporwave-cyan'
                )}
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubscribed}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2',
                isSubscribed
                  ? theme.id === 'quantum' && 'bg-green-500 text-white'
                  || theme.id === 'terminal' && 'bg-green-500 text-white'
                  || theme.id === 'minimalist' && 'bg-green-500 text-white'
                  || theme.id === 'neumorphic' && 'bg-green-500 text-white'
                  || theme.id === 'vaporwave' && 'bg-green-500 text-white'
                  : theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg'
                  || theme.id === 'terminal' && 'bg-terminal-green text-terminal-bg hover:bg-opacity-80'
                  || theme.id === 'minimalist' && 'bg-minimalist-charcoal text-white hover:bg-opacity-90'
                  || theme.id === 'neumorphic' && 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  || theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-pink to-vaporwave-purple text-white hover:shadow-lg'
              )}
            >
              {isSubscribed ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5"
                  >
                    ✓
                  </motion.div>
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <Mail className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Social Links & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Let's connect and build something amazing together
          </p>
          
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    'p-3 rounded-full border transition-all duration-300',
                    theme.id === 'quantum' && 'bg-white/10 border-white/20 text-cyan-400 hover:bg-cyan-400 hover:text-black',
                    theme.id === 'terminal' && 'bg-terminal-green/10 border-terminal-green/20 text-terminal-green hover:bg-terminal-green hover:text-terminal-bg',
                    theme.id === 'minimalist' && 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-minimalist-charcoal hover:text-white',
                    theme.id === 'neumorphic' && 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-600 hover:text-white',
                    theme.id === 'vaporwave' && 'bg-white/10 border-white/20 text-vaporwave-cyan hover:bg-vaporwave-cyan hover:text-black'
                  )}
                  aria-label={social.name}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            <p>Available for freelance projects and consultations</p>
            <p className="mt-1">
              <span className={cn(
                'font-medium',
                theme.id === 'quantum' && 'text-cyan-400',
                theme.id === 'terminal' && 'text-terminal-green',
                theme.id === 'minimalist' && 'text-minimalist-charcoal',
                theme.id === 'neumorphic' && 'text-gray-600',
                theme.id === 'vaporwave' && 'text-vaporwave-cyan'
              )}>
                Response time: Within 24 hours
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={cn(
          'absolute top-20 left-10 w-16 h-16 rounded-full opacity-20 blur-sm',
          theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500 to-purple-600',
          theme.id === 'terminal' && 'bg-gradient-to-r from-terminal-green to-terminal-amber',
          theme.id === 'minimalist' && 'bg-gradient-to-r from-gray-300 to-gray-500',
          theme.id === 'neumorphic' && 'bg-gradient-to-r from-purple-400 to-pink-400',
          theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-pink to-vaporwave-cyan'
        )}
      />
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className={cn(
          'absolute bottom-20 right-10 w-12 h-12 rounded-full opacity-20 blur-sm',
          theme.id === 'quantum' && 'bg-gradient-to-r from-purple-600 to-pink-500',
          theme.id === 'terminal' && 'bg-gradient-to-r from-terminal-amber to-terminal-red',
          theme.id === 'minimalist' && 'bg-gradient-to-r from-gray-500 to-gray-700',
          theme.id === 'neumorphic' && 'bg-gradient-to-r from-blue-400 to-purple-400',
          theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-cyan to-vaporwave-purple'
        )}
      />
    </section>
  )
}