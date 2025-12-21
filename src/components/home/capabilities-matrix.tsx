'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import {
  Code,
  Smartphone,
  Brain,
  Palette,
  Database,
  Cloud,
  Shield,
  Zap,
  Settings,
  Globe,
  Cpu,
  Layers
} from 'lucide-react'

interface Capability {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  level: number // 1-5
  projects: string[]
  category: 'frontend' | 'backend' | 'ai' | 'design' | 'devops' | 'security'
  technologies: string[]
}

const capabilities: Capability[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Making machines smart—not just chatbot-smart, but actually-understands-context smart. From LLMs to Computer Vision to Deep Learning, I build AI that thinks, evolves, and scales.',
    icon: Brain,
    level: 5,
    projects: ['Brahm AI', 'VedaQ AI', 'NeuroSymbiotic CodeMind'],
    category: 'ai',
    technologies: ['PyTorch', 'TensorFlow', 'OpenCV', 'OpenAI API', 'Vision Transformers'],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description: 'Building the part you actually see and click. I create responsive, performant web apps that don\'t break when real users show up. Clean code, reliable systems, human-centered design.',
    icon: Code,
    level: 5,
    projects: ['Quantum Playground', 'VedaQ AI', 'OCR Pipeline'],
    category: 'frontend',
    technologies: ['React 19', 'Next.js', 'Node.js', 'TailwindCSS', 'Framer Motion'],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & DevOps',
    description: 'Making sure everything stays online. The boring-but-vital cloud infrastructure that keeps the lights on. Containerization, deployments, and the automation that makes developers\' lives easier.',
    icon: Cloud,
    level: 4,
    projects: ['OCR Pipeline', 'Brahm AI Backend', 'Production Deployments'],
    category: 'devops',
    technologies: ['GCP', 'AWS', 'Docker', 'Firebase', 'FastAPI'],
  },
  {
    id: 'system-design',
    title: 'System Architecture',
    description: 'Drawing the big boxes and arrows so the code doesn\'t turn into spaghetti. Designing scalable, maintainable architectures that grow with your product—not against it.',
    icon: Layers,
    level: 5,
    projects: ['Brahm AI Framework', 'VedaQ Architecture', 'Enterprise APIs'],
    category: 'backend',
    technologies: ['Microservices', 'Event-Driven', 'Clean Architecture', 'REST', 'GraphQL'],
  },
  {
    id: 'llm-apps',
    title: 'Custom LLM Applications',
    description: 'Taking you beyond a basic ChatGPT prompt into a real product. RAG systems, fine-tuned models, and AI apps that actually solve your specific problem—not just generic chatbots.',
    icon: Cpu,
    level: 5,
    projects: ['VedaQ AI', 'Brahm AI', 'Enterprise LLM Tools'],
    category: 'ai',
    technologies: ['LangChain', 'OpenAI', 'Hugging Face', 'RAG', 'Vector DBs'],
  },
  {
    id: 'prototyping',
    title: 'R&D Prototyping',
    description: 'Turning your "what if" ideas into a working demo in weeks, not months. I help figure out if you actually need an AI or just a really good script—then build whichever makes sense.',
    icon: Zap,
    level: 5,
    projects: ['NeuroSymbiotic CodeMind', 'Quantum Experiments', 'AI Research'],
    category: 'ai',
    technologies: ['Rapid Prototyping', 'POC Development', 'Technical Validation', 'MVP'],
  },
]

const categories = [
  { id: 'frontend', name: 'Frontend', color: 'from-blue-500 to-cyan-500' },
  { id: 'backend', name: 'Backend', color: 'from-green-500 to-emerald-500' },
  { id: 'ai', name: 'AI/ML', color: 'from-purple-500 to-pink-500' },
  { id: 'design', name: 'Design', color: 'from-orange-500 to-red-500' },
  { id: 'devops', name: 'DevOps', color: 'from-indigo-500 to-purple-500' },
  { id: 'security', name: 'Security', color: 'from-red-500 to-pink-500' },
] as const

