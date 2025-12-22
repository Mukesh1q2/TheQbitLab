'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import { ExternalLink, Github, Play, Star, GitFork, Eye } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: 'web' | 'ai' | 'mobile' | 'saas' | 'api'
  techStack: string[]
  demoUrl?: string
  githubUrl?: string
  stats: {
    stars: number
    forks: number
    views: number
  }
  featured: boolean
  caseStudy?: string
}

const projects: Project[] = [
  {
    id: 'quantgrid',
    title: 'QuantGrid — AI-Powered Trading',
    description: 'What it is: An enterprise-grade AI energy trading platform. Why I built it: To prove that ML models can handle real-time financial stakes. Different: Kafka streaming & visual knowledge graphs, not just static dashboards.',
    image: '/images/projects/optibid-energy.jpg',
    category: 'saas',
    techStack: ['Next.js 14', 'TypeScript', 'Kafka', 'WebSocket', 'Docker', 'Kubernetes', 'ML/AI'],
    demoUrl: 'https://quantgrid.theqbitlabs.com/',
    stats: { stars: 589, forks: 92, views: 9250 },
    featured: true,
    caseStudy: '/case-studies/quantgrid',
  },
  {
    id: 'brahm-ai',
    title: 'Brahm AI — Consciousness Framework',
    description: 'What it is: A production-focused AI system designed to reason, adapt, and interact. Why I built it: I wanted to explore how symbolic thinking, neural systems, and memory structures can coexist. Different: Not a chatbot—a system. Modular architecture. Performance-aware.',
    image: '/images/projects/brahm-ai.jpg',
    category: 'ai',
    techStack: ['Python', 'PyTorch', 'React 19', 'TypeScript', 'Firebase'],
    demoUrl: 'https://brahm-ai.theqbitlabs.com',
    githubUrl: 'https://github.com/Mukesh1q2/brahm-ai',
    stats: { stars: 847, forks: 156, views: 12450 },
    featured: true,
    caseStudy: '/case-studies/brahm-ai',
  },
  {
    id: 'vedaq-ai',
    title: 'VedaQ AI — Spiritual Intelligence',
    description: 'What it is: Spiritual tech meeting Generative AI. Why I built it: To see if AI can handle cultural nuance and "Hinglish" context. Different: Generates custom media based on journaling. A digital guide, not just a search bar.',
    image: '/images/projects/vedaq-ai.jpg',
    category: 'ai',
    techStack: ['Next.js', 'OpenAI API', 'Firebase', 'TailwindCSS', 'Framer Motion'],
    demoUrl: 'https://vedaq.theqbitlabs.com',
    githubUrl: 'https://github.com/Mukesh1q2/vedaq-ai',
    stats: { stars: 623, forks: 89, views: 8934 },
    featured: true,
    caseStudy: '/case-studies/vedaq-ai',
  },
  {
    id: 'neurosymbiotic-codemind',
    title: 'NeuroSymbiotic — Evolution Lab',
    description: 'What it is: A self-evolving laboratory for AI agents. Why I built it: To visualize intelligence emerging from chaos. Different: Real-time D3.js lineage tracking. Agents that talk back and evolve.',
    image: '/images/projects/neurosymbiotic.jpg',
    category: 'ai',
    techStack: ['React 19', 'D3.js', 'TypeScript', 'Node.js', 'WebSocket'],
    demoUrl: 'https://codemind.theqbitlabs.com',
    githubUrl: 'https://github.com/Mukesh1q2/neurosymbiotic-codemind',
    stats: { stars: 512, forks: 78, views: 6721 },
    featured: true,
  },
  {
    id: 'quantum-playground',
    title: 'The Quantum Playground',
    description: 'What it is: A high-end visual simulation of quantum mechanics. Why I built it: To make physics concepts actually understandable. Different: Matrix-style typography and real 3D qubit simulations. Math under the hood is real.',
    image: '/images/projects/quantum-playground.jpg',
    category: 'web',
    techStack: ['React', 'Three.js', 'WebGL', 'Framer Motion', 'TypeScript'],
    demoUrl: 'https://quantum.theqbitlabs.com',
    githubUrl: 'https://github.com/Mukesh1q2/quantum-playground',
    stats: { stars: 892, forks: 134, views: 11234 },
    featured: true,
    caseStudy: '/case-studies/quantum-playground',
  },
  {
    id: 'ocr-system',
    title: 'Everything-to-Data OCR',
    description: 'What it is: A pipeline that pulls structured data from chaotic documents. Why I built it: Because businesses drown in PDF mess. Different: Uses Vision Transformers. High accuracy on medical records.',
    image: '/images/projects/ocr-system.jpg',
    category: 'ai',
    techStack: ['Python', 'Vision Transformers', 'FastAPI', 'Docker', 'GCP'],
    demoUrl: 'https://ocr.theqbitlabs.com',
    githubUrl: 'https://github.com/Mukesh1q2/ocr-pipeline',
    stats: { stars: 456, forks: 67, views: 5432 },
    featured: true,
  },
  {
    id: 'novagen-automation',
    title: 'NovaGen Automation',
    description: 'What it is: Premium industrial automation website. Why I built it: To modernize the face of industrial tech. Different: Glassmorphism in a boring industry. AI chatbot integration.',
    image: '/images/projects/novagen-automation.jpg',
    category: 'web',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Gemini API', 'Vercel'],
    demoUrl: 'https://novagenautomation.com',
    stats: { stars: 234, forks: 45, views: 3890 },
    featured: true,
  },
  {
    id: 'synthesis',
    title: 'Synthesis — Cognitive Commons',
    description: 'What it is: A platform for AI-enhanced collaborative decision making. Why I built it: To augment human reasoning with collective wisdom. Different: Structured protocols + real-time AI insights.',
    image: '/images/projects/synthesis.jpg',
    category: 'ai',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'Real-time Collaboration', 'Firebase'],
    demoUrl: 'https://synthesis.theqbitlabs.com',
    stats: { stars: 312, forks: 58, views: 4210 },
    featured: true,
  },
  {
    id: 'lims',
    title: 'LIMS System',
    description: 'What it is: Comprehensive management system for institutes. Why I built it: To streamline complex admin workflows. Different: Real-time dashboard with attendance and fee tracking.',
    image: '/images/projects/lims.jpg',
    category: 'saas',
    techStack: ['Next.js', 'TypeScript', 'Firebase', 'TailwindCSS', 'Chart.js'],
    demoUrl: 'https://lims.theqbitlabs.com',
    stats: { stars: 189, forks: 42, views: 3150 },
    featured: true,
  },
  {
    id: 'konnichiwa',
    title: 'Konnichiwa Japan',
    description: 'What it is: A dual-brand cultural festival platform. Why I built it: To bridge Indian and Japanese cultures digitally. Different: Interactive cultural experiences and magazine-style layout.',
    image: '/images/projects/konnichiwa.jpg',
    category: 'web',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Vercel'],
    demoUrl: 'https://konnichiwa.theqbitlabs.com',
    stats: { stars: 156, forks: 34, views: 2890 },
    featured: true,
  },
]

