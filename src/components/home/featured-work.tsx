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
    id: 'optibid-energy',
    title: 'OptiBid Energy — AI-Powered Trading Platform',
    description: 'Revolutionary enterprise-grade platform for real-time energy analytics, intelligent bidding, and visual knowledge graphs. Features ML models (TFT, N-BEATS, DeepAR), Kafka streaming, and multi-tenant enterprise security with 100+ documentation files.',
    image: '/images/projects/optibid-energy.jpg',
    category: 'saas',
    techStack: ['Next.js 14', 'TypeScript', 'Kafka', 'WebSocket', 'Docker', 'Kubernetes', 'ML/AI'],
    demoUrl: 'https://optibid.theqbitlabs.com',
    stats: { stars: 567, forks: 89, views: 8750 },
    featured: true,
    caseStudy: '/case-studies/optibid-energy',
  },
  {
    id: 'brahm-ai',
    title: 'Brahm AI — The "Deep Philosophy" Experiment',
    description: 'This is where I get a bit experimental. It\'s an AI framework inspired by Vedic systems and vibrational computing. Moving beyond standard "if-this-then-that" logic to simulate higher-order cognition—a mix of symbolic AI and neural hybrids that explores how an AI might "perceive" or "remember" like a conscious entity.',
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
    title: 'VedaQ AI — Spiritual Tech',
    description: 'A full-stack app that brings ancient wisdom into the 21st century. It\'s got everything: karma-scoring algorithms, mantra playback, and an LLM that speaks English, Hindi, and "Hinglish." Coolest part: It generates custom images and music based on your journaling—basically a digital spiritual guide in your pocket.',
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
    title: 'NeuroSymbiotic CodeMind — The Self-Evolving Lab',
    description: 'Ever wanted to see AI agents mutate and learn in real-time? I built this interactive environment using D3.js to visualize agent lineages. It\'s a playground where agents interact, evolve, and talk back to you. It looks like a sci-fi movie, but it runs on solid React 19 architecture.',
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
    description: 'A high-end, visual-heavy website designed to make quantum mechanics look as cool as it sounds. Matrix-style typography and 3D qubit simulations using Three.js. It\'s mostly eye candy, but the math under the hood is real—and it makes physics concepts actually understandable.',
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
    title: 'The "Everything-to-Data" OCR System',
    description: 'Businesses love messy PDFs and handwritten notes; developers hate them. I built a pipeline that fixes that. Uses Vision Transformers to pull structured data out of chaotic medical records and invoices with scary-good accuracy. The kind of boring-but-vital infrastructure that keeps the lights on.',
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
    title: 'NovaGen Automation — Industrial Tech',
    description: 'A premium industrial automation company website built for an ISO 9001:2015 certified solutions provider. Features an AI-powered chatbot using Gemini API, dual light/dark themes, glassmorphism UI with micro-animations, and interactive product catalog showcasing Siemens, Yaskawa, Mitsubishi & Delta products.',
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
    description: 'A revolutionary platform that transforms how groups make complex decisions by creating a "cognitive commons" where AI enhances human reasoning. Features real-time AI insights, evidence analysis, structured protocols, and collective wisdom generation for collaborative decision-making.',
    image: '/images/projects/synthesis.jpg',
    category: 'ai',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'Real-time Collaboration', 'Firebase'],
    demoUrl: 'https://synthesis.theqbitlabs.com',
    stats: { stars: 312, forks: 58, views: 4210 },
    featured: true,
  },
  {
    id: 'lims',
    title: 'LIMS — Library & Institute Management',
    description: 'Comprehensive Library & Institute Management System with student tracking, attendance, fees, library, seating management, and analytics. Features real-time dashboard with attendance trends, fee collection tracking, book management, and locker assignments.',
    image: '/images/projects/lims.jpg',
    category: 'saas',
    techStack: ['Next.js', 'TypeScript', 'Firebase', 'TailwindCSS', 'Chart.js'],
    demoUrl: 'https://lims.theqbitlabs.com',
    stats: { stars: 189, forks: 42, views: 3150 },
    featured: true,
  },
  {
    id: 'konnichiwa',
    title: 'Konnichiwa Japan & Namaste India',
    description: 'A dual-brand cultural festival website showcasing Konnichiwa Japan (Japanese culture in India) and Namaste India (Indian culture in Japan) festivals. Features event listings, ticket booking, gallery, magazine, and interactive cultural experiences.',
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
            🚀 Projects (The "Proof" Section)
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

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
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