export function CapabilitiesMatrix() {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null)
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null)
  const { theme } = useAppStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const getLevelColor = (level: number) => {
    if (level >= 4) return 'text-green-500'
    if (level >= 3) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getLevelText = (level: number) => {
    if (level >= 4) return 'Expert'
    if (level >= 3) return 'Advanced'
    if (level >= 2) return 'Intermediate'
    return 'Beginner'
  }

  return (
    <section ref={ref} className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
            How I Can Help You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you need AI architecture, custom LLM apps, or full-stack engineering—
            I turn your "what if" ideas into working products. Here's what I bring to the table.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            const categoryColor = categories.find(c => c.id === capability.category)?.color || 'from-gray-500 to-gray-600'

            return (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-500',
                  theme.id === 'quantum' && 'bg-white/5 border border-white/10 hover:border-white/20',
                  theme.id === 'terminal' && 'bg-terminal-bg border border-terminal-green/20 hover:border-terminal-green/40',
                  theme.id === 'minimalist' && 'bg-white border border-gray-200 hover:shadow-xl',
                  theme.id === 'neumorphic' && 'neumorphic-card hover:shadow-xl',
                  theme.id === 'vaporwave' && 'glass-dark border border-white/10 hover:border-white/20'
                )}
                onClick={() => setSelectedCapability(capability)}
                onMouseEnter={() => setHoveredCapability(capability.id)}
                onMouseLeave={() => setHoveredCapability(null)}
              >
                {/* Background Gradient */}
                <div className={cn(
                  'absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500',
                  categoryColor
                )} />

                {/* Icon */}
                <div className="relative z-10">
                  <div className={cn(
                    'inline-flex p-3 rounded-xl mb-4',
                    theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20',
                    theme.id === 'terminal' && 'bg-terminal-green/10',
                    theme.id === 'minimalist' && 'bg-gray-100',
                    theme.id === 'neumorphic' && 'bg-gray-100',
                    theme.id === 'vaporwave' && 'bg-white/10'
                  )}>
                    <Icon className={cn(
                      'w-6 h-6',
                      theme.id === 'quantum' && 'text-cyan-400',
                      theme.id === 'terminal' && 'text-terminal-green',
                      theme.id === 'minimalist' && 'text-gray-700',
                      theme.id === 'neumorphic' && 'text-gray-600',
                      theme.id === 'vaporwave' && 'text-vaporwave-cyan'
                    )} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {capability.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {capability.description}
                  </p>

                  {/* Level Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Level:</span>
                      <span className={cn('text-sm font-semibold', getLevelColor(capability.level))}>
                        {getLevelText(capability.level)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div
                          key={i}
                          className={cn(
                            'w-2 h-2 rounded-full transition-colors duration-300',
                            i < capability.level
                              ? `bg-gradient-to-r ${categoryColor}`
                              : 'bg-gray-200 dark:bg-gray-700'
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Project Count */}
                  <div className="mt-3 text-xs text-muted-foreground">
                    {capability.projects.length} related projects
                  </div>
                </div>

                {/* Hover Effect */}
                <AnimatePresence>
                  {hoveredCapability === capability.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={cn(
                        'absolute inset-0 bg-gradient-to-r opacity-10 pointer-events-none',
                        categoryColor
                      )} />
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Category Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
                theme.id === 'quantum' && 'bg-white/5 text-cyan-400 border border-white/10',
                theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green border border-terminal-green/20',
                theme.id === 'minimalist' && 'bg-gray-100 text-gray-700 border border-gray-200',
                theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600 border border-gray-200',
                theme.id === 'vaporwave' && 'glass-dark text-vaporwave-cyan border border-white/10'
              )}
            >
              <div className={cn('w-3 h-3 rounded-full bg-gradient-to-r', category.color)} />
              <span>{category.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6">
            Ready to discuss your next project? Let's explore how these capabilities can help bring your vision to life.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300',
              theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/25',
              theme.id === 'terminal' && 'bg-terminal-green text-terminal-bg hover:bg-opacity-80',
              theme.id === 'minimalist' && 'bg-minimalist-charcoal text-white hover:bg-opacity-90',
              theme.id === 'neumorphic' && 'neumorphic-button text-gray-700 hover:shadow-lg',
              theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-pink to-vaporwave-purple text-white hover:shadow-lg'
            )}
          >
            Start a Project
            <Settings className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCapability && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCapability(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={cn(
                'max-w-2xl w-full p-8 rounded-2xl border max-h-[90vh] overflow-y-auto',
                theme.id === 'quantum' && 'bg-white/10 border-white/20 backdrop-blur-md',
                theme.id === 'terminal' && 'bg-terminal-bg border-terminal-green/30',
                theme.id === 'minimalist' && 'bg-white border-gray-200',
                theme.id === 'neumorphic' && 'neumorphic-card',
                theme.id === 'vaporwave' && 'glass-dark border-white/10'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={cn(
                  'p-3 rounded-xl',
                  theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20',
                  theme.id === 'terminal' && 'bg-terminal-green/10',
                  theme.id === 'minimalist' && 'bg-gray-100',
                  theme.id === 'neumorphic' && 'bg-gray-100',
                  theme.id === 'vaporwave' && 'bg-white/10'
                )}>
                  <selectedCapability.icon className={cn(
                    'w-6 h-6',
                    theme.id === 'quantum' && 'text-cyan-400',
                    theme.id === 'terminal' && 'text-terminal-green',
                    theme.id === 'minimalist' && 'text-gray-700',
                    theme.id === 'neumorphic' && 'text-gray-600',
                    theme.id === 'vaporwave' && 'text-vaporwave-cyan'
                  )} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{selectedCapability.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={cn('text-sm font-semibold', getLevelColor(selectedCapability.level))}>
                      {getLevelText(selectedCapability.level)}
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div
                          key={i}
                          className={cn(
                            'w-3 h-3 rounded-full',
                            i < selectedCapability.level
                              ? 'bg-green-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                {selectedCapability.description}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Related Projects</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCapability.projects.map((project) => (
                      <span
                        key={project}
                        className={cn(
                          'px-3 py-1 rounded-lg text-sm',
                          theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400',
                          theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green',
                          theme.id === 'minimalist' && 'bg-gray-100 text-gray-700',
                          theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                          theme.id === 'vaporwave' && 'bg-vaporwave-cyan/10 text-vaporwave-cyan'
                        )}
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCapability.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          'px-3 py-1 rounded-lg text-sm',
                          theme.id === 'quantum' && 'bg-purple-500/10 text-purple-400',
                          theme.id === 'terminal' && 'bg-terminal-amber/10 text-terminal-amber',
                          theme.id === 'minimalist' && 'bg-blue-100 text-blue-700',
                          theme.id === 'neumorphic' && 'bg-blue-100 text-blue-600',
                          theme.id === 'vaporwave' && 'bg-vaporwave-pink/10 text-vaporwave-pink'
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCapability(null)}
                className={cn(
                  'mt-8 w-full px-6 py-3 rounded-xl font-medium transition-colors',
                  theme.id === 'quantum' && 'bg-cyan-500 hover:bg-cyan-600 text-white',
                  theme.id === 'terminal' && 'bg-terminal-green hover:bg-opacity-80 text-terminal-bg',
                  theme.id === 'minimalist' && 'bg-minimalist-charcoal hover:bg-opacity-90 text-white',
                  theme.id === 'neumorphic' && 'neumorphic-button text-gray-700',
                  theme.id === 'vaporwave' && 'bg-vaporwave-pink hover:bg-opacity-80 text-white'
                )}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}