const categories = ['all', 'web', 'ai', 'mobile', 'saas', 'api'] as const

export function FeaturedWork() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('all')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const { theme } = useAppStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const filteredProjects = projects.filter(
    project => selectedCategory === 'all' || project.category === selectedCategory
  )

  const featuredProjects = filteredProjects.filter(project => project.featured)

  return (
    <section ref={ref} className="py-20 bg-background">
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
            🚀 Featured Systems ("Not Demos")
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Talk is cheap. Here's what I've actually built—from consciousness-inspired AI frameworks
            to the boring-but-vital infrastructure that keeps businesses running.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize',
                selectedCategory === category
                  ? theme.id === 'quantum' && 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  || theme.id === 'terminal' && 'bg-terminal-green text-terminal-bg'
                  || theme.id === 'minimalist' && 'bg-minimalist-charcoal text-white'
                  || theme.id === 'neumorphic' && 'neumorphic-button text-gray-700'
                  || theme.id === 'vaporwave' && 'bg-gradient-to-r from-vaporwave-pink to-vaporwave-purple text-white'
                  : theme.id === 'quantum' && 'bg-white/10 text-cyan-400 hover:bg-white/20 border border-white/20'
                  || theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/20 border border-terminal-green/20'
                  || theme.id === 'minimalist' && 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  || theme.id === 'neumorphic' && 'neumorphic-inset text-gray-600 hover:shadow-md'
                  || theme.id === 'vaporwave' && 'glass-dark text-vaporwave-cyan hover:border-white/20 border border-white/10'
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl transition-all duration-500',
                  theme.id === 'quantum' && 'bg-white/5 border border-white/10 hover:border-white/20',
                  theme.id === 'terminal' && 'bg-terminal-bg border border-terminal-green/20 hover:border-terminal-green/40',
                  theme.id === 'minimalist' && 'bg-white border border-gray-200 hover:shadow-xl',
                  theme.id === 'neumorphic' && 'neumorphic-card hover:shadow-xl',
                  theme.id === 'vaporwave' && 'glass-dark border border-white/10 hover:border-white/20'
                )}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      // Prevent infinite loop - only set fallback once
                      if (!img.dataset.fallback) {
                        img.dataset.fallback = 'true'
                        img.src = '/images/placeholder-project.svg'
                      }
                    }}
                  />

                  {/* Overlay */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                    theme.id === 'quantum' && 'from-cyan-900/60',
                    theme.id === 'terminal' && 'from-terminal-green/60',
                    theme.id === 'minimalist' && 'from-gray-900/60',
                    theme.id === 'neumorphic' && 'from-purple-900/60',
                    theme.id === 'vaporwave' && 'from-vaporwave-pink/60'
                  )} />

                  {/* Action Buttons */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center gap-4"
                      >
                        {project.demoUrl && (
                          <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                              'p-3 rounded-full backdrop-blur-sm border transition-colors',
                              theme.id === 'quantum' && 'bg-cyan-500/20 border-cyan-400 text-cyan-400 hover:bg-cyan-500/30',
                              theme.id === 'terminal' && 'bg-terminal-green/20 border-terminal-green text-terminal-green hover:bg-terminal-green/30',
                              theme.id === 'minimalist' && 'bg-white/20 border-white text-white hover:bg-white/30',
                              theme.id === 'neumorphic' && 'bg-white/20 border-gray-300 text-gray-700 hover:bg-white/30',
                              theme.id === 'vaporwave' && 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                            )}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        )}

                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                              'p-3 rounded-full backdrop-blur-sm border transition-colors',
                              theme.id === 'quantum' && 'bg-purple-500/20 border-purple-400 text-purple-400 hover:bg-purple-500/30',
                              theme.id === 'terminal' && 'bg-terminal-green/20 border-terminal-green text-terminal-green hover:bg-terminal-green/30',
                              theme.id === 'minimalist' && 'bg-gray-800/20 border-gray-800 text-gray-800 hover:bg-gray-800/30',
                              theme.id === 'neumorphic' && 'bg-gray-600/20 border-gray-600 text-gray-600 hover:bg-gray-600/30',
                              theme.id === 'vaporwave' && 'bg-vaporwave-purple/20 border-vaporwave-purple text-vaporwave-purple hover:bg-vaporwave-purple/30'
                            )}
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        )}

                        {project.caseStudy && (
                          <motion.a
                            href={project.caseStudy}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                              'p-3 rounded-full backdrop-blur-sm border transition-colors',
                              theme.id === 'quantum' && 'bg-pink-500/20 border-pink-400 text-pink-400 hover:bg-pink-500/30',
                              theme.id === 'terminal' && 'bg-terminal-green/20 border-terminal-green text-terminal-green hover:bg-terminal-green/30',
                              theme.id === 'minimalist' && 'bg-blue-500/20 border-blue-500 text-blue-500 hover:bg-blue-500/30',
                              theme.id === 'neumorphic' && 'bg-indigo-500/20 border-indigo-500 text-indigo-500 hover:bg-indigo-500/30',
                              theme.id === 'vaporwave' && 'bg-vaporwave-cyan/20 border-vaporwave-cyan text-vaporwave-cyan hover:bg-vaporwave-cyan/30'
                            )}
                          >
                            <Play className="w-5 h-5" />
                          </motion.a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn(
                      'text-xs font-medium px-3 py-1 rounded-full',
                      theme.id === 'quantum' && 'bg-cyan-500/10 text-cyan-400',
                      theme.id === 'terminal' && 'bg-terminal-green/10 text-terminal-green',
                      theme.id === 'minimalist' && 'bg-gray-100 text-gray-700',
                      theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                      theme.id === 'vaporwave' && 'bg-vaporwave-cyan/10 text-vaporwave-cyan'
                    )}>
                      {project.category.toUpperCase()}
                    </span>

                    {project.featured && (
                      <span className={cn(
                        'text-xs font-medium px-3 py-1 rounded-full',
                        theme.id === 'quantum' && 'bg-purple-500/10 text-purple-400',
                        theme.id === 'terminal' && 'bg-terminal-amber/10 text-terminal-amber',
                        theme.id === 'minimalist' && 'bg-yellow-100 text-yellow-800',
                        theme.id === 'neumorphic' && 'bg-yellow-100 text-yellow-600',
                        theme.id === 'vaporwave' && 'bg-vaporwave-pink/10 text-vaporwave-pink'
                      )}>
                        FEATURED
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          'text-xs px-2 py-1 rounded-md',
                          theme.id === 'quantum' && 'bg-white/5 text-cyan-300',
                          theme.id === 'terminal' && 'bg-terminal-green/5 text-terminal-green',
                          theme.id === 'minimalist' && 'bg-gray-100 text-gray-600',
                          theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                          theme.id === 'vaporwave' && 'bg-white/5 text-vaporwave-cyan'
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className={cn(
                        'text-xs px-2 py-1 rounded-md',
                        theme.id === 'quantum' && 'bg-white/5 text-cyan-300',
                        theme.id === 'terminal' && 'bg-terminal-green/5 text-terminal-green',
                        theme.id === 'minimalist' && 'bg-gray-100 text-gray-600',
                        theme.id === 'neumorphic' && 'bg-gray-100 text-gray-600',
                        theme.id === 'vaporwave' && 'bg-white/5 text-vaporwave-cyan'
                      )}>
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      <span>{project.stats.forks}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.stats.views}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/portfolio"
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
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}